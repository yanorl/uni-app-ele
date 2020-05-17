<template>
	<view class="order-box">
		<view class="order-wrap">
			<!-- 收货地址 -->
			<view class="cart-address">
				<view class="title">
					<text>订单配送至</text>
					<text class="address-tag" v-if="userInfo && userInfo.tag">{{ userInfo.tag }}</text>
				</view>
				<view class="address-detail">
					<text @tap="handelAddress" v-if="userInfo">{{ userInfo.address }}{{ userInfo.bottom }}</text>
					<block v-else>
						<text v-if="haveAddress" @tap="handelAddress">选择收货地址</text>
						<text v-else @tap="addAddress">新增收货地址</text>
					</block>
					<i class="fa fa-angle-right"></i>
				</view>
				<view class="address-name" v-if="userInfo">
					<text>{{ userInfo.name }}</text>
					<text>({{ userInfo.sex }})</text>
					<text class="phone">{{ userInfo.phone }}</text>
				</view>
			</view>

			<!-- 送达时间 -->
			<delivery :shopInfo="orderInfo.shopInfo" />
			<!-- 点餐内容 -->
			<order-cart-group :orderInfo="orderInfo" :totalPrice="totalPrice" />

			<!-- 备注信息 -->
			<view class="checkout-section">
				<cart-item @tap="showTableware = true" title="餐具份数" :subHead="remarkInfo.tableware || '未选择'" />
				<cart-item @tap="showRemak" title="订单备注" :subHead="remarkInfo.remark || '口味 偏好'" />
				<cart-item title="发票信息" subHead="不需要开发票" />
			</view>

			<!-- 显示Tableware -->
			<table-ware :isShow="showTableware" @close="showTableware = false" />
		</view>
		<!-- 底部 -->
		<view class="action-bar">
			<text>¥{{ totalPrice }}</text>
			<view class="buttom" @tap="handlePay">去支付</view>
		</view>
	</view>
</template>

<script>
import delivery from './delivery.vue';
import orderCartGroup from './orderCartGroup.vue';
import cartItem from './cartItem.vue';
import tableWare from './tableWare.vue';
import { mapGetters } from 'vuex';
import interfaces from '../../utils/interfaces.js';
import { isLoginMixin } from '../../common/mixins.js';

export default {
	data() {
		return {
			haveAddress: false,
			showTableware: false
		};
	},
	mixins: [isLoginMixin],
	onLoad() {
		if (!this.orderInfo) {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
		} else {
			this.initData();
		}
	},
	computed: {
		...mapGetters(['orderInfo', 'totalPrice', 'remarkInfo', 'userInfo'])
	},
	components: {
		delivery,
		orderCartGroup,
		cartItem,
		tableWare
	},
	methods: {
		initData() {
			try {
				const value = uni.getStorageSync('ele_login');
				if (value) {
					this.request({
						url: interfaces.getUserAddress + '/' + value.userId,
						success: res => {
							console.log(res);
							if (res.myAddress.length > 0) {
								this.haveAddress = true;
							} else {
								this.haveAddress = false;
							}
						}
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		showRemak() {
			uni.navigateTo({
				url: '../remark/remark'
			});
		},
		async handelAddress() {
			await this.isLogin();
			uni.navigateTo({
				url: '../myAddress/myAddress'
			});
		},
		async addAddress() {
			await this.isLogin();
			let detail = {
				title: '添加地址',
				addressInfo: {
					name: '',
					sex: '',
					phone: '',
					bottom: '',
					address: '',
					tag: ''
				}
			};
			uni.navigateTo({
				url: '../addAddress/addAddress?params=' + encodeURIComponent(JSON.stringify(detail))
			});
		},
		handlePay() {
			if (!this.userInfo) {
				uni.showToast({
					title: '请选择收货地址'
				});
				return;
			}
			uni.navigateTo({
				url: '../pay/pay'
			});
		}
	}
};
</script>

<style lang="scss">
.order-box {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	.order-wrap {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		font-size: 28rpx;
		color: #333;
		padding-bottom: 108rpx;
		padding-left: 12rpx;
		padding-right: 12rpx;
		background-image: linear-gradient(0deg, #f5f5f5, #f5f5f5 65%, hsla(0, 0%, 96%, 0.3) 75%, hsla(0, 0%, 96%, 0)), linear-gradient(270deg, #009eef, #009eef);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		.cart-address {
			background-color: transparent;
			padding: 20rpx;
			min-height: 168rpx;
			color: #fff;
			overflow: hidden;
			.title {
				font-size: 28rpx;
				line-height: 1.21;
				color: hsla(0, 0%, 100%, 0.8);
				.address-tag {
					border: 1px solid hsla(0, 0%, 100%, 0.8);
					margin-left: 12rpx;
					display: inline-block;
					padding: 4rpx;
					white-space: nowrap;
					border-radius: 4rpx;
					font-size: 24rpx;
				}
			}
			.address-detail {
				font-size: 36rpx;
				font-weight: 600;
				line-height: 1.88;
				overflow: hidden;
				display: flex;
				align-items: center;
				text {
					display: inline-block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				i {
					margin-left: 16rpx;
				}
			}

			/* 显示送货地址 */
			.address-name {
				font-size: 0.86rem;
				line-height: 1.21;
				margin-bottom: 1.333333vw;
				.phone {
					margin-left: 2.133333vw;
				}
			}
		}
		.checkout-section {
			margin-bottom: 16rpx;
			padding: 0 40rpx;
			background: #fff;
			box-shadow: 0 0.8rpx 2rpx 0 rgba(0, 0, 0, 0.05);
		}
	}
	/* 底部支付样式 */
	.action-bar {
		height: 88rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background: #3c3c3c;
		z-index: 2;
		text {
			color: #fff;
			font-size: 36rpx;
			line-height: 88rpx;
			padding-left: 20rpx;
			vertical-align: middle;
		}
		.buttom {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			background: #00e067;
			min-width: 200rpx;
			padding: 0 10rpx;
			border: none;
			color: #fff;
			font-size: 36rpx;
			text-align: center;
			line-height: 88rpx;
		}
	}
}
</style>
