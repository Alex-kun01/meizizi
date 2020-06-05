<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<!-- 评价 -->
		<view class="top_bar">
			<view class="img"
			@click="goback"
			>
				<image src="../../static/index/fanhui@2x.png" mode=""></image>
			</view>
			<text>发表评价</text>
			<text @click="submitClick" class="r_text">发布</text>
		</view>
		<view class="white_box">
			<view class="start_box">
				<view class="title">评分</view>
				<view class="start">
					<image
					v-for="item in 5"
					:key="item"
					src="../../static/shopcart/xingxing@2x.png"
					mode=""
					@click="changeIndex(item)"
					></image>
					<view class="start_float">
						<image
						v-for="stat in start"
						:key="stat"
						src="../../static/shopcart/xingx@2x.png"
						mode=""
						@click="changeIndex(stat)"
						></image>
					</view>
				</view>
			</view>
			<view class="input_box">
				<textarea  maxlength='200' v-model="textValue"  placeholder="上传图片可以让更多人看到您的评论哟~" />
				<view class="text">
					{{valueLength}}/200
				</view>
			</view>
			<view class="pic_upload">
				<image src="../../static/shopcart/shangchuantup@2x.png" mode=""></image>
			</view>
		</view>
		<view class="bom_btn">
			<text>匿名点评</text>
			<view class="yuan"
			@click="changeanonymous"
			>
				<image v-if="anonymous" src="../../static/index/gouxuan@2x.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				start: 0, // 星星数
				textValue: '', 
				anonymous: false, // 是否匿名评论
			}
		},
		computed:{
			valueLength(){
				return this.textValue.length
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			// 评分选择星星
			changeIndex(index){
				console.log(index)
				this.start = index
			},
			// 选择是否匿名
			changeanonymous(){
				this.anonymous = !this.anonymous
			},
			//发布评价
			submitClick(){
				if(this.start === 0){
					uni.showModal({
						title: '提示',
						content: '请评分'
					})
					return
				}
				uni.showToast({
					title: '发布成功'
				})
				setTimeout(()=>{
					uni.navigateBack({
						
					})
				}, 1000)
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
		height: 100%;
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100%;
			background-color: #F4F4F4;
			.top_bar{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				display: flex;
				justify-content: space-between;
				text{
					font-size:34rpx;
					font-weight:bold;
					color:rgba(17,17,17,1);
				}
				.r_text{
					display: inline-block;
					width: 80rpx;
					height: 100%;
					font-size:24rpx;
					// font-weight:500;
					color:rgba(102,102,102,1);
					text-align: right;
				}
				.img{
					width: 80rpx;
					height: 100%;
					text-align: left;
					image{
						width: 17rpx;
						height: 32rpx;
					}
				}
				
			}
			.white_box{
				width: 100%;
				box-sizing: border-box;
				background-color: #FFFFFF;
				padding: 24rpx;
				.start_box{
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;
					.title{
						font-size:34rpx;
						font-weight:500;
						color:rgba(17,17,17,1);
						margin-right: 50rpx;
					}
					.start{
						// background-color: pink;
						position: relative;
						image{
							width: 37rpx;
							height: 35rpx;
							margin-right: 22rpx;
						}
						.start_float{
							position: absolute;
							top: 0;
							left: 0;
						}
					}
				}
				.input_box{
					width:690rpx;
					height:244rpx;
					background:rgba(238,238,238,1);
					border-radius:12rpx;
					box-sizing: border-box;
					padding: 25rpx;
					textarea{
						width: 100%;
						height: 80%;
						font-size:24rpx;
						// font-weight:500;
						color:rgba(153,153,153,1);
					}
					.text{
						text-align: right;
						font-size:24rpx;
						// font-weight:500;
						color:rgba(153,153,153,1);
						
					}
				}
				.pic_upload{
					width: 100%;
					height: 130rpx;
					margin: 30rpx 0;
					image{
						width: 130rpx;
						height: 130rpx;
					}
				}
			}
			.bom_btn{
				width:750rpx;
				height:87rpx;
				box-sizing: border-box;
				padding: 24rpx;
				background:rgba(255,255,255,1);
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				text{
					font-size:30rpx;
					font-weight:bold;
					color:rgba(17,17,17,1);
				}
				.yuan{
					width:35rpx;
					height:35rpx;
					border:2rpx solid rgba(206,206,206,1);
					border-radius:50%;
					position: relative;
					image{
						width: 35rpx;
						height: 35rpx;
						position: absolute;
						top: 0;
					}
				}
			}
		}
	}
</style>
