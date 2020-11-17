<template>
  <div>
    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-spin-ur5grgaunp">
        <div class="ldio-dwsbgiuamos">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </loading>
    <div class="pc mt-5">
      <!-- products list -->
      <div class="float-left">
        <h4 class="mt-3 font-weight-bold">
          <i class="fa fa-th" aria-hidden="true"></i>
          商品列表
        </h4>
      </div>
      <div class="float-right" v-if="cart.total !== 0">
        <a href="#cart-list-pc" class="btn font-weight-bold btn-secondary mt-2 mb-3">前往購物車清單</a>
      </div>
    </div>

    <div class="mobile">
      <!-- products list -->
      <div class="float-left">
        <h5 class="mt-3 font-weight-bold">商品列表</h5>
      </div>
    </div>
    <!-- product list -->
    <Cards
      :products="products"
      @getProducts="getProducts"
      @getOneProduct="getOneProduct"
      @addCart="addCart"
    ></Cards>

    <!-- Product detail Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-dark" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="img-fluid" alt :src="product.imageUrl || product.image" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option v-for="num in 10" :key="num" :value="num">選購 {{ num }} {{ product.unit }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addCart(product.id, product.num)"
            >加入購物車</button>
          </div>
        </div>
      </div>
      <hr />
    </div>

    <!-- cart list -->
    <div id="cart-list-pc" class="my-5 pc py-5" v-if="cart.total !== 0">
      <div class="float-left">
        <h4 class="my-3">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單
        </h4>
      </div>
      <table class="table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th width="80">操作</th>
          <th>品名</th>
          <th width="200">數量</th>
          <th width="200">單價</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="cart.final_total !== cart.total">已套用優惠券</div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total | numFormat | dollarSign }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total | numFormat | dollarSign }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total | numFormat | dollarSign }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm col-4 float-right pr-0">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode" />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="addCoupon">套用優惠碼</button>
        </div>
      </div>
    </div>

    <div id="cart-list-mobile" class="mobile" v-if="cart.total > 0">
      <h5>
        <i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單
      </h5>
      <table class="table table-striped table-bordered text-dark mt-4">
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
                  class="text-info"
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
          placeholder="請輸入優惠碼"
          v-model="couponCode"
        />
      </div>
      <div class="input-group row input-group-sm mx-0 mb-2">
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
    </div>

    <!-- 寄件資料 -->
    <div v-if="cart.total !== 0">
      <div>
        <div class="d-flex">
          <h4 class="my-3">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
            填寫收件人
            <span class="text-danger my-2">* 為必填項目</span>
          </h4>
        </div>
      </div>
      <div class="row justify-content-center">
        <form class="col-md-6 my-4 text-dark" @submit.prevent="addOrder">
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

          <div class="form-group">
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
              placeholder="輸入姓名"
              v-validate="'required|min:3'"
              :class="{ 'is-invalid': errors.has('name') }"
            />
            <span class="text-danger" v-if="errors.has('name')">
              {{
              errors.first("name")
              }}
            </span>
          </div>

          <div class="form-group">
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
              placeholder="請輸入地址"
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
            <label for="comment">留言</label>
            <textarea
              name="message"
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-success">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Cards from "../Cards";

export default {
  data() {
    return {
      products: [],
      isLoading: false,
      product: {},
      status: {
        loadingItem: "",
      },
      cart: [],
      couponCode: "",
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
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.products = res.data.products;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    getOneProduct(id) {
      const vm = this;
      vm.isLoading = true;
      vm.status.loadingItem = id;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.product = res.data.product;
          vm.product.num = 1;
          $("#productModal").modal("show");
          vm.isLoading = false;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.status.loadingItem = "";
      });
    },
    addCart(id, num = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
          $("#productModal").modal("hide");
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
        $("#productModal").modal("hide");
        vm.isLoading = false;
      });
    },
    delCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart/${id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit("message:push", res.data.message, "success");
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
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.getCart();
        vm.isLoading = false;
        vm.couponCode = "";
      });
    },
    addOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/order`;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: vm.form }).then((res) => {
            if (res.data.success) {
              vm.$router.push(`/test/test_checkout/${res.data.orderId}`);
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
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  components: {
    Cards,
  },
};
</script>

<style lang="">
.mobile {
  display: none;
}
@media screen and (max-width: 420px) {
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
}
</style>