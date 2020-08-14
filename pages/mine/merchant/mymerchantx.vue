<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		<view class="top_bar_box">
			
			<image @click="goback" class="left" src="../../../static/index/fanhui@3x.png" mode=""></image>
			<view class="store">
				我的商家
			</view>
			<image @click="record" class="right" src="../../../static/public/lishi@2x.png" mode=""></image>
		</view>
		<!-- 我的商家 -->
		<view class="top_bar">
			<view class="top">
				<image style="width: 34rpx;height: 30rpx;" src="../../../static/mine/mendian@2x.png" mode=""></image>
				<view class="title">
					{{info.company}}
				</view>
			</view>
			<view class="con_info">
				<view style="display: flex;">
					<image style="width: 180rpx;height: 180rpx;" :src="info.logo" mode=""></image>
					<view class="text_box">
						<view style="margin-bottom: 20rpx;">
							授信额度：<text style="font-size: 34rpx;font-weight: 500;color: ;">{{info.credit}}</text>
						</view>
						<view style="margin-bottom: 20rpx;">
							剩余授信额度：<text style="font-size: 34rpx;font-weight: 500;color: ;">{{info.surplus}}</text>
						</view>
						<view class="text">
							<image style="width: 22rpx;height: 18rpx;" src="../../../static/mine/dianhua@2x.png" mode=""></image>
							<text>{{info.phone}}</text>
						</view>
						<view class="text">
							<image style="width: 22rpx;height: 18rpx;" src="../../../static/mine/weixin@2x.png" mode=""></image>
							<text>{{info.wx_name}}</text>
						</view>
					</view>
				</view>
				<view class="img_box"
				@click="scanCode" 
				v-if="!opt.show"
				>
					<image style="width: 55rpx;height: 55rpx;" src="../../../static/mine/saoma@4x.png" mode=""></image>
					扫码出货
				</view>
			</view>
			<view class="address">
				{{info.address}}
			</view>
		</view>
		<!-- 补货 -->
		<view class="buhuo_box">
			<view class="item" @click="changeIndex(1)">
				<view class="yuan">
					<image v-if="isActive === 1" style="width: 31rpx;height: 31rpx;" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
				</view>
				<view class="text_box">
					<text class="title">自动补货</text>
					<text class="kun">库存报警自动补货</text>
				</view>
			</view>
			<view class="shu"></view>
			
			<view class="item" @click="changeIndex(2)">
				<view class="yuan">
					<image v-if="isActive === 2" style="width: 31rpx;height: 31rpx;" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
				</view>
				<view class="text_box">
					<text class="title">手动补货</text>
					<text class="kun">可对所需库存进行修改</text>
				</view>
			</view>
		</view>
		<!-- 总库存展示 -->
		<view class="kun_box">
			<view class="title">
				<view class="">
					总库存:
					<text style="color: #EB5204;">{{info.now_stock}}</text>
					<text>/{{info.total_stock}}</text>
				</view>
				
			</view>
			<view class="title_list">
				<view class="title"
				v-for="(tit, int) in titleList"
				:key='int'
				>
					{{tit}}
				</view>
			</view>
			
			<view class="show_list">
				<view class="item"
				v-for="(item, index) in showList"
				:key='index'
				>
					<view class="name">{{item.store_name}}</view>
					
					<view class="item_box">
						<view class="item_i">{{item.price}}</view>
						<view class="item_i">{{item.stock}}</view>
						<view class="item_i">
							<input v-if="isActive == 2" type="text" v-model="showList[index].need_stock" />
							<text v-else>{{item.need_stock}}</text>
						</view>
						<view class="item_i">{{item.alarm_stock}}</view>
					</view>
					
					
				</view>
			</view>
			<view class="loading" v-if="isLoading">
				加载中...
			</view>
			<view class="sub_btn">
				<view style="margin-right: 30rpx;">
					总金额：<text style="font-size: 34rpx;font-weight: 500;color: ;">{{allPrice}}</text>
				</view>
				<view class="btn" @click="submitClick" v-if="isActive == 2">
					提交
				</view>
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
				isActive: 1, // 1自动补货 2手动补货 
				isLoading: false,
				titleList: ['单价','现有库存','所需库存','报警线',],
				page: 1,
				limit: 10,
				info: {
				},
				showList: [],
				opt: {}
			}
		},
		computed:{
			// 总金额
			allPrice(){
				let num = 0
				this.showList.forEach(item => {
					num = num + +item.price * item.need_stock 
				})
				return num
			},
			// 所需库存是否超过总库存
			isSubmitOk(){
				let arr = []
				this.showList.forEach(item =>{
					if(+item.need_stock + +item.stock > +item.total_stock){
						arr.push(1)
					}
					// if(item.need_stock == 0){
					// 	arr.push(1)
					// }
				})
				return arr.includes(1)
			}
		},
		onLoad(opt){
			if(opt.show){
				this.opt = opt
			}
			// this.getData()
		},
		onShow(){
			
		},
		methods:{
			// 请求数据
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.request({
							url: _this.$http + '/api/user/storeList',
							method: 'GET',
							data: {
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit
							},
							success(res){
								_this.isLoading = false
								console.log('我的商家返回数据',res)
								if(res.data.status == 200){
									let {product_list,is_auto} = res.data.data
									_this.info = res.data.data
									
									if(_this.showList.length == 0){
										_this.showList = product_list
										_this.isActive = is_auto
									}else{
										_this.showList = _this.showList.concat(product_list)
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
			// 改变补货方式
			changeStatus(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							id: _this.info.id,
							is_auto: _this.isActive
						}
						console.log('查看参数',datas)
						uni.request({
							url: _this.$http + '/api/store/isAuto',
							method: 'POST',
							data: datas,
							success(res){
								console.log('我的商家-数据',res)
								if(res.data.status === 200){
									uni.showToast({
										title: '切换成功'
									})
								}
							}
						})
					}
				})
			},
			// 查看商品名
			lookInfo(item){
				uni.showModal({
					title: '商品名',
					content: item.store_name
				})
			},
			changeIndex(index){
				this.isActive = index
				this.changeStatus()
			},
			// 返回
			goback(){
				uni.navigateBack({
					
				})
			},
			// 交易记录
			record(){
				uni.navigateTo({
					url: './jiaoyirecord?id=' + this.info.id
				})
			},
			// 扫描二维码
			scanCode(){
				let _this = this
				uni.scanCode({
					success(res) {
						console.log('扫描二维码',res)
						let	arr = JSON.parse( res.result )
						console.log('arr',arr)
						
						if(arr.mzzUrl){
							uni.navigateTo({
								url: arr.mzzUrl + '?id=' + arr.order_id
							})
						}else{
							uni.showModal({
								title: '提示',
								content: '二维码已失效！'
							})
						}
					}
				})
			},
			// 处理showList数组
			getTargetList(){
				return this.showList.filter(item =>{
					return item.need_stock != 0
				})
			},
			// 提交
			submitClick(){
				let _this = this
				console.log(this.isSubmitOk)
				if(this.isSubmitOk){
					uni.showModal({
						title: '提示',
						content: '某个商品输入所需库存超过总库存量'
					})
					return
				}
				if(this.allPrice > this.info.surplus){
					uni.showModal({
						title: '提示',
						content: '补货总金额超过剩余授信额度!!!'
					})
					return
				}
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						console.log('reg',reg)
						let type = 1
						let {position,token} = reg.data
						if(position === 7){
							type = 2
						}
						let datas = {
								token: token,
								take_id: _this.info.take_id,
								product_list: JSON.stringify(_this.getTargetList()),
								type: type
							}
							console.log('传递参数',datas)
							// return
						uni.request({
							url: _this.$http + '/api/user/addShopOrder',
							method: 'POST',
							data:datas,
							success(res){
								console.log('手动补货返回数据',res)
								if(res.data.status == 200){
									uni.showToast({
										title: '操作成功!'
									})
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.sub_btn{
				width: 100%;
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;
				.btn{
					width:108rpx;
					height:46rpx;
					line-height: 46rpx;
					text-align: center;
					background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
					border-radius:23rpx;
					font-size: 28rpx;
					color:rgba(255,255,255,1);
				}
			}
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.top_bar_box{
				width: 100%;
				// height: 70rpx;
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 24rpx;
				.store{
					font-size:36rpx;
					font-weight:bold;
					color:rgba(48,48,48,1);
				}
				.left{
					width: 19rpx;
					height: 34rpx;
				}
				.right{
					width: 30rpx;
					height: 30rpx;
				}
			}
			.top_bar{
				width: 100%;
				// height: 379rpx;
				box-sizing: border-box;
				padding: 26rpx 33rpx;
				background-color: #FFFFFF;
				.top{
					display: flex;
					align-items: center;
					margin-bottom: 17rpx;
					color: #111111;
					font-size: 34rpx;
					font-weight: 500;
					image{
						margin-right: 20rpx;
					}
				}
				.con_info{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #8F8F8F;
					font-size: 24rpx;
					margin-bottom: 24rpx;
					.img_box{
						text-align: center;
						// background-color: pink;
						display: flex;
						flex-direction: column;
						align-items: center;
						align-self: flex-start;
						image{
							margin-bottom: 15rpx;
							margin-left: 20rpx;
						}
					}
					.text{
						margin-bottom: 5rpx;
					}
					image{
						margin-right: 30rpx;
					}
				}
				.address{
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
				}
			}
			.buhuo_box{
				width: 100%;
				height: 108rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.shu{
					width:1rpx;
					height:41rpx;
					border:1rpx solid rgba(204,204,204,1);
					margin: 0 54rpx;
				}
				.item{
					display: flex;
					align-items: center;
					.yuan{
						width:32rpx;
						height:32rpx;
						border:1rpx solid rgba(204,204,204,1);
						border-radius:50%;
						margin-right: 24rpx;
						position: relative;
						image{
							position: absolute;
							top: 0;
						}
					}
					.text_box{
						display: flex;
						flex-direction: column;
					}
					.title{
						font-size: 26rpx;
						font-weight: 500;
						color: #303030;
					}
					.kun{
						font-size: 18rpx;
						font-weight: 500;
						color: #666666;
					}
				}
			}
			.kun_box{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				.title{
					color: #666666;
					font-size: 30rpx;
					font-weight: 500;
					display: flex;
					justify-content: space-between;
				}
				.title_list{
					margin-top: 20rpx;
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					color: #333333;
					font-weight: 500;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					padding-left: 35rpx;
					.title{
						width: 140rpx;
						text-align: center;
					}
				}
				.show_list{
					width: 100%;
					color: #666666;
					font-size: 28rpx;
					font-weight: 500;
					box-sizing: border-box;
					padding-left: 0rpx;
					.item{
						
						display: flex;
						flex-direction: column;
						margin-bottom: 20rpx;
						border-bottom: 1rpx solid #DDDDDD;
						padding: 15rpx 0;
						.name{
							margin-bottom: 10rpx;
							margin-left: 40rpx;
						}
						.item_box{
							width: 100%;
							display: flex;
							input{
								font-size: 28rpx;
								border: 1rpx solid #666666;
							}
							.item_i{
								width: 175rpx;
								text-align: center;
							}
						}
						
					}
				}
			}
		}
	}
</style>
