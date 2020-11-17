<template>
  <div>
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <Alert></Alert>

    <header class="navbar pc navbar-expand-lg navbar-light bg-light">
      <router-link class="h4 mt-2" to="/">
        <i class="fa fa-gamepad" aria-hidden="true"></i>
        遊戲天堂
      </router-link>

      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav h6">
          <li class="nav-item">
            <router-link class="text-primary nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="text-primary nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="text-primary nav-link" to="/products/all">產品列表</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="text-primary nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >用戶選單</a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/cart">
                <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>購物車頁面
              </router-link>
              <router-link class="dropdown-item" to="/coupon">
                <i class="fa fa-ticket mr-2" aria-hidden="true"></i>優惠券專區
              </router-link>
              <router-link class="dropdown-item" to="/like">
                <i class="fa fa-heart mr-2" aria-hidden="true"></i>喜好的項目
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/login">
                <i class="mr-2 fa fa-sign-in" aria-hidden="true"></i>管理員登入
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </header>

    <header class="navbar mobile-header mobile navbar-expand-lg navbar-light bg-light">
      <router-link class="h4 float-left mt-2" to="/">
        <i class="fa fa-gamepad" aria-hidden="true"></i>
        遊戲天堂
      </router-link>

      <div class="float-right" id="navbarSupportedContent">
        <a
          class="text-primary dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >用戶選單</a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <router-link class="dropdown-item" to="/">
            <i class="fa fa-home mr-2" aria-hidden="true"></i>首頁
          </router-link>
          <router-link class="dropdown-item" to="/about">
            <i class="fa fa-info-circle mr-2" aria-hidden="true"></i>關於我們
          </router-link>
          <router-link class="dropdown-item" to="/products/all">
            <i class="fa fa-list mr-2" aria-hidden="true"></i>產品列表
          </router-link>
          <router-link class="dropdown-item" to="/cart">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>購物車
          </router-link>
          <router-link class="dropdown-item" to="/coupon">
            <i class="fa fa-ticket mr-2" aria-hidden="true"></i>優惠券專區
          </router-link>
          <router-link class="dropdown-item" to="/like">
            <i class="fa fa-heart mr-2" aria-hidden="true"></i>喜好項目
          </router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" to="/login">
            <i class="mr-2 fa fa-sign-in" aria-hidden="true"></i>管理員登入
          </router-link>
        </div>
      </div>
    </header>

    <router-view
      class="main-content text-primary"
      v-if="this.$route.path!=='/'"
      :key="this.$route.fullPath"
    ></router-view>

    <div class="main-content" v-else>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1500995617113-cf789362a3e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
              class="d-block w-100"
            />
            <div class="carousel-caption pc d-none d-lg-block bg-light text-dark">
              <h2>遊戲天堂就是你最好的朋友❤️</h2>
              <p class="h4">除了購買遊戲產品外，依照結帳金額還有不同的驚喜唷！</p>
            </div>
            <button @click="$router.push('/products/all')" class="pc carousel-btn text-mydark">
              搶購去
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>
            <div class="carousel-caption mobile bg-light text-dark">
              <h3>遊戲天堂就是你最好的朋友❤️</h3>
              <p class="h5">除了購買遊戲產品外，依照結帳金額還有不同的驚喜唷！</p>
              <button @click="$router.push('/products/all')" class="carousel-btn text-dark">
                搶購去
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1601987177651-8edfe6c20009?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              class="d-block w-100"
            />
            <div class="carousel-caption pc d-none d-lg-block bg-dark text-warning">
              <h3>遊戲天堂熱賣中 - 益智積木🌟</h3>
              <p class="lead">疊疊樂、七巧板、孔明鎖，增進親子感情就靠它們！快來買！</p>
            </div>
            <button @click="$router.push('/products/block')" class="pc carousel-btn text-warning">
              搶購去
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>
            <div class="carousel-caption mobile bg-dark text-warning">
              <h3>遊戲天堂熱賣中 - 益智積木🌟</h3>
              <p class="h5">疊疊樂、七巧板、孔明鎖，增進親子感情就靠它們！快來買！</p>
              <button @click="$router.push('/products/block')" class="carousel-btn text-warning">
                搶購去
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
              class="img-fluid"
            />
            <div class="carousel-caption pc d-none d-lg-block bg-danger text-light">
              <h3>遊戲天堂搶手貨 - 西洋棋♟</h3>
              <p class="lead">海外空運來台，走過路過千萬不要錯過！還不趕緊去看看！</p>
            </div>
            <button @click="$router.push('/products/chess')" class="pc carousel-btn text-light">
              搶購去
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </button>
            <div class="carousel-caption mobile bg-danger text-light">
              <h3>遊戲天堂搶手貨 - 西洋棋♟</h3>
              <p class="h5">海外空運來台，走過路過千萬不要錯過！還不趕緊去看看！</p>
              <button @click="$router.push('/products/chess')" class="carousel-btn text-light">
                搶購去
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <div class="seemore">
            <h3 class="mt-3">See More</h3>
            <i class="fa fa-arrow-down fa-3x"></i>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="introduction my-5">
          <h3 class="my-4 text-primary">⁂ 主要服務項目</h3>
          <div class="row text-success">
            <div class="col-lg-4 car">
              <i class="display-3 p-2 fa fa-truck" aria-hidden="true" />
              <h2>快速出貨機制</h2>
              <p class="lead">
                當天下訂立即出貨！全店所有商品提供
                <b class="text-danger">十二小時</b>內到貨服務！快讓遊戲天堂用最快速的服務把你寵壞
              </p>
            </div>
            <div class="col-lg-4 border-left border-right key">
              <i class="display-3 fa fa-key p-2" aria-hidden="true" />
              <h2>完善的安全機制</h2>
              <p class="lead">
                遊戲天堂採用全世界最先進的
                <b class="text-danger">SSL傳輸加密</b>機制，讓您能夠絕對安全安心地享受網上購物的樂趣
              </p>
            </div>
            <div class="col-lg-4 hand">
              <i class="display-3 fa fa-thumbs-o-up p-2" aria-hidden="true" />
              <h2>簡單上手的設計</h2>
              <p class="lead">
                <b class="text-danger">一目瞭然</b>的排版、分頁，讓您輕鬆知道如何購買、如何結帳，就連第一次瀏覽也不用怕找不到下單方式
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="news pc my-5">
          <h3 class="my-4 text-primary">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            最新消息
          </h3>
          <div class="row mt-5">
            <div class="col-md-7">
              <h2 class="text-primary mt-2">
                遊戲天堂八週年慶
                <span class="text-info">全館八折優惠！</span>
              </h2>
              <div class="coupon">
                <div class="border coupon-bg bg-light pt-2"></div>
                <div class="coupon-text">
                  <h5 class="mb-0">
                    新客戶加碼送！
                    <br />
                    <span>點擊複製</span> ☞
                    <input class="h3 text-danger copy" type="text" @focus="copy" value="new888" />
                  </h5>
                  <h5>不限金額結帳即享88折優惠</h5>
                </div>
              </div>
              <p class="lead text-success" style="line-height:40px">
                轉眼間 2020 年了，您的孩子長大了，您也成熟了，而我們，也老了！感謝這一路上多年來所有不管是新客舊客的支持與陪伴！在此宣佈！
                <b
                  class="text-danger"
                >『遊戲天堂』八歲囉！！！</b>就讓我們一同歡慶這個美好的節日！感恩回饋不打烊 - 八週年全館
                <u class="text-danger">八折活動不限期</u> 直接送給您！讓您買到手軟停不下來！今年也讓我們用破盤價寵壞您吧😊
              </p>
            </div>
            <div class="col-md-5">
              <img
                src="https://fs1.shop123.com.tw/300095/upload/product/3000955246pic_outside_9f7343369470.jpg"
                alt
                class="img-fluid"
              />
            </div>
          </div>
        </div>
        <div class="news mobile my-5">
          <h3 class="my-4 text-primary">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            最新消息
          </h3>
          <div class="mt-5">
            <h2 class="text-primary">
              遊戲天堂八週年慶
              <p class="text-dark">全館八折優惠！</p>
            </h2>
            <img
              src="https://fs1.shop123.com.tw/300095/upload/product/3000955246pic_outside_9f7343369470.jpg"
              alt
              class="img-fluid mt-2 mb-4"
            />
            <button
              type="button"
              class="btn mb-4 btn-outline-danger"
              data-toggle="modal"
              data-target="#couponModal"
            >週年慶新客戶加碼送！</button>

            <div
              class="modal fade"
              id="couponModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="couponModalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog text-primary modal-dialog-centered" role="document">
                <div class="modal-content bg-light">
                  <div class="modal-header">
                    <h5 class="modal-title" id="couponModalTitle">88折優惠碼！</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h5 class="mb-0">
                      <span>點擊複製</span> ☞
                      <input class="h3 text-danger copy" type="text" @focus="copy" value="new888" />
                    </h5>
                    <h5>不限金額結帳即享88折優惠</h5>
                  </div>
                </div>
              </div>
            </div>
            <p class="lead text-success">
              轉眼間 2020 年了，您的孩子長大了，您也成熟了，而我們，也老了！感謝這一路上多年來所有不管是新客舊客的支持與陪伴！在此宣佈！
              <b
                class="text-danger"
              >『遊戲天堂』八歲囉！！！</b>就讓我們一同歡慶這個美好的節日！感恩回饋不打烊 - 八週年全館
              <u class="text-danger">八折活動不限期</u> 直接送給您！讓您買到手軟停不下來！今年也讓我們用破盤價寵壞您吧😊
            </p>
          </div>
        </div>
        <hr />
        <div class="randomproducts my-5">
          <h3 class="my-4 text-primary">⚄ 隨機推薦</h3>
          <div class="row text-dark">
            <div class="col-md-3 mb-4" v-for="item in randoms" :key="item.id">
              <div class="card border-0 shadow-sm">
                <div
                  style="
              height: 200px;
              background-size: cover;
              background-position: center;
            "
                  :style="{backgroundImage: `url(${item.imageUrl || item.image})`}"
                ></div>
                <div class="card-body">
                  <h5 class="card-title">
                    <router-link :to="`/product/${item.id}`" class="text-dark">{{ item.title }}</router-link>
                    <br />
                    <small>
                      <span class="badge badge-dark p-1">{{item.category}}</span>
                    </small>
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div>
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="text-muted" v-if="item.price">原價 {{ item.origin_price }} 元</del>

                    <div class="h5 text-danger" v-if="item.price">現在只要 {{ item.price }} 元</div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="$router.push(`/product/${item.id}`)"
                  >查看更多</button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addCart(item.id)"
                  >加到購物車</button>
                </div>
              </div>
            </div>
          </div>
          <span class="text-secondary px-2">
            不喜歡?
            <a class="text-danger" href="#" @click.prevent="randomProducts">點我</a>換一組試試😊
          </span>
        </div>
      </div>
    </div>
    <footer class="navbar navbar-light bg-light text-dark">
      <div class="w-100 my-2">
        聯絡我們:
        <ul class="nav justify-content-center mb-2">
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-facebook-official" aria-hidden="true"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-instagram" aria-hidden="true"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-twitter-square" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
        <div>
          <small class="d-block">
            © Company 2020 Made with
            <a href="https://bootstrap.hexschool.com/">Bootstrap4</a>
          </small>
          <i>本網頁僅供學習使用 無任何商業用途</i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Alert from "../messageAlert";
