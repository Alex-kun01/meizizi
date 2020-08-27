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
				<image @click="scanCode" src="@/static/mine/saoma@4x.png" mode=""></image>
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
					<text>微 信</text>
					<input type="text"  v-model="merchantInfo.wx_name" placeholder="请输入微信" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>店铺名字</text>
					<input type="text" style="padding-left: 20rpx;" v-model="merchantInfo.storeName" placeholder="请输入店铺名" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>商家类型</text>
					<picker :range="pickerArr" @change="changePciker">
						<view class="content_list_label">{{pickerStr}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>地 址</text>
					<!-- <input type="text"  v-model="merchantInfo.phone" placeholder="请输入电话" /> -->
					<view class="content_list_label" @click="addressShow = true">{{address1}}</view>
					<pickerAddress v-model="addressShow" @confirm="addresspick" />
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
						<view class="bbx_show" v-if="isShowCode">
							{{number}}s
						</view>
						<view class="bbx_show" v-else>
							获取验证码
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text style="margin-right: 10rpx;">详细地址</text>
					<view style="width: 500rpx;20rpx;"
						@click="gotoChooseLocation('regin')"
					>
						{{merchantInfo.address}}
					</view>
					<!-- <input style="padding-left: 20rpx;" type="text"  v-model="merchantInfo.address" placeholder="请输入地址" /> -->
				</view>
			</view>
			<!-- <view class="address">
				<image src="@/static/mine/dinwei@2x.png" mode=""></image>
				<text>{{address}}</text>
			</view> -->
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
						<image @click="facadeone(1)" src="@/static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-else :src="facadeUrl1" mode=""></image>
				</view>
				<view class="img_box">
					<view class="static"
					v-if="picShow2" 
					>
						<image  @click="facadeone(2)" src="@/static/mine/xiangji@2x.png" mode=""></image>
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
						<image @click="facadeone(3)" src="@/static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-else :src="licenseUrl" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="pic_box">
			<view class="title">
				上传店铺logo
			</view>
			<view class="con_box">
				<view class="img_box">
					<view class="static"
					v-if="logoShow" 
					>
						<image @click="facadeone(4)" src="@/static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-else :src="licenseUrl3" mode=""></image>
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
	import amap from '@/js_sdk/amap-wx.js'  // 引入高德地图sdk
	import pickerAddress from '@/components/liudx-pickerAddress/index.vue'
	export default {
		data () {
			return {
				addressShow: false,
				form: {
					province: '',
					city: '',
					area: '',
				},
				shenAreaId: '',  //省code
				cityAreaId: '', //市code
				quAreaId : '', //区code
				shenAreaStr: '', // 省名
				cityRreaStr: '', // 市名
				quAreaStr: '', // 区名
				pickerArr: ['请选择','服务商','物流商','加盟店'], //123
				pickerIndex: 0,
				address1: '请选择你你申请的服务地址',
				amapPlugin: null, //new地图
			    key: '5278eb05bcbd3d197a42fb57b38dc0e2',
			    lat:'',//纬度
			    lng:'',//经度
				address: '正在获取当前位置...', // 当前位置
				merchantInfo:{
					zhizhao: '', // 执照图片地址
					recCode: '', //推荐码
					name: '', //姓名
					phone: '', // 
					address: '选择店铺位置', // 
					captcha: '', // 验证码
					wx_name: '', // 微信
					storeName: '', // 店铺名
				},
				facadeUrl1: '', // 门头照片地址1
				facadeUrl2: '', // 门头照片地址2
				licenseUrl: '', // 执照图片
				licenseUrl3: '', // logo 图片地址
				picShow1: true, // 门头1图片是否展示
				picShow2: true,
				logoShow: true, // 店铺logo是否展示
				zhizhaoShow: true,
				isGetcapCode: false, //是否获取验证码
				isShowCode: false, //
				number:60, // 倒计时时间
				timers: ''
			}
		},
		computed:{
			pickerStr(){
				return this.pickerArr[this.pickerIndex]
			},
			// 是否具备提交条件
			isSubmitOk(){
				if(!this.merchantInfo.recCode || !this.merchantInfo.name || !this.merchantInfo.storeName || !this.merchantInfo.phone || !this.merchantInfo.captcha){
					uni.showModal({
						title: '提示',
						content: '信息填写有误'
					})
					return false
				}
				if(this.merchantInfo.address == '选择店铺位置'){
					uni.showModal({
						title: '提示',
						content: '请选择店铺位置'
					})
					return false
				}
				if(this.pickerIndex == 0){
					uni.showModal({
						title: '提示',
						content: '请选择商家类型'
					})
					return false
				}
				if(this.address1 == '请选择你你申请的服务地址'){
					uni.showModal({
						title: '提示',
						content: '请选择地址'
					})
					return false
				}
				if(!this.facadeUrl1 || !this.licenseUrl || !this.licenseUrl3){
					uni.showModal({
						title: '提示',
						content: '请上传门头/执照/店铺logo'
					})
					return false
				}
				return true
			},
			// 校验是否为11位有效手机号
			isCaptchaOk(){
				var myreg=/^[1][0-9][0-9]{9}$/;
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
			
			// this.mgetLocation()
		},
		onShow(){
			let temp = this.$store.state.locationInfo
			console.log('vuex参数', temp)
			this.merchantInfo.address = temp.address
			this.lat = temp.la
			this.lng = temp.lg
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
							let datas = {
								code: _this.merchantInfo.recCode,//推荐码
								name: _this.merchantInfo.name,//姓名
								phone: _this.merchantInfo.phone,// 电话
								wx_name: _this.merchantInfo.wx_name, // 微信
								address: _this.merchantInfo.address,//地址
								long_number: _this.lng,//经度
								lati_number: _this.lat,//纬度
								front_img: _this.mentouStr, //门面照片
								business_img: _this.licenseUrl, //营业执照	
								province: _this.shenAreaId, // 省code
								city: _this.cityAreaId, // 市code
								area: _this.quAreaId, // 区code
								type: _this.pickerIndex, // 
								company: _this.merchantInfo.storeName, // 店铺名字
								logo: _this.licenseUrl3, // 店铺logo
							}
							console.log('传递参数', datas)
							// return
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
										_this.login()
									}else{
										uni.showModal({
											title: '提示',
											content: okres.data.msg || '注册失败'
										})
									}
								}
							})
						}
					}
				})
			},
			// 跳转选择店铺位置
			gotoChooseLocation(type){
				uni.navigateTo({
					url: './mapshow?type=' + type
				})
			},
			//直接登录
			login(){
				let _this = this
				uni.showLoading({
					title: '正在登录...'
				})
				uni.request({
					url: _this.$http + '/api/index/phoneLogin',
					method: 'POST',
					data: {
						phone: _this.merchantInfo.phone
					},
					success(backres){
						console.log('验证码用户信息', backres.data.data)
						if(backres.data.status === 200){
							uni.hideLoading()
							// 登录成功
							_this.$store.commit('setUserInfo', backres.data.data)
							console.log('l',_this.$store.state.userInfo)
							uni.setStorage({
								key: 'userInfo',
								data: backres.data.data
							})
							uni.getStorage({
								key: 'userInfo',
								success(res){
									console.log('本地储存的数据', res)
								}
							})
							// return
							uni.switchTab({
								url: '../../index/index'
							})
							
							
						}else{
							uni.showModal({
								title: '提示',
								content: '登录失败！'
							})
						}
					}
				})
			},
			// 获取验证码
			getCapCode(){
				if(this.isShowCode){
					return
				}
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
							_this.isShowCode = true
							
							_this.timers = setInterval(() => {
							   if(_this.number == 0){
								  clearInterval(_this.timers)
								  _this.isShowCode = false
								  _this.number = 60
								   return
							   }
								_this.number--
							}, 1000)
							
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
			// 地址选择
			addresspick(obj) {
				console.log('我看看看看城市', obj)
				this.shenAreaId = obj.province.id // 省code
				this.cityAreaId = obj.city.id // 市code
				this.quAreaId = obj.area.id // 区code
				let arr = [ 'province', 'city', 'area'];
				let place = '';
				arr.map(key => {
					this.form[key] = obj[key].AreaId
					place += obj[key].name
				})
				this.address1 = place
			},
			// 获取当前位置中文信息
			mgetLocation(){
				let _this = this
				uni.getLocation({
					type: 'gcj02',
					geocode:true,
					success(res){
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
								 if(type === 4){
									 // logo
									  _this.licenseUrl3= resObj.data.url
									   _this.logoShow = false
									  
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
			// 选择商家类型
			changePciker(e){
				this.pickerIndex = e.detail.value
			}
		},
		components: {
			pickerAddress
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
			.content_list_label{
				font-size: 28rpx;
				color: #999;
				margin-left: 24rpx;
			}
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
						width: 180rpx;
						border: 1rpx solid #999;
						border-radius: 5rpx;
						font-size: 28rpx;
						text-align: center;
						padding: 0 10rpx;
						margin-left: 130rpx;
						.bbx_show{
							width: auto;
							// background-color: pink;
						}
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
