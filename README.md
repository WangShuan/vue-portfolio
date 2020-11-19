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