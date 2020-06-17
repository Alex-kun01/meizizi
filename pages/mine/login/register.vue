<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 注册 -->
		<view class="title">
			手机号注册
		</view>
		<view class="box">
			<view class="item">
				<view class="l_item">
					<view class="name">
						推荐码
					</view>
					<input v-model="referralCode" type="text" placeholder="请输入推荐码" />
				</view>
				<view></view>
			</view>
			<view class="item">
				<view class="l_item">
					<view class="name">
						手机号
					</view>
					<input v-model="phone" type="text" placeholder="请输入手机号" />
				</view>
				<view></view>
			</view>
			
			<view class="item">
				<view class="l_item">
					<view class="name">
						验证码
					</view>
					<input v-model="captcha" type="text" placeholder="请输入验证码" />
				</view>
				<view class="r_item"
				v-if="isCaptchaOk"
				@click="getInCode"
				>
					获取验证码
				</view>
			</view>
		</view>
		
		<view class="bom_btn"
		@click="register"
		>
			注 册
		</view>
		<view class="gologin"
		@click="gotologin"
		>
			已有账号去登录
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				referralCode: '', // 推荐码
				phone: '17683059017', // 手机号
				captcha: '', // 验证码
			}
		},
		computed:{
			// 校验是否为11位有效手机号
			isCaptchaOk(){
				var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(this.phone)) {
					return false;
				} else {
					return true;
				}
			},
			// 是否具备提交条件
			isSubmitOk(){
				if(!this.referralCode || !this.phone || !this.captcha){
					return false
				}
				return true
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			// 注册按钮
			register(){
				let _this = this
				console.log('是否具备提交条件', this.isSubmitOk)
				if(!this.isSubmitOk){
					uni.showModal({
						title: '提示',
						content: '请检查注册信息是否填写全！'
					})
					return
				}
				uni.showLoading({
					title: '正在注册...'
				})
				uni.request({
					url: _this.$http + '/api/index/ifPhoneCode',
					method: 'POST',
					data:{
						phone: _this.phone,
						code: _this.captcha
					},
					success(res) {
						console.log('验证码校验', res)
						if(res.data.status === 200){
							uni.request({
								url: _this.$http + '/api/index/phoneRegister',
								method: 'POST',
								data: {
									phone: _this.phone,
									code: _this.referralCode
								},
								success(red) {
									console.log('手机号注册返回数据', red)
									if(red.data.status === 200){
										// 注册成功
										uni.hideLoading()
										uni.navigateTo({
											url: './login'
										})
									}else{
										uni.showModal({
											title: '提示',
											content: res.data.msg
										})
									}
								}
							})
						}else{
							uni.showModal({
								title: '提示',
								content: res.data.msg
							})
						}
					}
				})
			},
			// 获取验证码
			getInCode(){
				let _this = this
				uni.showLoading({
					title: '正在获取验证码...'
				})
				uni.request({
					url: _this.$http + '/api/index/getPhoneCode',
					method: 'POST',
					data: {
						phone: _this.phone,
						type: 2
					},
					success(res){
						console.log('获取验证码返回',res)
						uni.hideLoading()
					}
				})
			},
			gotologin(){
				uni.navigateTo({
					url:'./login'
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
			.title{
				width: 100%;
				box-sizing: border-box;
				padding: 56rpx 80rpx;
				font-size:48rpx;
				font-weight:bold;
				color:rgba(17,17,17,1);
			}
			.box{
				width: 100%;
				box-sizing: border-box;
				padding: 0 62rpx;
				.item{
					width: 100%;
					height: 80rpx;
					border-bottom: 1rpx solid #ddd;
					margin-bottom: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 20rpx;
					.l_item{
						display: flex;
						align-items: center;
						.name{
							font-size:28rpx;
							font-weight:500;
							color:rgba(17,17,17,1);
							margin-right: 30rpx;
						}
						input{
							font-size:30rpx;
							// font-weight:500;
							color:rgba(153,153,153,1);
						}
					}
					.r_item{
						width:208rpx;
						height:60rpx;
						line-height: 61rpx;
						text-align: center;
						border:1rpx solid rgba(202,202,202,1);
						font-size:24rpx;
						font-weight:bold;
						color:rgba(17,17,17,1);
						// border-top: 1rpx solid red;
					}
				}
				
			}
			.bom_btn{
				width:690rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				font-size:36rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
				margin: 43rpx 0 0 30rpx;
			}
			.gologin{
				font-size:24rpx;
				font-weight:500;
				color:rgba(17,17,17,1);
				margin: 36rpx 0 0 30rpx;
			}
			
		}
	}
</style>
