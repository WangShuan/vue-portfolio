<template>
  <div class="container text-dark">
    <div class="pc mb-5">
      <h3 class="py-4 border-bottom">優惠券專區</h3>
      <i>
        <h4 class="pt-3 text-danger">新客優惠</h4>
      </i>
      <div class="col-md-4 my-4 sawtooth p-2 bg-warning">
        <div class="float-left pt-2 sawtooth-big">
          <h1 class="m-0 mb-2">
            88
            <small>折</small>
          </h1>
          <button class="btn rounded px-1 py-0 btn-sm btn-danger" @focus="copyBtn('new88')">點擊領取</button>
          <input type="text" class="mt-5 text-center input-bg" id="new88" value="new88" />
        </div>
        <div class="float-right pt-3 border-left sawtooth-content">
          <h5 class="text-secondary">新客專屬優惠碼</h5>
          <p class="text-dark">
            全館不限金額皆可使用
            <br />無使用期限 - 限首購
          </p>
        </div>
        <div class="bg-icon">
          <i aria-hidden="true" class="icon-big">🎁</i>
        </div>
      </div>
      <i>
        <h4 class="pt-3 text-danger">其他優惠</h4>
      </i>
      <div class="row">
        <div class="col-md-4 my-4 sawtooth p-2" v-for="item in coupons" :key="item.id">
          <div class="float-left pt-2 sawtooth-big">
            <h1 class="m-0 mb-2">
              {{ item.percent }}
              <small>折</small>
            </h1>
            <button class="btn rounded px-1 py-0 btn-sm btn-danger" @focus="copyBtn(item.code)">點擊領取</button>
            <input type="text" class="mt-5 text-center input-bg" :id="item.code" :value="item.code" />
          </div>
          <div class="float-right pt-3 border-left sawtooth-content">
            <h5 class="text-secondary">{{item.title}}</h5>
            <p class="text-dark">
              全館不限金額皆享優惠
              <br />使用期限至
              <u class="text-dark">{{ new Date(item.due_date).toLocaleDateString() }}</u>
            </p>
          </div>
          <div class="bg-icon">
            <i aria-hidden="true" class="icon-big">🎊</i>
          </div>
        </div>
      </div>
    </div>
    <div class="m-3 mobile">
      <h5 class="my-3">優惠券專區</h5>
      <div>
        <div class="card mb-5 bg-white">
          <div class="card-body index">
            <h5 class="card-title h6 text-success">新客加碼送！</h5>
            <hr />
            <p class="card-text text-dark">
              全館不限金額享
              <span class="text-danger font-width-bolder">88 折</span>
              優惠
              <br />無使用期限
              <br />
              <br />
              <span class="text-primary">立即點擊複製下方優惠碼並在結帳時使用</span>
            </p>
            <input type="text" class="text-center input-bg" value="new888" @focus="copy" />
          </div>
          <div class="bg-icon text-success">
            <i aria-hidden="true" class="fa icon-big fa-ticket"></i>
          </div>
        </div>
      </div>
      <div v-for="item in coupons" :key="item.id">
        <div class="card mb-5 border-0 bg-light">
          <div class="card-body index">
            <h5 class="card-title h6 text-success">{{ item.title }}</h5>
            <hr />
            <p class="card-text text-dark">
              全館不限金額享
              <span class="text-danger font-width-bolder">{{ item.percent }} 折</span>
              優惠
              <br />
              使用期限至 {{ item.due_date }}
              <br />
              <br />
              <span class="text-primary">立即點擊複製下方優惠碼並在結帳時使用</span>
            </p>
            <input type="text" class="text-center input-bg" @focus="copy" v-model="item.code" />
          </div>
          <div class="bg-icon text-success">
            <i aria-hidden="true" class="fa icon-big fa-ticket"></i>
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
      coupons: [],
    };
  },
  methods: {
    copy(e) {
      e.currentTarget.select();
      document.execCommand("Copy");
      this.$bus.$emit("message:push", "複製成功", "success");
    },
    copyBtn(className) {
      let ipt = document.getElementById(className);
      ipt.select();
      document.execCommand("copy");
      this.$bus.$emit("message:push", "複製成功", "success");
    },
  },
  created() {
    this.coupons = [
      {
        code: "GAMESKY9",
        due_date: 1631750400000,
        num: 1,
        percent: 90,
        title: "週年慶全館九折優惠券",
      },
      {
        code: "8YEARS8",
        due_date: 1665878400000,
        id: 2,
        percent: 80,
        title: "遊戲天堂八週年優惠券",
      },
      {
        code: "LOVEYOUTHX75",
        due_date: 1613865600000,
        id: 3,
        percent: 75,
        title: "佛心優惠券限時搶購",
      },
    ];
  },
};
</script>

<style lang="scss" scoped>
.sawtooth {
  position: relative;
  overflow: hidden;
  background-color: #a7d0f7;
  max-width: 365px;
  margin: auto;
  &-big {
    width: 35%;
    max-height: 90px;
    & > h1 {
      color: #c92104;
      text-shadow: 2px 0 0 rgb(124, 119, 119);
    }
  }
  &-content {
    width: 65%;
  }
}

.sawtooth:before,
.sawtooth:after {
  content: " ";
  width: 0;
  height: 100%;
  /* 绝对定位进行偏移 */
  position: absolute;
  top: 10px;
}

.sawtooth:before {
  border-right: 10px dotted white;
  left: -5px;
}

.sawtooth:after {
  border-left: 10px dotted white;
  right: -5px;
}

.card {
  overflow: hidden;
  position: relative;
  border-radius: 0% 0% 50% 50% / 0% 0% 15% 5%;
  box-shadow: 10px 10px rgba(0, 0, 0, 0.15);
}

.index {
  z-index: 1;
}

.bg-icon {
  opacity: 0.25;
  position: absolute;
  right: -5px;
  z-index: 0;
}

.icon-big {
  font-size: 100px;
}
.input-bg {
  background: transparent;
  font-size: 1.5em;
  width: 180px;
  padding: 0;
  border: 0;
  color: #043668;
  font-weight: bolder;
}

.copy-bg {
  border: #043668 2px dashed;
  cursor: pointer;
  border-radius: 3px;
  width: 230px;
  margin: 10px auto;
}

.copy-bg:hover {
  background-color: #2e6290;
  border-color: azure;
  color: azure;
}

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