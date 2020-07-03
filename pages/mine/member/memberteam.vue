<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 会员团队 -->
		<view class="topboxx">
			
		</view>
		<view class="search_box">
			<image @click="seachClick" style="width: 30rpx;height: 30rpx;" src="../../../static/index/sosuo.png" mode=""></image>
			<input type="text" v-model="searchValue" placeholder="搜索" />
		</view>
		<!--成员列表 -->
		<view class="member_list" v-if="showList.length != 0">
			<view class="item"
			v-for="(item,index) in showList"
			:key="index"
			>
				<view class="img_l">
					<image :src="item.avatar" mode=""></image>
					<view class="con_box">
						<!-- 职位（1-超级管理员 2-总经理 3-总监 4-省代理 5-业务员/讲师 6-服务商 7-物流商 8-加盟店 9-会员消费者 10-普通消费者 11-市级服务商） -->
						<view class="name">{{item.nickname}}</view>
						<view class="zhiwei" v-if="item.position == 3">职位：总监</view>
						<view class="zhiwei" v-if="item.position == 4">职位：省区经理</view>
						<view class="zhiwei" v-if="item.position == 5">职位：业务员</view>
						<view class="zhiwei" v-if="item.position == 6">职位：服务商</view>
						<view class="zhiwei" v-if="item.position == 7">职位：物流商</view>
						<view class="zhiwei" v-if="item.position == 11">职位：市级代理</view>
					</view>
				</view>
				<view class="btn_r" @click="renmClick(item, index)">任命</view>
			</view>
			
		</view>
		<view class="loading" v-if="isLoading">
			加载中...
		</view>
		
		<!-- 任命弹窗 -->
		<view class="renming_float"
		v-if="isShow"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="con_box">
				<view class="title">
					请选择角色
				</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					@scroll="scroll"
					>
						<view class="item"
						v-for="(item, index) in renmingList"
						:key="index"
						@click="chooseActive(item, index)"
						>
						<view class="yuan">
							<image v-if="isActive === index" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
						</view>	
						<view class="text">
							{{item.name}}
						</view>
						</view>
					 </scroll-view>
				<view class="btn_box">
					<view class="on_btn" @click="onClick">取消</view>
					<view class="ok_btn" @click="okClick">确定</view>
				</view>
			</view>
		</view>
		<!-- 省选择弹窗 -->
		<view class="renming_float shen"
		v-if="isShowShen"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="con_box">
				<view class="title">
					请选择所属省份
				</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					@scroll="scroll"
					>
						<view class="item"
						v-for="(item, index) in shenList"
						:key="index"
						@click="chooseShenActive(item,index)"
						>
						<view class="yuan">
							<image v-if="isActive === index" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
						</view>	
						<view class="text">
							{{item.name}}
						</view>
						</view>
					 </scroll-view>
				<view class="btn_box">
					<view class="on_btn" @click="onshenClick">取消</view>
					<view class="ok_btn" @click="okshenClick">确定</view>
				</view>
			</view>
		</view>
		
		<!-- 市选择弹窗 -->
		<view class="renming_float shen"
		v-if="isShowShi"
		@touchmove.stop.prevent="moveHandle" 
		>
			<view class="con_box">
				<view class="title">
					请选择所属市
				</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
					@scroll="scroll"
					>
						<view class="item"
						v-for="(item, index) in shiList"
						:key="index"
						@click="chooseShenActive(item,index)"
						>
						<view class="yuan">
							<image v-if="isActive === index" src="../../../static/mine/gouxuan@2x.png" mode=""></image>
						</view>	
						<view class="text">
							{{item.name}}
						</view>
						</view>
					 </scroll-view>
				<view class="btn_box">
					<view class="on_btn" @click="onshiClick">取消</view>
					<view class="ok_btn" @click="okshiClick">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				isShow: false,  // 是否展示任命弹窗
				isShowShen: false, // 是否展示省选择弹窗
				isShowShi: false, // 是否展示市选择弹窗
				isActive: 0, // 任命角色索引
				isLoading: false, // loading
				reNmingId: '', // 任命的id
				uid: '', // 任命的人的uid
				searchValue: '', // 搜索值
				page: 1,
				limit: 10,
				 scrollTop: 0,
				// 任命列表
				renmingList: [],
				showList:[],
				shenList: [], // 省选择列表
				shiList: [], // 市选择列表
				targetCode: '', // 目标code /省code/市code
				
			}
		},
		onLoad(){
			this.getData()
			this.getShenData()
			
		},
		onShow(){
			
		},
		methods:{
			getData(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.request({
							url: _this.$http + '/api/team/memberAdmin',
							method: 'POST',
							data: {
								token: reg.data.token,
								page: _this.page,
								limit: _this.limit,
								content: _this.searchValue
							},
							success(res){
								_this.isLoading = false
								console.log('成员返回数据', res)
								if(res.data.status === 200){
									_this.renmingList = res.data.data.appo_list
									_this.reNmingId = _this.renmingList[0].id
									if(_this.showList.length == 0){
										_this.showList = res.data.data.user_list
									}else{
										_this.showList = _this.showList.concat(res.data.data.user_list) 
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
			getShenData(){
				let _this = this
				uni.request({
					url: _this.$http + '/api/index/getProvince',
					method: 'POST',
					success(res){
						console.log('选择省数据', res)
						if(res.data.status === 200){
							_this.shenList = res.data.data
						}else{
							uni.showModal({
								title: '提示',
								content: '省级列表获取失败'
							})
						}
					}
				})
			},
			getShiData(){
				let _this = this
				let datas = {
					code: _this.targetCode
				}
				console.log('获取市参数', datas)
				uni.showLoading({
					title: ''
				})
				uni.request({
					url: _this.$http + '/api/index/getCity',
					method: 'POST',
					data: datas,
					success(res){
						_this.isShowShi = true
						uni.hideLoading()
						console.log('获取到市信息', res)
						if(res.data.status === 200){
							_this.shiList = res.data.data
							_this.targetCode = _this.shiList[0].id
							_this.isActive = 0
						}else{
							uni.showModal({
								title: '提示',
								content: '获取市列表数据失败'
							})
						}
					}
				})
			},
			// 搜索
			seachClick(){
				this.showList = []
				this.getData()
			},
			// 直接任命
			renmingOk(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							uid: _this.uid,
							code: _this.targetCode,
							user_position: _this.reNmingId
						}
						console.log('查看任命时的参数', datas)
						uni.showLoading({
							title: '请稍后...'
						})
						uni.request({
							url: _this.$http + '/api/team/appointment',
							method: 'POST',
							data: datas,
							success(res){
								uni.hideLoading()
								console.log('任命后返回数据', res)
								if(res.data.status === 200){
									_this.showList = []
									_this.getData()
									uni.showToast({
										title: '任命成功！'
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
			// 任命
			renmClick(item, index) {
				console.log(item, index)
				this.isShow = true
				this.uid = item.id
			},
			upper: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			moveHandle(){
				
			},
			chooseActive(item, index) {
				console.log('item', item)
				this.isActive = index
				this.reNmingId = item.id
			},
			// 省选择
			chooseShenActive(item,index){
				console.log('item', item)
				this.isActive = index
				this.targetCode = item.id
			},
			// 取消任命
			onClick(){
				this.isShow = false
			},
			// 取消省任命
			onshenClick(){
				this.isShowShen = false
			},
			// 省任命提交
			okshenClick(){
				this.isShowShen = false
				if(this.reNmingId == 11){
					// 市级代理
					this.getShiData()
				}else{
					// 非市任命
					this.renmingOk()
				}
				console.log('目标省code', this.targetCode)
			},
			// 取消市任命
			onshiClick(){
				this.isShowShi = false
			},
			// 市任命提交
			okshiClick(){
				this.isShowShi = false
				console.log('目标市code', this.targetCode)
				this.renmingOk()
			},
			// 确定任命
			okClick(){
				this.isShow = false
				if(this.reNmingId == 4){
					// 省代理 
					this.isShowShen = true
					return
				}
				if(this.reNmingId == 11){
					// 市级代理
					this.isShowShen = true
					return
				}
				this.renmingOk()
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
		// height: 100%;
		background-color: #F4F4F4;
		.topboxx{
			width: 100%;
			height: 24rpx;
			background-color:#F4F4F4;
		}
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.loading{
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #eee;
				text-align: center;
				font-size: 28rpx;
			}
			.search_box{
				width:690rpx;
				height:70rpx;
				background: #FFFFFF;
				margin-left: 30rpx;
				// background-color: pink;
				border-radius:30rpx;
				box-sizing: border-box;
				padding: 24rpx;
				display: flex;
				align-items: center;
				margin-top: 24rpx;
				input{
					color: #707070;
					font-size: 26rpx;
				}
				image{
					margin-right: 24rpx;
				}
			}
			.member_list{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				background-color: #FFFFFF;
				margin-top: 24rpx;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.img_l{
						display: flex;
						align-items: center;
						image{
							width: 115rpx;
							height: 112rpx;
							margin-right: 24rpx;
						}
						.name{
							color: #2B2B2B;
							font-size: 26rpx;
							font-weight: 500;
							margin-bottom: 17rpx;
						}
						.zhiwei{
							color: #BBBBBB;
							font-size: 24rpx;
						}
					}
					.btn_r{
						width:76rpx;
						height:35rpx;
						background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
						border-radius:18rpx;
						line-height: 35rpx;
						text-align: center;
						color: #FFFFFF;
						// font-weight: 500;
						font-size: 24rpx;
					}
				}
			}
			
			.renming_float{
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.8);
				position: absolute;
				top: 0;
				.title{
					text-align: center;
					margin-bottom: 24rpx;
					font-size: 32rpx;
					font-weight: 500;
				}
				.con_box{
					width:556rpx;
					// height:406rpx;
					background:rgba(255,255,255,1);
					border-radius:10rpx;
					position: absolute;
					top: calc(50% - 203rpx);
					left: calc(50% - 273rpx);
					box-sizing: border-box;
					padding: 24rpx;
						.scroll-Y{
							width: 100%;
							height: 235rpx;
							
							.item{
								display: flex;
								justify-content: center;
								align-items: center;
								margin-bottom: 18rpx;
								.yuan{
									width:28rpx;
									height:28rpx;
									border:2rpx solid rgba(212,212,212,1);
									border-radius:50%;
									margin-right: 15rpx;
									position: relative;
									image{
										width: 28rpx;
										height: 28rpx;
										position: absolute;
										top: 0;
									}
								}
								.text{
									width: 150rpx;
									color: #BBBBBB;
									font-size: 28rpx;
									font-weight: 500;
								}
							}
						}
						
					.btn_box{
						width: 100%;
						box-sizing: border-box;
						padding: 0 13%;
						display: flex;
						justify-content: space-between;
						margin-top: 40rpx;
						.on_btn{
							width:178rpx;
							height:69rpx;
							background:rgba(255,255,255,1);
							border:1rpx solid rgba(255,82,5,1);
							border-radius:35rpx;
							line-height: 69rpx;
							text-align: center;
							color: #000000;
							font-size: 24rpx;
						}
						.ok_btn{
							width:178rpx;
							height:69rpx;
							background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
							border-radius:35rpx;
							line-height: 69rpx;
							text-align: center;
							color: #FFFFFF;
							font-size: 24rpx;
							
						}
					}
				}
			}
			.renming_float.shen{
				
			}
		}
	}
</style>
