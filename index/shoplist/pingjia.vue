<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 评价 -->
		<view class="top_bar">
			<view class="title"
			@click="changeTap"
			>
				<text>按分类看评价</text>
				<image style="width: 17rpx;height: 9rpx;" src="@/static/index/xiala@7x.png" mode=""></image>
			</view>
			<view class="tap_list"
			v-if="isShow"
			>
				<view :class="{item:true, active: isActive === 1}"
				@click="chooseTap(1)"
				>
					好评{{'(' + haoping + ')'}}
				</view>
				<view :class="{item:true, active: isActive === 2}"
				@click="chooseTap(2)"
				>
					中评{{'(' + zhongping + ')'}}
				</view>
				<view :class="{item:true, active: isActive === 3}"
				@click="chooseTap(3)"
				>
					差评{{'(' + chaping + ')'}}
				</view>
			</view>
		</view>
		
		<view class="show_list"
		v-if="showList.length != 0"
		>
			<view class="item"
			v-for="(item, index) in showList"
			:key="index"
			>
				<view class="top_name">
					<image style="width: 35rpx;height: 35rpx;margin-right: 13rpx;" :src="item.avatar" mode=""></image>
					<text style="font-weight: 500;color: #000000;">{{item.nickname}}</text>
				</view>
				<view class="title">
					<text>{{item.add_time}}</text>
				</view>
				<view class="text">
					{{item.comment}}
				</view>
				<view class="piv_lis">
					<image
					v-for="(pic, inx) in item.picture || []"
					:key="inx"
					 :src="pic" mode=""></image>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isShow: true,
				isActive: 1, // 1好评 2中评 3差评	
				opt: {
					id: 19
					
				},
				page: 1, // 页数
				limit: 10, // 一页条数
				isLoading: true, 
				tapList: [
					'好评',
					'颜色漂亮(628)',
					'颜色漂亮(628)',
				],
				showList: [],
				haoping: 0,
				zhongping: 0,
				chaping: 0,
			}
		},
		onLoad(opt){
			console.log('评价opt', opt)
			this.opt = opt
			this.getData()
		},
		onShow(){
			
		},
		methods:{
			getData(){
				let _this = this
				uni.request({
					url: this.$http + '/api/goods/evaList',
					method: 'POST',
					data: {
						type: _this.isActive,
						gid: _this.opt.id,
						page: _this.page,
						limit: _this.limit
					},
					success(res){
						console.log('评价列表返回数据',res)
						if(res.data.status === 200){
							let {ex_count,in_count,di_count,eva_list} = res.data.data
								
							_this.haoping = ex_count
							_this.zhongping = in_count
							_this.chaping = di_count
							
							// _this.haoping = res.data.data.ex_count
							// _this.zhongping = res.data.data.in_count
							// _this.chaping = res.data.data.di_count
							// let arr = res.data.data.eva_list
							
							if(_this.showList.length == 0){
								_this.showList = eva_list
							}else{
								_this.showList = _this.showList.concat(eva_list) 
							}
							
							
							
						}else{
							uni.showModal({
								title: '提示',
								content: res.data.msg
							})
						}
						
					}
				})
			},
			changeTap(){
				this.isShow = !this.isShow
			},
			chooseTap(index){
				this.showList = []
				this.isActive = index
				this.getData()
			},
			onReachBottom(e){
				console.log('触底了')
				this.isLoading = true
				this.page++
				this.getData(this.opt)
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				// height: 234rpx;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				.title{
					font-size: 28rpx;
					font-weight: 500;
					color: #6B6B6B;
					display: flex;
					align-items: center;
					margin-bottom: 15rpx;
					image{
						margin-left: 15rpx;
					}
				}
				.tap_list{
					width: 100%;
					height: 70rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.item{
						width:211rpx;
						height:59rpx;
						line-height: 59rpx;
						text-align: center;
						border:1rpx solid rgba(217,217,217,1);
						border-radius:12rpx;
						color: #FF792C;
						font-weight: 500;
						font-size: 24rpx;
						margin-bottom: 30rpx;
					}
					.item.active{
						border:1rpx solid #FF792C;
					}
				}
			}
			.show_list{
				width: 100%;
				background-color: #FFFFFF;
				margin-top: 30rpx;
				box-sizing: border-box;
				padding: 24rpx;
				.item{
					width: 100%;
					.top_name{
						box-sizing: border-box;
						padding:  0 17rpx;
						display: flex;
						align-items: center;
						image{
							border-radius: 50%;
							
						}
						text{
							font-size: 22rpx;
							color: #969696;
						}
					}
					.title{
						color: #666666;
						font-size: 22rpx;
						font-weight: 500;
						box-sizing: border-box;
						padding-left: 70rpx;
						margin: 15rpx 0;
					}
					.text{
						box-sizing: border-box;
						padding: 0 24rpx;
						// font-weight: 500;
						font-size: 26rpx;
						color: #99999;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2; //行数
						-webkit-box-orient: vertical;
						margin-bottom: 20rpx;
					}
					.piv_lis{
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 30rpx;
						image{
							width: 340rpx;
							height: 271rpx;
						}
					}
				}
			}
			
		}
	}
</style>
