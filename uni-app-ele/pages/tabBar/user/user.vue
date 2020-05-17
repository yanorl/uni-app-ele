<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="userInfo.face" class="face"></image>
			</view>
			<view v-else>
				<image src="../../../static/img/avtor.png" class="face"></image>
			</view>
			
			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">
					{{userInfo.nickname}}
				</view>
				<view class="nav-info">ID：{{userInfo.userId}}</view>
			</view>
			<view v-else>
				<navigator url="../../login/login">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>
			
			<view class="set-wapper" v-if="userIsLogin">
				<navigator url="../../userInfo/userInfo">
					<image src="../../../static/img/settings.png" class="settings"></image>	
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false,
				userInfo: {}
			};
		},
		onShow() {
			var that = this;
			// 用户状态的切换
// 			var userInfo = uni.getStorageSync("globalUser");
// 			if (userInfo != null && userInfo != "" && userInfo != undefined) {
// 				that.userIsLogin = true;
// 				that.userInfo = userInfo;
// 			} else {
// 				that.userIsLogin = false;
// 				that.userInfo = {};
// 			}

			// 使用挂载方法获取用户数据
			var userInfo = that.getGlobalUser("ele_login");
			if (userInfo != null) {
				that.userIsLogin = true;
				that.userInfo = userInfo;
			} else {
				that.userIsLogin = false;
				that.userInfo = {};
			}
		}
	}
</script>

<style>
	.page-fill {
		width:100%;
		height: 100%;
	}
	
	/* 头部个人信息 start */
	.header {
		/* #ifdef MP */
		padding: 0rpx 30rpx 40rpx 30rpx;
		/* #endif */
		/* #ifndef MP */
		padding: 120rpx 30rpx 40rpx 30rpx;
		/* #endif */
		background-color: #f06c7a;
		color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	
	.face {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		flex-shrink: 0;
		margin-right: 30rpx;
	}
	
	.info-wapper {
		width: 80%;
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
	}
	.nickname {
		color: #FFFFFF;
		font-size: 36rpx;
		font-weight: bold;
	}

	.regist-login{
		padding: 15rpx;
	}
	
	.nav-info {
		color: #FFFFFF;
		font-size: 28rpx;
		margin-top: 10rpx;
	}
	
	.set-wapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 40rpx;
		height: 40rpx;
	}
	.settings {
		width: 40rpx;
		height: 40rpx;
	}
	/* 头部个人信息 end */
	
	/* 中间的 NEXT 大LOGO start */
	.body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.big-next {
		font-size: 160rpx;
		color: #F7F7F7;
	}
	/* 中间的 NEXT 大LOGO end */
</style>
