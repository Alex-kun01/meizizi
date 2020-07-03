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
				<image v-if="isOnUpload" @click="chooseImg" class="staticpic" src="../../static/shopcart/shangchuantup@2x.png" mode=""></image>
				<view class="userUpload"  v-for="(img,imx) in imgList" :key="imx">
					<image :src="img" mode=""></image>
					<image @click="deleteImg(imx)" class="close" src="../../static/index/closeX2.png" mode=""></image>
				</view>
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
				imgList: [], //上传图片后的地址列表
				opt: {}
			}
		},
		computed:{
			valueLength(){
				return this.textValue.length
			},
			// 是否可以继续上传图片
			isOnUpload(){
				if(this.imgList.length == 2){
					return false
				}else{
					return true
				}
			},
			// 所有图片拼接str
			imgStr(){
				return this.imgList.join(',')
			}
		},
		onLoad(opt){
			this.opt = opt
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
				let _this = this
				if(this.start === 0){
					uni.showModal({
						title: '提示',
						content: '请评分'
					})
					return
				}
				uni.getStorage({
					key: 'userInfo',
					success(res){
						console.log('本地储存',res.data)
						
						let datas = {
							number: _this.start,
							content: _this.textValue,
							imgs: _this.imgStr,
							token: res.data.token,
							is_ano:(_this.anonymous) ? 0 : 1,
							// 暂无订单id和商品id 给固定值
							oid: _this.opt.id,
							gid: _this.opt.gid
						}
						console.log('传参',datas)
						
						// return
						uni.request({
							url: _this.$http + '/api/goods/goodsEva',
							method: 'POST',
							data:datas,
							success(res) {
								console.log('发布返回',res)
								if(res.data.status === 200){
									uni.showToast({
										title: '发布成功'
									})
									setTimeout(()=>{
										uni.navigateBack({
											
										})
									}, 1000)
								}else{
									uni.showModal({
										title: '提示',
										content:'评价失败'
									})
								}
							}
						})
						
						
					}
				})
				
				
				
			},
			chooseImg(){
				let _this = this
				if(this.imgList.length == 2) {
					uni.showModal({
						title: '提示',
						content: '最多只能上传两张图片'
					})
					return
				}
				uni.chooseImage({
					count: 2, // 上传图片的张数
					sourceType: ['album'], //从相册选择
					success(res) { // 成功则返回图片的本地文件路径列表 tempFilePaths
						uni.showLoading({
							title: '上传中...'
						})
						const tempFilePaths = res.tempFilePaths;
						
						const uploadTask = uni.uploadFile({
							url: _this.$http + '/api/upload/image',
							// methods: 'POST',
							filePath: tempFilePaths[0],
							name: 'file',
							 success: function (uploadFileRes) {
							 console.log('xxx',uploadFileRes.data);
							 let resObj = JSON.parse( uploadFileRes.data )
							 console.log('resObj',resObj);
							 if(resObj.status === 200){
								 uni.hideLoading()
								 
								 _this.imgList.push(resObj.data.url)
								 console.log('上传成功', _this.imgList)
							 }
							}
							
						})
						
					}
				})
			},
			// 删除图片
			deleteImg(index){
				if(index === 0){
					this.imgList.shift()
				}
				if(index === 1){
					this.imgList.pop()
				}
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
					// height: 130rpx;
					margin: 30rpx 0;
					
					.staticpic{
						width: 130rpx;
						height: 130rpx;
						margin-right: 24rpx;
					}
					.userUpload{
						margin-right: 24rpx;
						position: relative;
						display: inline-block;
						image{
							max-width: 330rpx;
							max-height: 230rpx;
							
						}
						image.close{
							width: 30rpx;
							height: 30rpx;
							position: absolute;
							top: 5rpx;
							right: 5rpx;
						}
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
