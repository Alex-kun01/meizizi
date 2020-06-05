<template>
	<view class="content">
		<view class="titleNview-placing"></view>
		
		<!-- 导航 -->
		<view class="daohang">
			<view class="item"
			:data-id="a"
			@tap="bindToView"
			>
				一
			</view>
			<view class="item"
			:data-id="b"
			@tap="bindToView"
			>
				二
			</view>
			<view class="item"
			:data-id="c"
			@tap="bindToView"
			>
				三
			</view>
			<view class="item"
			:data-id="d"
			@tap="bindToView"
			>
				四
			</view>
		</view>
		
		<scroll-view class="scroller" :scroll-into-view="toView" scroll-y="true" scroll-with-animation="true">
			<view class="option pink" 
			:id="a" 
			>
				一
			</view>
			
			<view class="option green" 
			:id="b" 
			>
				二
			</view>
			
			<view class="option red" 
			:id="c" 
			>
				三
			</view>
			
			<view class="option black" 
			:id="d" 
			>
				四
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				toView: '',
				a: 'a',
				b: 'b',
				c: 'c',
				d: 'd',
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods:{
			bindToView(event){
				var id = event.currentTarget.dataset.id;
				console.log(id)
				this.toView = id;
				console.log(this.toView)
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
			padding: 0 24rpx;
			box-sizing: border-box;
			background-color: #F4F4F4;
			.daohang{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.item{
					width: 100rpx;
					height: 100rpx;
					background-color: #f40;
				}
			}
			scroll-view{
				height: 100vh;
				}
			.scroller{
				width: 100%;
				.option{
					width: 100%;
					height: 600rpx;
				}
				.pink{
					background-color: pink;
				}
				.green{
					background-color: green;
				}
				.red{
					background-color: red;
				}
				.black{
					background-color: black;
				}
			}
			
		}
	}
</style>
