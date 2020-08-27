

import amap from '../js_sdk/amap-wx.js'; //sdk文件路径  需要下载微信小程序sdk文件

let amapPlugin = new amap.AMapWX({
				key: 'f0123884f5087e527addb356ccdf24cc' // 需要自己的高德地图开发者key
			});  

// 返回一个对象

export default function(callBack){
	
	let targetData = {}
	let type = null // 1 安卓/IOS端 2 微信端
	
	uni.showLoading({
		title: '正在获取当前位置...'
	})
	
	// 微信端获取位置
	// #ifdef MP-WEIXIN
	amapPlugin.getRegeo({
		success(res){// 等下
		  targetData = res[0]
		  
		  targetData.regeocodeData.addressComponent.city = targetData.regeocodeData.addressComponent.city.replace('市', '')
		  console.log('get', targetData.regeocodeData.addressComponent.city)
		  type = 2
		  callBack({targetData, type})
		  uni.hideLoading()
		}
	})
	// #endif
	
	// app端获取当前位置
	// #ifdef APP-PLUS
	//#ifndefMP-WEIXIN
	uni.getLocation({
		geocode: true,
		success(res) {
			console.log('app端res', res)
			targetData = res.address
			targetData.city = targetData.city.replace('市', '')
			type = 1
			uni.hideLoading()
			callBack({targetData, type})
		} 
	})
	// #endif
	
}
