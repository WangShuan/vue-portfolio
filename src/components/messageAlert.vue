<template>
  <div>
    <div class="message-alert">
      <div
        class="alert alert-dismissible"
        :class="'alert-' + item.status"
        v-for="(item, i) in messages"
        :key="i"
      >
        {{ item.message }}
        <button
          type="button"
          class="close"
          @click="removeMessage(i)"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div v-if="this.$route.path.indexOf('admin')==-1">
      <router-link v-if="this.$route.path.indexOf('test')==-1" to="/cart">
        <div class="cart" :class="{b50:screenWidth<500}">
          <span class="badge cart-badge badge-danger">{{cart.num}}</span>
          <i class="fa text-secondary fa-shopping-cart" aria-hidden="true"></i>
          <h6 class="mt-2" :class="{'d-none':screenWidth<500}">
            前往
            <br />購物車
          </h6>
        </div>
      </router-link>
      <a href="#cart-list-mobile" class="mobile" v-if="this.$route.path.indexOf('test_order')!==-1">
        <div class="cart">
          <i class="fa text-secondary fa-shopping-cart" aria-hidden="true"></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      messages: [],
      cart: { num: 0 },
      screenWidth: document.documentElement.clientWidth,
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.cart.num = res.data.data.carts.length;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
  },
  created() {
    const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on("message:push", (message, status = "warning") => {
      vm.getCart();
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style lang="scss" scope>
.message-alert {
  position: fixed;
  max-width: 80%;
  top: 56px;
  right: 10px;
  z-index: 1100;
}

.cart {
  background-color: #f6f9fc;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  right: 30px;
  position: fixed;
  z-index: 99999;
  bottom: 80px;
  box-shadow: 2px 2px 5px #232c38;
  &:hover {
    background-color: #d5edfd;
  }
  &-badge {
    position: absolute;
    top: 3px;
    right: 3px;
  }
  & i {
    font-size: 25px;
    line-height: 50px;
  }
  & h6 {
    color: #f6f9fc;
    text-shadow: 1px 1px 3px #232c38;
  }
}

.b50 {
  bottom: 50px !important;
}
</style>