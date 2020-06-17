<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 商家注册 -->
		<view class="table_box">
			<view class="item img">
				<view class="title">
					<text>推荐码</text>
					<input type="text" v-model="merchantInfo.recCode" placeholder="请输入推荐码" />
				</view>
				<image @click="scanCode" src="../../../static/mine/saoma@4x.png" mode=""></image>
			</view>
			<view class="item">
				<view class="title">
					<text>姓 名</text>
					<input type="text"  v-model="merchantInfo.name" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>电 话</text>
					<input type="text"  v-model="merchantInfo.phone" placeholder="请输入电话" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>验证码</text>
					<input type="text"  v-model="merchantInfo.captcha" placeholder="请输入验证码" />
					<view class="getCaptcha"
					v-if="isCaptchaOk"
					@click="getCapCode"
					>
						获取验证码
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>地 址</text>
					<input type="text"  v-model="merchantInfo.address" placeholder="请输入地址" />
				</view>
			</view>
			<view class="address">
				<image src="../../../static/mine/dinwei@2x.png" mode=""></image>
				<text>{{address}}</text>
			</view>
			
		</view>
		<!-- 门头照片 -->
		<view class="pic_box">
			<view class="title">
				上传门头照片
			</view>
			<view class="con_box">
				<view class="img_box">
					<view class="static"
					v-if="picShow1"
					>
						<image @click="facadeone(1)" src="../../../static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-else :src="facadeUrl1" mode=""></image>
				</view>
				<view class="img_box">
					<view class="static"
					v-if="picShow2" 
					>
						<image  @click="facadeone(2)" src="../../../static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-else :src="facadeUrl2" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="pic_box">
			<view class="title">
				上传营业执照
			</view>
			<view class="con_box">
				<view class="img_box">
					<view class="static"
					v-if="zhizhaoShow" 
					>
						<image @click="facadeone(3)" src="../../../static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-else :src="licenseUrl" mode=""></image>
				</view>
			</view>
		</view>
		<view class="submit_btn"
		@click="submitClick"
		>
			提 交
		</view>
		
		
	</view>
</template>

