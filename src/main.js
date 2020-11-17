// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vue-loading-overlay'
import veeValidate from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'

import 'bootstrap'

import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import './bus'

VeeValidate.Validator.localize('zh_TW', zhTWValidate)
Vue.use(veeValidate)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

VeeValidate.Validator.extend("mobile", {
  getMessage: field => "請輸入正確的手機號碼",
  validate: (value) => {
    var str = value
    var result = false
    if(str.length > 0) {
      //是否只有數字;
      var patt_mobile = /^[\d]{1,}$/
      result = patt_mobile.test(str)

      if(result) {
        //檢查前兩個字是否為 09
        //檢查前四個字是否為 8869
        var firstTwo = str.substr(0, 2)
        var firstFour = str.substr(0, 4)
        var afterFour = str.substr(4, str.length - 1)
        if(firstFour == "8869") {
          $(element).val("09" + afterFour)
          if(afterFour.length == 8) {
            result = true
          } else {
            result = false
          }
        } else if(firstTwo == "09") {
          if(str.length == 10) {
            result = true
          } else {
            result = false
          }
        } else {
          result = false
        }
      }
    } else {
      result = true
    }
    return result
  },
})

Vue.component("loading", VueLoading)
Vue.filter('dollarSign', function(n) {
  return `$${n}`
})
Vue.filter("numFormat", function(n) {
  var intPart = Number(n).toFixed(0)
  var intPartFormat = intPart
    .toString()
    .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
  return intPartFormat
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

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