import $ from "jquery";

export default {
  data() {
    return {
      isLoading: false,
      randoms: [],
    };
  },
  components: { Alert },
  methods: {
    copy(e) {
      e.currentTarget.select();
      document.execCommand("Copy");
      this.$bus.$emit("message:push", "複製成功", "success");
    },
    randomProducts() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.randoms = [];
          let products = res.data.products.filter(function (item) {
            return item.is_enabled == 1;
          });
          var arr = products;
          var result = [];
          var ranNum = 4;
          for (var i = 0; i < ranNum; i++) {
            var ran = Math.floor(Math.random() * arr.length);
            vm.randoms.push(arr.splice(ran, 1)[0]);
          }
          vm.$bus.$emit("message:push", "隨機推薦已更新", "info");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    addCart(id, num = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}api/${process.env.MYPATH}/cart`;
      this.$http
        .post(api, { data: { product_id: id, qty: num } })
        .then((res) => {
          vm.isLoading = false;
          if (res.data.success) {
            vm.$bus.$emit("message:push", res.data.message, "success");
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
    },
  },
  created() {
    const vm = this;
    vm.isLoading = true;
    const api = `${process.env.APIPATH}api/${process.env.MYPATH}/products/all`;
    this.$http.get(api).then((res) => {
      vm.isLoading = false;
      if (res.data.success) {
        vm.randoms = [];
        let products = res.data.products.filter(function (item) {
          return item.is_enabled == 1;
        });
        var arr = products;
        var result = [];
        var ranNum = 4;
        for (var i = 0; i < ranNum; i++) {
          var ran = Math.floor(Math.random() * arr.length);
          vm.randoms.push(arr.splice(ran, 1)[0]);
        }
        vm.$bus.$emit("message:push", "歡迎光臨遊戲天堂 ~ ❤️", "info");
      } else {
        vm.$bus.$emit("message:push", res.data.message, "danger");
      }
      vm.isLoading = false;
    });
  },
};

$(".carousel").carousel("cycle");
</script>

<style lang="scss">
.carousel {
  &-item > img {
    height: 600px;
    width: 100%;
    object-fit: cover;
    opacity: 0.8;
  }

  &-caption {
    width: 100vw;
    height: 110px;
    position: absolute;
    left: 0;
    top: 180px;
    opacity: 0.7;
    &.mobile {
      top: 30%;
      height: 170px;
      & > button {
        position: unset;
        background-color: transparent;
        height: 0;
        opacity: 1;
      }
    }
  }

  &-btn {
    position: absolute;
    right: 15%;
    top: 180px;
    height: 110px;
    font-size: 25px;
    z-index: 99999;
    opacity: 0.8;
    animation: jittery 1.15s infinite;
    border: 0;
    background: unset;
  }
}

.key {
  &:hover {
    color: #ca9905;
  }
}

.hand {
  &:hover {
    color: #49b452;
  }
}

.car {
  &:hover {
    color: red;
  }
}

.text-mydark {
  color: #232c38;
}

.copy {
  width: 108px;
  background: none;
  border: 0;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
}

.coupon {
  position: relative;
  width: 300px;
  margin: 20px auto;
  border: 7px double #232c38;
  &-bg {
    height: 150px;
    background-image: url("https://thumbs.dreamstime.com/z/%E4%B8%8E%E6%97%97%E5%AD%90%E6%97%97%E5%B8%83%E7%9A%84%E5%BA%86%E7%A5%9D%E8%83%8C%E6%99%AF-53979311.jpg");
    background-size: 100%;
    background-position: 0 -20px;
    color: #2e6092;
    opacity: 0.8;
  }
  &-text {
    position: absolute;
    top: 35%;
    right: 5%;
    color: #2e6092;
    text-align: right;
    text-shadow: 1px 0 2px #eee;
  }
}

.seemore {
  position: absolute;
  bottom: 60px;
  width: 100vw;
  height: 150px;
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px 2em #232c38;
  opacity: 0.7;

  & > * {
    animation: down 1.5s infinite;
  }
}

@keyframes jittery {
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
    opacity: 1;
    font-size: 25px;
  }
}

@keyframes down {
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
  }
  50% {
    transform: translate(0px, 20px);
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

.main-content {
  min-height: calc(100vh - 190px) !important;
}

.mobile-header {
  height: 60px;
  & .dropdown {
    &-toggle {
      line-height: 45px;
    }
    &-menu {
      top: 40px;
      right: 0;
    }
  }
}
</style>