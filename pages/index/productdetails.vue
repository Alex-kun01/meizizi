<template>
	<!-- 产品详情 -->
	<scroll-view class="content"
	:scroll-into-view="toView" 
	scroll-y="true"
	scroll-with-animation="true"
	>
		<view class="titleNview-placing"></view>
		<view class="top_search">
			<image @click="goback" style="width: 20rpx;height: 34rpx;" src="../../static/index/fanhui@2x.png" mode=""></image>
			<view class="search_box">
				<image @click="search" style="width: 31rpx;height: 30rpx;" src="../../static/index/sousuo.png" mode=""></image>
				<input type="text" v-model="searchValue" placeholder="神仙水" />
			</view>
			<image style="width: 28rpx;height: 32rpx;" src="../../static/index/femxiang@2x.png" mode=""></image>
		</view>
		<!-- 图片展示 -->
		<view class="pic_box"
		:id="shangpin"
		>
			<image style="width: 454rpx;height: 490rpx;" src="../../static/index/pic44.png" mode=""></image>
			<view class="menu_list">
				<view :class="{item: true, active: isActive == 1}" @click='changeActive(1)'>
					商品
				</view>
				<view 
				:class="{item: true, active: isActive == 2}"
				@click='changeActive(2)'
				>
				
					评价
				</view>
				<view :class="{item: true, active: isActive == 3}" @click='changeActive(3)'>
					详情
				</view>
				<view :class="{item: true, active: isActive == 4}" @click='changeActive(4)'>
					推荐
				</view>
			</view>
		</view>
		<!-- priceTitle -->
		<view class="price_title">
			<view class="price">
				<text style="font-size: 26rpx; color: #F74E06;font-weight: 500;">￥</text>
				<text style="font-size: 34rpx; color: #F74E06;font-weight: 500;">198</text>
				<text class="oldPrice">原价238</text>
			</view>
			<view class="title">
			【官方正品】MAC/魅可子弹头断货王口红大牌 正品唇膏玫红色/646
			</view>
		</view>
		<!-- 假一罚十 -->
		<view class="pay_box">
			<text style="font-size: 26rpx;color: #A3A3A3;margin-right: 43rpx;">保障</text>
			<text style="font-size: 26rpx;color: #3E3E3E;">假一赔十 七天无理由退换</text>
		</view>
		<!-- 详情 -->
		<view class="color_type"
		:id="xiangqing"
		>
			<view class="top_btn">
				<view>
					<text style="font-size: 26rpx;color: #A3A3A3;margin-right: 43rpx;">选择</text>
					<text style="font-size: 26rpx;color: #3E3E3E;">选择颜色分类</text>
				</view>
				<image style="width: 12rpx;height: 19rpx;" src="../../static/index/chakan@2x.png" mode=""></image>
			</view>
			<view class="bom_pic">
				<view class="pic">
					<image style="width: 36rpx;height: 38rpx;" src="../../static/index/shop31.png" mode=""></image>
					<image style="width: 36rpx;height: 38rpx;" src="../../static/index/shop31.png" mode=""></image>
					<image style="width: 36rpx;height: 38rpx;" src="../../static/index/shop31.png" mode=""></image>
					<image style="width: 36rpx;height: 38rpx;" src="../../static/index/shop31.png" mode=""></image>
				</view>
				<view class="pic_text">
					共17种颜色分类可选
				</view>
			</view>
		</view>
		<!-- 宝贝评价 -->
		<view class="baby_Pingjia"
		:id="pingjia"
		>
			<view class="top_btn">
				<text  style="font-size: 26rpx;color: #2F2F2F;font-weight: 500;">宝贝评价(16211)</text>
				<view class="right_btn"
				@click="gotopingjia"
				>
					<text style="font-size: 26rpx;color: #FF7300;font-weight: 500;">查看全部</text>
					<image style="width: 12rpx;height: 19rpx;margin-left: 25rpx;" src="../../static/index/chakangengduo@2x.png" mode=""></image>
				</view>
			</view>
			<view class="con_box">
				<view class="item"
				v-for="(item, index) in 3"
				:key="index"
				>
					颜色不错(1199)
				</view>
			</view>
			<view class="user_info"
			
			>
				<view class="user_name"
				>
					<image style="width: 43rpx;height: 41rpx;border-radius: 50%;" src="../../static/index/QQ.png" mode=""></image>
					<view class="user_n_name">
						葡萄葡萄
					</view>
				</view>
				<view class="user_text">
					细节做的特别好，涂上也毫无压力超气质，御姐范儿，外表 漂亮富有时尚感，非常显白又能完美衬托肤色,非常显白又能完美衬托肤色
				</view>
			</view>
		</view>
		<!-- 买家秀 -->
		<!-- <view class="maijia_xiu">
			<view class="top_btn">
				<text  style="font-size: 26rpx;color: #2F2F2F;font-weight: 500;">买家秀(12)</text>
				<view class="right_btn"
				@click="gotomaijia"
				>
					<text style="font-size: 26rpx;color: #FF7300;font-weight: 500;">查看全部</text>
					<image style="width: 12rpx;height: 19rpx;margin-left: 25rpx;" src="../../static/index/chakangengduo@2x.png" mode=""></image>
				</view>
			</view>
			<view class="maijia_pic">
				<view class="item"
				v-for="(item, index) in 2"
				:key="index"
				>
					<image style="width: 351rpx;height: 272rpx;" src="../../static/index/maijiaxiu1.png" mode=""></image>
				</view>
			</view>
		</view> -->
		<!-- 看了又看 -->
		<view class="like_box"
		:id="tuijian"
		>
			<view class="like">
				<view class="gang">
					<view class="hen"></view>
					<view class="dian"></view>
				</view>
				<view class="text">
					看了又看
				</view>
				<view class="gang">
					<view class="dian"></view>
					<view class="hen"></view>
				</view>
			</view>
			<view class="look_list">
				<view class="item"
				v-for="(item, index) in lookList"
				:key="index"
				@click="gotDetauls(item,index)"
				>
					<view class="img">
							<image style="width: 252rpx;height: 243rpx;" :src="item.img" mode=""></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="bom_btn">
						<text style="font-size: 26rpx;color: #FF5807;font-weight: 500;">￥</text>
						<text style="font-size: 34rpx;color: #FF5807;font-weight: 500;margin-right: 25rpx;">{{item.price}}</text>
						<text style="font-size: 23rpx;color: #666666;">{{item.num}}人付款</text>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 加入购物车 -->
		<view class="shop_cart">
			<view class="icon">
				<view class="item">
					<image style="width: 39rpx;height: 39rpx;" src="../../static/index/kefu@2x.png" mode=""></image>
					<text>客服</text>
				</view>
				<view class="item">
					<image @click="collect" style="width: 39rpx;height: 39rpx;" src="../../static/index/shoucang@2x.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="btn">
				<view @click="addshop(1)" class="left_add">
					加入购物车
				</view>
				<view @click="addshop(2)" class="right_add">
					立即购买
				</view>
			</view>
		</view>
		<!-- 购物车弹窗 -->
		<view class="shop_cart_float"
		v-if="isShowShopCart"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="show_box">
				<view  @click="closeClick" id="close" 
				
				>
					<image src="../../static/index/closeX2.png" mode=""></image>
				</view>
				<view class="top_pic">
					<view class="img">
						<image style="width: 149rpx;height: 162rpx;" src="../../static/index/picu5.png" mode=""></image>
					</view>
					<view class="price_box">
						<view class="price">
							<text style="font-size: 26rpx;color: #FF5807;font-weight: 500;">￥</text>
							<text style="font-size: 34rpx;color: #FF5807;font-weight: 500;">198</text>
						</view>
						<view style="font-size: 26rpx;color: #505050;">
							选择颜色分类
						</view>
					</view>
				</view>
				<view class="color_type">
					<view style="font-weight: 500;font-size: 30rpx;color: #505050;margin-bottom: 25rpx;">
						颜色分类
					</view>
					<view class="color_type_list">
						<view :class="{item:true, active: isTypeActive === index}"
						@click="changeType(index)"
						v-for="(item, index) in 12"
						:key="index"
						>
							<image style="width: 54.5rpx;height: 53.3rpx;border-radius: 6rpx;" src="../../static/index/113205.png" mode=""></image>
							<view class="text">
								126-SWING
							</view>
						</view>
					</view>
				</view>
				<view @click="addShopCart" class="bom_btn">
					确定
				</view>
			</view>
		</view>
		
		
		
	</scroll-view>
