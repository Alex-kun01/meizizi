<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 登录 -->
		<view class="title">
			<text v-if="loginType === 1">密码登录</text>
			<text v-else>验证码登录</text>
			
		</view>
		<view class="box">
			<view class="item">
				<view class="l_item">
					<view class="name">
						手机号
					</view>
					<input type="text" placeholder="请输入手机号" v-model="phone" />
				</view>
				<view></view>
			</view>
			
			<view class="item" v-if="loginType === 1">
				<view class="l_item">
					<view class="name">
						密 码
					</view>
					<input type="password" placeholder="请输入密码" v-model="password" />
				</view>
				<view></view>
			</view>
			
			<view class="item" v-else>
				<view class="l_item">
					<view class="name">
						验证码
					</view>
					<input type="text" placeholder="请输入验证码" v-model="invitationCode" />
				</view>
				<view class="r_item"
				v-if="phoneIsOk"
				@click="getinvitation"
				>
					获取验证码
				</view>
			</view>
			
		</view>
		
		<view class="bom_btn" @click="loginClick">
			登录
		</view>
		<view class="gologin"
		>
			<text @click="changeLoginType(2)" v-if="loginType === 1">验证码登录</text>
			<text @click="changeLoginType(1)" v-else>密码登录</text>
			<text @click="gotoregin" style="color: #007AFF;">去注册</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				loginType: 1, // 1账号密码登录 2 验证码登录
				phone: '18080498101', //手机号
				password: 'abc201200', //密码
				invitationCode: '', // 验证码
			}
		},
		computed:{
			// 校验是否为11位有效手机号
			phoneIsOk(){
				var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(this.phone)) {
					return false;
				} else {
					return true;
				}
			}
		},
		onLoad(){
			
		},
		onReady(){
			// 判断是否登录
			this.isLOgin()
		},
		onShow(){
			
		},
		methods:{
			// 获取验证码
			getinvitation(){
				let _this = this
				// 校验手机号
				if(!this.phoneIsOk){
					uni.showModal({
						title: '提示',
						content: '请输入正确的手机号'
					})
					return
				}
				// 获取验证码
				uni.showLoading({
					title: '正在获取验证码...'
				})
				uni.request({
					url: _this.$http + '/api/index/getPhoneCode',
					method: 'POST',
					data:{
						phone: _this.phone,
						type: 1
					},
					success(acpres){
						console.log('获取验证码返回数据',acpres)
						if(acpres.data.status != 200){
							uni.showLoading({
								title: '提示',
								content: '验证码获取失败！'
							})
						}
						uni.hideLoading()
					}
				})
				
			},
			changeLoginType(index) {
				this.loginType = index
			},
			// 跳转注册页
			gotoregin(){
				uni.navigateTo({
					url: './chooseregin'
				})
			},
			// 判断是否登录
			isLOgin(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						// 验证token
						uni.request({
							url: _this.$http + '/api/index/verToken',
							method: 'POST',
							data: {
								token: res.data.token
							},
							success(reg){
								console.log('token校验', reg)
								if(reg.data.status === 200){
									// token校验成功
									uni.switchTab({
										url: '../../index/index'
									})
								}else{
									// token校验失败
									uni.showModal({
										title: '提示',
										content: '登录已过期，请重新登录！'
									})
								}
							}
						})
					},
					fail(res) {
						console.log('判断未登录')
					}
				})
			},
			//登录按钮
			loginClick(){
				let _this = this
				let data = {
					username: this.phone
				}
				
				// 账号密码登录
				if(this.loginType === 1){
					data.password = this.password
					if(!data.username || !data.password) uni.showModal({
						title:'提示',
						content: '用户名或密码不正确！'
					})
					console.log('data',data)
					uni.request({
						url: this.$http + '/api/index/login',
						method:'post',
						data: data,
						success(res) {
							console.log('密码登录res',res)
							if(res.data.status === 200){
								console.log('密码用户信息',res.data.data)
								_this.$store.commit('setUserInfo', res.data.data)
								console.log('l',_this.$store.state.userInfo)
								uni.setStorage({
									key: 'userInfo',
									data: res.data.data
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
									content: res.data.msg
								})
							}
						}
					})
				}
				// 验证码登录
				if(this.loginType === 2){
					if(!_this.invitationCode){
						uni.showModal({
							title: '提示',
							content: '请输入验证码！'
						})
						return
					}
					// 判断验证码
					uni.request({
						url: _this.$http + '/api/index/ifPhoneCode',
						method: 'POST',
						data: {
							phone: _this.phone,
							code: _this.invitationCode
						},
						success(reh){
							console.log('判断验证码返回',reh)
							if(reh.data.status === 200){
								// 校验验证码
								uni.request({
									url: _this.$http + '/api/index/phoneLogin',
									method: 'POST',
									data:{
										phone: _this.phone
									},
									success(backres){
										console.log('验证码用户信息', backres.data.data)
										if(backres.data.status === 200){
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
								
							}else{
								uni.showModal({
									title: '提示',
									content: '验证码校验失败'
								})
							}
						}
					})
				}
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
					height: 70rpx;
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
						height:61rpx;
						line-height: 61rpx;
						text-align: center;
						border:1rpx solid rgba(202,202,202,1);
						font-size:24rpx;
						font-weight:bold;
						color:rgba(17,17,17,1);
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
				margin: 36rpx 30rpx 0 30rpx;
				box-sizing: border-box;
				
				display: flex;
				justify-content: space-between;
			}
			
		}
	}
</style>
