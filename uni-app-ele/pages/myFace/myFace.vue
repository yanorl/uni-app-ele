<template>
	<view class="page page-fill">
		
		<view class="pending-wapper">
			<image id="face" :src="tempFace" class="pending-face" mode="scaleToFill"></image>
		</view>
		
		<view class="notice">
			<view class="notice-words">
				* 请从相册中选择等比宽高的图片噢~
			</view>
		</view>
		
		<view class="footer-opertor">
			<view class="opertor-words" @tap="changePendingFace">
				重新选择
			</view>
			<view class="opertor-words" @tap="upload">
				确认上传
			</view>
		</view>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	
	export default {
		data() {
			return {
				tempFace: ""
			};
		},
		onLoad(params) {
			var tempFilePath = params.tempFilePath;
			this.tempFace = tempFilePath;
		},
		methods: {
			// 重新选择头像
			changePendingFace() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album"],
					success(res) {
						// 获得临时路径
						var tempFilePath = res.tempFilePaths[0];
						that.tempFace = tempFilePath;
					}
				})
			},
			upload() {
				var that = this;
				var globalUser = that.getGlobalUser("ele_login");
				
				uni.showLoading({
					mask: true,
					title: "上传中，请稍后"
				});
				
				uni.uploadFile({
					url: interfaces.uploadFace,
					data: {userId: globalUser.userId},
					filePath: that.tempFace,
					name: "file",
					success(res) {
						// debugger;
						var resDataStr = res.data;
						// console.log(typeof(resDataStr));
						var resData = JSON.parse(resDataStr);
						// console.log(typeof(resData));
						if (resData.status == 200) {
							// 获得最新的用户数据
							var userInfo = resData.data;
							uni.setStorageSync("ele_login", userInfo);
							uni.navigateBack({
								delta: 1
							})
						} else if (resData.status == 502 || resData.status == 500) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
						}
					},
					fail() {
						uni.showToast({
							title: '没有接口，上传失败',
							duration: 2000,
							success() {
								uni.navigateBack({
									delta: 1
								})
							}
						})
					
					},
					complete() {
						uni.hideLoading();
					}
				});
				
			}
		}
	}
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width:100%;
	height: 100vh;
	position: absolute;
	background: black;
}

.pending-wapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	
	margin-top: 40rpx;
}
.pending-face {
	width: 600rpx;
	height: 600rpx;
}

.notice {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.notice-words {
	color: gray;
	font-size: 26rpx;
	margin-top: 30rpx;
	width: 600rpx;
}

/* 底部操作 start */
.footer-opertor {
	position: fixed;
	bottom: 0;
	
	border-top: #515050 solid 1px;
	width: 100%;
	
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	
	padding: 30rpx;
}
.opertor-words {
	color: #e8e5e5;
	font-size: 32rpx;
	width: 200rpx;
}
/* 底部操作 end */
</style>
