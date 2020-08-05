<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 版本更新 -->
		<view class="version">
			<image :src="avatar" mode=""></image>
			<view class="name">
				美孜孜
			</view>
			<view class="num">
			   当前版本	V {{version}}
			</view>
			<view class="num">
			   最新版本	V {{newVersion}}
			</view>
		</view>
		<view class="btn"
		@click="gotoUpdate"
		>
			{{versioninfo}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				avatar: '../../../static/mine/tub.png', 
				versioninfo: '已是最新版本',
				version: '', // 版本信息
				newVersion: '',// 最新版本
				isUpdate: false, // 是否存在更新
				updateUrl: '', // 
				test: 'ooo'
			}
		},
		onLoad(){
			
		},
		onShow(){
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
			        console.log('客户端详情数据',JSON.stringify(wgtinfo));//客户端详情数据
			        console.log('应用版本号',wgtinfo.version);//应用版本号
					this.version = wgtinfo.version
					this.getData()
			})
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
							let newVersion = res.data.data.version // 获取到的版本号
							_this.newVersion = newVersion
							if(_this.version == newVersion){
								// 版本一致
								_this.versioninfo = '已是最新版本'
								_this.isUpdate = false
								_this.test = '版本一致'
							}else{
								// 版本不一致
								_this.versioninfo = '下载更新'
								_this.isUpdate = true
								_this.updateUrl = res.data.data.url
								_this.test = '版本不一致'
							}
						}else{
							// 
							uni.showModal({
								title: '提示',
								content:  res.data.msg
							})
						}
					}
				})
			},
			// 更新按钮
			gotoUpdate(){
				console.log('提交查看',this.isUpdate)
				if(!this.isUpdate){
					 plus.runtime.openURL(this.updateUrl)
				}else{
					uni.showModal({
						title: '提示',
						content: '当前已是最新版本！'
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
