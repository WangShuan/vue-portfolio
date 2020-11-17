<template>
  <div v-if="order.id">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <div class="container text-dark">
      <div class="my-3">
        <h4 class="my-3">結帳</h4>
        <form class="row justify-content-md-center" @submit.prevent="payOrder(times)">
          <div class="col-md-8">
            <div class="border p-2">
              <div class="row my-3 text-danger">
                <div class="col-4">1.確認收件資料</div>
                <div class="col-4">2.選擇付款方式</div>
                <div class="col-4">3.完成</div>
              </div>
              <div class="progress mx-5">
                <div class="progress-bar" :class="step"></div>
              </div>
              <div v-if="times==1" class="my-3">
                <h5 class="my-3">收件人資料</h5>
                <div class="border p-3 mx-5">
                  <table class="table text-dark m-0">
                    <tbody>
                      <tr>
                        <th class="border-0" width="120">Email :</th>
                        <td class="border-0" width>{{ order.user.email }}</td>
                      </tr>
                      <tr>
                        <th>姓名 :</th>
                        <td>{{ order.user.name }}</td>
                      </tr>
                      <tr>
                        <th>收件人電話 :</th>
                        <td>{{ order.user.tel }}</td>
                      </tr>
                      <tr>
                        <th>收件人地址 :</th>
                        <td>{{ order.user.address }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else-if="times==2" class="my-3">
                <h5 class="my-3">付款方式</h5>
                <div class="border p-3 mx-5">
                  <div class="my-3">
                    <div class="custom-control custom-radio">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required
                        v-model="paymethods"
                        checked
                        value="1"
                      />
                      <label class="custom-control-label" for="credit">信用卡</label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        id="transfer"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required
                        v-model="paymethods"
                        value="2"
                      />
                      <label class="custom-control-label" for="transfer">銀行轉帳</label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        id="getandpay"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required
                        value="3"
                        v-model="paymethods"
                      />
                      <label class="custom-control-label" for="getandpay">取貨付款</label>
                    </div>
                  </div>
                  <div class="credit">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="cc-name">持卡人姓名</label>
                        <input type="text" class="form-control" id="cc-name" required value="王小明" />
                        <small class="text-warning">請輸入真實持卡人姓名</small>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="cc-number">信用卡號</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-number"
                          required
                          value="5373 8172 9406 5052"
                        />
                        <small class="text-warning">請輸入十六碼信用卡卡號</small>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 mb-3">
                        <label for="cc-expiration">有效年/月</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-expiration"
                          value="12/29"
                          required
                        />
                        <small class="text-warning">格式 MM/YY</small>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="cc-expiration">安全碼</label>
                        <input type="text" class="form-control" id="cc-cvv" value="520" required />
                        <small class="text-warning">信用卡背面末三碼</small>
                      </div>
                    </div>
                  </div>
                  <div class="bank" :class="{'d-none':paymethods==1}">
                    <p class="my-3">ATM 轉帳繳款資料如下</p>
                    <table class="table table-striped table-bordered text-dark">
                      <tbody>
                        <tr>
                          <th>◆ 銀行名稱：</th>
                          <td>012 台北富邦銀行</td>
                        </tr>
                        <tr>
                          <th>◆ 戶 名：</th>
                          <td>遊戲天堂股份有限公司</td>
                        </tr>
                        <tr>
                          <th>◆ 帳 號：</th>
                          <td>321-123-01234-0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="my-3 down" :class="{'d-none':times!==3}">
                <h3 class="my-4 text-info">結帳成功</h3>
                <table class="table text-dark m-0">
                  <tbody>
                    <tr>
                      <th>姓名 :</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話 :</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址 :</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th>付款方式 :</th>
                      <td v-if="paymethods==1">信用卡結帳</td>
                      <td v-else-if="paymethods==2">ATM 匯款</td>
                      <td v-else-if="paymethods==3">貨到付款</td>
                    </tr>
                    <tr>
                      <th>付款狀態 :</th>
                      <td class="text-danger" v-if="paymethods==1&&order.is_paid">信用卡付款成功</td>
                      <td class="text-danger" v-else-if="paymethods==2&&order.is_paid">匯款成功</td>
                      <td class="text-danger" v-else-if="paymethods==3&&order.is_paid">已選擇貨到付款</td>
                      <td class="text-danger" v-if="order.is_paid==false">等待付款中</td>
                    </tr>
                  </tbody>
                </table>
                <button class="btn btn-success my-3" @click="$router.push('/')">繼續逛逛</button>
              </div>
              <button v-if="times!==3" class="btn btn-danger my-3">下一步</button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border p-3 mb-3">
              <h5 class="my-4 text-primary">
                <i class="fa fa-pencil" aria-hidden="true"></i> 訂單摘要
              </h5>
              <h6>
                <div class="float-left">小計：</div>
                <div class="float-right">NT$ {{order.total | numFormat}}</div>
              </h6>
              <h4 class="mt-5 border-top py-3" :class="{'h5': order.final_total !== order.total}">
                <div class="float-left">總計</div>
                <div class="float-right">NT$ {{ order.total | numFormat }}</div>
              </h4>
              <h3 v-if="times==3&&order.is_paid" class="bg-dark text-light p-2 my-3">已完成付款～</h3>
            </div>
            <div class="border p-3">
              <h5 class="my-3">購物車內容</h5>
              <table class="table table-striped table-bordered text-dark">
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }} * {{ item.qty }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      order: {},
      orderId: "",
      isLoading: false,
      step: {
        "w-50": false,
        "w-100": false,
      },
      times: 1,
      paymethods: 1,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/order/${vm.orderId}`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.order = res.data.order;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    payOrder(times) {
      const vm = this;
      vm.isLoading = true;
      vm.times++;
      if (times == 1) {
        vm.step["w-50"] = true;
      } else if (times == 2) {
        vm.step["w-100"] = true;
        const api = `${process.env.APIPATH}api/${process.env.MYPATH}/pay/${vm.orderId}`;
        this.$http.post(api).then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
            vm.getOrder();
            $(".down").show();
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
      }
      vm.isLoading = false;
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
  watch: {
    paymethods: function () {
      const vm = this;
      if (vm.paymethods == 1) {
        $(".credit").show();
        $(".bank").hide();
      } else if (vm.paymethods == 2) {
        $(".bank").show();
        $(".credit").hide();
      } else if (vm.paymethods == 3) {
        $(".bank").hide();
        $(".credit").hide();
      }
    },
  },
};
</script>

