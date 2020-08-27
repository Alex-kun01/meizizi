<template>
	<view class="container">
		
		<view class="state">
			<view class="searchBoxs">
				<image src="" mode=""></image>
				<input type="text" v-model="searchAddress"  placeholder="输入店铺具体位置城市/区县/街道"  @confirm="searchDevice" confirm-type="search"/>
			</view>
		</view>
		
		
		<view class="content">
			<map id="myMap" style="width: 750rpx;height: 500rpx;border: 1rpx solid #999;" class="map" scale="14" :latitude="latitude" :longitude="longitude" @regionchange="regionchange">
				<cover-image class="core" style="width: 35rpx;height: 40rpx;" src="http://www.mzz2020.com/uploads/store/comment/20200716/position.png"></cover-image>
				<cover-image @tap="reset" class="dingwei" src="http://www.mzz2020.com/uploads/store/comment/20200716/location.png"></cover-image>
			</map>
			<view class="content-scroll">
				<view class="content-scroll-layout">
					{{address}}
				</view>
			</view>
			<view 
			 class="sub_mit" @tap="preservation" >
				保存
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//map
				longitude: 0,
				latitude: 0,
				key : "cbf6527378664135f4a17c027e051bcd",
				//搜索框输入的地址
				searchAddress:"",
				//高德返回的地址信息
				address:"",
				//高德返回的经纬度
				addressLocation:"",
				//分割返回的经纬度存数组
				locationArr:[],
				locations:{}
			}
		},
		onLoad() {
			this.getFileLocalPath(this.img)
		},
		methods:{
			regionchange(e){  
				this.getLngLat();  
			},
			
			// 保存
			preservation(){
				console.log('location',this.locations)
				let address = this.locations.address // 中文地址
				let arr = this.locations.locations.split(",");
				let lg = arr[0]; // 经度
				let la = arr[1]; // 纬度
				console.log('经纬度',la, lg, address)
				let temp = {
					address,
					la,
					lg
				}
				console.log('查看参数', temp)
				this.$store.commit('setLocationInfo', temp)
				uni.navigateBack({
					
				})
				
			},
			//获取搜索框输入的经纬la度
			searchDevice(){
				//高德地图地址编码接口
				let that = this;
				uni.request({
					url:`https://restapi.amap.com/v3/geocode/geo?key=${this.key}&address=${this.searchAddress}`,
					success: (res) => {
						console.log("经纬度：",res.data);
						if(res.data.geocodes!=""){
							that.addressLocation = res.data.geocodes[0].location;
							that.locationArr = that.addressLocation.split(",");
							that.longitude = that.locationArr[0];
							that.latitude = that.locationArr[1];
							console.log("输入获取经纬度",that.longitude,that.latitude);
							that.mapInterface();
						}
					
						
					}
				})
			},
			
			//点击图标回到所在位置
			reset(){
				uni.getLocation({
					type: 'gcj02', //腾讯地图坐标系
					success: res => {
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						console.log('res:', res);
					}
				});
			},
			 //获取地图中心点  
			getLngLat(){
				var that = this;  
				this.map.getCenterLocation({
					success(res) {
						// uni.showToast({
						// 	title:`${res.latitude},${res.longitude}`,
						// 	icon:"none"
						// })
						
						//console.log("中心",res)  
						that.latitude= res.latitude  
						that.longitude= res.longitude 
						console.log('经纬度', that.latitude)
						
						that.mapInterface();
					}
				})
				
			},
			//高德地图地址逆编码接口
			mapInterface(){
				let lud = Number(this.longitude).toFixed(6);
				let lat = Number(this.latitude).toFixed(6);
				let location = `${lud},${lat}`;
				console.log('传递经纬度',location);
				uni.request({
					url:`https://restapi.amap.com/v3/geocode/regeo?key=${this.key}&location=${location}`,
					success: (res) => {
						console.log("地址：",res.data);
					    this.address = res.data.regeocode.formatted_address;
						
						this.locations = {
							city:res.data.regeocode.addressComponent.city,
							area:res.data.regeocode.addressComponent.district,
							locations:res.data.regeocode.addressComponent.streetNumber.location || location,
							address:res.data.regeocode.formatted_address
						}
						console.log("返回数据集合：",this.locations);
					}
				})
			}
		},
		onLoad() {
			let that = this;
			uni.getLocation({
			    type: 'gcj02', //腾讯地图坐标系
				geocode:true,
			    success:(res)=> {
					// uni.hideLoading()
			        that.latitude = res.latitude
			        that.longitude = res.longitude
					console.log("res:",res);
					//自身定位
					this.mapInterface();
			    },
				fail:(res)=>{
					console.log(res, 'pppp');
				}
			})
			
		},
		onReady() {
			 this.map = uni.createMapContext('myMap', this);
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		
		height: 100%;
		background-color: #FFFFFF;
		.container {
			width: 750upx;
			min-height: 100vh;
			height: 100%;
			background-color: #FFFFFF;
			overflow-y: hidden;
			.state {
				box-sizing: border-box;
				padding: 40rpx 24rpx;
				width: 750rpx;
				height: 70rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				// background: #FFFFFF;
				margin: 40rpx 0;
				
				
				.searchBoxs {
					// @include wh(690upx, 60upx) @include flex(center, flex-start) background: rgba(238, 238, 238, 1);
					width: 690rpx;
					height: 60rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					// background: rgba(238, 238, 238, 1);
					border: 1rpx solid #999;
					opacity: 0.6;
					border-radius: 28upx;
				
					image {
						margin-left: 20upx;
						// @include wh(27upx, 27upx);
						width: 27rpx;
						height: 27rpx;
						
					}
					input{
						// @include wh(450upx, 60upx) margin-left: 10upx;
						width: 450rpx;
						height: 60rpx;
						margin-left: 10rpx;
						outline-style: none;
						font-size: 24upx;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
					}
				}
				
			}
			
			.content{
				// @include wh(750upx,calc(100vh - var(--status-bar-height) - 170upx))
				width: 750rpx;
				height: calc(100vh -200rpx);
				// margin-top:calc(var(--status-bar-height) + 170upx);
				
				background:#F5F5F5;
				.map{
					// @include wh(750upx,40%)
					// @include flex(center,center)
					width: 750rpx;
					height: 40%;
					display: flex;
					justify-content: center;
					align-items: center;
					.core{
						// @include wh(60upx,60upx)
						width: 60rpx;
						height: 60rpx;
						position: absolute;
							top: 50%;
							left: 50%;
						transform: translate(-50%,-50%); 
					}
					.dingwei{
						// @include wh(60upx,60upx)
						width: 60rpx;
						height: 60rpx;
						position: absolute;
						top: 85%;
						left: 90%;
					}
				}
				.content-scroll{
					width: 750rpx;
					height: 200rpx;
					// background-color: pink;
					.content-scroll-layout{
						width: 690rpx;
						// height: auto;
						margin-top: 15rpx;
						box-sizing: border-box;
						padding: 0 10rpx;
					}
					
				}
				.sub_mit{
					width:700rpx;
					height:86rpx;
					line-height: 86rpx;
					background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
					border-radius:43rpx;
					font-size:36rpx;
					font-weight:bold;
					color:rgba(255,255,255,1);
					text-align: center;
					margin-left: 25rpx;
				}
			}
		}
	}
</style>

