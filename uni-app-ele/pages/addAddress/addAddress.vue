<template>
	<view class="addAddress-wrap">
		<view class="addAddress-box">
			<view class="addAddress-content">
				<form @submit="handleSave">
					<view class="form-content">
						<!-- 地址 -->
						<view class="form-group" @tap="clickAddress">
							<label>
								<text>地址</text>
								<view class="input-wrap">
									<input-group type="text" :value="addressInfo.address" placeholder="小区/写字楼/学校等" :error="errors.address" name="address" :border="false" />
								</view>
								<i class="fa fa-angle-right"></i>
							</label>
						</view>

						<!-- 姓名 -->
						<view class="form-group">
							<label>
								<text>联系人</text>
								<view class="input-wrap">
									<input-group type="text" v-model="addressInfo.name" :value="addressInfo.name" placeholder="姓名" :error="errors.name" name="userName" :border="false" />
								</view>
							</label>
						</view>

						<!--姓别 -->
						<view class="form-group">
							<label>
								<text>姓别</text>
								<view class="input-wrap"><tab-tag :tags="sexes" :selectTag="addressInfo.sex" @checkTag="checkSex"></tab-tag></view>
							</label>
						</view>

						<!-- 手机号码 -->
						<view class="form-group">
							<label>
								<text>电话</text>
								<view class="input-wrap"><input-group type="number" :value="addressInfo.phone" placeholder="手机号码" :error="errors.phone" name="phone" :border="false" /></view>
							</label>
						</view>

						<!--门牌号  -->
						<view class="form-group">
							<label>
								<text>门牌号</text>
								<view class="input-wrap">
									<input-group type="text" :value="addressInfo.bottom" placeholder="10号楼5单元404" :error="errors.bottom" name="bottom" :border="false" />
								</view>
							</label>
						</view>

						<!--标签 -->
						<view class="form-group">
							<label>
								<text>标签</text>
								<view class="input-wrap"><tab-tag :tags="tags" :selectTag="addressInfo.tag" @checkTag="checkTag"></tab-tag></view>
							</label>
						</view>
					</view>
					<view class="form-button-wrap"><button type="primary" form-type="submit" class="form-button">保存</button></view>
				</form>
			</view>
		</view>
		 <!-- 搜索地址 -->
		<view class="address-search" v-if="showSearch">
			<set-address @setAddress="setAddressFn"></set-address>
		</view>
	</view>
</template>

<script>
import tabTag from '../../components/tabTag/tabTag.vue';
import inputGroup from '../../components/inputGroup/inputGroup.vue';
import setAddress from '../../components/setAddress/setAddress.vue';
import interfaces from '../../utils/interfaces.js';
import { mapGetters, mapActions } from 'vuex';
import { isLoginMixin } from '../../common/mixins.js'

export default {
	data() {
		return {
			tags: ['家', '学校', '公司'],
			sexes: ['先生', '女士'],
			addressInfo: {},
			errors: {},
			title: '',
			userId: '',
			showSearch: false
		};
	},
	mixins:[isLoginMixin],
	onLoad(option) {
	  this.isLogin();
		
		// console.log(option)
		let params = JSON.parse(decodeURIComponent(option.params));
		// console.log(params);
		this.title = params.title;
		this.addressInfo = params.addressInfo;
		uni.setNavigationBarTitle({
			title: params.title
		});
		const value = uni.getStorageSync('ele_login');
		this.userId = value.userId;
	},
	computed:{
	},
	components: {
		inputGroup,
		tabTag,
		setAddress
	},
	methods: {
		...mapActions(['setUserInfo']),
		clickAddress() {
			this.showSearch = true
			// uni.navigateTo({
			// 	url: '../address/address?title=' + this.title
			// });
		},
		checkTag(item) {
			// console.log(item);
			this.addressInfo.tag = item;
		},
		checkSex(item) {
			// console.log(item);
			this.addressInfo.sex = item;
		},
		handleSave(e) {
			// console.log(e);
			this.addressInfo.name = e.detail.value.userName;
			this.addressInfo.phone = e.detail.value.phone;
			this.addressInfo.address = e.detail.value.address;
			this.addressInfo.bottom = e.detail.value.bottom;
			// console.log(this.addressInfo);
			if (!this.addressInfo.name) {
				this.errors = {
					name: '请输入联系人'
				};
				return;
			}

			// 验证手机号码
			if (!this.addressInfo.phone) {
				this.errors = {
					phone: '手机号码不能为空'
				};
				return;
			} else if (!/^1[345678]\d{9}$/.test(this.addressInfo.phone)) {
				this.errors = {
					phone: '请填写正确的手机号码'
				};
				return;
			}

			if (!this.addressInfo.address) {
				this.errors = {
					address: '请输入收货地址'
				};
				return;
			}

			// 存储数据
			if (this.title == '添加地址') {
				this.addAddress();
			} else {
				this.editAddress();
			}
		},
		addAddress() {
			this.request({
				url: interfaces.addAddress + '/' + this.userId,
				method: 'post',
				data: this.addressInfo,
				token: true,
				success: res => {
					this.setUserInfo(this.addressInfo);
					uni.navigateTo({
						url: '../myAddress/myAddress'
					});
				}
			});
		},
		editAddress() {
			this.request({
				url: interfaces.editAddress + '/' + this.userId + '/' + this.addressInfo._id,
				method: 'post',
				data: this.addressInfo,
				success: res => {
					this.setUserInfo(this.addressInfo);
					uni.navigateTo({
						url: '../myAddress/myAddress'
					});
				}
			});
		},
		setAddressFn(params) {
			this.addressInfo.address = params.title
			this.showSearch = false
		}
	}
};
</script>

<style lang="scss">
.addAddress-wrap {
	.addAddress-box {
		.addAddress-content {
			.form-content {
				padding: 0 30rpx;
				background-color: #ffffff;
				font-size: 28rpx;
				.form-group {
					padding: 30rpx 0;
					border-bottom: 1px solid #eee;
					label {
						display: flex;
						align-items: center;
						& > text {
							flex-basis: 100rpx;
							color: #333;
							font-weight: 700;
						}
						.input-wrap {
							flex: 1;
							font-size: 24rpx;
							i {
								margin-left: 10rpx;
							}
							.which-box {
								display: flex;
								align-items: center;
								text {
									background: #fff;
									border: 1px solid #ddd;
									border-radius: 8rpx;
									font-size: 28rpx;
									color: #666;
									height: 60rpx;
									padding: 0 40rpx;
									line-height: 60rpx;
									margin-right: 20rpx;
									text-align: center;
									font-weight: normal;
									&.checked {
										color: #2395ff !important;
										background: #eef7ff !important;
										border-color: rgba(35, 149, 255, 0.18) !important;
									}
								}
							}
						}
					}
				}
			}
			.form-button-wrap {
				padding: 40rpx 30rpx;
				.form-button {
					background: #00d762;
					text-align: center;
					border-radius: 4rpx;
					flex: 1;
					color: #fff;
					border: none;
					font-weight: 500;
				}
			}
		}
	}
	.address-search{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
}
</style>
