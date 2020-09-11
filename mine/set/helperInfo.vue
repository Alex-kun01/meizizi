<template>
	<!-- 问题详情 -->
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<view class="con_content">
			<view class="title">{{title}}</view>
			<view class="html_con" v-html="content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				id: '',
				title: '',
				content: ''
			}
		},
		onLoad(opt){
			
			this.id = opt.id
			console.log(this.id)
			this.getData(this.id)
		},
		onShow(){
			
		},
		onUnload(){
			uni.hideLoading()
		},
		methods:{
			getData(id){
				let _this = this
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.$http + '/api/goods/helpInfo',
					method: 'POST',
					data: {
						id
					},
					success(res){
						console.log('问题详情数据', res)
						if(res.data.status === 200){
							_this.title = res.data.data.title
							
							let cons = res.data.data.content
							
							let ins = cons.split('</p>')
							console.log(ins)
							let newContetn = []
							
							ins.forEach(item =>{
								newContetn.push(item.replace(/style=""/g, "style='width:100%;margin:-8px 0'")+"</p>")
							})
							let targetContent = newContetn.join(',')
							_this.content = targetContent.replace(/,/g,'')
							
							
						}else{
							uni.showModal({
								title: '提示',
								content: '获取详情数据失败'
							})
						}
						uni.hideLoading()
					}
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
		background-color: #F4F4F4;
		.content{
			width: 100%;
			height: 100vh;
			background-color: #F4F4F4;
			.con_content{
				
				width: 100%;
				image{
					width: 100%!important;
				}
				.title{
					font-weight: 500;
					font-size: 32rpx;
					margin: 20rpx 0 40rpx 20rpx;
				}
				.html_con{
					font-size: 28rpx;
					width: 100%;
				}
			}
		}
	}
</style>
