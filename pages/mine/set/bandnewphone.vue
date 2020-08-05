<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 绑定新的账号 -->
		<view class="top"></view>
		<view class="item">
			<view class="name">
				手机号
			</view>
			<input type="text" v-model="phone" placeholder="请输入新手机号" />
			<view class="zanwei"></view>
		</view>
		<view class="item">
			<view class="name">
				验证码
			</view>
			<input type="text" v-model="incode" placeholder="请输入验证码" />
			<view :class="{code_btn:true, active: isOk}"
			@click="getInCode"
			>
				<view v-if="isShowCode">
					{{number}}s
				</view>
				<view v-else>
					获取验证码
				</view>
			</view>
		</view>
		<view class="submit_btn" @click="submitClick">
			提交绑定
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				phone: '', 
				incode: '', // 验证码
				isShowCode: false, //
				number:60, // 倒计时时间
				timers: ''
			}
		},
		computed:{
			isOk(){
				var myreg=/^[1][0-9][0-9]{9}$/;
				if (!myreg.test(this.phone)) {
					return false;
				} else {
					return true;
				}
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			submitClick(){
				let _this = this
				if(!this.isOk) {
					uni.showModal({
						title: '提示',
						content: '请输入正确的手机号'
					})
					return
				}
				if(!this.incode){
					uni.showModal({
						title: '提示',
						content: '请输入验证码！'
					})
					return
				}
				uni.getStorage({
					key:"userInfo",
					success(reg){
						// 校验成功，继续下一步绑定
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/index/bindingPhone',
							method: 'POST',
							data:{
								token: reg.data.token,
								phone: _this.phone
							},
							success(res){
								console.log('绑定手机号res',res)
								if(res.data.status === 200){
									uni.hideLoading()
									uni.removeStorage({
										key: 'userInfo'
									})
									uni.showToast({
										title: '换绑成功，请重新登录！'
									})
									setTimeout(()=>{
										uni.navigateTo({
											url: '../login/login'
										})
									},1000)
								}else{
									uni.showModal({
										title: '提示',
										content: '绑定失败'
									})
								}
							}
						})
						uni.request({
							url: _this.$http + '/api/index/ifPhoneCode',
							method: 'POST',
							data: {
								phone: _this.phone,
								code: _this.incode
							},
							success(reh){
								console.log('校验验证码', reh)
								if(reh.data.status === 200){}else{
									uni.showModal({
										title: '提示',
										content: '验证码校验失败'
									})
								}
							}
						})
					}
				})
				
				uni.showToast({
					title: '绑定成功'
				})
			},
			// 获取验证码
			getInCode(){
				if(this.isShowCode){
					return
				}
				let _this = this
				uni.showLoading({
					title: '正在获取验证码'
				})
				uni.request({
					url: _this.$http + '/api/index/getPhoneCode',
					method:'POST',
					data: {
						phone: _this.phone,
						type: 1
					},
					success(res){
						uni.hideLoading()
						console.log('验证码返回数据', res)
						if(res.data.status === 200){
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
						}else{
							uni.showLoading({
								title: '提示',
								content: '验证码获取失败!'
							})
						}
					}
				})
			}
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
			.top{
				width: 100%;
				height: 24rpx;
				background-color: #F4F4F4;
			}
			.item{
				width: 100%;
				height: 76rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 24rpx;
				align-items: center;
				margin-bottom: 24rpx;
				.zanwei{
					width: 140rpx;
				}
				.name{
					font-size: 30rpx;
					font-weight: 500;
					color: #111111;
					margin-right: 50rpx;
				}
				input{
					font-size:30rpx;
					font-family:PingFang SC;
					// font-weight:500;
					color:rgba(205,205,205,1);
				}
				.code_btn{
					width: 150rpx;
					text-align: center;
					color: #CDCDCD;
					font-size: 24rpx;
					padding: 5rpx 10rpx;
					border-radius: 12rpx;
					border: 1rpx solid #FFFFFF;
				}
				.code_btn.active{
					border: 1rpx solid #FF792C;
					color: #FF792C;
				}
			}
			.submit_btn{
				width:708rpx;
				height:101rpx;
				line-height: 101rpx;
				text-align: center;
				color: #FFFFFF;
				font-weight: 500;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:51rpx;
				margin: 59rpx 0 0 21rpx;
			}
		}
	}
</style>
