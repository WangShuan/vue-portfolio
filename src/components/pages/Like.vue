<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <h3 class="my-4 pc text-primary">
      <i class="fa fa-heart-o" aria-hidden="true"></i>
      喜好項目
    </h3>
    <div v-if="hasLiked == false">
      <h4 class="my-5 pc">
        您的喜好項目為空，
        <br />請
        <router-link to="/products/all" class="text-danger mr-1">回商品列表</router-link>添加喜好項目。
      </h4>
    </div>

    <h5 class="my-3 mobile text-primary">
      <i class="fa fa-heart-o" aria-hidden="true"></i>
      喜好項目
    </h5>

    <div v-if="hasLiked == false">
      <h6 class="my-5 mobile">
        您的喜好項目為空。
        <br />請
        <router-link to="/products/all" class="text-danger mr-1">回商品列表</router-link>添加喜好項目。
      </h6>
    </div>

    <div id="cart-list" v-else>
      <table class="like-pc table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th>操作</th>
          <th width="280">品名</th>
          <th width="150">單價</th>
          <th width="300">商品連結</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="align-middle">
              <button
                @click="removeLike(item.id)"
                type="button"
                class="btn btn-outline-danger mr-3 btn-sm"
              >
                <i class="fa fa-trash" aria-hidden="true"></i> 自喜好項目移除
              </button>
              <button
                @click="addCart(item.id)"
                type="button"
                class="btn-outline-secondary ml-3 btn-sm btn"
              >
                加入購物車
                <i class="fa fa-shopping-basket" aria-hidden="true"></i>
              </button>
            </td>
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle">{{ item.price | numFormat | dollarSign }} / {{item.unit}}</td>
            <td class="align-middle">
              <router-link class="text-success" :to="`/product/${item.id}`">
                點此前往商品頁面
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="like-mobile">
        <table class="table table-striped table-bordered text-dark my-2">
          <thead class="thead">
            <th width="95">操作</th>
            <th>瀏覽商品</th>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td class="align-middle">
                <button
                  @click="removeLike(item.id)"
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button
                  @click="addCart(item.id)"
                  type="button"
                  class="btn-outline-success btn-sm btn"
                >
                  <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                </button>
              </td>
              <td class="align-middle text-primary">
                <router-link :to="`/product/${item.id}`">{{ item.title }}</router-link>

                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-lg btn-dark my-4" @click="addCart(products)">將所有喜好項目全部加入購物車</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
      hasLiked: true,
      cookie: "",
    };
  },
  methods: {
    getLikes(arr) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products;
          vm.hasLiked = true;
          if (arr.length > 20) {
            arr = arr.split(",");
          } else {
            arr = [arr];
          }
          vm.isLoading = false;
          vm.products = vm.products.filter(function (item) {
            return arr.indexOf(item.id) !== -1;
          });
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    removeLike(id) {
      const vm = this;
      vm.isLoading = true;
      let arr = vm.cookie;
      if (arr.length === 20) {
        document.cookie = `like=;expires=7;path=/`;
      } else if (arr.length > 20) {
        arr = arr.split(",");
        let i = arr.indexOf(id);
        arr.splice(i, 1);
        let str = arr.toString();
        document.cookie = `like=${str};expires=7;path=/`;
      }
      vm.isLoading = false;
      vm.hasLikes();
    },
    addCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      if (typeof id === "string") {
        this.$http
          .post(api, { data: { product_id: id, qty: 1 } })
          .then((res) => {
            if (res.data.success) {
              vm.$bus.$emit("message:push", res.data.message, "success");
              vm.isLoading = false;
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
      } else {
        id.forEach(function (item) {
          vm.$http
            .post(api, { data: { product_id: item.id, qty: 1 } })
            .then((res) => {
              if (res.data.success) {
                vm.$bus.$emit("message:push", res.data.message, "success");
                vm.isLoading = false;
              } else {
                vm.$bus.$emit("message:push", res.data.message, "danger");
              }
            });
        });
      }
    },
    hasLikes() {
      const vm = this;
      let cookieObj = {};
      let cookieAry = document.cookie.split(";");
      let cookie;
      let arr;
      for (var i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = cookieAry[i].trim();
        cookie = cookie.split("=");
        if (cookie[0] === "like") {
          arr = cookie[1];
          vm.cookie = arr;
          if (arr.length !== 0) {
            vm.getLikes(arr);
          } else {
            vm.hasLiked = false;
          }
        } else {
          vm.hasLiked = false;
        }
      }
    },
  },
  created() {
    this.hasLikes();
  },
};
</script>

<style scoped>
.like-mobile,
.mobile {
  display: none;
}

.box {
  min-height: calc(100vh - 250px);
}

@media screen and (max-width: 420px) {
  .like-pc,
  .pc {
    display: none;
  }
  .like-mobile,
  .mobile {
    display: block;
  }
}
</style>