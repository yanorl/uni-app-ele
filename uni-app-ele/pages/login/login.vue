<template>
	<view class="login">
		<!-- 状态栏 -->

		<page-status></page-status>

		<view class="login-wrap">
			<view class="logo"><image src="../../static/logo.jpg" mode=""></image></view>

			<!-- 手机号 -->
			<input-group type="number" v-model="phone" placeholder="手机号" :btnTitle="btnTitle" :disabled="disabled" :error="errors.phone" @btnClick="getVerifyCode" />
			<!-- 验证码 -->
			<input-group type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code" />
			<!-- 用户服务协议 -->
			<view class="login_des">
				<view>
					新用户登录即自动注册，表示已同意
					<text>《用户服务协议》</text>
				</view>
			</view>
			<!-- 登录按钮 -->
			<view class="login_btn"><button :disabled="isClick" @tap="handleLogin">登录</button></view>
		</view>

		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
		<view class="third-wapper">
			<view class="third-line">
				<view class="single-line"><view class="line"></view></view>

				<view class="third-words">第三方账号登录</view>

				<view class="single-line"><view class="line"></view></view>
			</view>

			<view class="third-icos-wapper">
				<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/img/weixin.png" data-logintype="weixin" @tap="appOAuthLogin" class="third-ico"></image>
				<image src="../../static/img/QQ.png" data-logintype="qq" @tap="appOAuthLogin" class="third-ico" style="margin-left: 80rpx;"></image>
				<image src="../../static/img/weibo.png" data-logintype="sinaweibo" @tap="appOAuthLogin" class="third-ico" style="margin-left: 80rpx;"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="getUserInfo" @getuserinfo="wxLogin" class="third-btn-ico"></button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
import pageStatus from '../../components/status/status.vue';
import inputGroup from '../../components/inputGroup/inputGroup.vue';
import interfaces from '../../utils/interfaces.js';

