<template>
	<!-- 产品详情 -->
	<scroll-view class="content"
	:style="content_css"
	:scroll-into-view="toView" 
	scroll-y="true"
	scroll-with-animation="true"
	@touchstart='touchstart'
	@touchend='touchend'
	
	>
			<view class="titleNview-placing" :id="shangpin"></view>
			<!-- 顶部搜索 -->
			<view class="top_search">
				<image @click="goback" style="width: 20rpx;height: 34rpx;" src="../../static/index/fanhui@2x.png" mode=""></image>
				<view class="search_box">
					<image @click="search" style="width: 31rpx;height: 30rpx;" src="../../static/index/sousuo.png" mode=""></image>
					<input confirm-type="search" @confirm="search()" type="text" v-model="searchValue" placeholder="神仙水" />
				</view>
				<!-- <image @click="share" style="width: 28rpx;height: 32rpx;" src="../../static/index/femxiang@2x.png" mode=""></image> -->
				<!-- 分享需要审核一些数据 暂时隐藏 -->
				<text></text>
			</view>
			<!-- 导航菜单 -->
			<view class="menu_list"
			v-if="isShowNavagatar"
			>
				<view :class="{item: true, active: isActive == 1}" @click.stop='changeActive(1)'>
					商品
				</view>
				<view 
				:class="{item: true, active: isActive == 2}" @click.stop='changeActive(2)'>
				
					评价
				</view>
				<view :class="{item: true, active: isActive == 3}" @click.stop='changeActive(3)'>
					详情
				</view>
				<view :class="{item: true, active: isActive == 4}" @click.stop='changeActive(4)'>
					推荐
				</view>
			</view>
			
		</view>
		<!-- 轮播 -->
		<view class="lunbo">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item
				v-for="(img, imx) in info.slider_image"
				:key="imx"
				>
					<image :src="img" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 预售显示 -->
		<view class="Preslale" v-if="isPreslale">
			<view class="left">
				<text style="font-size: 24rpx;">￥</text>
				<text style="font-size: 36rpx;">198</text>
				<view class="img_box">
					<view class="img">
						<image src="../../static/public/yushou@2x.png" mode=""></image>
					</view>
					<text class="yushou">预售</text>
				</view>
				
			</view>
			<view class="right">
				已预定12件
			</view>
		</view>
		<!-- 拼团显示 -->
		<view class="Preslale" v-if="fightTogether">
			<view class="left">
				<text style="font-size: 24rpx;">￥</text>
				<text style="font-size: 36rpx;">198</text>
				<view class="img_box">
					<view class="img">
						<image src="../../static/public/pintuan@2x.png" mode=""></image>
					</view>
					<text class="yushou">两人拼</text>
				</view>
				
			</view>
			<view class="right">
				<view>
					距离拼团结束还剩
				</view>
				<view class="price_box">
					<text>24</text>:
					<text>59</text>:
					<text>59</text>
				</view>
			</view>
		</view>
		<!-- 买二送一 -->
		<view class="Preslale" v-if="isBuyto">
			<view class="left">
				<text style="font-size: 24rpx;">￥</text>
				<text style="font-size: 36rpx;">198</text>
				<view class="img_box">
					<view class="img">
						<image src="../../static/public/huodong@2x.png" mode=""></image>
					</view>
					<text class="yushou">活动价</text>
				</view>
				
			</view>
			<view class="right" style="font-size: 40rpx;font-weight: 500;">
				买二送一
			</view>
		</view>
		<!-- priceTitle -->
		<view class="price_title">
			<view class="price">
				<text style="font-size: 24rpx; color: #F74E06;font-weight: 500;">会员价: </text>
				<text style="font-size: 36rpx; color: #F74E06;font-weight: 500;margin-right: 14rpx;">￥{{info.vip_price}}</text>
				<text class="oldPrice">原价:￥{{info.price}}</text>
			</view>
			<view class="title">
				{{info.store_name}}
			</view>
		</view>
		<!-- 拼团 -->
		<view class="fightTogether"  v-if="fightTogether">
			<view class="itemf">
				<view class="f_left">
					<view class="avatar_box">
						<image src="../../static/mine/avatar.jpg" mode=""></image>
						<view class="addAvatar">
							<image src="../../static/mine/yonghu@2x.png" mode=""></image>
						</view>
					</view>
					<view class="cont_txt">
						<view>还差<text>1人</text>成团</view>
						<view>剩余 00:19:56</view>
					</view>
				</view>
				<view class="f_right">
					去参团
				</view>
			</view>
			
			<view class="itemf">
				<view class="f_left">
					<view class="avatar_box">
						<image src="../../static/mine/avatar.jpg" mode=""></image>
						<view class="addAvatar">
							<image src="../../static/mine/yonghu@2x.png" mode=""></image>
						</view>
					</view>
					<view class="cont_txt">
						<view>还差<text>1人</text>成团</view>
						<view>剩余 00:19:56</view>
					</view>
				</view>
				<view class="f_right">
					去参团
				</view>
			</view>
		</view>
		<!-- 预售 -->
		<view class="pay_box"  v-if="isPreslale">
			<text style="font-size: 26rpx;color: #A3A3A3;margin-right: 43rpx;">流程</text>
			<text style="font-size: 26rpx;color: #3E3E3E;">1.支付全款 2.预计2020.6.16可到店取货</text>
		</view>
		<!-- 假一罚十 -->
		<view class="pay_box">
			<view>
				<text style="font-size: 26rpx;color: #A3A3A3;margin-right: 43rpx;">保障</text>
				<text style="font-size: 26rpx;color: #3E3E3E;">{{$text}}</text>
			</view>
			<text style="font-size: 26rpx;color: #A3A3A3;">销量:{{info.ficti}}</text>
		</view>
		<!--
		 宝贝评价
		 -->
		<view class="baby_Pingjia"
		:id="pingjia"
		
		>
			<view class="top_btn">
					<text  style="font-size: 26rpx;color: #2F2F2F;font-weight: 500;"
					v-if="evaList.eva_list.length != 0"
					>
						宝贝评价{{evaList.ex_count+evaList.in_count+evaList.di_count}}
					</text>
					<text
					style="font-size: 26rpx;color: #2F2F2F;font-weight: 500;"
					v-else
					>宝贝评价</text>
				<view class="right_btn"
				@click="gotopingjia"
				>
					<text style="font-size: 26rpx;color: #FF7300;font-weight: 500;">查看全部</text>
					<image style="width: 12rpx;height: 19rpx;margin-left: 25rpx;" src="../../static/index/chakangengduo@2x.png" mode=""></image>
				</view>
			</view>
			<view class="con_box"
			v-if="evaList.eva_list.length != 0"
			>
				<view class="item">
					好评{{'(' + evaList.ex_count +')'}}
				</view>
				<view class="item">
					中评{{'(' + evaList.in_count +')'}}
				</view>
				<view class="item">
					差评{{'('+ evaList.di_count +')'}}
				</view>
			</view>
			<view class="user_info"
			v-if="evaList.eva_list.length != 0"
			>
				<view class="user_name"
				>
					<image style="width: 43rpx;height: 41rpx;border-radius: 50%;"
					v-if="evaList.eva_list[0].avatar"
					:src="evaList.eva_list[0].avatar" mode=""></image>
					<view class="user_n_name">
						{{evaList.eva_list[0].nickname}}
					</view>
				</view>
				<view class="user_text">
					{{evaList.eva_list[0].comment}}
				</view>
			</view>
		</view>
		
		<view class="staticHen">
		</view>
		
		<!-- 
		详情列表 
		-->
			<view  
				v-html="info.description"
				class="description"
				:id="xiangqing"
			>
			
		</view>
		<!-- 
		看了又看
		 -->
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
				v-for="(item, index) in reco_list"
				:key="index"
				@click="gotDetauls(item,index)"
				>
					<view class="img">
							<image :src="item.image" mode=""></image>
					</view>
					<view class="title">
						{{item.store_name}}
					</view>
					<view class="bom_btn">
						<!-- <image style="width: 23rpx;height: 23rpx;" src="../../static/index/huiyuan@3x(3).png" mode=""></image> -->
						<text style="font-size: 26rpx;color: #FF5807;font-weight: 500;">会员价￥</text>
						<text style="font-size: 34rpx;color: #FF5807;font-weight: 500;margin-right: 15rpx;">{{item.vip_price}}</text>
						<text style="font-size: 23rpx;color: #666666;">￥{{item.price}}</text>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 加入购物车 -->
		<view class="shop_cart">
			<view class="icon">
				<view class="item">
					<image @click="tel" style="width: 39rpx;height: 39rpx;" src="../../static/index/kefu@2x.png" mode=""></image>
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
				<view  @click="closeClick" id="close" >
					<image src="../../static/index/closeX2.png" mode=""></image>
					
				</view>
				<view class="top_pic">
					<view class="img">
						<image :src="targetProduct.image || staticImage" mode=""></image>
						<view class="float_btn"
						v-if="isPreslale"
						>
							预计2020.6.16取货
						</view>
					</view>
					<view class="price_box">
						<view 
						style="font-size: 26rpx;color: #505050;font-weight: 500;width: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;;"
						>
							{{info.store_name}}
						</view>
						<view class="price">
							<view>
								<image style="width: 23rpx;height: 23rpx;" src="../../static/index/huiyuan@3x(6).png" mode=""></image>
								<text style="font-size: 26rpx;color: #FF5807;font-weight: 500;">￥</text>
								<text style="font-size: 34rpx;color: #FF5807;font-weight: 500;">{{info.vip_price}}</text>
								<text style="font-size: 28rpx;margin-left: 30rpx;color: #999;">库存：{{stock}}</text>
							</view>
							<view>
								<text style="font-size: 26rpx;color: #FF5807;font-weight: 500;">￥</text>
								<text style="font-size: 34rpx;color: #FF5807;font-weight: 500;">{{info.price}}</text>
							</view>
						</view>
						
					</view>
				</view>
				<view class="color_type">
					<!-- <view style="font-weight: 500;font-size: 30rpx;color: #505050;margin-bottom: 25rpx;">
						颜色分类
					</view> -->
					<view class="type_box"
						v-for="(item,index) in productAttr"
						:key='index'
					>
						<view class="title">
							{{item.attr_name}}
						</view>
						<view class="list_box">
							<view :class="{item:true, active: isTypeActive[index] == tyix}"
							v-for="(type,tyix) in item.attr_values"
							:key='tyix'
							@click="changeActives(type,index,tyix)"
							>
								{{type}}
							</view>
						</view>
					</view>
					
					<view class="btn">
						<view
						@click="jianClick()"
						class="jian">-</view>
						<view class="num">{{payNum}}</view>
						<view
						@click="jiaClick()"
						class="jia">+</view>
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
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 1000,
				banner:[{},{}],
				toView: '',
				// 锚点
				pingjia: 'pj',
				xiangqing: 'xq',
				tuijian: 'tj',
				shangpin: 'sp',
				isActive: 1, // 导航菜单显示
				isShowShopCart: false, // 购物车弹窗显示
				searchValue: '',
				payType: '', // 1加入购物车 2立即购买
				opt: {}, // 接受参数
				info: {}, //商品信息
				reco_list: [], // 推荐 看了又看列表
				productAttr: [], //规格参数
				productValue: [], // 规格参数详情列表
				isTypeActive: [], // 购物车选择分类
				stock: 1, //库存
				payNum: 1, //购买数量
				paySpecArr: [], // 购买的规格的数组
				paySpecStr: '', // 购买的规格的字符串
				targetProduct: {
					image:''
				}, //目标产品规格信息
				staticImage: '../../static/public/nopic.png', //默认图片地址
				isPreslale: false, // 预售  是否有预售
				fightTogether: false, // 拼团 是否有拼团
				isBuyto: false, // 买二送一 是否有买二送一
				startPageY: 0, // 当前位置
				isShowNavagatar: false, //控制导航条显示
				evaList: {
					eva_list:[]
				}, // 评价info
				content_css: {
					height: 0
				},
				// 首页菜单跳转参数
				parameter: {}
			}
		},
		computed:{
			// 判断是否可以下单 
			isSubmitOk(){
				let temp = this.productValue[this.paySpecStr] || {}
				if(temp.suk){
					return true
				}
			   return false
			},
			// 是否没有规格
			isNoType(){
				if(this.productAttr.length == 0){
					return true
				}else{
					return false
				}
			},
		},
		onLoad(opt){
			console.log('产品详情opt',opt)
			this.opt = opt
			this.staticImage = opt.img
			this.parameter = this.$store.state.parameter
			this.$store.commit('setParameter', {});
			this.getData(opt)
			
		},
		onShow(){
			
		},
		methods:{
			// 计算屏幕高度
			jisun(){
				let _this = this
				uni.getSystemInfo({
				    success: function (res) {
						console.log('屏幕高度',res)
						return
						_this.jsHeig = res.screenHeight
				        // console.log(res.model);
				        // console.log(res.pixelRatio);
				        // console.log(res.windowWidth);
				        // console.log(res.windowHeight);
				        // console.log(res.language);
				        // console.log(res.version);
				        // console.log(res.platform);
				    }
				});
			},
			// 切换导航
			getElement(index){
				this.isActive = index
				
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
				　　   console.log('res',res); // 屏幕的宽度 
				
				　　    let info = uni.createSelectorQuery().select(".description");
						console.log('description', info)
				　　　  　info.boundingClientRect(function(data) { //data - 各种参数
				　　　  　console.log(data.height)  // 获取元素宽度
				　　    }).exec()
				       }
				})
				
			},
			// 监听距离屏幕顶部高度
			onPageScroll(res){
				console.log('监听距离屏幕顶部高度',res.scrollTop);//距离页面顶部距离
			},
			getData(opt){
				let _this = this
				let userInfo = this.$store.state.userInfo
				console.log('userInfo', userInfo)
				uni.showLoading({
					title: '加载中...'
				})
				
				
				let datas = {}
				console.log('检查parmeter是否为空', this.parameter)
				if(JSON.stringify(this.parameter) == "{}"){
					datas = {
						id: opt.id,
						uid: userInfo.uid || ''
					}
				}else{
					datas = this.parameter
				}
				
				
				console.log('参送参数查看', datas)
				uni.request({
					url: this.$http + '/api/goods/goodsInfo',
					method:'POST',
					data: datas,
					success(res){
						console.log('产品详情返回数据', res)
						if(res.data.status === 200){
							_this.info = res.data.data.info
							console.log(_this.info.description,'descr')
							let desscrp = _this.info.description
							 let imgbox = desscrp.split('</p>')
							 let newbox = []
							 imgbox.forEach((img=>{
								 if (img) {
								newbox.push(img.replace(/style=""/g,"style='width:100%;margin:-8px 0'")+"</p>")  
								 }
							 }))
							 let Newdesscrp = newbox.join(',').replace(/,/g,'')
							 _this.info.description = Newdesscrp
							 console.log(Newdesscrp)
							_this.stock = res.data.data.info.stock
							_this.reco_list = res.data.data.reco_list
							_this.productValue = res.data.data.productValue
							_this.productAttr = res.data.data.productAttr
							// _this.staticImage = res.data.data.info.image
							let newEvaList = res.data.data.eva_list 
							
							// newEvaList.eva_list.forEach(item =>{
							// 	item.avatar = _this.$http + item.avatar
							// })
							// console.log('修改后', newEvaList)
							_this.evaList = newEvaList
							const { windowHeight } = uni.getSystemInfoSync();
							console.log('屏幕高度查看', windowHeight*2 + 'rpx')
							_this.content_css.height = windowHeight*2 + 'rpx'
							uni.hideLoading()
						}else{
							uni.showModal({
								title: '提示',
								content: res.data.msg,
								success(){
									uni.navigateBack({
										
									})
								}
							})
							
						}
					}
				})
			},
			// 分享
			share(){
				return
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			// 手指放上屏幕
			touchstart(event){
				// console.log('手指放上位置', event.changedTouches[0].pageY)
				// 记录手指放上屏幕的位置
				if(this.isShowShopCart){
					// 购物车弹窗弹出时
					return
				}
				this.startPageY = event.changedTouches[0].pageY
			},
			// 手指离开屏幕
			touchend(event){
				// console.log('手指离开位置', event.changedTouches[0].pageY)
				// 记录手指离开的位置
				if(this.isShowShopCart){
					// 购物车弹窗弹出时
					return
				}
				let endPageY = event.changedTouches[0].pageY
				
				let distance = endPageY - this.startPageY
				console.log('移动距离', distance)
				// 判断用户向上/向下滑动
				if(distance === 0){
					// 普通点击 不动
				}
				if(distance < 0){
					// 向下滑动
						this.isShowNavagatar = true
				}
				if(distance > 0){
					// 向上滑动
					this.isShowNavagatar = false
				}
			},
			// 将所需参数存到本地
			initcanshu(type){
				let _this = this
				
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let danjia
						let allPrice
						let temp = _this.productValue[_this.paySpecStr] || {}
						if(reg.data.is_member === 1){
							// 是会员 拿会员价格
							if(temp.suk){
								allPrice = _this.payNum * +temp.vip_price
								danjia = temp.vip_price
							}else{
								allPrice = _this.payNum * _this.info.vip_price
								danjia = _this.info.vip_price
							}
						}
						else if(reg.data.is_member === 0){
							// 不是会员 拿非会员价格
							if(temp.suk){
								allPrice = _this.payNum * +temp.price
								danjia = temp.price
							}else{
								allPrice = _this.payNum * +_this.info.price
								danjia = _this.info.price
							}
						}else{
							uni.showModal({
								title: '提示',
								content: '会员身份判断出错,请联系管理员!'
							})
						}
						
						console.log('reg',reg)
						let data = {
							uid: reg.data.uid, 
							goods_id: _this.opt.id,
							spe_id: _this.targetProduct.product_id || '',
							spe_name: _this.paySpecStr,
							number: _this.payNum,
							server: '',
							money: allPrice,
							postage: 0 // 邮费暂时没有
						}
						
						
						// 将下单参数存到vuex
						_this.$store.commit('setProductOrderInfo', data)
						console.log('本地存储订单参数',_this.$store.state.productOrderInfo)
						if(type == 1){
							// 立即购买
							let img = _this.targetProduct.image || _this.staticImage
							console.log('跳转参数', img)
							uni.navigateTo({
								url:'./confirmorder?store_name=' + _this.info.store_name + '&store_info=' + _this.info.store_info + '&image=' + img +'&danjia=' + danjia
							})
						}
					}
				})
				
			},
			// 减
			jianClick(){
				if(this.payNum == 1){
					return
				}
				this.payNum--
				console.log('订单金额',this.orderMoney)
			},
			// 加
			jiaClick(){
				if ( this.payNum === this.stock){
					uni.showModal({
						title:'提示',
						content: '库存不足'
					})
					return
				}
				this.payNum++
			},
			// 购物车规格选择
			changeActives(type,index,tyix){
				console.log('type',type,index,tyix)
				// 改变选中的规格
				this.isTypeActive[index] = tyix
				let newArr = [...this.isTypeActive]
				this.isTypeActive = newArr
				
				// 改变购买选中拼接字符串
				this.paySpecArr[index] = this.productAttr[index].attr_values[tyix]
				this.paySpecStr = this.paySpecArr.join(',')
				
				// 改变库存
				this.targetProduct = this.productValue[this.paySpecStr] || {image:''}
				console.log('改变库存,产品信息',this.targetProduct)
				
			},
			changeActive(index){
				console.log(index)
				this.isActive = index
				if(index === 1){
					// 商品
					this.toView = 'sp'
					this.isShowNavagatar = false
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
				console.log('我被点击了')
				let _this = this
				this.initcanshu()
				console.log('判断是否可以提交', this.isSubmitOk)
				if(!this.isSubmitOk && !this.isNoType){
					uni.showModal({
						title: '提示',
						content: '没有您选择的型号库存'
					})
					return
				}
				if(this.payType === 1){
					// 加入购物车
					// uni.showToast({
					// 	title: '添加成功'
					// })
					console.log('info',this.info)
					console.log('targetProduct',this.targetProduct)
					
					// return
					uni.getStorage({
						key: 'userInfo',
						success(reg){
							let is_member = reg.data.is_member
							console.log('reg',reg)
							if(reg.data.tourist){
								
								uni.showModal({
									title: '提示',
									content: '游客没有该权限，是否去登录？',
									success(rr){
										console.log('rr',rr)
										if(rr.confirm){
											uni.redirectTo({
												url: '../mine/login/login'
											})
										}
										if(rr.cancel){
											// uni.switchTab({
											// 	url: './index'
											// })
										}
									}
								})
								return
							}
							let datas = {
								token: reg.data.token,
								goods_id: _this.info.id, // 商品id
								number: _this.payNum,
								spe_id: _this.targetProduct.product_id || '', // 规格id
								spe_name:  _this.targetProduct.suk || '', // 规格名称
							}
							console.log('传递参数',datas)
							
							uni.request({
								url: _this.$http + '/api/goods/addCart',
								method: 'POST',
								data:datas,
								success(res){
									console.log('加入购物车返回', res)
									if(res.data.status === 200){
										uni.showToast({
											title: '添加成功!'
										})
									}else{
										uni.showModal({
											title: '提示',
											content: '添加购物车失败！'
										})
									}
								}
							})
							
							
						}
					})
					
				}else{
					
					// 立即购买
					uni.getStorage({
						key: 'userInfo',
						success(reg){
							if(reg.data.tourist){
								
								uni.showModal({
									title: '提示',
									content: '游客没有该权限，是否去登录？',
									success(rr){
										console.log('rr',rr)
										if(rr.confirm){
											uni.redirectTo({
												url: '../mine/login/login'
											})
										}
										if(rr.cancel){
											// uni.switchTab({
											// 	url: './index'
											// })
										}
									}
								})
								return
							}else{
								_this.initcanshu(1)
							}
						}
					})
					
					
				}
				
				this.isShowShopCart = false
			},
			//跳转宝贝评价
			gotopingjia(){
				uni.navigateTo({
					url: './shoplist/pingjia?id=' + this.info.id
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
				let img = item.image
				uni.navigateTo({
					url: './productdetails?id=' + item.id + '&img=' + img
				})
			},
			// 搜索
			search(){
				let _this = this
					console.log(this.$store.state.userInfo)
					let userInfo = this.$store.state.userInfo
					uni.showLoading({
						title: ''
					})
					uni.request({
						url: this.$http + '/api/goods/userAddSearch',
						method: 'POST',
						data: {
							uid: userInfo.uid,
							value: this.searchValue
						},
						success(res){
							uni.hideLoading()
							console.log('搜索按钮返回数据',res)
							if(res.data.status === 200){
								uni.navigateTo({
									url: './productlist?value=' + _this.searchValue + '&type=' + '0' 
								})
							}
						}
					})
			},
			goback(){
				console.log('返回', getCurrentPages())
				// 先不处理深层次返回
				// if(getCurrentPages().length > 3){
				// 	uni.navigateBack({
				// 		delta: getCurrentPages().length - 2
				// 	})
				// 	return
				// }
				uni.navigateBack({
					
				})
				
			},
			// 关闭购物车弹窗
			closeClick(){
				this.isShowShopCart = false
			},
			// 收藏按钮
			collect(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						if(reg.data.tourist){
							
							uni.showModal({
								title: '提示',
								content: '游客没有该权限，是否去登录？',
								success(rr){
									console.log('rr',rr)
									if(rr.confirm){
										uni.redirectTo({
											url: '../mine/login/login'
										})
									}
									if(rr.cancel){
									}
								}
							})
							return
						}else{
							let datas =  {
									id: _this.opt.id,
									type: 1,
									re_type: 1,
									token: reg.data.token
								}
								console.log('查看收藏参数pppp', datas)
							uni.showLoading({
								title: '请稍后...'
							})
							uni.request({
								url: _this.$http + '/api/index/relation',
								method: 'POST',
								data:datas,
								success(res){
									uni.hideLoading()
									console.log('收藏返回数据',res.data.status)
									if(res.data.status === 200){
										uni.showToast({
											title: '收藏成功'
										})
									}else{
										uni.showModal({
											title: '提示',
											content: '收藏失败'
										})
									}
									
								}
							})
						}
						
					}
				})
				
			},
			// 客服电话
			tel(){
				uni.makePhoneCall({
					phoneNumber: this.$mobel
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
		// .description{
		// 	width: 100%;
		// 	margin-top: 24rpx;
		// }
		scroll-view{
			
			height: 100vh;
		}
		.content{
			width: 100%;
			height: 10000px;
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
				.menu_list{
					width: 100%;
					height: 76rpx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					opacity: .9;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 100rpx;
					position: fixed;
					top: 80rpx;
					z-index: 9999;
					padding-left: 40rpx;
					.item{
						height: 85rpx;
						box-sizing: border-box;
						margin-right: 80rpx;
					}
					.item.active{
						border-bottom:  5rpx solid #FF792C;
						color: #FF792C;
					}
				}
			.fightTogether{
				width: 100%;
				background-color: #FFFFFF;
				box-sizing: border-box;
				padding: 24rpx;
				margin-top: 24rpx;
				.itemf{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 24rpx;
					.f_left{
						display: flex;
						align-items: center;
						.avatar_box{
							display: flex;
							align-items: center;
							.addAvatar{
								width: 78rpx;
								height: 78rpx;
								background-color: #D4D4D4;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								margin-left: -10rpx;
								z-index: 88;
								image{
									width: 31rpx;
									height: 31rpx;
								}
							}
							image{
								width: 78rpx;
								height: 78rpx;
								border-radius: 50%;
							}
						}
						.cont_txt{
							font-size: 26rpx;
							margin-left: 24rpx;
							text{
								color: #FF5106;
							}
						}
					}
					.f_right{
						width:106rpx;
						height:48rpx;
						text-align: center;
						background:rgba(255,81,6,1);
						border-radius:24rpx;
						font-size:26rpx;
						font-weight:500;
						color:rgba(255,255,255,1);
						line-height:48rpx;
					}
				}
				
			}
			.Preslale{
				width:750rpx;
				height:87rpx;
				line-height: 37rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				box-sizing: border-box;
				padding: 28rpx 35rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					.img_box{
						// width: 88rpx;
						height: 100%;
						line-height: 30rpx;
						border: 1rpx solid #FFFFFF;
						display: flex;
						align-items: center;
						margin-left: 24rpx;
						border-radius: 5rpx;
						padding: 2rpx 10rpx 2rpx 0;
						.img{
							width: 31rpx;
							height: 32rpx;
							background-color: #FFFFFF;
							display: flex;
							align-items: center;
							padding-left: 5rpx;
						}
						.yushou{
							font-size: 22rpx;
							padding-left: 5rpx;
						}
						image{
							width: 22rpx;
							height: 21rpx;
						}
					}
				}
				.right{
					font-size: 24rpx;
					.price_box{
						
						margin-left: 24rpx;
						text{
							display: inline-block;
							width: 38rpx;
							height: 29rpx;
							line-height: 29rpx;
							text-align: center;
							background-color: #FFFFFF;
							color: #FF661A;
							border-radius: 3rpx;
							margin: 0 5rpx;
						}
					}
				}
				
			}
			
			.lunbo{
				height: 679rpx;
				background-color: #FFFFFF;
				position: relative;
				swiper{
					position:relative;
					width: 750rpx;
					height: 100%;
					overflow:hidden;
					image{
						// height: 100%;
						position: absolute;
						top: 50%;
						left: 50%;
						display: block;
						min-width: 100%;
						min-height: 100%;
						transform:translate(-50%,-50%);
					}
				}
			}
			.pic_box{
				width: 100%;
				height: 80rpx;
				text-align: center;
				position: fixed;
				top: 0;
				z-index: 999;
				
				
				
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
						// text-decoration: line-through;
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
				display: flex;
				justify-content: space-between;
			}
			.color_type{
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx 30rpx;
				background-color: #FFFFFF;
				margin-top: 25rpx;
				.title{
					font-size: 36rpx;
					// font-weight: 500;
					color: #888;
					margin-bottom: 30rpx;
				}
				.btn{
					display: flex;
					margin-bottom: 50rpx;
					.jian,.jia{
						width:52rpx;
						height:47rpx;
						border:1rpx solid #999;
						border-radius:0rpx 0rpx 0rpx 6rpx;
						color: #B7B7B7;
						font-size: 42rpx;
						line-height: 47rpx;
						text-align: center;
						font-weight: 400;
					}
					.num{
						width:85rpx;
						height:47rpx;
						border-top:1rpx solid #999;
						border-bottom:1rpx solid #999;
						font-size: 30rpx;
						color: #001111;
						line-height: 47rpx;
						text-align: center;
						font-weight: 500;
					}
				}
				.type_box{
					margin-bottom: 24rpx;
					.list_box{
						display: flex;
						.item{
							border: 1rpx solid #888;
							border-radius: 8rpx;
							margin-right: 15rpx;
							font-size: 30rpx;
							padding: 3rpx 30rpx;
						}
						.item.active{
							background-color: #f40;
							color: #FFFFFF;
							border: 1rpx solid #f40;
						}
						margin-bottom: 50rpx;
					}
					
				}
				
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
				margin-bottom: 24rpx;
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
						// width:208rpx;
						display: inline-block;
						padding: 0 25rpx;
						height:57rpx;
						line-height: 57rpx;
						text-align: center;
						font-size: 26rpx;
						color: #686264;
						// font-weight: 500;
						background:rgba(255,236,237,1);
						border-radius:29rpx;
						margin-right: 25rpx;
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
			.description{
				width: 100%;
			}
			.staticHen{
				width: 100%;
				height: 24rpx;
				background: #F4F4F4;
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
					padding-bottom: 100rpx;
					.item{
						width: 340rpx;
						box-sizing: border-box;
						// padding: 12rpx;
						background-color: #FFFFFF;
						margin-bottom: 18rpx;
						border-radius:12rpx 12rpx 0 0;
						box-shadow: #DDDDDD 0 0 15rpx 5rpx;
						.img{
							width: 100%;
							text-align: center;
							image{
								width: 100%;
								height: 305rpx;
							}
						}
						.title{
							width: 100%;
							font-size: 25rpx;
							color: #272727;
							padding: 0 12rpx;
							box-sizing: border-box;
							font-weight: 500;
							margin-bottom: 25rpx;
							overflow: hidden;
							  text-overflow: ellipsis;
							  display: -webkit-box;
							  -webkit-line-clamp: 3; //行数
							   -webkit-box-orient: vertical;
						}
						.bom_btn{
							box-sizing: border-box;
							padding: 0 12rpx 15rpx 12rpx;
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
				z-index: 999999;
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
						z-index: 99999;
						
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
						.price_box{
							// width: 100%;
							height: 130rpx;
							width: 350rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						}
						.img{
							width:232rpx;
							height:231rpx;
							background:#eee;
							border-radius:12rpx;
							text-align: center;
							box-sizing: border-box;
							// padding-top: 38rpx;
							margin-right: 18rpx;
							position: relative;
							image{
								width: 100%;
								height: 100%;
							}
							.float_btn{
								width: 100%;
								height: 40rpx;
								background: rgba(0,0,0,.4);
								position: absolute;
								bottom: 0;
								color: #FFFFFF;
								font-size: 22rpx;
								line-height: 40rpx;
								border-radius: 8rpx 8rpx 0 0;
							}
						}
					}
					.color_type{
						width: 100%;
						
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
