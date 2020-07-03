<script>
	export default {
		data(){
			return{
				versioninfo: '已是最新版本',
				version: '', // 版本信息
				newVersion: '',// 最新版本
				isUpdate: false, // 是否存在更新
				updateUrl: '', // 
				test: 'ooo'
			}
		},
		methods:{
			
			getData(){
				let _this = this
				uni.request({
					url: this.$http + '/api/index/edition',
					method: 'post',
					data: {type: 2},
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
									content: '检测到新的版本，请更新！',
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
			},
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				console.log('客户端详情数据',JSON.stringify(wgtinfo));//客户端详情数据
				console.log('应用版本号',wgtinfo.version);//应用版本号
				this.version = wgtinfo.version
				this.getData()
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
