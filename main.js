import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
// 请求地址
Vue.prototype.$http = 'http://192.168.31.14' //'http://122.51.77.56'
// 客服电话
Vue.prototype.$mobel = '17683059017'

const app = new Vue({
    ...App
})
app.$mount()
