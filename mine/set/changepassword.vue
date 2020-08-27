<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 修改密码 -->
		<view class="top"></view>
		<view class="item">
			<view class="title">
				请输入当前登录密码
			</view>
			<input type="password" v-model="oldpassword" placeholder="请输入当前登录密码" />
		</view>
		<view class="item">
			<view class="title">
				确认新密码
			</view>
			<input type="password"  v-model="newPassword" placeholder="确认新密码" />
		</view>
		<view class="item">
			<view class="title">
				再次确认新密码
			</view>
			<input type="password" v-model="alignPassword" placeholder="再次确认新密码" />
		</view>
		<view class="tit_info">
			必须是8-20个英文字母、数字或者字符(除空格),且字 母、数字和标点符号至少包含两种
		</view>
		<!-- 提交按钮 -->
		<view class="submit_btn"
		@click="submitClick"
		>
			下一步
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
					oldpassword: '',
					newPassword: '',
					alignPassword:''
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		computed:{
			// 判断两次输入密码是否一致
			isPasswordOk(){
				if(this.newPassword === this.alignPassword){
					return true
				}else{
					return false
				}
			},
			// 判断密码格式是否符合条件
			isPasswordRules(){
				var reg = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/
				return reg.test(this.newPassword)
			}
		},
		methods:{
			submitClick(){
				let _this = this
				console.log(this.passwordInfo)
				if(!this.isPasswordRules){
					uni.showModal({
						title: '提示',
						content: '密码必须是8-20位，数字或字符，标点符号至少包含两种'
					})
					return
				}
				
				if(!this.isPasswordOk) {
					uni.showModal({
						title: '提示',
						content: '两次输入的密码不一致'
					})
					return
				}
				
				uni.getStorage({
					key: 'userInfo',
					success(res){
						console.log('获取到本地数据',res)
						let data = {
								token: res.data.token,
								password: _this.oldpassword,
								new_password: _this.newPassword
							}
							uni.showLoading({
								title: ''
							})
							uni.request({
								url: _this.$http + '/api/index/editPassword',
								method: 'post',
								data: data,
								success(res) {
									console.log('修改密码返回数据', res)
									if(res.data.status === 200){
										uni.showToast({
											title: '修改成功'
										})
										uni.hideLoading()
										setTimeout(()=>{
											uni.switchTab({
												url: '../../pages/mine/mine'
											})
										}, 1000)
									}else{
										uni.showModal({
											title: '提示',
											content: res.data.msg
										})
									}
								}
							})
					},
					fail() {
						uni.showModal({
							title: '提示',
							content: '用户数据获取失败'
						})
					}
				})
				return
				
				
				
				uni.showToast({
					title:'修改成功'
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
				height: 77rpx;
				box-sizing: border-box;
				padding: 0 24rpx;
				background-color: #FFFFFF;
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;
				.title{
					font-weight: 500;
					font-size: 30rpx;
					color: #111111;
					margin-right: 28rpx;
				}
				input{
					font-size: 30rpx;
					color: #C8C8C8;
				}
			}
			.tit_info{
				width: 100%;
				box-sizing: border-box;
				padding: 0 24rpx;
				font-size: 26rpx;
				color: #707070;
			}
			.submit_btn{
				width:708rpx;
				height:101rpx;
				line-height: 101rpx;
				text-align: center;
				color: #FFFFFF;
				font-weight: 500;
				background:rgba(255,69,2,1);
				border-radius:51rpx;
				margin: 59rpx 0 0 21rpx;
			}
		}
	}
</style>
