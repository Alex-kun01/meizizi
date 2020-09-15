<template>
	<view>
		<view class="cu-chat">
			<!-- 聊天消息列表 -->
			<view 
			v-for="(item,index) in chatList"
			:key='index'
			:class="{'cu-item': true,self: item.bgGreen} "
			>
				<!-- 右侧 自己消息 -->
				<view class="main" v-if="item.type == 'right'">
					<view :class="{content:true,shadow: true,'bg-green': item.bgGreen}">
						<!-- 消息图片 / 消息文字 -->
						<text v-if="item.content">{{item.content}}</text>
						<image v-else :src="item.pic" class="radius" mode="widthFix"></image>
					</view>
				</view>
				<image  v-if="item.type == 'right'" class="cu-avatar radius" style="width: 80rpx;height: 80rpx;border-radius: 5rpx;" :src="item.avatar" mode=""></image>
				<view  v-if="item.type == 'right'" class="date">{{item.date}}</view>
				
				<!-- 左侧 对方消息 -->
			<image  v-if="item.type == 'left'" class="cu-avatar radius" style="width: 80rpx;height: 80rpx;border-radius: 5rpx;" :src="item.avatar" mode=""></image>
				<view   v-if="item.type == 'left'" class="main">
					<view class="content shadow">
						我是一条消息呢
					</view>
				</view>
				<view   v-if="item.type == 'left'" class="date">13:23</view>
				
				
			</view>
		</view>
		<!-- 发送消息栏 -->
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur" v-model="textContent"></input>
			 <!-- 上传图片 -->
			<view class="action" @click="chooseImgClick">
				<image style="width: 60rpx;height: 60rpx;" src="../../static/second/8181d478-50e8-4adb-afd6-4d9c4fb6db8b.png" mode=""></image>
			</view>
			<button @click="sendClick" class="cu-btn bg-green shadow">发送</button>
		</view>

	</view>
</template>

<script>
	import {webscoket,sendSocketMessage} from '@/components/webscoket.js'
	export default {
		data() {
			return {
				InputBottom: 0,
				// 输入文字
				textContent: '',
				// 选择的图片
				chooseImg: '',
				// 聊天列表
				chatList: [
					{
						type: 'right',
						avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2953277823,3745771633&fm=26&gp=0.jpg',
						content: '',
						bgGreen: true,
						date: '2020年8月5日 13:23',
						pic: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
					},
					{
						type: 'left',
						avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3756413411,2861693441&fm=26&gp=0.jpg',
						content: '我是一条消息哦',
						bgGreen: false,
						date: '2020年8月5日 13:23',
						pic: ''
					}
				]
			};
		},
		onLoad() {
			let {uid} = uni.getStorageSync('userInfo')
			const wok = webscoket(uid)
			console.log('wok', wok)
		},
		methods: {
			// 发送点击事件
			sendClick(){
				if(this.textContent == '' && this.chooseImg == ''){
					uni.showModal({
						title: '提示',
						content: '请输入内容'
					})
					return
				}
				console.log('send事件',this.textContent)
				let _this = this
				let chatInfo = {
					type: 'right',
					avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2953277823,3745771633&fm=26&gp=0.jpg',
					content: this.textContent,
					bgGreen: true,
					date: this.getNowDate(),
					pic: this.chooseImg
				}
				if(chatInfo.pic != ''){
					chatInfo.content = ''
				}
				this.chatList.push(chatInfo)
				this.textContent = ''
				this.chooseImg = ''
				
			},
			// 选择图片
			chooseImgClick(){
				let _this = this
				uni.chooseImage({
					 // count:  允许上传的照片数量
					 count:1,
					 // sizeType:  original 原图，compressed 压缩图，默认二者都有
					 sizeType: "original",
					 success(res){
						 _this.chooseImg = res.tempFilePaths[0]
						 _this.textContent = '已选中一张图片'
						  console.log('图片地址', _this.chooseImg)
					 } 
				 });
			},
			// 获取当前日期时间 
			getNowDate(){
				var date = new Date();
				//年
				var year=date.getFullYear();
				//月
				var month=date.getMonth()+1;
				//日
				var day=date.getDate();
				//时
				var hh=date.getHours();
				//分
				var mm=date.getMinutes();
				//秒
				var ss=date.getSeconds();
				var targetDate = year+"年"+month+"月"+day+"日"+hh+":"+mm+":"+ss;
				return targetDate
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
}
</style>
