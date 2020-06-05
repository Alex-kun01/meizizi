<template>
	<view class="content">
		<!-- <view class="titleNview-placing"></view> -->
		<!-- 个人信息 -->
		<view class="top_navar">
			<image class="navar" src="../../../static/mine/avatar.jpg" mode=""></image>
			<image @click="editAvtar" class="edit" src="../../../static/mine/xiugaitouxiang@2x.png" mode=""></image>
		</view>
		
		<view class="item">
			<view class="title">
				昵称
			</view>
			<input type="text" value="" placeholder="输入名字" />
		</view>
		<view class="item">
			<view class="title">
				生日
			</view>
			 <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input">{{userInfo.birthday}}</view>
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
				items: [
					{
						sex: '男'
					},
					{
						sex: '女'
					}
				],
				current: 0,
				userInfo: {
					nickName: '是九尾主动的',
					birthday: currentDate,
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
			
		},
		onShow(){
			
		},
		methods:{
			bindDateChange: function(e) {
				this.userInfo.birthday = e.target.value
			},
			//修改头像
			editAvtar(){
				
			},
			// 保存按钮
			baocunClick(){
				
			},
			getDate(type) {
				const date = new Date();
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
