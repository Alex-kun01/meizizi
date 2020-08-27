export const myMixins = {
	onLoad(){
		this.showList = []
		this.getData()
		  setTimeout(function () {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onUnload() {
		uni.hideLoading()
	},
	// 下拉刷新
	onPullDownRefresh(){
		console.log('混入-下拉刷新')
		if(this.showList){
			this.showList = []
		}
		this.page = 1
		this.getData()
		 setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	}
}