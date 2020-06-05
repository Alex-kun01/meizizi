<template>
	<!-- 搜索 -->
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_search">
			<view class="search_box">
				<image @click="search" style="width: 31rpx;height: 30rpx;" src="../../static/index/sousuo.png" mode=""></image>
				<input type="text" v-model="searchValue" placeholder="神仙水" />
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
				v-for="(item, index) in hortList"
				:key="index"
				@click="gotoDetalus"
				>
					<image v-if="item.img" style="width: 18rpx;height: 24rpx;margin-right: 25rpx;" :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		
		<!-- 历史记录 -->
		<view class="menu_item">
			<view class="title">
				历史记录
			</view>
			<view class="list">
				<view class="item"
				v-for="(item, index) in hostoryList"
				:key="index"
				>
					<image v-if="item.img" style="width: 18rpx;height: 24rpx;margin-right: 25rpx;" :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
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
				v-for="(item, index) in usedList"
				:key="index"
				>
					<image v-if="item.img" style="width: 18rpx;height: 24rpx;margin-right: 25rpx;" :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
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
				hortList: [
					{
						img: '../../static/index/remen@2x(1).png',
						text: '杨幂同款包￥998'
					},
					{
						img: '../../static/index/remen.png',
						text: '杨幂同款包￥998'
					},
					{
						img: '../../static/index/remen.png',
						text: '潮牌 T 恤 3折起'
					},
					{
						img: '../../static/index/remen.png',
						text: '杨幂同款包￥998'
					},
					{
						img: '../../static/index/remen.png',
						text: '纸品清洁9.9元'
					},
					{
						img: '../../static/index/remen.png',
						text: '杨幂同款包￥998'
					},
					{
						img: '',
						text: '杨幂同款'
					},
					{
						img: '',
						text: '杨幂同款'
					},
					{
						img: '',
						text: '杨幂同款包'
					},
					{
						img: '',
						text: '杨幂同款'
					},
				],
				// 历史记录列表
				hostoryList: [
					{
						img: '',
						text: '口红 / 唇膏'
					},
					{
						img: '',
						text: '神仙水'
					},
					{
						img: '',
						text: '阿玛尼'
					},
					{
						img: '',
						text: 'ysl 小金条'
					},
				],
				// 常用分类列表
				usedList: [
					{
						img: '',
						text: '彩妆套装'
					},
					{
						img: '',
						text: '口红 / 唇膏'
					},
					{
						img: '',
						text: '眼部护理'
					},
					{
						img: '',
						text: '面膜'
					},
					{
						img: '',
						text: '精华'
					},
					{
						img: '',
						text: '男士护肤'
					},
					{
						img: '',
						text: '洗面奶'
					},
				]
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			search(){
				console.log(this.searchValue)
				uni.navigateTo({
					url: './productlist'
				})
			},
			// 热门搜索跳转详情
			gotoDetalus(){
				uni.navigateTo({
					url: './productlist'
				})
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
