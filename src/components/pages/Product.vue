<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <div class="row">
      <CategoryList class="pc" :categories="categories" :active="active" @getProducts="getProducts"></CategoryList>

      <div class="col-md-9">
        <div class="mobile">
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
        </div>
        <h4 class="my-4 text-left pc">商品列表</h4>
        <div class="row mb-3 media">
          <img :src="product.imageUrl" class="img-fluid col-md-6 mb-4" />
          <div class="media-body px-3">
            <div class="text-justify">
              <h3 class="text-primary">{{ product.title }}</h3>
              <div class="input-group mb-2">
                <button v-if="isLiked" class="btn btn-sm btn-danger" @click="liked(product.id)">
                  <i class="fa fa-heart" aria-hidden="true"></i>
                  喜歡 ( 987 )
                </button>
                <button v-else class="btn btn-sm btn-outline-danger" @click="liked(product.id)">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                  喜歡 ( 986 )
                </button>
              </div>
              <div class="text-dark">已售出 876 {{ product.unit }} | 剩餘數量 9999</div>
              <hr />

              <div class="mt-2 mb-3">
                <select class="input-group p-2" v-model="product.num">
                  <option v-for="num in 10" :key="num" :value="num">選購 {{ num }} {{ product.unit }}</option>
                </select>
                <div class="input-group m-0 row">
                  <button
                    class="btn btn-success col-6 rounded-0"
                    @click="addCart(product.id, product.num)"
                  >加入購物車</button>
                  <button
                    @click="buyNow(product.id,product.num)"
                    class="btn btn-danger col-6 rounded-0"
                  >立即購買</button>
                </div>
              </div>

              <div>
                <h5 class="text-right" v-if="product.price>0">
                  <del class="text-right text-dark h6">原價 {{ product.origin_price }} 元</del>
                  <br />

                  <h2 class="text-right ml-2">
                    <b class="text-danger p-1">
                      <span class="small">現在只要</span>
                      {{ product.price }}元
                    </b>
                  </h2>
                </h5>
                <h3 class="text-right" v-else>
                  <b>售價 {{ product.origin_price }} 元</b>
                </h3>
              </div>
              <p class="mt-3 text-center text-muted">***溫馨提醒：產品提供七天鑑賞期***</p>
            </div>
          </div>
          <div class="col-md-12 mt-2 text-left">
            <h5 class="bg-light text-dark p-2">商品內容：</h5>
            <p class="m-3">{{ product.content }}</p>
            <h5 class="bg-light text-dark p-2">商品描述：</h5>
            <pre v-html="product.description" class="m-3"></pre>
          </div>
          <div class="col-md-12">
            <h5 class="bg-light text-left text-dark p-2">類似商品：</h5>
            <button
              class="btn float-left btn-success m-2"
              v-for="item in products"
              :key="item.id"
              @click="$router.push(`/product/${item.id}`)"
              :class="{
            'btn-danger': item.is_enabled !== 1,
            'd-none': item.id === product.id,
          }"
              :disabled="item.is_enabled !== 1"
            >{{ item.title }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from "../CategoryList";
export default {
  data() {
    return {
      product: "",
      isLoading: false,
      products: [],
      isLiked: false,
      categories: [],
      active: { name: "", path: "" },
    };
  },
  components: { CategoryList },
  methods: {
    getProducts(item) {
      this.$router.push("/products/" + item);
    },
    getProduct(id = this.$route.params.id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.product = res.data.product;
          vm.product.num = 1;
          vm.active.name = vm.product.category;
          const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
          this.$http.get(api).then((res) => {
            vm.isLoading = false;
            if (res.data.success) {
              vm.products = res.data.products.filter(function (item) {
                return item.category === vm.product.category;
              });
              if (document.cookie.indexOf(vm.$route.params.id) !== -1) {
                vm.isLiked = true;
              }
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
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
    buyNow(id, num = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          vm.isLoading = false;
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
            vm.$router.push("/cart");
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
    liked(id = this.$route.params.id) {
      const vm = this;
      let cookieObj = {};
      let cookieAry = document.cookie.split(";");
      let cookie;
      let arr;
      for (let i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = cookieAry[i].trim();
        cookie = cookie.split("=");
        if (cookie[0] === "like") {
          arr = cookie[1];
          if (arr.indexOf(id) !== -1) {
            arr = arr.split(",");
            if (arr.length <= 1) {
              document.cookie = "like=;expires=7;path=/";
            } else {
              arr.splice(arr.indexOf(id), 1);
              document.cookie = `like=${arr};expires=7;path=/`;
            }
            vm.$bus.$emit("message:push", "已移除喜好項目", "danger");
            vm.isLiked = false;
          } else if (arr.indexOf(id) == -1) {
            if (arr.length !== 0) {
              arr = arr + "," + id;
            } else {
              arr = id;
            }
            document.cookie = `like=${arr};expires=7;path=/`;
            vm.$bus.$emit("message:push", "已加入喜好項目", "success");
            vm.isLiked = true;
          }
        } else if (document.cookie.indexOf("like") == -1) {
          document.cookie = `like=${id};expires=7;path=/`;
          vm.$bus.$emit("message:push", "已加入喜好項目", "success");
          vm.isLiked = true;
        }
      }
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
      } else {
        vm.$bus.$emit("message:push", res.data.message, "danger");
      }
    });
    vm.getProduct();
  },
};
</script>

<style scoped>
p,
pre {
  font-size: 16px !important;
  color: #08315a;
}

.media > img {
  object-fit: cover;
  width: 100%;
  height: 330px;
}

pre {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap !important; /* Mozilla, since 1999*/
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
