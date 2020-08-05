<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 新 任命 -->
		<view class="item first">
			<view class="left">
				职位
			</view>
			<view class="right">
				<picker mode="selector" :range="renmingSf" @change="changeSf">
					<view>{{renmingSf[sfIndex] || '请选择'}}</view>
				</picker>
				<image src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
		</view>
		<view class="item">
			<view class="left">
				管理区域
			</view>
			<scroll-view
			class="right scroll"
			scroll-x="true"
			>
				<view class="tab"
				v-for="(item,index) in chooseShenArr"
				:key="index"
				v-if="chooseShenArr.length != 0"
				@click="deletesfIndex(index)"
				>
					<text>{{item}}</text>
					<image src="../../../static/index/close3.png" mode=""></image>
				</view>
			</scroll-view>
		</view>
		<view class="item">
			<view class="left">
				选择管理区域
			</view>
			<view class="right">
				<picker mode="selector" :range="shenArr" @change="changeS">
					<view>{{shenArr[snIndex] || '请选择'}}</view>
				</picker>
				<image src="../../../static/index/chakan@2x.png" mode=""></image>
			</view>
		</view>
		<view @click="submitClick" class="sub_mit">
			确定
		</view>
		
	</view>
</template>

<script>
	export default {
		data () {
			return {
				// 身份
				sfArr: [], // 所有身份数据
				renmingSf: [],
				sfIndex: '',
				// 管理区域
				shArr: [], // 所有管理区域数据
				shenArr: [],
				snIndex: '',
				// 选择的管理区域列表
				chooseShenArr: [],
				opt: {}
			}
		},
		computed:{
			// 职位id
			sfCode(){
				let code = ''
				this.sfArr.forEach(item =>{
					if(item.name == this.renmingSf[this.sfIndex]){
						code = item.id
					}
				})
				return code
			},
			// 管理区域的id arr
			quCodeArr(){
				let codeArr = []
				this.shArr.forEach(item =>{
					
					this.chooseShenArr.forEach(option =>{
						if(item.name == option){
							codeArr.push(item.id)
						}
					})
				})
				return codeArr
			}
		},
		onLoad(opt){
			this.opt = opt
			this.init()
		},
		onShow(){
			
		},
		methods:{
			
			init(){
				this.getPosition()
				this.getShen()
			},
			// 获取职位
			getPosition(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.request({
							url: _this.$http + '/api/team/administration',
							method: 'POST',
							data: {
								token: reg.data.token
							},
							success(res){
								console.log('任命',res)
								let sfArr = res.data.data
								_this.sfArr = sfArr
								console.log('sfArr', sfArr)
								sfArr.forEach(item =>{
									_this.renmingSf.push(item.name)
								})
							}
						})
					}
				})
			},
			// 获取管理区域
			getShen(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						uni.request({
							url: _this.$http + '/api/team/getProvince',
							method: 'POST',
							data: {
								token: reg.data.token
							},
							success(res){
								console.log('管理区域',res)
								let shArr = res.data.data
								_this.shArr = shArr
								console.log('shArr', shArr)
								shArr.forEach(item =>{
									_this.shenArr.push(item.name)
								})
							}
						})
					}
				})
			},
			// 提交
			submitClick(){
				let _this = this
				let sfCode = this.sfCode
				let quCodeStr = JSON.stringify(this.quCodeArr)
				console.log('提交查看', sfCode, quCodeStr)
				if(!sfCode){
					uni.showModal({
						title: '提示',
						content: '请选择任命职位!'
					})
					return
				}
				if(sfCode !== 5 && this.quCodeArr.length === 0){
					uni.showModal({
						title: '提示',
						content: '请选择管理区域!'
					})
					return
				}
				
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let datas = {
							token: reg.data.token,
							uid: _this.opt.id,
							code: quCodeStr,
							user_position: sfCode
						}
						console.log('查看提交参数', datas)
						uni.showLoading({
							title: ''
						})
						uni.request({
							url: _this.$http + '/api/team/appointment',
							method: 'POST',
							data:datas,
							success(res){
								uni.hideLoading()
								console.log('提交任命', res)
								if(res.data.status === 200){
									uni.showToast({
										title: '任命成功!',
										success(){
											uni.navigateBack({
												
											})
										}
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
			
			// 选择身份
			changeSf(e){
				this.sfIndex = e.target.value
			},
			// 选择省份
			changeS(e){
				this.snIndex = e.target.value
				let shen = this.shenArr[e.target.value]
				console.log('查看省', shen)
				if(this.chooseShenArr.includes(shen)){
					uni.showModal({
						title: '提示',
						content: '您已经选择过该省份，请勿重复选择！'
					})
					return
				}
				this.chooseShenArr.push(shen)
			},
			// 删除选中的省
			deletesfIndex(index){
				this.chooseShenArr.splice(index,1)
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
			.sub_mit{
				width:600rpx;
				height:94rpx;
				line-height: 94rpx;
				text-align: center;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:47rpx;
				font-size:32rpx;
				font-weight:bold;
				color:rgba(255,255,255,1);
				margin: 200rpx 0 0 75rpx;
				
			}
			.item{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				padding: 5rpx 24rpx;
				background-color: #FFFFFF;
				border-bottom: 1rpx solid #eee;
				.left{
					min-width: 180rpx;
					font-size:30rpx;
					font-weight:500;
					color:rgba(12,20,24,1);
				}
				.right{
					display: flex;
					align-items: center;
					font-size: 30rpx;
					color: #999;
					image{
						width: 23rpx;
						height: 32rpx;
						margin-left: 10rpx;
					}
				}
				.right.scroll{
					text-align: right;
					white-space:nowrap;
					.tab{
						display: inline-block;
						padding: 5rpx 10rpx;
						border-radius: 5rpx;
						background-color: #EEEEEE;
						margin-right: 10rpx;
						text{
							font-size: 26rpx;
						}
						image{
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
			}
			.item.first{
				margin-top: 24rpx;
			}
		}
	}
</style>
