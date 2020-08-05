<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_bar">
			<image @click="goback" src="../../../static/index/fanhui@3x.png" mode=""></image>
			<view class="con">
				{{position}}
			</view>
			<text></text>
		</view>
		<!-- 市级代理 -->
		<view class="search_box">
			<image src="../../../static/index/sosuo@2x.png" mode=""></image>
			<input confirm-type="search" @confirm="search()" type="text" v-model="searchValue" />
		</view>
		<!-- 列表 -->
		<view class="show_list">
			<view class="show_item"
			v-for="(item,index) in showList"
			:key="index"
			>
				<view class="item_left">
					<image :src="item.avatar" mode=""></image>
					<view class="contents">
						<text style="color: #000000;">{{item.nickname}}</text>
						<text v-if="item.position === 1">职位:超级管理员</text>
						<text v-if="item.position === 2">职位:总经理</text>
						<text v-if="item.position === 3">职位:总监</text>
						<text v-if="item.position === 4">职位:省代理</text>
						<text v-if="item.position === 5">职位:业务员</text>
						<text v-if="item.position === 6">职位:服务商</text>
						<text v-if="item.position === 7">职位:物流商</text>
						<text v-if="item.position === 8">职位:加盟店</text>
						<text v-if="item.position === 9">职位:会员消费者</text>
						<text v-if="item.position === 10">职位:普通消费者</text>
						<text v-if="item.position === 11">职位:厂家</text>
						<text>管理区域：{{item.manag_area}}</text>
					</view>
				</view>
				<view class="right_btn"
					@click="gotoRenmin(item)"
				>
					任命
				</view>
				
			</view>
			<view v-if="isLoading" class="loading">
				加载中...
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isLoading: false,
				page: 1,
				limit: 10,
				searchValue: '',
				position: '',
				page: 1,
				limit: 7,
				opt: {},
				showList: [],
			}
		},
		onLoad(opt){
			console.log('opt',opt)
			this.opt = opt 
			let pos = opt.position || false
			switch(+pos){
				case 1 :
				this.position = '超级管理员'
				break;
				case 2 :
				this.position = '总经理'
				break;
				case 3 :
				this.position = '总监'
				break;
				case 4 :
				this.position = '省代理'
				break;
				case 5 :
				this.position = '业务员'
				break;
				case 6 :
				this.position = '服务商'
				break;
				case 7 :
				this.position = '物流商'
				break;
				case 8 :
				this.position = '加盟店'
				break;
				case 9 :
				this.position = '会员消费者'
				break;
				case 10 :
				this.position = '普通消费者'
				break;
				case 11 :
				this.position = '厂家'
				break;
			}
		},
		onShow(){
			this.showList = []
			this.getData()
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							position: _this.opt.position,
							page: _this.page,
							limit: _this.limit,
							content: _this.searchValue
						}
						console.log('查看参数',datas)
						uni.request({
							url: _this.$http + '/api/team/teamPositionList',
							method: 'POST',
							data: datas,
							success(res){
								_this.isLoading = false
								console.log('团队管理成员数据',res)
								if(res.data.status === 200){
									if(_this.showList.length === 0){
										_this.showList = res.data.data
									}else{
										_this.showList = _this.showList.concat(res.data.data)
									}
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
			search(){
				this.showList = []
				this.getData()
			},
			goback(){
				uni.navigateBack({
					
				})
			},
			gotoRenmin(item){
				console.log('item',item)
				uni.navigateTo({
					url: './appointment?id=' + item.id
				})
			},
			onReachBottom(e){
				console.log('触底了')
				this.isLoading = true
				this.page++
				this.getData()
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
		height: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			min-height: 100vh;
			height: 100%;
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 24rpx;
				.con{
					font-size: 36rpx;
					font-weight: 500;
				}
				image{
					width: 22rpx;
					height: 36rpx;
				}
			}
			.right_btn{
				width:76rpx;
				height:35rpx;
				line-height: 35rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:18rpx;
				font-size:22rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
				padding: 0 14rpx;
			}
			.search_box{
				width: 600rpx;
				height: 60rpx;
				// background-color: #FFFFFF;
				border: 1rpx solid black;
				border-radius: 30rpx;
				margin-left: 75rpx;
				margin-top: 24rpx;
				box-sizing: border-box;
				padding: 2rpx 20rpx;
				display: flex;
				align-items: center;
				input{
					width: 500rpx;
					height: 60rpx;
					margin-left: 15rpx;
					font-size: 26rpx;
					// background-color: #eee;
				}
				image{
					width: 30rpx;
					height: 30rpx;
					// margin-top: 15rpx;
				}
			}
			.show_list{
				margin-top: 24rpx;
				.loading{
					width: 100%;
					height: 70rpx;
					background-color: #eee;
					line-height: 70rpx;
					text-align: center;
					font-size: 28rpx;
				}
				.show_item{
					width:702rpx;
					height:180rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					margin-left: 24rpx;
					margin-bottom: 12rpx;
					box-sizing: border-box;
					padding: 22rpx 18rpx;
					display: flex;
					justify-content: space-between;
					.item_left{
						display: flex;
					}
					image{
						width: 124rpx;
						height: 121rpx;
						min-width: 124rpx;
					}
					.contents{
						width: 430rpx;
						display: flex;
						flex-direction: column;
						margin-left: 25rpx;
						justify-content: space-between;
						text{
							font-size:24rpx;
							font-weight:500;
							color:rgba(102,102,102,1);
						}
					}
				}
			}
		}
	}
</style>
