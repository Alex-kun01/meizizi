import Vue from 'vue'
import App from './App'
import store from './store/index.js'

import cuCustom from 'colorui/components/cu-custom.vue'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
// 请求地址
Vue.prototype.$http = 'http://www.mzz2020.com' 
// 客服电话
Vue.prototype.$mobel = '17780156403'

const app = new Vue({
    ...App
})
app.$mount()
