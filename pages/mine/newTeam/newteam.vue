<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<view class="topbar"></view>
		<!-- 新 团队管理 -->
		<view class="item"
		v-for="(item,index) in showList"
		:key="index"
		@click="gotoInfo(item)"
		>
			<view class="left">
				{{item.type}}
			</view>
			<view class="right">
				<text>{{item.count}}个</text>
				<image v-if="item.position !== 9" src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {myMixins} from '@/components/mixins.js'
	export default {
		mixins: [myMixins],
		data () {
			return {
				showList: []
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.getData()
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token
						}
						console.log('查看参数',datas)
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/team/teamAdmin',
							method: 'POST',
							data: datas,
							success(res){
								uni.hideLoading()
								console.log('新团队管理数据', res)
								if(res.data.status === 200){
									_this.showList = res.data.data
								}else{
									uni.showModal({
										title: '提示',
										content: res.data.msg
									})
								}
							}
						})
					}
				})
			},
			gotoInfo(item){
				console.log('item',item.position)
				let num = item.position
				let url = ''
				switch(num){
					case 1:
				}
				// 加盟店跳转不一样
				if(num == 8){
					url = './recommend?position=' + num
				}
				// 会员不能跳转
				else if(num == 9){
					return
				}
				else{
					url = './municipal?position=' + num
				}
				uni.navigateTo({
					url: url
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
			.topbar{
				width: 100%;
				height: 24rpx;
				background-color: #F4F4F4;
			}
			.item{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 5rpx 24rpx;
				background-color: #FFFFFF;
				border-bottom: 1rpx solid #AAAAAA;
				.left{
					font-size:30rpx;
					font-weight:500;
					color:rgba(12,20,24,1);
				}
				.right{
					display: flex;
					align-items: center;
					font-size: 30rpx;
					color: #999;
					image{
						width: 23rpx;
						height: 32rpx;
						margin-left: 10rpx;
					}
				}
			}
			.item.first{
				margin-top: 24rpx;
			}
		}
	}
</style>
