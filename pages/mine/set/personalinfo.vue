<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 个人信息 -->
		<view class="top_navar">
			<image v-if="!imgUrl" class="navar" src="../../../static/mine/staticAvatar.jpg" mode=""></image>
			<image v-else :src="imgUrl" class="navar"  mode=""></image>
			<image @click="editAvtar" class="edit" src="../../../static/mine/xiugaitouxiang@2x.png" mode=""></image>
		</view>
		
		<view class="item">
			<view class="title">
				昵称
			</view>
			<input type="text"  v-model="userInfo.nickName" placeholder="输入名字" />
		</view>
		<view class="item">
			<view class="title">
				生日
			</view>
			 <picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{birthday}}</view>
			</picker>
		</view>
		<view class="item">
			<view class="title">
				性别
			</view>
			<!-- <input type="text" value="" placeholder="输入名字" /> -->
			<view class="sex_box">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						  <label class="radio"><radio style="transform:scale(0.5)" :value="item.sex" :checked="index === current"/>{{item.sex}}</label>
					</label>
				</radio-group>
			</view>
		</view>
		<!-- 保存 -->
		<view class="bao_btn" @click="baocunClick">
			保存
		</view>
		
		
	</view>
</template>

<script>
	export default {
		
		data () {
			const currentDate = this.getDate({
				format: true
			})
			return {
				imgUrl:'', //上传头像地址
				items: [
					{
						sex: '男'
					},
					{
						sex: '女'
					}
				],
				current: 0,
				birthday: currentDate,
				userInfo: {
					nickName: '是九尾主动的',
					sex: '男'
				}
			}
		},
		computed:{
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(){
			this.init()
		},
		onShow(){
			
		},
		methods:{
			// 初始化页面
			init(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(res){
						console.log('初始化页面数据', res)
						_this.userInfo.nickName = res.data.nickname
						if(res.data.sex == 1){
							_this.current = 0
							_this.userInfo.sex = '男'
						}
						if(res.data.sex == 2){
							_this.current = 1
							_this.userInfo.sex = '女'
						}
						_this.birthday = res.data.birthday.substring(0,10)
						_this.imgUrl = res.data.avatar
					}
				})
			},
			bindDateChange: function(e) {
				this.birthday = e.target.value
			},
			// 保存按钮
			baocunClick(){
				// return
				let _this = this
				let datas = {}
				uni.getStorage({
					key: 'userInfo',
					success(res){
						datas.token = res.data.token
						datas.avatar = _this.imgUrl	
						datas.sex = _this.userInfo.sex == '男' ? 1 : 2
						datas.birthday = _this.birthday
						datas.nickname = _this.userInfo.nickName || ''
						
						
						console.log('传参参数',datas)
						
						uni.request({
							url: _this.$http + '/api/index/editUserData',
							method: 'POST',
							data: datas,
							success(ref){
								console.log('修改信息返回数据', ref)
								if(ref.data.status === 200){
									uni.showToast({
										title: ref.data.msg
									})
									// return
									console.log('token', res.data.token	)
									
									let bData = ref.data.data
									console.log('bData', bData)
									bData.token = res.data.token
									// return
									// 更新本地userInfo
									uni.setStorage({
										key: 'userInfo',
										data: bData
									})
									setTimeout(()=>{
										uni.switchTab({
											url: '../mine'
										})
									},1000)
									
								}else{
									uni.showModal({
										title: '提示',
										content: ref.data.msg
									})
								}
							}
						})
					}
					
				})
				
			},
			// 修改头像
			editAvtar(){
				let _this = this
				uni.chooseImage({
					count: 1, // 上传图片的张数
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
								 
								 _this.imgUrl = resObj.data.url
								 console.log('上传成功', _this.imgUrl)
							 }
							}
							
						})
						
					}
				})
			},
			getDate(type) {
				const date = new Date();
				console.log('date',date)
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
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
			.top_navar{
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 60rpx;
				.navar{
					width: 207rpx;
					height: 207rpx;
					border-radius: 50%;
				}
				.edit{
					width: 148rpx;
					height: 49rpx;
				}
			}
			.item{
				width: 100%;
				box-sizing: border-box;
				padding: 24rpx;
				border-bottom: 1rpx solid #ECECEC;
				.title{
					font-size: 30rpx;
					color: #969696;
					font-weight: 500;
					margin-bottom: 20rpx;
				}
				.sex_box{
					text-align: right;
					font-size: 21rpx;
					color: #383838;
				}
				input,.uni-input{
					font-size: 24rpx;
					color: #8A8A8A;
				}
			}
			.bao_btn{
				width:470rpx;
				height:94rpx;
				background:linear-gradient(-88deg,rgba(255,80,5,1),rgba(255,122,45,1));
				border-radius:47rpx;
				line-height: 94rpx;
				text-align: center;
				color: #FFFFFF;
				font-weight: 500;
				margin: 150rpx 0 250rpx 140rpx;
			}
		}
	}
</style>