export default {
	data() {
		return {
			phone: '',
			verifyCode: '',
			errors: {},
			btnTitle: '获取验证码',
			disabled: false
		};
	},
	computed: {
		isClick() {
			if (!this.phone || !this.verifyCode) return true;
			else return false;
		}
	},
	components: {
		pageStatus,
		inputGroup
	},
	methods: {
		handleLogin() {
			let that = this;
			// 取消错误提醒
			that.errors = {};
			// 发送请求

			that.request({
				url: interfaces.sms_back,
				data: {
					phone: that.phone,
					code: that.verifyCode
				},
				method: 'POST',
				success: res => {
					that.setStor({userId: res.user._id, nickname:'Yan', face: 'http://img3.imgtn.bdimg.com/it/u=2141623099,2896788564&fm=26&gp=0.jpg'});
				}
			});
		},
		getVerifyCode() {
			let that = this;
			if (this.validatePhone()) {
				this.validateBtn();
				// 发送网络请求

				that.request({
					url: interfaces.sms_send,
					data: {
						tpl_id: '140481',
						key: '795be723dd9e88c3ea98e2b6713ab795',
						phone: this.phone
					},
					method: 'POST',
					success: res => {
						console.log(res);
					}
				});
			}
		},
		validateBtn() {
			let time = 60;
			let timer = setInterval(() => {
				if (time == 0) {
					clearInterval(timer);
					this.btnTitle = '获取验证码';
					this.disabled = false;
				} else {
					// 倒计时
					this.btnTitle = time + '秒后重试';
					this.disabled = true;
					time--;
				}
			}, 1000);
		},
		validatePhone() {
			// 验证手机号码
			if (!this.phone) {
				this.errors = {
					phone: '手机号码不能为空'
				};
				return false;
			} else if (!/^1[345678]\d{9}$/.test(this.phone)) {
				this.errors = {
					phone: '请填写正确的手机号码'
				};
				return false;
			} else {
				this.errors = {};
				return true;
			}
		},
		appOAuthLogin(e) {
			var that = this;
			// 获取用户的登录类型
			var logintype = e.currentTarget.dataset.logintype;

			// 授权登录
			uni.login({
				provider: logintype,
				success(loginRes) {
					// 授权登录成功以后，获取用户的信息
					uni.getUserInfo({
						provider: logintype,
						success(info) {
							// console.log(JSON.stringify(info));
							var userInfo = info.userInfo;
							var face = '';
							var nickname = '';
							var openIdOrUid = '';
							if (logintype == 'weixin') {
								face = userInfo.avatarUrl;
								nickname = userInfo.nickName;
								openIdOrUid = userInfo.openId;
							} else if (logintype == 'qq') {
								openIdOrUid = userInfo.openId;
								nickname = userInfo.nickname;
								face = userInfo.figureurl_qq_2;
							} else if (logintype == 'sinaweibo') {
								openIdOrUid = userInfo.id;
								nickname = userInfo.nickname;
								face = userInfo.avatar_large;
							}
							// 调用开发者后台，执行一键注册或登录
							//that.login(openIdOrUid, nickname, face) //因为后台没有开发第三方登陆注册功能，所以做个假的
							var parData = {
								openIdOrUid,
								nickname,
								face
							};
							that.otherLogin(parData);
						}
					});
				}
			});
		},
		otherLogin(data) {
			let that = this
			that.request({
				url: interfaces.sms_back,
				data: {
					phone: '15920142495',
					code: '746976'
				},
				method: 'POST',
				success: res => {
					let parmData = Object.assign({userId: res.user._id}, data)
					that.setStor(parmData);
				}
			});
		},
		login(openIdOrUid, nickname, face) {
			let that = this;
			that.request({
				url: interfaces.thirdLogin,
				data: {
					openIdOrUid: openIdOrUid,
					nickname: nickname,
					face: face
				},
				method: 'POST',
				success: res => {
					var userInfo = result.data;
					// 保存用户信息到全局的缓存中
					that.setStor(data);
				}
			});

			uni.request({
				url: me.serverUrl + '/appUnionLogin/' + logintype,
				data: {
					openIdOrUid: openIdOrUid,
					nickname: nickname,
					face: face
				},
				method: 'POST',
				success(result) {
					if (result.data.status == 200) {
						var userInfo = result.data.data;
						// 保存用户信息到全局的缓存中
						uni.setStorageSync('globalUser', userInfo);
						// 切换页面跳转，使用tab切换的api
						uni.switchTab({
							url: '../me/me'
						});
					}
				}
			});
		},
		setStor(data) {
			uni.setStorage({
				key: 'ele_login',
				data: data,
				success: function() {
					uni.switchTab({
						url: '../tabBar/user/user'
					});
				}
			});
		},
		// 实现在微信小程序端的微信登录
		wxLogin(e) {
			var that = this;
			// 通过微信开发能力，获得微信用户的基本信息
			var userInfo = e.detail.userInfo;

			// 实现微信登录
			uni.login({
				provider: 'weixin',
				success(loginResult) {
					// console.log(loginResult);
					// 获得微信登录的code：授权码
					var code = loginResult.code;
					// 设置登录到哪个对于的微信小程序，大家可以根据自己的后端去实现业务参数

					//因为后台没有开发第三方登陆注册功能，所以做个假的
					var parData = {
						openIdOrUid: 111,
						nickname: userInfo.nickName,
						face: userInfo.avatarUrl
					};

					that.otherLogin(parData);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.login {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	width: 100%;
	height: 100vh;
	padding: 60rpx;
	box-sizing: border-box;
	background: #fff;
	font-size: 28rpx;
	.login-wrap {
		.logo {
			text-align: center;
			image {
				width: 300rpx;
				height: 106rpx;
			}
		}
		.text_group,
		.login_des,
		.login_btn {
			margin-top: 40rpx;
		}
		.login_des {
			color: #aaa;
			line-height: 44rpx;
			text {
				color: #4d90fe;
			}
		}
		.login_btn button {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #cccccc;
			border-radius: 8rpx;
			color: white;
			font-size: 28rpx;
			border: none;
			outline: none;
			&[disabled] {
				background-color: #8bda81;
			}
		}
	}

	/* 第三方登录 start */
	.third-wapper {
		width: 100%;
		/* 固定底部 */
		/* bottom: 0;
		position: fixed; */

		margin-top: 60rpx;
		.third-line {
			display: flex;
			flex-direction: row;
			justify-content: center;
			.third-words {
				color: #a9a9a9;
				font-size: 26rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}

			.single-line {
				padding: 15rpx 20rpx;
				width: 25%;
				align-items: center;
			}
		}
		.third-icos-wapper {
			margin-top: 30rpx;

			display: flex;
			flex-direction: row;
			justify-content: center;
			.third-ico {
				width: 60rpx;
				height: 60rpx;
			}
			.third-btn-ico {
				background-image: url(http://122.152.205.72:88/group1/M00/00/05/CpoxxFxFO-yAOjTaAAATCIZEzRU503.png);
				width: 60rpx;
				height: 60rpx;
				background-color: white;
				background-size: 60rpx 60rpx;
				background-repeat: no-repeat;
				border: none;
				padding: 0;
			}
			button::after {
				border: none;
			}
		}
	}
	/* 第三方登录 end */
}
</style>
