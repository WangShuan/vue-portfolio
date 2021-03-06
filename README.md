# vue 出一個電商教學手冊

## 安裝與執行

### 安裝

使用終端機安裝相關的套件 套件如下：

* bootstrap - 版型需要
* sass-loader@7.3.1 - scss 需要
* node-sass - scss 需要
* popper.js - bootstrap 需要
* jquery - bootstrap 需要
* vue
* axios - ajax 用
* vue-axios@2.1.5 - ajax 用
* vue-loading-overlay - loading 效果用
* vue-router - 路由用
* vee-validate@2.0 - 驗證用

### 執行

開啟終端機輸入 `npm run dev` 執行開發者模式

* 執行後可通過 `http://localhost:8080/#/` 開啟完整網頁

開啟終端機輸入 `npm run build` 執行正式模式

* 執行後會生成一個 `dist` 資料夾 把該資料夾單獨用新的 vscode 打開 GoLive 後即可生成完整網頁

## 結構說明

主要用到的檔案都在 `src` 這個資料夾中

  * `src/main.js` 是入口文件 裡面處理各種插件的配置

  * `src/router/index.js` 專門處理所有路由元件的檔案

  * `src/App.vue` 是整個 vue 實例(下方 style 標籤中則放整個實例需用到的所有樣式 all.scss)

  * `src/assets` 資料夾存放需要用到的 js css img 等檔案

  * `src/components` 資料夾存放頁面與元件的 .vue 檔 裡面通常可按需要新增資料夾 如： pages 資料夾用作存放作為頁面的 .vue 檔

如果要處理環境變數或 `npm run build` 生成後的引用路徑則在 `config` 資料夾中

  * `dev.env.js` 即 `npm run dev` 使用的環境變數

  * `prod.env.js` 即 `npm run build` 使用的環境變數

  * `index.js` 中的 `assetsPublicPath: '/'` 就是專門用來改變 `dist` 資料夾中 `index.html` 的引用路徑

## 一些比較重要的代碼詳解

### 1. 路由守衛

vue-router 中提供了一個路由守衛的功能，我們可以藉由它來阻止路由跳轉，比如某些頁面需要登入後才能訪問，就可以藉由路由守衛判斷登入狀態再進行頁面訪問。

```js

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const api = process.env.APIPATH + "api/user/check"
    axios.post(api).then((res) => {
      if(!res.data.success) {
        next({ path: '/login' })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

```

### 2. 子路由使用方式

 - 通過在需要路由守衛的元件中添加上 `meta: { requiresAuth: true },` 後路由守衛就會幫忙判定登入狀態

 - 通過在路由對象中添加 `children:[]` 就可以增加子路由 子路由會生成在父組件中放有 `<router-view></router-view>` 標籤的位置

 - 在路由中可以添加上 `{
      path: '*',
      redirect: '/'
    }` 即可讓所有沒被定義的路徑都會重定向到首頁

```js

export default new Router({
  routes: [
    {
      path: '/',
      name: '首頁',
      component: Home,
      children: [
        {
          path: 'about',
          name: '關於我們',
          component: About
        },
        ......
      ]
    },
    {
      path: '/admin',
      name: '系統',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: '產品管理',
          component: AdminProducts,
          meta: { requiresAuth: true },
        },
        ......
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

```

### 3. vue-loading 用法

在代碼的最上面加入以下內容後即可通過 vue 中 data 下的 `isLoading` 資料狀態 來切換是否為載入中

```html
<loading :active.sync="isLoading">
  <h4>載入中 請稍候...</h4>
</loading>
```

* 其樣式可到 `https://loading.io/` 中抓取使用

### 4. 切換與判斷路由

* 可以在標籤中直接通過 `@click="$router.push('/')` 跳轉路由到 '/'

* 可以使用 `this.$route.path!=='/'` 判斷路由是否為 '/'

* 可以使用 `this.$route.fullPath` 獲取當前路由的完整路徑

* 假設使用同個路由不同參數要切換時可以通過 `vm.$router.push("/products/" + category).catch((err) => err);` 來阻止報錯與頁面不刷新的問題

### 5. style 相關

* 在元件中的 style 標籤上添加 `scoped` 就可以讓該元件的樣式僅在該元件中被使用

* 可以通過在元件中的 style 標籤上添加 `lang="scss"` 來改變 css 語言

合併使用代碼如下：

```html

<style lang="scss" scoped>

</style>

```

### 6. cookie 相關

該專案使用 cookie 保存了喜好項目與後台的登入狀態

主要代碼分別在 `Login.vue` `Dashboard.vue` `Like.vue`

* 登入的部分

  在 `Login.vue` 中保存了登入的 `token` 主要代碼如下：

  ```js

  this.$http.post(api, vm.user).then((res) => {
    if (res.data.success) {
      const token = res.data.token;
      const expired = res.data.expired;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
    }
  })

  ```

  接下來在 `Dashboard.vue` 中將登入成功後取得的 token 設定於每次 request 中的 header 參數

  如下：

  ```js

  created() {
    // 在登入時我們將 cookie 存到 hexToken 中，這裏就是獲取 hexToken 的值
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
    // 這句是主要代碼 將 hexToken 的值 設定到 axios 的請求頭中
    this.$http.defaults.headers.common.Authorization = myCookie;
  },

  ```

* 喜好項目

在 `Product.vue` 中直接判斷 cookie 裡面是否含有產品的 id 如果有代表該產品是喜好項目

在 `Like.vue` 中把所有 cookie 分成鍵對值然後判斷是否有 `like` 這個鍵 再獲取它對應的值從而取得所有喜好項目的產品 id

取得後再將所有 id 渲染成一個個的產品顯示於喜好項目列表中

主要代碼如下：

```js

let cookieObj = {};
let cookieAry = document.cookie.split(";");
let cookie;
let arr;
for (var i = 0, l = cookieAry.length; i < l; ++i) {
  cookie = cookieAry[i].trim();
  cookie = cookie.split("=");
  // cookie[0] => key ; cookie[1] => value
  if (cookie[0] === "like") {
    arr = cookie[1];
    // 如果有人添加過喜好項目又清空的話 arr 就會是空字符串
    // 所以這裡要判斷它的長度大於零確定 cookie 中有產品 id 
    if (arr.length !== 0) {
      // 這裡就是渲染喜好項目的 methods
      vm.getLikes(arr);
    }
  }
}

```

### 7. event Bus 使用

主要代碼在 `messageAlert.vue` 中 我將該專案中通過 event bus 建立提示訊息的同時生成購物車的數量

如下：

```js

vm.$bus.$on("message:push", (message, status = "warning") => {
  // 獲取購物車數量
  vm.getCart();
  // 生成互動訊息提示窗
  vm.updateMessage(message, status);
});

```

