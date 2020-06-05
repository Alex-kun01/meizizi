<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 设置密码 -->
		<view class="top"></view>
		<view class="item">
			<view class="name">
				密 码
			</view>
			<input type="password" v-model="password" placeholder="请输入密码" />
			<view class="zanwei"></view>
		</view>
		<view class="item">
			<view class="name">
				确认密码	
			</view>
			<input type="password" v-model="alignPassword" placeholder="确认新密码" />
			<view class="zanwei"></view>
		</view>
		<view class="tit_info">
			必须是8-20个英文字母、数字或者字符(除空格),且字 母、数字和标点符号至少包含两种
		</view>
		<view class="submit_btn" @click="submitClick">
			保存
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				password: '', // 密码
				alignPassword: '', // 确认密码
			}
		},
		computed:{
			// 判断两次输入密码是否一致
			isPasswordOk(){
				if(this.password === this.alignPassword){
					return true
				}else{
					return false
				}
			},
			// 判断密码格式是否符合条件
			isPasswordRules(){
				var reg = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/
				return reg.test(this.password)
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			submitClick(){
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
				margin: 59rpx 0  21rpx;
			}
			.tit_info{
				width: 100%;
				box-sizing: border-box;
				padding: 0 24rpx;
				font-size: 26rpx;
				color: #707070;
			}
		}
	}
</style>
