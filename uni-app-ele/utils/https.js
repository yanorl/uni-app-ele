module.exports = (param) => {
	var url = param.url;
	var method = param.method;
	var header = param.header || {};
	var data = param.data || {};

	//请求的方式： GET POST
	if (method) {
		method = method.toUpperCase(); // 小写转成大写
		if (method == "POST") {
			header = {
				"content-type": "application/x-www-form-urlencoded"
			}
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
			uni.showModal({
				content: e.meg
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
