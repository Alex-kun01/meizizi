
// token：当前用户token
// 返回一个webscoket实例
const webscoket = function(token){
	let _this = this
	let http = 'https://www.mzz2020.com' // 'http://192.168.31.68'
	let socketOpen = false;
	let bandUser = false; // 绑定用户
	let socketMsgQueue = [];
	
	let wok = uni.connectSocket({
		url: 'ws://192.168.31.68:8282',
		success(res){
			console.log('webscoket返回数据', res)
		}
	})
	
	uni.onSocketOpen(function (res) {
		console.log('WebSocket已连接！',res);
		 socketOpen = true;
		 
	     for (var i = 0; i < socketMsgQueue.length; i++) {
		  sendSocketMessage(socketMsgQueue[i]);
	    }
		socketMsgQueue = [];
	})
	
	uni.onSocketMessage( async function (res) {
		const{client_id, type} = await JSON.parse(res.data)
		console.log('ooooooooooooo',client_id,type)
		uni.request({
			url: http + '/api/bind',
			method: 'POST',
			data:{
				client_id
			},
			success(res){
				console.log('绑定返回数据', res)
				if(res.data.status === 200){
					
				}else{
					uni.showModal({
						title: '提示',
						content: res.data.msg
					})
				}
			}
		})
	});
	
	uni.onSocketError(function (res) {
	  console.log('WebSocket连接失败！');
	});
	
	return wok
}

// 发送消息
	const sendSocketMessage = function(msg) {
	  if (socketOpen) {
		uni.sendSocketMessage({
		  data: msg
		});
	  } else {
		socketMsgQueue.push(msg);
	  }
	}
	
	export {
		webscoket,
		sendSocketMessage
	}
 