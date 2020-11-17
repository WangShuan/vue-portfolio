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
      <div class="float-left">
        <h4 class="my-3 font-weight-bold">
          <i aria-hidden="true" class="fa fa-list-ol"></i>
          訂單管理
        </h4>
      </div>
      <table class="table table-striped table-bordered mt-4 text-dark">
        <thead>
          <tr>
            <th scope="col" width="180">訂單編號</th>
            <th scope="col" width="120">成立時間</th>
            <th scope="col" width="180">用戶信箱</th>
            <th scope="col">購買款項</th>
            <th scope="col" width="100">應付金額</th>
            <th scope="col" width="100">付款狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.id }}</td>
            <td scope="row">{{ new Date(item.create_at * 1000).toLocaleDateString() }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <div
                v-for="product in item.products"
                :key="product.id"
                class="text-left"
              >{{product.product.title}} × {{product.qty}}</div>
            </td>
            <td class="text-right">{{ item.total | numFormat | dollarSign }}</td>
            <td class="font-weight-bold">
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mobile">
      <div class="float-left">
        <h5 class="mb-3 font-weight-bold">訂單管理</h5>
      </div>
      <table class="table table-striped table-bordered text-dark">
        <thead>
          <tr>
            <th scope="col">訂單編號 - 點擊複製</th>
            <th scope="col" width="90">付款狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>
              <input class="input" type="text" :value="item.id" @click="copy" />
            </td>
            <td class>
              <span v-if="item.is_paid" class="text-success">
                已付款
                <br />
                {{ item.total | numFormat | dollarSign }}
              </span>
              <span v-else class="text-danger">
                未付款
                <br />
                {{ item.total | numFormat | dollarSign }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pages="pagination" @event="getOrders"></Pagination>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/admin/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.orders = res.data.orders;
          vm.pagination = res.data.pagination;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    copy(e) {
      e.currentTarget.select();
      document.execCommand("Copy");
      this.$bus.$emit("message:push", "複製成功", "success");
    },
  },
  created() {
    this.getOrders();
  },
  components: {
    Pagination,
  },
};
</script>

<style lang="">
.mobile {
  display: none;
}
.input {
  border: 0;
  background: transparent;
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