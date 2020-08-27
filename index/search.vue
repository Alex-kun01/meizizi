<template>
	<!-- 搜索 -->
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_search">
			<view class="search_box">
				<image @click="search" style="width: 31rpx;height: 30rpx;" src="@/static/index/sosuo@2x.png" mode=""></image>
				<input focus confirm-type="search" @confirm="search()" type="text" bindconfirm="bindconfirm" v-model="searchValue" placeholder="搜索"/>
			</view>
			<view class="quxiao"
			@click="goback"
			>
				取消
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="menu_item">
			<view class="title">
				热门搜索
			</view>
			<view class="list">
				<view class="item"
				v-for="(item, index) in search_list"
				:key="index"
				@click="gotoDetalus(item,1)"
				>
					<image style="width: 18rpx;height: 24rpx;margin-right: 25rpx;" src="@/static/index/remen.png" mode=""></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<!-- 历史记录 -->
		<view class="menu_item">
			<view class="title">
				<text>历史记录</text>
				<image @click="clearhistory" src="@/static/mine/deletes.png" mode=""></image>
			</view>
			<view class="list">
				<view class="item"
				v-for="(item, index) in history_list"
				:key="index"
				@click="gotoDetalus(item,2)"
				>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<!-- 常用分类 -->
		<view class="menu_item">
			<view class="title">
				常用分类
			</view>
			<view class="list">
				<view class="item"
				v-for="(item, index) in common_list"
				:key="index"
				@click="gotoDetalus(item,3)"
				>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				searchValue: '', //搜索value
				// 热门列表
				search_list: [],
				// 历史记录列表
				history_list: [],
				// 常用分类列表
				common_list: []
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
					url: this.$http + '/api/search/keyword',
					method: 'GET',
					success(res) {
						console.log('搜索列表数据', res)
						if(res.data.status === 200){
							let {search_list, history_list, common_list} = res.data.data
							// 热门搜索列表
							_this.search_list = search_list
							// 历史记录列表
							_this.history_list = history_list
							// 常用分类列表
							_this.common_list = common_list
						}
					}
				})
			},
			// 清除历史记录
			clearhistory(){
				console.log('清除了')
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							uid: reg.data.uid
						}
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/goods/userDelSearch',
							method: 'POST',
							data: datas,
							success(res){
								uni.hideLoading()
								console.log('清除历史记录', res)
								if(res.data.status === 200){
									uni.showToast({
										title: '清除成功'
									})
								}else{
									uni.showModal({
										title: '提示',
										content: '清除失败'
									})
								}
							}
						})
					}
				})
			},
			// 搜索按钮
			search(){
				let _this = this
					console.log(this.$store.state.userInfo)
					let userInfo = this.$store.state.userInfo
					uni.request({
						url: this.$http + '/api/goods/userAddSearch',
						method: 'POST',
						data: {
							uid: userInfo.uid,
							value: this.searchValue
						},
						success(res){
							console.log('搜索按钮返回数据',res)
							if(res.data.status === 200){
								uni.navigateTo({
									url: './productlist?value=' + _this.searchValue + '&type=' + '2' 
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
			// 热门搜索跳转详情
			gotoDetalus(item,type){
				let title = item.title
				
				uni.navigateTo({
					url: './productlist?value=' + title + '&type=' + type
				})
			},
			testInsts(){
				// 添加垃圾代码
				let num = 1
				let mun1 = num * 1
				let mun2 = num * 2
				let mun3 = num * 3
				let mun4 = num * 4
				let mun5 = num * 5
				let mun6 = num * 6
				let mun7 = num * 7
				let mun8 = num * 8
				let mun9 = num * 9
				let mun10 = num * 10
				let mun11 = num * 11
				let mun12 = num * 12
				let muns = mun1+mun2+mun3+mun4+mun5+mun6+mun7+mun8+mun9+mun10+mun11+mun12
				console.log(muns)
			},
			goback(){
				uni.navigateBack({
					
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
		background-color: #FFFFFF;
		.content{
			width: 100%;
			min-height: 100vh;
			height: 100%;
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx 30rpx 0 30rpx;
			.top_search{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.search_box{
					width:587rpx;
					height:57rpx;
					background:rgba(238,238,238,1);
					box-sizing: border-box;
					padding: 0 30rpx;
					border-radius:27rpx;
					display: flex;
					align-items: center;
					image{
						margin-right: 30rpx;
					}
					input{
						font-size: 26rpx;
						color: #5E5E5E;
						font-weight: 500;
					}
				}
				.quxiao{
					font-size:26rpx;
					font-weight:500;
					color:rgba(41,41,41,1);
				}
			}
			.menu_item{
				margin-top: 50rpx;
				.title{
					font-size: 34rpx;
					color: #222222;
					font-weight: 500;
					display: flex;
					align-items: center;
					justify-content: space-between;
					image{
						width: 25rpx;
						height: 30rpx;
					}
				}
				.list{
					margin-top: 30rpx;
					.item{
						// width:276px;
						height:48rpx;
						line-height: 48rpx;
						background:rgba(245,245,245,1);
						border-radius:24rpx;
						display: inline-block;
						margin-right: 24rpx;
						box-sizing: border-box;
						padding: 0 33rpx;
						font-size: 20rpx;
						color: #323232;
						font-weight: 500;
						margin-bottom: 6rpx;
					}
				}
			}
			
		}
	}
</style>
