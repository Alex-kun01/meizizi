<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 邀请码 -->
		<view class="title">
			请输入您的邀请码
		</view>
		<view class="input">
			<input type="text" placeholder="请输入邀请码" />
			<image src="../../../static/index/saoyisao.png" mode=""></image>
		</view>
		
		<view class="bom_btn"
		@click="submitClick"
		>
			确定
		</view>
		<!-- 弹出层 -->
		<view class="float_box"
		@touchmove.stop.prevent="moveHandle" 
		v-if="siShowFloat"
		>
			<view class="box">
				<view class="titles">
					确认邀请人
				</view>
				<view class="inva_box">
					<image src="../../../static/mine/avatar.jpg" mode=""></image>
					<view class="con">
						<view class="phone">
							155***4133
						</view>
						<view class="tap">
							邀请您加入美孜孜
						</view>
					</view>
				</view>
				<view class="btn_box">
					<view class="btn_l"
					@click="btnClick('on')"
					>
						取消
					</view>
					<view class="btn_r"
					@click="btnClick('ok')"
					>
						确认
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				siShowFloat: false, // 是否展示弹出层
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			// 提交
			submitClick(){
				this.siShowFloat = true
			},
			moveHandle(){},
			btnClick(target){
				this.siShowFloat = false
				if(target == 'ok'){
					// 确认
					uni.showToast({
						title: '已确认'
					})
				}else{
					// 取消
					uni.showToast({
						title: '已取消'
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
			height: 100vh;
			background-color: #F4F4F4;
			.title{
				width: 100%;
				box-sizing: border-box;
				padding: 120rpx 0 103rpx 81rpx;
				font-size:48rpx;
				font-weight:bold;
				color:rgba(17,17,17,1);
			}
			.input{
				width: 100%;
				box-sizing: border-box;
				padding: 0 96rpx 103rpx 81rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image{
					width: 41rpx;
					height: 42rpx;
				}
				input{
					color: #999999;
					font-size: 30rpx;
				}
			}
			.bom_btn{
				width:690rpx;
				height:91rpx;
				text-align: center;
				line-height: 91rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:46rpx;
				font-size:36rpx;
				font-weight:500;
				color:rgba(255,255,255,1);
				margin: 96rpx 0 0 30rpx;
			}
			.float_box{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.5);
				position: absolute;
				top: 0;
				.box{
					width:628rpx;
					height:317rpx;
					background:rgba(255,255,255,1);
					border-radius:12rpx;
					position: absolute;
					top: calc(50% - 163rpx);
					left: calc(50% - 314rpx);
					box-sizing: border-box;
					padding: 36rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					.titles{
						font-size:34rpx;
						font-weight:500;
						color:rgba(17,17,17,1);
						margin-bottom: 40rpx;
					}
					.btn_box{
						width: 100%;
						box-sizing: border-box;
						padding: 0 100rpx;
						margin-top: 30rpx;
						display: flex;
						justify-content: space-between;
						font-size:34rpx;
						font-weight:500;
						color:rgba(17,17,17,1);
						.btn_r{
							color: #FF792C;
						}
					}
					.inva_box{
						display: flex;
						align-items: center;
						image{
							width:102rpx;
							height:102rpx;
							border-radius:50%;
							margin-right: 20rpx;
						}
						.con{
							.phone{
								font-size:34rpx;
								font-weight:500;
								color:rgba(17,17,17,1);
								margin-bottom: 15rpx;
							}
							.tap{
								font-size:24rpx;
								font-weight:500;
								color:rgba(153,153,153,1);
							}
						}
					}
				}
			}
		}
	}
</style>