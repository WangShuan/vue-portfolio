import Vue from 'vue';

Vue.prototype.$bus = new Vue()

// 這裡我們是在把 $bus 掛載到 Vue 的原生方法裡面
// 然後就可以在 Alert 元件中通過 vue.$bus.xxx 處理錯誤訊息