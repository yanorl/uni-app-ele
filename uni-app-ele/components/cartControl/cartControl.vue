<template>
	<view class="cart-Control-box">
		<view class="cart-decrease"  @tap.stop="decreaseCart" :class="{move: food_count > 0 ? true : false}"><i class="fa fa-minus-circle"></i></view>
		<view class="cart-count" v-if="food_count > 0">{{ food_count }}</view>
		<view class="cart-add" @tap.stop="addCart"><i class="fa fa-plus-circle"></i></view>
	</view>
</template>

<script>
	
export default {
	data() {
		return {
		};
	},
	props: {
		food_count:{
			type: Number,
			default: 0
		}
	},
	watch:{
	},
	methods: {
		addCart() {
			this.$emit('add');
		},
		decreaseCart() {
			this.$emit('sub');
		}
	}
};
</script>

<style lang="scss">
.cart-Control-box {
	.cart-decrease{
		display: none;
		opacity: 0;
		transform: translate3d(20rpx, 0, 0);
		i {
			transition: all 0.4s linear;
			transform: rotate(180deg);
		}
		&.move{
			display: inline-block;
			opacity: 1;
			transform: translate3d(0, 0, 0);
			i {
				transform: rotate(0);
			}
		}
	}
	.cart-decrease,
	.cart-add {
		display: inline-block;
		margin: 16rpx;
		transition: all 0.4s linear;
		i {
			display: inline-block;
			line-height: 36rpx;
			font-size: 36rpx;
			color: #00a0dc;
			transition: all 0.4s linear;
		}
	}
	.cart-count {
		display: inline-block;
		width: 36rpx;
		line-height: 36rpx;
		text-align: center;
		font-size: 28rpx;
		color: rgb(147, 153, 159);
	}
}
</style>
