<template>
	<view class="content">
		<!-- 提现 -->
		<view class="menu_box">
			<view :class="{item:true, active: isActive === 1}"
			@click='changeIndex(1)'
			>
				人工提现
			</view>
			<view :class="{item:true, active: isActive === 2}"
			@click='changeIndex(2)'
			>
				支付宝
			</view>
			<view :class="{item:true, active: isActive === 3}"
			@click='changeIndex(3)'
			>
				银行卡
			</view>
		</view>
		<view class="box_top">
			<view class="card"
			v-if="isActive === 3"
			>
				<text>到账银行卡</text>
				<text>工商银行(8090)</text>
				<image src="@/static/mine/gengduo@2x.png" mode=""></image>
			</view>
			<view class="title">
				提现金额
			</view>
			<view class="input">
				<text>￥</text>
				<input type="text" v-model="priceValue" placeholder="请输入提现金额" />
			</view>
			<view class="yue">
				<text>当前可提现余额{{opt.now_money}}元</text>
				<text @click="allTiXianClick" style="color: #FF792C;">全部提现</text>
			</view>
		</view>
		<!-- 充值 -->
		<view class="top_btn"
		@click="submit"
		>
			提现
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				priceValue: '', //提现输入值
				isActive: 1, // 提现方式 1微信 2支付宝 3银行卡
				opt:{}
			}
		},
		onLoad(opt){
			this.opt = opt
		},
		onShow(){
			
		},
		methods:{
			// 全部提现事件
			allTiXianClick(){
				this.priceValue = this.opt.now_money
			},
			// 是否具备提交条件
			isReady(){
				return this.priceValue > this.opt.now_money
			},
			// 提现
			submit(){
				let _this = this
				console.log(this.isReady())
				
				if(this.isReady()){
					uni.showModal({
						title: '提示',
						content: '提现金额不得超过可提现金额！'
					})
					return
				}else if(!this.priceValue){
					uni.showModal({
						title: '提示',
						content: '请输入提现金额！'
					})
					return
				}
				else{
					uni.getStorage({
						key: 'userInfo',
						success(reg){
							let datas = {
								token: reg.data.token,
								money: _this.priceValue
							}
							uni.request({
								url: _this.$http + '/api/team/withdrawal',
								method: 'POST',
								data: datas,
								success(res){
									console.log('提现返回数据',res)
									if(res.data.status === 200){
										uni.showToast({
											title: '操作成功！'
										})
										setTimeout(() =>{
											uni.navigateBack({})
										},1000)
									}
								}
							})
						}
					})
				}
			},
			changeIndex(index){
				if(index != 1){
					uni.showModal({
						title: '敬请期待...'
					})
					return
				}
				this.isActive = index
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
			height: 100vh;
			background-color: #F4F4F4;
			.menu_box{
				width: 100%;
				height: 70rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 0 24rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 24rpx;
				
				.item{
					height: 100%;
					line-height: 70rpx;
					font-size:28rpx;
					font-weight:500;
					color:rgba(51,51,51,1);
					border-bottom: 4rpx solid #FFFFFF;
				}
				.item.active{
					border-bottom: 4rpx solid #FF792C;
					color: #FF792C;
				}
			}
			.box_top{
				width:750rpx;
				// height:238rpx;
				background:rgba(255,255,255,1);
				border-radius:12rpx;
				box-sizing: border-box;
				padding: 40rpx 63rpx;
				.card{
					width:749rpx;
					height:90rpx;
					background:rgba(252,252,252,1);
					border-bottom: 1rpx solid #eee;
					margin-bottom: 24rpx;
					text{
						font-size:26rpx;
						font-weight:500;
						color:rgba(17,17,17,1);
						margin-right: 24rpx;
					}
					image{
						width: 13rpx;
						height: 23rpx;
						
					}
				}
				.yue{
					text{
						font-size:22rpx;
						font-weight:500;
						color:rgba(164,164,164,1);
						margin-right: 25rpx;
					}
				}
				.title{
					font-size:26rpx;
					font-weight:500;
					color:rgba(17,17,17,1);
					margin-bottom: 20rpx;
				}
				.input{
					width: 100%;
					height: 8a0rpx;
					// border-bottom: 1rpx solid #ddd;
					display: flex;
					align-items: center;
					text{
						font-size:54rpx;
						font-weight:800;
						color:rgba(17,17,17,1);
						margin-right: 20rpx;
					}
				}
			}
			.top_btn{
				width:579rpx;
				height:94rpx;
				line-height: 94rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: 500;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:47rpx;
				margin: 95rpx 0 0 85rpx;
			}
		}
	}
</style>