<script>
	import amap from '../../../js_sdk/amap-wx.js'  // 引入高德地图sdk
	export default {
		data () {
			return {
				amapPlugin: null, //new地图
			    key: '5278eb05bcbd3d197a42fb57b38dc0e2',
			    lat:'',//纬度
			    lng:'',//经度
				address: '正在获取当前位置...', // 当前位置
				merchantInfo:{
					zhizhao: '', // 执照图片地址
					recCode: '', //推荐码
					name: '', //姓名
					phone: '',
					address: '',
					captcha: '', // 验证码
				},
				facadeUrl1: '', // 门头照片地址1
				facadeUrl2: '', // 门头照片地址2
				licenseUrl: '', // 执照图片
				picShow1: true, // 门头1图片是否展示
				picShow2: true,
				zhizhaoShow: true,
				isGetcapCode: false, //是否获取验证码
				
			}
		},
		computed:{
			// 是否具备提交条件
			isSubmitOk(){
				if(!this.merchantInfo.recCode || !this.merchantInfo.name || !this.merchantInfo.phone || !this.merchantInfo.address || !this.merchantInfo.captcha){
					uni.showModal({
						title: '提示',
						content: '信息填写有误'
					})
					return false
				}
				if(!this.facadeUrl1 || !this.licenseUrl){
					uni.showModal({
						title: '提示',
						content: '请上传门头/执照'
					})
					return false
				}
				return true
			},
			// 校验是否为11位有效手机号
			isCaptchaOk(){
				var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(this.merchantInfo.phone)) {
					return false;
				} else {
					return true;
				}
			},
			// 门头照片str
			mentouStr(){
				if(this.facadeUrl1 && !this.facadeUrl2){
					return this.facadeUrl1
				}
				if(!this.facadeUrl1 && this.facadeUrl2){
					return this.facadeUrl2
				}else{
					return this.facadeUrl1 + ',' + this.facadeUrl2
				}
			}
		},
		onLoad(){
			this.mgetLocation()
		},
		onShow(){
			
		},
		methods:{
			// 提交按钮
			submitClick(){
				let _this = this
				console.log('是否具备提交条件', this.isSubmitOk)
				if(this.isSubmitOk){
					
				}
				if(!this.isCaptchaOk){
					uni.showModal({
						title: '提示',
						content: '请检查手机号是否正确'
					})
					return
				}
				if(!this.isGetcapCode){
					uni.showModal({
						title: '请先获取验证码！'
					})
					return
				}
				uni.request({
					url: this.$http + '/api/index/ifPhoneCode',
					method: 'POST',
					data: {
						phone: _this.merchantInfo.phone,
						code: _this.merchantInfo.captcha
					},
					success(capres){
						console.log('capres',capres)
						if(capres.data.status != 200){
							uni.showModal({
								title: '提示',
								content: capres.data.msg
							})
							return
						}else{
							console.log('满足注册条件')
							//获取位置信息
							uni.getLocation({
								type: 'wgs84',
								geocode:true,
								success(amp){
									console.log('amp',amp)
									this.lat = amp.longitude
									this.lng = amp.latitude
									let datas = {
										code: _this.merchantInfo.recCode,//推荐码
										name: _this.merchantInfo.name,//姓名
										phone: _this.merchantInfo.phone,// 电话
										address: _this.merchantInfo.address,//地址
										long_number: amp.longitude,//经度
										lati_number: amp.latitude,//纬度
										front_img: _this.mentouStr, //门面照片
										business_img: _this.licenseUrl, //营业执照	
									}
									console.log('传递参数', datas)
									
									uni.request({
										url: _this.$http + '/api/index/addShop',
										method: 'POST',
										data: datas,
										success(okres){
											console.log('okres', okres)
											if(okres.data.status == 200){
												uni.showModal({
													title: '提示',
													content: '注册成功！'
												})
												setTimeout(()=>{
													uni.navigateTo({
														url: './login'
													})
												}, 1300)
											}else{
												uni.showModal({
													title: '提示',
													content: okres.data.msg || '注册失败'
												})
											}
										}
									})
									
									
								}
							})
							
							
						}
					}
				})
			},
			// 获取验证码
			getCapCode(){
				let _this = this
				uni.showLoading({
					title: '正在获取验证码...'
				})
				uni.request({
					url: this.$http + '/api/index/getPhoneCode',
					method: 'POST',
					data:{
						phone: _this.merchantInfo.phone
					},
					success(res){
						console.log('获取验证码返回信息', res)
						if(res.data.status == 200 ){
							_this.isGetcapCode = true
						}
						if(res.data.status != 200){
							uni.showModal({
								title: '提示',
								content: res.data.msg
							})
						}
						uni.hideLoading()
					}
				})
			},
			// 获取当前位置中文信息
			mgetLocation(){
				let _this = this
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success(res){
						console.log(res)
						let address = res.address.city + res.address.district + res.address.street + res.address.poiName + res.address.streetNum
						_this.address = address
					}
				})
			},
			// 上传照片
			facadeone(type){
				let _this = this
				uni.chooseImage({
					count: 1, // 上传图片的张数
					sourceType: ['album'], //从相册选择
					success(res) { // 成功则返回图片的本地文件路径列表 tempFilePaths
						uni.showLoading({
							title: '上传中...'
						})
						const tempFilePaths = res.tempFilePaths;
						
						const uploadTask = uni.uploadFile({
							url: _this.$http + '/api/upload/image',
							// methods: 'POST',
							filePath: tempFilePaths[0],
							name: 'file',
							 success: function (uploadFileRes) {
							 console.log('xxx',uploadFileRes.data);
							 let resObj = JSON.parse( uploadFileRes.data )
							 console.log('resObj',resObj);
							 if(resObj.status === 200){
								 uni.hideLoading()
								 if(type === 1){
									 // 门头1
									 _this.facadeUrl1 = resObj.data.url
									 _this.picShow1 = false
								 }
								 if(type === 2){
									 // 门头2
									 _this.facadeUrl2 = resObj.data.url
									 _this.picShow2 = false
								 }
								 if(type === 3){
									 // 执照
									 _this.licenseUrl = resObj.data.url
									  _this.zhizhaoShow = false
								 }
								 console.log('上传成功', resObj.data.url)
							 }
							}
							
						})
						
					}
				})
			},
			// 扫描二维码
			scanCode(){
				let _this = this
				uni.scanCode({
					success(res) {
						console.log('扫描二维码',res)
						_this.merchantInfo.recCode = res.result
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	// 适配异形屏幕
	.titleNview-placing {
		height: var(--status-bar-height);
		background: #FFFFFF;
		padding-top: 0;
		box-sizing: content-box;
	 }
	page{
		width: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.table_box{
				width: 100%;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 0 24rpx 0 24rpx;
				.item{
					width: 100%;
					height: 90rpx;
					// background-color: pink;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #eee;
					.getCaptcha{
						width: 150rpx;
						border: 1rpx solid #999;
						border-radius: 5rpx;
						font-size: 28rpx;
						text-align: center;
						padding: 0 5rpx;
						margin-left: 130rpx;
					}
					image{
						width: 28rpx;
						height: 28rpx;
					}
					.title{
						display: flex;
						text{
							font-size:30rpx;
							font-weight:500;
							color:rgba(51,51,51,1);
							display: inline-block;
							width: 120rpx;
						}
						input{
							font-size:26rpx;
							// font-weight:500;
							color:rgba(102,102,102,1);
						}
					}
				}
				.address{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					vertical-align: middle;
					image{
						width: 25rpx;
						height: 27rpx;
						margin-right: 24rpx;
					}
					font-size:26rpx;
					font-weight:500;
					color:rgba(102,102,102,1);
				}
				.item.img{
					justify-content: space-between;
				}
			}
			.pic_box{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 34rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.title{
					font-size:30rpx;
					font-weight:500;
					color:rgba(51,51,51,1);
					margin-bottom: 30rpx;
				}
				.con_box{
					display: flex;
					justify-content: space-between;
					.img_box{
						width:301rpx;
						height:181rpx;
						border-radius:12rpx;
						image{
							width: 100%;
							height: 100%;
						}
						.static{
							width: 100%;
							height: 100%;
							background:rgba(229,229,229,1);
							display: flex;
							justify-content: center;
							align-items: center;
							image{
								width: 62rpx;
								height: 54rpx;
							}
						}
					}
				}
			}
			.submit_btn{
				width:690rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				font-size:36rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
				margin: 60rpx 30rpx;
			}
			
		}
	}
</style>
