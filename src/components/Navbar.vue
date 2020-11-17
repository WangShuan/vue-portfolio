<template>
  <div>
    <loading :active.sync="isLoading">
      <h4>登出中 請稍候...</h4>
    </loading>

    <nav class="navbar pc navbar-dark fixed-top bg-primary flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-sm-3 text-white col-md-2 mr-0 font-weight-bold" to="/">
        <i class="fa fa-gamepad" aria-hidden="true"></i>
        遊戲天堂後台管理
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link text-light font-weight-bold" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>

    <div class="mobile">
      <div class="navbar navbar-light bg-light shadow-sm">
        <div class="container d-flex justify-content-between p-0">
          <h5 class="m-0 p-0">
            <a class="float-left text-secondary mt-2" href="#" @click.prevent="$router.push('/')">
              <i class="fa fa-gamepad" aria-hidden="true"></i>
              遊戲天堂後台管理
            </a>
          </h5>
          <div class="bg-light" id="navbarHeader">
            <div class="float-right">
              <ul class="list-unstyled align-center m-0">
                <li>
                  <div class="btn-group dropleft">
                    <a
                      class="text-primary"
                      data-toggle="dropdown"
                      data-display="static"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-caret-left text-warning" aria-hidden="true"></i>
                      選單
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg-left">
                      <router-link
                        :class="{ active: $route.path == '/login' }"
                        class="dropdown-item"
                        to="/admin/products"
                      >產品管理</router-link>
                      <router-link
                        :class="{ active: $route.path == '/login' }"
                        class="dropdown-item"
                        to="/admin/orders"
                      >訂單管理</router-link>
                      <router-link
                        :class="{ active: $route.path == '/login' }"
                        class="dropdown-item"
                        to="/admin/coupons"
                      >優惠碼管理</router-link>
                      <router-link
                        :class="{ active: $route.path == '/login' }"
                        class="dropdown-item"
                        to="/test/test_orders"
                      >模擬訂單功能</router-link>
                      <a class="dropdown-item" @click.prevent="signout">登出</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    signout() {
      this.isLoading = true;
      const api = process.env.APIPATH + "logout";
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          this.$router.push("/login");
        } else {
          this.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
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