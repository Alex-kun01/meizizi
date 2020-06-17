<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 版本更新 -->
		<view class="version">
			<image src="../../../static/mine/avatar.jpg" mode=""></image>
			<view class="name">
				美孜孜
			</view>
			<view class="num">
				V {{version}}
			</view>
		</view>
		<view class="btn"
		@click="gotoUpdate"
		>
			已是最新版本
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				versioninfo: '已是最新版本',
				version: '', // 版本信息
				isUpdate: false, // 是否存在更新
				updateUrl: '', // 
			}
		},
		onLoad(){
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			getData(){
				let _this = this
				uni.request({
					url: this.$http + '/api/index/edition',
					method: 'post',
					data: {type: 2},
					success(res){
						console.log('版本更新数据', res)
						if(res.data.status === 200){
							// 请求成功
							uni.getStorage({
								key: 'version',
								success(reg){
									console.log('本地res',reg.data)
									// 查询到版本信息  // 判断本地与请求的版本是否一致
									if(reg.data.version === res.data.data.version){
										// 版本一致 未更新
										console.log('一致，未更新')
										_this.versioninfo = '已是最新版本'
										_this.isUpdate = false
										_this.version = res.data.data.version
										
									}else{
										// 版本不一致 有更新
										console.log('有更新')
										_this.versioninfo = '下载更新'
										_this.isUpdate = true
										_this.updateUrl = res.data.data.url
									}
									
								},
								fail() {
									// 未查询到版本信息
									uni.setStorage({
										key: 'version',
										data: res.data.data
									})
									_this.version = res.data.data.version
								}
							})
						}else{
							// 
							uni.showModal({
								title: '提示',
								content: '请求服务器出错,请稍后再试...'
							})
						}
					}
				})
			},
			// 更新按钮
			gotoUpdate(){
				
				if(this.isUpdate){
					// 跳转更新
					location.href = 'http://' + this.updateUrl
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
			.version{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 137rpx;
				image{
					width: 267rpx;
					height: 265rpx;
					margin-bottom: 71rpx;
				}
				.name{
					margin-bottom: 27rpx;
					font-size: 32rpx;
					color: #000000;
					font-weight: 500;
				}
				.num{
					font-size: 24.5rpx;
					color: #000000;
					font-weight: 500;
				}
			}
			.btn{
				width:543rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				color: #FFFFFF;
				margin: 198rpx 0 0 104rpx;
			}
		}
	}
</style>
