<template>
	<view class="cart-item" @tap="$emit('click')">
		<view class="cart-item-title">{{ title }}</view>
		<view class="cart-item-right" v-if="subHead">
			<text>{{ subHead }}</text>
			<i class="fa fa-angle-right"></i>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CartItem',
	props: {
		title: String,
		subHead: String
	}
};
</script>

<style lang="scss">
.cart-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 32rpx 0;
	font-size: 32rpx;
	color: #333;
	border-bottom: 1px dotted #eee;
	.cart-item-title {
		font-weight: 500;
		flex: none;
	}
	.cart-item-right {
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		color: #bbb;
		font-size: 32rpx;
		max-width: 420rpx;
		text {
			text-overflow: ellipsis;
			overflow: hidden;
			flex-grow: 1;
			white-space: nowrap;
		}
		i {
			font-size: 40rpx !important;
			margin-left: 10rpx;
		}
	}
}
</style>
