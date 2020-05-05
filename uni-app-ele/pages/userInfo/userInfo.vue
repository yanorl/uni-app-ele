<template>
	<view class="page page-fill">
		<view class="page-block info-list">
			<!-- 头像 -->

			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>

				<view class="right-wapper">
					<image :src="globalUser.face" class="face"></image>
					<view class="arrow-block"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
				</view>
			</view>

			<!-- 昵称 -->
			<view class="item-wapper">
				<view class="info-words">昵称</view>

				<view class="right-wapper">
					<view class="gray-fields">{{ globalUser.nickname }}</view>
					<view class="arrow-block"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
				</view>
			</view>

			<!-- 生日 -->
			<view class="item-wapper">
				<view class="info-words">生日</view>

				<view class="right-wapper">
					<view class="gray-fields">1990-08-18</view>
					<view class="arrow-block"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
				</view>
			</view>

			<!-- 性别 -->
			<view class="item-wapper">
				<view class="info-words">性别</view>

				<view class="right-wapper"><view class="gray-fields">男</view></view>
				<view class="arrow-block"><i class="fa fa-angle-right" aria-hidden="true"></i></view>
			</view>
		</view>

		<view class="footer-wapper">
			<view class="footer-words" @click="cleanStorage">清理缓存</view>
			<view class="footer-words" style="margin-top: 10rpx;" @click="logout">退出登录</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			globalUser: {}
		};
	},
	onShow() {
		var me = this;
		var globalUser = me.getGlobalUser('ele_login');
		me.globalUser = globalUser;
	},
	methods: {
		operator() {
			var me = this;
			var globalUser = me.getGlobalUser('ele_login');
			uni.showActionSheet({
				itemList: ['查看我的头像', '从相册选择上传'],
				success(res) {
					var index = res.tapIndex;
					if (index == 0) {
						// 预览头像
						var faceArr = [];
						faceArr.push(globalUser.face);
						uni.previewImage({
							urls: faceArr,
							current: faceArr[0]
						});
					} else if (index == 1) {
						// 选择上传头像
						uni.chooseImage({
							count: 1,
							sizeType: ['compressed'],
							sourceType: ['album'],
							success(res) {
								// 获得临时路径
								var tempFilePath = res.tempFilePaths[0];
								uni.showToast({
									title: '头像替换成功',
									duration: 1500,
								});
								console.log(tempFilePath);
								// #ifdef H5
								// uni.navigateTo({
								// 	url: "../meFace/meFace?tempFilePath=" + tempFilePath
								// })
								// #endif
								// #ifndef H5
								// uni.navigateTo({
								// 	url: "../faceCrop/faceCrop?tempFilePath=" + tempFilePath
								// })
								// #endif
							}
						});
					}
				}
			});
		},
		cleanStorage() {
			uni.clearStorageSync();
			uni.showToast({
				title: '清理缓存成功',
				mask: false,
				duration: 1500
			});
		},
		logout() {
			var globalUser = this.getGlobalUser('ele_login');
			var serverUrl = this.serverUrl;

			uni.removeStorageSync('ele_login');
			uni.switchTab({
				url: '../tabBar/user/user'
			});
			//没有退出登陆接口
			// this.request({
			// 	url: interfaces.logout,
			// 	data: {
			// 		userId: globalUser.userId,
			// 	},
			// 	method: 'POST',
			// 	success: res => {
			// 		uni.removeStorageSync("ele_login");
			// 		uni.switchTab({
			// 			url: "../tabBar/user/user"
			// 		})
			// 	}
			// });
		}
	}
};
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width: 100%;
	height: 100%;
	position: absolute;
}

.info-list {
	padding: 0rpx 30rpx;
	background-color: #ffffff;
}

.info-words {
	color: #333333;
	font-size: 32rpx;
	width: 25%;
	line-height: 80rpx;
	/* font-weight: bold; */
}

.face {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.arrow-block {
	margin-left: 10rpx;
	line-height: 86rpx;
}

.arrow-ico {
	width: 30rpx;
	height: 30rpx;
}

.item-wapper {
	display: flex;
	/* margin-top: 20rpx; */
	flex-direction: row;
	justify-content: flex-start;
	border-bottom: 1px solid #eee
}

.face-line-upbottom {
	margin-top: 20rpx;
	/* margin-bottom: 20rpx; */
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}


.right-wapper {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.gray-fields {
	font-size: 28rpx;
	color: darkgray;
	line-height: 80rpx;
}

/* 底部操作 start */
.footer-wapper {
	position: fixed;
	bottom: 0;

	display: flex;
	flex-direction: column;
	width: 100%;
}
.footer-words {
	text-align: center;
	background-color: white;
	padding: 20rpx;

	color: #333333;
	font-size: 32rpx;
}
/* 底部操作 end */
</style>
