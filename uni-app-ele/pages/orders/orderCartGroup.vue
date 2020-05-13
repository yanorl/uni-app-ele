<template>
	<view class="checkout-section cart-group">
		<h3>{{ orderInfo.shopInfo.name }}</h3>
		<ul>
			<li v-for="(food, index) in orderInfo.selectFoods" :key="index">
				<image :src="food.food_image" mode=""></image>
				<view class="cart-group-info">
					<text>{{ food.food_name }}</text>
					<text>x {{ food.food_count }}</text>
					<text>¥{{ food.food_price }}</text>
				</view>
			</li>
			<li class="cart-group-total">
				<view>配送费</view>
				<view>¥{{ orderInfo.shopInfo.float_delivery_fee }}</view>
			</li>
			<li class="cart-group-total">
				<view class="discounts"></view>
				<view class="subtotal">
					<text>小计 ¥</text>
					<text class="price">{{ totalPrice }}</text>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
export default {
	props: {
		orderInfo: {
			type: Object,
			default: () => {}
		},
		totalPrice: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style lang="scss">
.checkout-section {
	margin-bottom: 16rpx;
	padding: 0 40rpx;
	background: #fff;
	box-shadow: 0 0.8rpx 2rpx 0 rgba(0, 0, 0, 0.05);
	h3 {
		padding: 32rpx 0;
		color: #333;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 48rpx;
		line-height: 1;
		font-weight: 700;
	}
	ul {
		margin-top: 5rpx;
		color: #333;
		font-size: 28rpx;
		li {
			display: flex;
			align-items: center;
			width: 100%;
			padding:24rpx 0;
			border-bottom: 1px dotted #eee;
			color: inherit;
			image {
				width: 72rpx;
				height: 72rpx;
			}
			.cart-group-info {
				margin-left: 16rpx;
				overflow: hidden;
				flex: 9;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			&.cart-group-total {
				justify-content: space-between;
				padding: 30rpx 0 36rpx !important;
				.discounts {
					color: #bbb;
				}
				.subtotal .price {
					font-size: 48rpx;
					font-weight: 500;
				}
			}
		}
	}
}
</style>
