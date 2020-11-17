<template>
  <div>
    <div class="container-fluid">
      <Navbar></Navbar>
      <Alert></Alert>
      <div class="row mt-3">
        <Sidebar></Sidebar>
        <main role="main" class="mt-1 col-md-9 ml-sm-auto col-lg-10 px-4 pt-0">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Alert from "./messageAlert";

export default {
  components: {
    Sidebar,
    Navbar,
    Alert,
  },
  created() {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>

<style lang="">
@media screen and (max-width: 420px) {
  .container-fluid {
    padding: 0;
    max-width: 100vw;
    overflow: hidden;
  }
}
</style>