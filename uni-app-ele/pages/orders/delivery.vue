<template>
	<view class="checkout-view">
		<view class="delivery">
			<view class="delivery-left">
				<text class="delivery-time">送达时间</text>
				<view v-if="shopInfo.delivery_mode.text" class="delivery-extra">
					<text>{{ shopInfo.delivery_mode.text }}</text>
				</view>
			</view>
			<view class="delivery-right">
				<text class="delivery-select">尽快送达 ({{ deliveryTime(shopInfo.order_lead_time) }}送达)</text>
				<i class="fa fa-angle-right"></i>
			</view>
		</view>
		<view class="cart-item">
			<view class="cart-item-title">支付方式</view>
			<view class="pay-text">在线支付</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		shopInfo: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		deliveryTime(time) {
			let date = new Date();
			date.setMinutes(date.getMinutes() + time);
			return date.getHours() + ':' + date.getMinutes();
		}
	}
};
</script>

<style lang="scss">
.checkout-view {
	margin-bottom: 16rpx;
	padding: 0 40rpx;
	background: #fff;
	box-shadow: 0 0.8rpx 2rpx 0 rgba(0, 0, 0, 0.05);
	.delivery {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px dotted #eee;
		padding: 32rpx 0;
		.delivery-left {
			flex: 1;
			display: flex;
			flex-direction: column;
			.delivery-time {
				font-size: 32rpx;
				font-weight: 500;
			}

			.delivery-extra {
				margin-top: 6rpx;
				font-size: 24rpx;
				text {
					display: inline-block;
					word-spacing: 5rpx;
					padding:10rpx;
					line-height: 1;
					background-image: linear-gradient(90deg, #0af, #0085ff);
					color: #fff;
					border-radius: 4px;
				}
			}
		}
		.delivery-right {
			text-align: right;
			.delivery-select {
				text-align: right;
				color: #2395ff;
			}
			i {
				margin-left: 5rpx;
				color: #888;
				font-size: 40rpx;
			}
		}
	}
	.cart-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx 0 40rpx 0;
		font-size: 32rpx;
		color: #333;
		.cart-item-title {
			font-weight: 500;
		}
		.pay-text {
			color: #2395ff;
		}
	}
}






</style>
