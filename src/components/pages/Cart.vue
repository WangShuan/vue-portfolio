<template>
  <div class="container text-dark">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <div class="pc row">
      <div class="col-md-8 mb-3">
        <h4 class="my-4 text-primary">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單
        </h4>
        <div v-if="cart.total === 0">
          <h4 class="mt-5">
            您的購物車沒有任何商品，
            <router-link to="/products/all" class="text-danger">回商品列表</router-link>選購。
          </h4>
        </div>
        <div class="pc" v-else>
          <table class="table table-striped table-bordered text-dark">
            <thead class="thead">
              <th width="80">操作</th>
              <th width="320">商品連結</th>
              <th width="200">數量</th>
              <th width="200">單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="delCart(item.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <router-link :to="'/product/'+item.product.id">
                    {{
                    item.product.title
                    }}
                  </router-link>
                  <div class="text-danger" v-if="cart.final_total !== cart.total">已套用優惠券</div>
                </td>
                <td class="align-middle">
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click.prevent="lessQty(item.id)"
                    >﹣</button>
                    <button class="btn btn-outline-secondary" disabled>{{item.qty}}</button>
                    <button
                      @click.prevent="addQty(item.id)"
                      type="button"
                      class="btn btn-outline-secondary"
                    >﹢</button>
                  </div>
                </td>
                <td class="align-middle text-right">
                  <del class="text-muted" v-if="cart.final_total !== cart.total">
                    {{
                    item.product.price | numFormat | dollarSign
                    }}/{{item.product.unit}}
                  </del>
                  <template v-else>
                    {{
                    item.product.price | numFormat | dollarSign
                    }}/{{item.product.unit}}
                  </template>
                  <div class="text-success" v-if="cart.final_total !== cart.total">
                    折扣後
                    {{ item.final_total | numFormat | dollarSign }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="input-group input-group-sm w-50">
            <input type="text" class="form-control" :placeholder="hint" v-model="couponCode" />
            <div class="input-group-append">
              <button
                class="btn btn-primary font-weight-bold"
                type="button"
                @click="addCoupon"
              >套用優惠碼</button>
              <router-link to="/coupon" class="btn btn-danger">領取優惠碼</router-link>
            </div>
          </div>
          <i v-if="cart.final_total !== cart.total" class="float-left">再次點選套用即可清除當前折扣</i>
        </div>
      </div>
      <div class="col-md-4">
        <h4 class="my-4 text-primary">
          <i class="fa fa-pencil" aria-hidden="true"></i> 訂單摘要
        </h4>
        <div v-if="cart.total>0" class="border p-3">
          <h6>
            <div class="float-left">小計：</div>
            <div class="float-right">NT$ {{cart.total}}</div>
          </h6>
          <h6 class="py-4">
            <div class="float-left">運費：</div>
            <del class="float-right">NT$ 200</del>
            <span class="float-right mr-2 text-danger">免運活動</span>
          </h6>
          <h4 class="mt-5 border-top py-3" :class="{'h5': cart.final_total !== cart.total}">
            <div class="float-left">總計</div>
            <div class="float-right">{{ cart.total | numFormat | dollarSign }}</div>
          </h4>
          <h4 v-if="cart.final_total !== cart.total" class="py-3 text-danger">
            <div class="float-left">最終折扣價</div>
            <div class="float-right">{{ cart.final_total | numFormat | dollarSign }}</div>
          </h4>
          <button
            class="btn w-100 mt-2 btn-outline-danger font-weight-bold"
            @click="$router.push('/checkout')"
          >確認結帳</button>
        </div>
        <div v-else class="border p-3">
          <h5 class="my-3">訂單查詢</h5>
          <p class="text-danger">管理員可至訂單管理中查找訂單 ID</p>

          <input
            type="text"
            class="form-control text-center"
            v-model="orderId"
            placeholder="請輸入訂單ID"
          />
          <button class="btn btn-dark my-3" @click="getOrder">確認</button>
        </div>
      </div>
    </div>
    <div class="mobile" v-if="cart.total > 0">
      <h5 class="my-4">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單
      </h5>
      <table class="table table-striped table-bordered text-dark">
        <thead class="thead">
          <th width="67">操作</th>
          <th>商品內容</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            <td class="text-center">
              <div class="float-left">{{ item.product.title }}×{{ item.qty }}</div>

              <div class="float-right">
                <del
                  class="text-muted"
                  v-if="cart.final_total !== cart.total"
                >{{ item.total | numFormat | dollarSign }}</del>
                <template v-else>
                  {{
                  item.total | numFormat | dollarSign
                  }}
                </template>
                <div class="text-success" v-if="cart.final_total !== cart.total">
                  折扣後
                  {{ item.final_total | numFormat | dollarSign }}
                </div>
              </div>
              <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="1" class="text-right">總計</td>
            <td class="text-right">{{ cart.total | numFormat | dollarSign }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="1" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total | numFormat | dollarSign }}</td>
          </tr>
        </tfoot>
      </table>
      <h5>
        <i aria-hidden="true" class="fa fa-ticket"></i>
        優惠券
      </h5>
      <div class="input-group input-group-sm p-0">
        <input
          type="text"
          class="form-control text-center"
          :placeholder="hint"
          v-model="couponCode"
        />
      </div>
      <div class="input-group row input-group-sm mx-0">
        <button
          class="btn btn-primary rounded-0 col-6 btn-sm font-weight-bold"
          type="button"
          @click="addCoupon"
        >套用優惠碼</button>
        <button
          class="btn btn-danger rounded-0 col-6 btn-sm font-weight-bold"
          @click="$router.push('/checkout')"
        >立即結帳</button>
      </div>
      <br />
    </div>
    <div class="mobile" v-if="cart.total === 0">
      <h5 class="my-4">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單
      </h5>
      <h6>
        您的購物車目前沒有任何商品，
        <br />請
        <router-link to="/products/all" class="text-danger mr-1">回商品列表</router-link>選購。
      </h6>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: [],
      couponCode: "",
      hint: "請輸入優惠碼",
      orderId: "",
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data;
          if (vm.cart.final_total == vm.cart.total) {
            vm.hint = "請輸入優惠碼";
          } else {
            vm.hint = "當前折扣碼：" + vm.cart.carts[0].coupon.code;
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    delCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit("message:push", "購物車清單已更新", "success");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCoupon() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/coupon`;
      if (vm.couponCode == "") {
        vm.couponCode = "false";
      }
      this.$http.post(api, { data: { code: vm.couponCode } }).then((res) => {
        if (res.data.success) {
          vm.cart.final_total = res.data.final_total;
          if (vm.couponCode === "false") {
            vm.hint = "請輸入優惠碼";
            vm.$bus.$emit("message:push", "已移除優惠券", "success");
          } else {
            vm.hint = "當前折扣碼：" + vm.couponCode;
            vm.$bus.$emit("message:push", "已套用優惠券", "success");
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.couponCode = "";
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addQty(id) {
      const vm = this;
      let ret = vm.cart.carts.find(function (item) {
        return item.id === id;
      });
      ret.qty = ret.qty + 1;
      vm.addCart(ret);
    },
    lessQty(id) {
      const vm = this;
      let ret = vm.cart.carts.find(function (item) {
        return item.id === id;
      });
      if (ret.qty == 1) {
        vm.delCart(id);
      } else {
        ret.qty = ret.qty - 1;
        vm.addCart(ret);
      }
    },
    addCart(item) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: item.product_id, qty: item.qty } })
        .then((res) => {
          vm.isLoading = false;
          if (res.data.success) {
            vm.delCart(item.id);
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
    getOrder() {
      const vm = this;
      if (vm.orderId.length == 20 && vm.orderId.substr(0, 1) === "-") {
        vm.$router.push("/checkout/" + vm.orderId);
      } else {
        window.alert("您輸入的訂單編號有誤!");
      }
    },
  },
  watch: {
    $route: function () {
      this.getCart();
    },
  },
  created() {
    this.getCart();
  },
};
</script>