</template>

<script>
	export default {
		data () {
			return {
				toView: '',
				// 锚点
				pingjia: 'pj',
				xiangqing: 'xq',
				tuijian: 'tj',
				shangpin: 'sp',
				isActive: 1, // 导航菜单显示
				isShowShopCart: false, // 购物车弹窗显示
				isTypeActive: 0, // 购物车选择分类
				searchValue: '',
				payType: '', // 1加入购物车 2立即购买
				lookList: [
					{
						img: '../../static/index/pic44.png',
						title: '【官方正品】MAC/魅可子弹 头品唇膏玫红色/646',
						price: 399,
						num: 150
					},
					{
						img: '../../static/index/pic44.png',
						title: '【官方正品】MAC/魅可子弹 头品唇膏玫红色/646',
						price: 399,
						num: 150
					},
					{
						img: '../../static/index/pic44.png',
						title: '【官方正品】MAC/魅可子弹 头品唇膏玫红色/646',
						price: 399,
						num: 150
					},
					{
						img: '../../static/index/pic44.png',
						title: '【官方正品】MAC/魅可子弹 头品唇膏玫红色/646',
						price: 399,
						num: 150
					}
				],
				
				
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			changeActive(index){
				console.log(index)
				this.isActive = index
				if(index === 1){
					// 商品
					this.toView = 'sp'
				}
				if(index === 2){
					// 评价
					this.toView = 'pj'
				}
				if(index === 3){
					// 详情
					this.toView = 'xq'
				}
				if(index === 4){
					// 推荐
					this.toView = 'tj'
				}
			},
			moveHandle(){},
			// 购物车 商品的分类
			changeType(index){
				this.isTypeActive = index
			},
			// 加入购物车按钮
			addshop(type){
				this.payType = type
				this.isShowShopCart = true
			},
			// 确认加入购物车
			addShopCart(){
				
				if(this.payType === 1){
					// 加入购物车
					uni.showToast({
						title: '添加成功'
					})
				}else{
					// 立即购买
					uni.navigateTo({
						url:'./confirmorder'
					})
				}
				
				this.isShowShopCart = false
			},
			//跳转宝贝评价
			gotopingjia(){
				uni.navigateTo({
					url: './shoplist/pingjia'
				})
			},
			// 跳转买家秀
			gotomaijia(){
				uni.navigateTo({
					url: './shoplist/maijiashow'
				})
			},
			// 看了又看 跳转订单详情页面
			gotDetauls(item,index){
				console.log(item,index)
				uni.navigateTo({
					url: './productdetails'
				})
			},
			search(){
				
			},
			goback(){
				console.log('返回', getCurrentPages())
				if(getCurrentPages().length > 3){
					uni.navigateBack({
						delta: getCurrentPages().length - 2
					})
					return
				}
				uni.navigateBack({
					
				})
				
			},
			// 关闭购物车弹窗
			closeClick(){
				this.isShowShopCart = false
			},
			// 收藏按钮
			collect(){
				// 假的收藏
				uni.showToast({
					title: '已收藏'
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
		background: #F4F4F4;
		scroll-view{
			
			height: 100vh;
		}
		.content{
			width: 100%;
			height: 100%;
			background: #F4F4F4;
			.top_search{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.search_box{
					width:587rpx;
					height:57rpx;
					background:#FFFFFF;
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
			.pic_box{
				width: 100%;
				height: 550rpx;
				text-align: center;
				position: relative;
				image{
					
				}
				.menu_list{
					width: 100%;
					height: 76rpx;
					line-height: 100rpx;
					background-color: #FFFFFF;
					box-sizing: border-box;
					padding: 0 30rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 28rpx;
					color: #69686C;
					font-weight: 500;
					opacity: .8;
					position: absolute;
					top: 0;
					.item{
						height: 85rpx;
						box-sizing: border-box;
					}
					.item.active{
						border-bottom:  5rpx solid #FF792C;
						color: #FF792C;
					}
				}
			}
			.price_title{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				background-color: #FFFFFF;
				.price{
					.oldPrice{
						font-size: 24rpx;
						color: #858585;
						font-weight: 500;
						margin-left: 25rpx;
						text-decoration: line-through;
					}
				}
				.title{
					font-size: 30rpx;
					color: #111111;
					font-weight: 500;
					margin-top: 20rpx;
				}
			}
			.pay_box{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				background-color: #FFFFFF;
				margin-top: 25rpx;
			}
			.color_type{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 30rpx;
				background-color: #FFFFFF;
				margin-top: 25rpx;
				.top_btn{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;
				}
				.bom_pic{
					display: flex;
					align-items: center;
					justify-content: center;
					.pic{
						image{
							margin-right: 42rpx;
						}
						
					}
					.pic_text{
						width:250rpx;
						height:61rpx;
						line-height: 61rpx;
						text-align: center;
						background:rgba(247,247,247,1);
						border-radius:12rpx;
						color: #969696;
						font-size: 26rpx;
					}
				}
			}
			.baby_Pingjia{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				background-color: #FFFFFF;
				margin-top: 25rpx;
				.top_btn{
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.con_box{
					margin: 25rpx 0;
					display: flex;
					align-items: center;
					.item{
						width:208rpx;
						height:57rpx;
						line-height: 57rpx;
						text-align: center;
						font-size: 26rpx;
						color: #686264;
						// font-weight: 500;
						background:rgba(255,236,237,1);
						border-radius:29rpx;
					}
				}
				.user_info{
					width: 100%;
					margin-bottom: 25rpx;
					.user_name{
						display: flex;
						align-items: center;
						.user_n_name{
							color: #969696;
							font-size: 22rpx;
							margin-left: 25rpx;
						}
					}
					.user_text{
						font-size: 26rpx;
						color: #3C3C3C;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						
					}
				}
			}
			.maijia_xiu{
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx;
				background-color: #FFFFFF;
				margin-top: 25rpx;
				.top_btn{
					display: flex;
					justify-content: space-between;
				}
				.maijia_pic{
					width: 702rpx;
					height: 272rpx;
					border-radius: 12rpx;
					display: flex;
					margin-top: 20rpx;
				}
			}
			.like_box{
				margin-top: 40rpx;
				.like{
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 31rpx;
					.text{
						color: #FF5807;
						font-size: 30rpx;
						font-weight: 500;
					}
					.gang{
						display: flex;
						align-items: center;
						margin: 0 30rpx;
						
						.dian{
							width:5rpx;
							height:5rpx;
							background:rgba(237,82,13,1);
							border-radius:50%;
							color: #FF5807;
						}
						.hen{
							width:28rpx;
							height:2rpx;
							background-color: rgba(255,88,7,1);
							// border:1rpx solid rgba(255,88,7,1);
							color: #FF5807;
						}
					}
				}
				.look_list{
					width: 100%;
					box-sizing: border-box;
					padding: 23rpx;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.item{
						width: 340rpx;
						box-sizing: border-box;
						padding: 12rpx;
						background-color: #FFFFFF;
						margin-bottom: 18rpx;
						border-radius:12rpx 12rpx 0 0;
						.img{
							width: 100%;
							text-align: center;
						}
						.title{
							font-size: 25rpx;
							color: #272727;
							font-weight: 500;
							margin-bottom: 25rpx;
						}
						.bom_btn{
							
						}
					}
					
				}
			}
			.shop_cart{
				width: 100%;
				height: 102rpx;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: fixed;
				bottom: 0;
				.icon{
					display: flex;
					.item{
						display: flex;
						flex-direction: column;
						margin-right: 30rpx;
						image{
							margin-right: 39rpx;
						}
						text{
							color: #7C7D7E;
							font-size: 22rpx;
						}
					}
					
				}
				.btn{
					display: flex;
					.left_add{
						width:223rpx;
						height:83rpx;
						background:rgba(255,172,7,1);
						border-radius:40rpx 0rpx 0rpx 43rpx;
						color: #FFFFFF;
						font-size: 30rpx;
						line-height: 83rpx;
						text-align: center;
						font-weight: 500;
					}
					.right_add{
						width:223rpx;
						height:83rpx;
						background:rgba(253,99,0,1);
						border-radius:0rpx 39rpx 44rpx 0rpx;
						color: #FFFFFF;
						font-size: 30rpx;
						line-height: 83rpx;
						text-align: center;
						font-weight: 500;
					}
				}
			}
			.shop_cart_float{
				position: fixed;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				.show_box{
					width: 100%;
					// height: 85%;
					background-color: #FFFFFF;
					position: absolute;
					bottom: 0;
					border-radius:13rpx 13rpx 0 0;
					#close{
						// background-color: pink;
						width: 80rpx;
						height: 80rpx;
						position: absolute;
						right: 30rpx;
						top: 30rpx;
						text-align: right;
						image{
							width: 30rpx;
							height: 30rpx;
						}
					}
					.top_pic{
						display: flex;
						align-items: center;
						box-sizing: border-box;
						padding: 40rpx 0 0 31rpx;
						.img{
							width:232rpx;
							height:231rpx;
							background:rgba(247,247,247,1);
							border-radius:12rpx;
							text-align: center;
							box-sizing: border-box;
							padding-top: 38rpx;
							margin-right: 18rpx;
						}
					}
					.color_type{
						width: 100%;
						.color_type_list{
							display: flex;
							flex-wrap: wrap;
							.item{
								width:226rpx;
								height:61rpx;
								border: 1rpx solid #FFFFFF;
								box-sizing: border-box;
								background:rgba(245,245,245,1);
								border-radius:11rpx;
								margin: 0 12rpx 12rpx 0;
								display: flex;
								.text{
									color: #1A2029;
									font-size: 26rpx;
									line-height: 61rpx;
									margin-left: 12rpx;
								}
							}
							.item.active{
								border: 1rpx solid #FF5005;
								.text{
									color: #FF5005;
								}
							}
						}
					}
					.bom_btn{
						width:709rpx;
						height:86rpx;
						line-height: 86rpx;
						text-align: center;
						background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
						border-radius:43rpx;
						color: #FFFFFF;
						font-weight: 500;
						font-size: 36rpx;
						margin-left: 25rpx;
					}
				}
			}
			
		}
	}
</style>
