import Vue from 'vue'
import App from './App'
import store from './store/index.js'


Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
// 请求地址
Vue.prototype.$http = 'http://192.168.31.68' // 'https://www.mzz2020.com' //
// 客服电话
Vue.prototype.$mobel = '17780156403'
// 退换货
Vue.prototype.$text = '工厂直卖，三天有问题退货'

const app = new Vue({
    ...App
})
app.$mount()
