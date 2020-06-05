<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 商家注册 -->
		<view class="table_box">
			<view class="item img">
				<view class="title">
					<text>推荐码</text>
					<input type="text" v-model="merchantInfo.recCode" placeholder="请输入推荐码" />
				</view>
				<image src="../../../static/mine/saoma@4x.png" mode=""></image>
			</view>
			<view class="item">
				<view class="title">
					<text>姓名</text>
					<input type="text"  v-model="merchantInfo.name" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>电话</text>
					<input type="text"  v-model="merchantInfo.phone" placeholder="请输入电话" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<text>地址</text>
					<input type="text"  v-model="merchantInfo.address" placeholder="请输入地址" />
				</view>
			</view>
			<view class="address">
				<image src="../../../static/mine/dinwei@2x.png" mode=""></image>
				<text>成都市金牛区茶店子客运站金耀路18号</text>
			</view>
			
		</view>
		<!-- 门头照片 -->
		<view class="pic_box">
			<view class="title">
				上传门头照片
			</view>
			<view class="con_box">
				<view class="img_box">
					<view class="static">
						<image src="../../../static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-if="picShow1" :src="mentouPic1" mode=""></image>
				</view>
				<view class="img_box">
					<view class="static">
						<image src="../../../static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-if="picShow2" :src="mentouPic1" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="pic_box">
			<view class="title">
				上传营业执照
			</view>
			<view class="con_box">
				<view class="img_box">
					<view class="static">
						<image src="../../../static/mine/xiangji@2x.png" mode=""></image>
					</view>
					<image v-if="zhizhaoShow" :src="mentouPic1" mode=""></image>
				</view>
			</view>
		</view>
		<view class="submit_btn"
		@click="submitClick"
		>
			提交
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				picShow1: false, // 门头1图片是否展示
				mentouPic1: '', // 门头图片1地址
				picShow2: false,
				mentouPic2: '', // 门头图片2地址
				zhizhaoShow: false,
				merchantInfo:{
					zhizhao: '', // 执照图片地址
					recCode: '', //推荐码
					name: '', //姓名
					phone: '',
					address: ''
				}
				
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			// 提交按钮
			submitClick(){
				
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
			.table_box{
				width: 100%;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 0 24rpx 0 24rpx;
				.item{
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #eee;
					image{
						width: 28rpx;
						height: 28rpx;
					}
					.title{
						display: flex;
						text{
							font-size:30rpx;
							font-weight:500;
							color:rgba(51,51,51,1);
							display: inline-block;
							width: 120rpx;
						}
						input{
							font-size:26rpx;
							// font-weight:500;
							color:rgba(102,102,102,1);
						}
					}
				}
				.address{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					vertical-align: middle;
					image{
						width: 25rpx;
						height: 27rpx;
						margin-right: 24rpx;
					}
					font-size:26rpx;
					font-weight:500;
					color:rgba(102,102,102,1);
				}
				.item.img{
					justify-content: space-between;
				}
			}
			.pic_box{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 34rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.title{
					font-size:30rpx;
					font-weight:500;
					color:rgba(51,51,51,1);
					margin-bottom: 30rpx;
				}
				.con_box{
					display: flex;
					justify-content: space-between;
					.img_box{
						width:301rpx;
						height:181rpx;
						border-radius:12rpx;
						image{
							width: 100%;
							height: 100%;
						}
						.static{
							width: 100%;
							height: 100%;
							background:rgba(229,229,229,1);
							display: flex;
							justify-content: center;
							align-items: center;
							image{
								width: 62rpx;
								height: 54rpx;
							}
						}
					}
				}
			}
			.submit_btn{
				width:690rpx;
				height:91rpx;
				line-height: 91rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				font-size:36rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
				margin: 60rpx 30rpx;
			}
			
		}
	}
</style>
