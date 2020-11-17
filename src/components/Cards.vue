<template>
  <div>
    <div class="row d-inline-flex text-dark">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{
              backgroundImage: `url(${item.imageUrl || item.image})`,
            }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getOneProduct(item.id)"
            >
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addCart(item.id)"
            >
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // 這個 pages = Admin.vue > pagination 變數
  props: ["products"],
  methods: {
    getProducts() {
      // event = Admin.vue > @event
      // @event 在 Admon.vue 指向 getProducts
      this.$emit("getProducts");
    },
    getOneProduct(id) {
      this.$emit("getOneProduct", id);
    },
    addCart(id) {
      this.$emit("addCart", id);
    },
  },
  created() {
    this.$emit("getProducts");
  },
};
</script>