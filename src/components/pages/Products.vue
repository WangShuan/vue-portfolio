<template>
  <div class="container text-dark">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>

    <div class="row mb-3">
      <CategoryList class="pc" :categories="categories" :active="active" @getProducts="getProducts"></CategoryList>
      <div class="col-md-9">
        <h4 class="my-4 text-left pc">商品列表</h4>
        <div class="card-columns pc">
          <div
            :class="{ 'text-dark': item.is_enabled !== 1 }"
            class="card p-1"
            v-for="item in products"
            :key="item.id"
            @click="getProduct(item)"
          >
            <img :src="item.imageUrl" alt class="card-img-top" />
            <div class="card-body">
              <h5>{{ item.title }}</h5>
              <p class="card-text text-primary">{{ item.content }}</p>
            </div>
            <div class="mb-2">
              <h4 v-if="item.is_enabled == 1" class="text-center">
                <template v-if="item.price > 0">
                  <del class="h6 text-muted">原價 {{ item.origin_price }} 元</del>
                  <h3 class="ml-2">
                    <b class="text-danger p-1">{{ item.price }}元</b>
                  </h3>
                </template>
                <h3 v-else>
                  <b class="text-danger p-1">定價 {{ item.origin_price }}元</b>
                </h3>
                <button @click.stop="addCart(item.id)" class="btn w-100 btn-danger">加入購物車</button>
              </h4>

              <h5 class="text-danger" v-if="item.is_enabled !== 1">
                <i>
                  商品未啟用
                  <br />
                  <small>(缺貨/已售完)</small>
                </i>
              </h5>
            </div>
          </div>
        </div>

        <!-- 手機版商品列表 -->
        <div class="mobile mb-4">
          <div class="btn-group text-dark mt-4 mb-2">
            <h6>當前商品類別：</h6>
            <a
              class="text-primary h6"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{active.name}}
              <i class="fa fa-caret-down text-warning" aria-hidden="true"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg-right">
              <button
                v-for="item in categories"
                :key="item.title"
                :class="{active: item.title === active.name}"
                @click.prevent="getProducts(item.path)"
                class="dropdown-item"
                type="button"
              >{{item.title}}</button>
            </div>
          </div>
          <ul class="list-unstyled m-0">
            <li
              class="media py-1 border mb-1"
              :class="{ 'text-dark': item.is_enabled !== 1 }"
              v-for="item in products"
              :key="item.id"
              @click="getProduct(item)"
            >
              <img :src="item.imageUrl" class="mx-1 align-self-center media-img" />
              <div class="media-body ml-1 text-left text-primary align-self-center">
                <h6 class="mt-2 mb-1 text-dark">{{item.title}}</h6>
                {{item.content}}
                <div class="border-top pt-2 mt-2">
                  <div v-if="item.is_enabled == 1">
                    <template v-if="item.price > 0">
                      <del class="float-left text-muted">
                        <small>原價 {{ item.origin_price }} 元</small>
                      </del>
                      <h4 class="ml-2 mb-0 float-right text-danger">
                        <b class="text-red p-1">{{ item.price }}元</b>
                      </h4>
                    </template>
                    <template v-else>
                      <small>售價</small>
                      <h4 class="ml-2 mb-0 float-right">
                        <b class="text-danger p-1">{{ item.origin_price }}元</b>
                      </h4>
                    </template>
                  </div>

                  <h6 class="text-danger text-center" v-if="item.is_enabled !== 1">
                    ! 未啟用
                    <i class="small">(缺貨/已售完)</i> !
                  </h6>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <Pagination v-if="active.path=='all'" :pages="pagination" @event="getPage"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "../Pagination";
import CategoryList from "../CategoryList";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      categories: [],
      active: { name: "", path: "" },
      pagination: {},
    };
  },
  components: { Pagination, CategoryList },
  methods: {
    getProducts(category = this.$route.params.category) {
      const vm = this;
      vm.isLoading = true;
      vm.$router.push("/products/" + category).catch((err) => err);
      vm.active.path = category;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          if (category == "all") {
            vm.products = res.data.products;
            vm.active.name = "全部";
            vm.pagination.current_page = 1;
          } else if (category == "chess") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "西洋棋";
            });
            vm.active.name = "西洋棋";
          } else if (category == "block") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "積木";
            });
            vm.active.name = "積木";
          } else if (category == "domino") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "骨牌";
            });
            vm.active.name = "骨牌";
          } else if (category == "puzzle") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "拼圖";
            });
            vm.active.name = "拼圖";
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    getPage(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products?page=${page}`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.products = res.data.products;
          vm.pagination = res.data.pagination;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    addCart(id, num = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          vm.isLoading = false;
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
    getProduct(item) {
      if (item.is_enabled !== 1) {
        this.$bus.$emit("message:push", "無法前往未啟用之商品頁面", "danger");
        return false;
      }
      this.$router.push(`/product/${item.id}`);
    },
  },
  created() {
    const vm = this;
    const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
    this.$http.get(api).then((res) => {
      if (res.data.success) {
        let arr = res.data.products;
        const set = new Set();
        arr.filter((item) =>
          !set.has(item.category) ? set.add(item.category) : false
        );
        let temCategory = [...set];
        temCategory.forEach(function (item) {
          vm.categories.push({ title: item, num: 0, path: "" });
        });
        vm.categories.unshift({ title: "全部", num: 0, path: "" });
        let arr2 = [];
        for (let i = 1; i < vm.categories.length; i++) {
          let arr = res.data.products.filter(function (item) {
            return item.category === vm.categories[i].title;
          });
          arr2.push(arr.length);
        }
        arr2.unshift(arr.length);
        for (let j = 0; j < arr2.length; j++) {
          vm.categories[j].num = arr2[j];
        }
        let arr3 = vm.categories;
        let arr4 = ["all", "chess", "block", "domino", "puzzle"];
        for (let i = 0; i < arr3.length; i++) {
          arr3[i].path = arr4[i];
        }
        vm.categories = arr3;
        vm.getProducts();
      } else {
        vm.$bus.$emit("message:push", res.data.message, "danger");
      }
    });
    vm.getPage();
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  &:hover {
    background-color: rgb(205, 225, 255);
  }
}

.media-img {
  object-fit: cover;
  width: 100px;
  height: 100px;
}
</style>