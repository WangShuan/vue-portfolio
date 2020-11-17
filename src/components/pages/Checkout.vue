<template>
  <div class="container text-dark">
    <div v-if="$route.path === '/checkout'">
      <h4 class="mt-4 text-danger">
        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        確認訂單
        <br />並填寫資料
      </h4>

      <div class="row">
        <div class="col-md-6 my-3 justify-content-center">
          <h5 class="my-3 text-success">購物車內容</h5>
          <table class="pc table table-striped table-bordered text-dark mt-4">
            <thead class="thead">
              <th width="380">品名</th>
              <th width="150">數量</th>
              <th width="200">單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">
                  <del v-if="cart.final_total !== cart.total">
                    {{
                    item.total | numFormat | dollarSign
                    }}
                  </del>
                  <template v-else>
                    {{
                    item.total | numFormat | dollarSign
                    }}
                  </template>
                  <div class="text-success" v-if="cart.final_total !== cart.total">
                    折扣後
                    {{ item.final_total | numFormat | dollarSign }}
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ cart.total | numFormat | dollarSign }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="2" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total | numFormat | dollarSign }}</td>
              </tr>
            </tfoot>
          </table>
          <table class="mobile table table-striped table-bordered text-dark mt-4">
            <thead class="thead">
              <th width="380">品名及數量</th>
              <th width="100">單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  {{ item.product.title }}×
                  {{ item.qty }}
                  <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
                </td>
                <td class="align-middle text-right">
                  <del v-if="cart.final_total !== cart.total">
                    {{
                    item.total | numFormat | dollarSign
                    }}
                  </del>
                  <template v-else>
                    {{
                    item.total | numFormat | dollarSign
                    }}
                  </template>
                  <div class="text-success" v-if="cart.final_total !== cart.total">
                    折扣後
                    {{ item.final_total | numFormat | dollarSign }}
                  </div>
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
          <button
            class="btn btn-outline-danger w-100 my-3"
            @click="$router.push('/cart')"
          >回購物車頁面修改訂單</button>
        </div>
        <div class="mobile">
          <hr />
        </div>
        <div class="col-md-6 border-left my-3" v-if="cart.total !== 0">
          <h5 class="mt-3 mb-0 text-success">請填寫收件資料</h5>
          <p class="text-danger my-2">* 為必填項目</p>
          <div class="row justify-content-center">
            <form class="col-md-12 mb-4 text-dark text-left" @submit.prevent="addOrder">
              <div class="form-group">
                <label for="useremail">
                  信箱
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="useremail"
                  v-model="form.user.email"
                  placeholder="請輸入 Email"
                  v-validate="'required|email'"
                  :class="{ 'is-invalid': errors.has('email') }"
                />
                <span class="text-danger" v-if="errors.has('email')">
                  {{
                  errors.first("email")
                  }}
                </span>
              </div>
              <div class="form-row">
                <div class="form-group col-md-5">
                  <label for="username">
                    姓名
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="username"
                    v-model="form.user.name"
                    placeholder="請輸入姓名"
                    v-validate="'required|min:2'"
                    :class="{ 'is-invalid': errors.has('name') }"
                  />
                  <span class="text-danger" v-if="errors.has('name')">
                    {{
                    errors.first("name")
                    }}
                  </span>
                </div>
                <div class="form-group col-md-7">
                  <label for="usertel">
                    聯絡電話
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    class="form-control"
                    id="usertel"
                    v-model="form.user.tel"
                    placeholder="請輸入電話"
                    v-validate="'required|mobile'"
                    name="mobile"
                    :class="{ 'is-invalid': errors.has('mobile') }"
                  />
                  <span class="text-danger" v-if="errors.has('mobile')">
                    {{
                    errors.first("mobile")
                    }}
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="useraddress">
                  寄件地址
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  id="useraddress"
                  v-model="form.user.address"
                  placeholder="請輸入地址(城市、街道、巷、樓層等)"
                  v-validate="'required|min:6'"
                  :class="{ 'is-invalid': errors.has('address') }"
                />
                <span class="text-danger" v-if="errors.has('address')">
                  {{
                  errors.first("address")
                  }}
                </span>
              </div>

              <div class="form-group">
                <label for="comment">給賣家的話(選填)</label>
                <textarea
                  name="message"
                  id="comment"
                  class="form-control"
                  cols="30"
                  rows="5"
                  placeholder="商品備註"
                  v-model="form.message"
                ></textarea>
              </div>
              <div class="text-right">
                <button class="btn mt-3 btn-danger">資料送出</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-12" v-if="cart.total === 0">
        <h4 class="my-5">
          您的訂單目前沒有任何商品，請回
          <a href="/" class="text-danger">商品列表</a>
          選購。
        </h4>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Alert from "../messageAlert";

export default {
  data() {
    return {
      isLoading: false,
      cart: [],
      order: {},
      orderId: "",
      form: {
        user: {
          address: "",
          email: "",
          name: "",
          tel: "",
        },
        message: "",
      },
    };
  },
  components: { Alert },
  methods: {
    addOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/order`;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: vm.form }).then((res) => {
            if (res.data.success) {
              vm.$router.push(`/checkout/${res.data.orderId}`);
              vm.$bus.$emit("message:push", res.data.message, "success");
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
        } else {
          vm.$bus.$emit("message:push", "欄位不完整", "danger");
        }
        vm.getCart();
        vm.isLoading = false;
      });
    },
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
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
