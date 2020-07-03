import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		///////////////用户不可清除缓存/////////////
		// 用户登录信息
		userInfo:{},
		// 订单下单参数
		productOrderInfo:{},
		// 购物车订单列表
		orderList: [],
		// 存放退款商品信息
		tuiOrderInfo: {},
		
		//////////////用户可清除缓存数据/////////////
		// 清除缓存时可清除
		// 用户当前位置
		address:{},
		
		
	},
	mutations:{
		
		// 修改用户信息
		setUserInfo(state, obj){
			state.userInfo = obj
		},
		// 修改订单下单参数
		setProductOrderInfo(state,obj){
			state.productOrderInfo = obj
		},
		// 修改退款商品信息
		setTuiOrderInfo(state, obj){
			state.tuiOrderInfo = obj
		},
		setOrderList(state,arr){
			state.orderList = arr
		},
		// 修改订单下单参数的支付方式
		setProductOrderInfoServer(state, str){
			state.productOrderInfo.server = str
		},
		// 修改用户当前位置
		setAddress(state, obj){
			state.address = obj
		}
	},
	actions:{
		
	}
})
export default store