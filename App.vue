<script>
	export default {
		data(){
			return{
				versioninfo: '已是最新版本',
				version: '', // 版本信息
				newVersion: '',// 最新版本
				isUpdate: false, // 是否存在更新
				updateUrl: '', // 
				test: 'ooo',
				target: ''
			}
		},
		methods:{
			//#ifdef APP-PLUS
			getData(target){
				let _this = this
				let datas = {type: 1}
				if(target == 'android'){
					uni.request({
						url: this.$http + '/api/index/edition',
						method: 'post',
						data: datas,
						success(res){
							console.log('版本更新数据', res)
							if(res.data.status === 200){
								// 请求成功
								let newVersion = res.data.data.version // 获取到的版本号
								_this.newVersion = newVersion
								if(_this.version == newVersion){
									// 版本一致
									_this.versioninfo = '已是最新版本'
									_this.isUpdate = false
									_this.test = '版本一致'
								}else{
									// 版本不一致
									_this.versioninfo = '下载更新'
									_this.isUpdate = true
									_this.updateUrl = res.data.data.url
									_this.test = '版本不一致'
									uni.showModal({
										title: '版本更新提示',
										content: '检测到新的版本，请更新！' + '当前版本:' + _this.version  + '新版本:' + newVersion ,
										success() {
											// 更新
											plus.runtime.openURL(_this.updateUrl)
										}
									})
								}
							}else{
								// 
								uni.showModal({
									title: '提示',
									content: '请求服务器出错,请稍后再试...'
								})
							}
						}
					})
				}else{
					return
				}
				
				
			},
			//#endif
			// 更新用户会员信息
			upDataIsMember(){
				let _this = this
				uni.getStorage({
					key: 'userInfo',
					success(reg){
						let userInfo = reg.data
						uni.request({
							url: _this.$http + '/api/goods/userInfo',
							method: 'GET',
							data: {
								token: reg.data.token
							},
							success(res){
								console.log('查看更新用户会员信息', res)
								if(res.data.status === 200){
									let {is_member} = res.data.data
									let oldIsMember = reg.data.is_member
									if(oldIsMember != is_member){
										// 更新用户会员信息
										userInfo.is_member = is_member
										uni.setStorage({
											key: 'userInfo',
											data: userInfo
										})
										uni.getStorage({
											key:'userInfo',
											success(xxx){
												console.log('查看是否已经更新会员信息', xxx.data.is_member)
											}
										})
									}
								}
							}
						})
					}
				})
			}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			
			  //#ifdef APP-PLUS
					plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
						console.log('客户端详情数据',JSON.stringify(wgtinfo));//客户端详情数据
						console.log('应用版本号',wgtinfo.version);//应用版本号
						this.version = wgtinfo.version
						// 获取设备类型 安卓 ios
						this.target = uni.getSystemInfoSync().platform
						this.getData(this.target)
					})
			  //#endif
			this.upDataIsMember()
		},
		
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	.weixin-wx{
		height: var(--status-bar-height);
		background: #FFFFFF;
		padding-top: 50rpx;
		box-sizing: content-box;
	}
</style>
