import store from '../store/index.js'

module.exports = (param) => {
	var url = param.url;
	var method = param.method;
	var header = param.header || {};
	var data = param.data || {};
	var token = param.token;

	//请求的方式： GET POST
	if (method) {
		method = method.toUpperCase(); // 小写转成大写
		if (method == "POST" || method == 'DELETE') {
			header = {
				"content-type": "application/x-www-form-urlencoded"
			}
		}
	}

	// token
		if (token && store.state.ele_login) {
			header.token = store.state.ele_login.userId
			// 二次验证
			if (!header.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login.vue'
				});
			}
		}
		
		
	// 发起请求 加载动画
	if (!param.hideLoading) {
		uni.showLoading({
			// title: "加载中..."
		})
	}

	//发起网络请求
	uni.request({
		url: url,
		method: method || "GET",
		header: header,
		data: data,
		success: (res) => {
			if (res.statusCode && res.statusCode != '200') { //请求api错误
				uni.showModal({
					content: res.msg
				})
				return;
			}
			typeof param.success == 'function' && param.success(res.data);
		},
		fail: (e) => {
			console.log(e)
			uni.showModal({
				content: e.errMsg
			})
			typeof param.fail == 'function' && param.fail(res.data);
		},
		complete: () => {
			console.log('complete');
			uni.hideLoading();
			typeof param.complete == 'function' && param.complete(res.data);
			return;
		}
	})
}
