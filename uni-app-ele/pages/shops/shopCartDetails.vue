<template>
	<view class="shop-cart-details-wrap" @touchmove.stop.prevent="moveHandle">
		<view class="shop-cart-details-box" :class="{ listShow: listShow }">
			<view class="shop-cart-list">
				<view class="list-header">
					<text class="title">购物车</text>
					<text class="empty" @tap.stop="empty">清空</text>
				</view>
				<scroll-view scroll-y="true" class="list-content">
					<view class="food" v-for="(food, index) in selectGoods" :key="food.food_id">
						<text class="name">{{ food.food_name }}</text>
						<view class="price">
							<text>¥{{ (food.food_price * food.food_count).toFixed(2) }}</text>
						</view>
						<view class="cart-control-wrapper" :key="food.food_id"><cart-control @add="add(food.food_id)" @sub="sub(food.food_id)" :food_count="food.food_count"></cart-control></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="list-mask" @click="hideList" :class="{ listShow: listShow }"></view>
	</view>
</template>

<script>
import cartControl from '../../components/cartControl/cartControl.vue';

export default {
	data() {
		return {};
	},
	props: {
		selectGoods: {
			tyep: Array,
			default: () => []
		},
		totalCount: {
			type: Number,
			default: 0
		},
		fold: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		listShow() {
			let that = this;
			if (!this.totalCount) {
				this.$emit('parentFold');
				return false;
			}
			let show = !that.fold;
			return show;
		}
	},
	components: {
		cartControl
	},
	methods: {
		add(id) {
			this.$emit('add', id)
		},
		sub(id) {
			this.$emit('sub', id)
		},
		empty() {
			let that = this
			uni.removeStorage({
				key: 'goodsList',
				success: function(res) {
					that.$emit('empty');
					that.$emit('parentFold');
				}
			});
		},
		hideList() {
			this.$emit('parentFold');
		},
		moveHandle() {}
	}
};
</script>

<style lang="scss">
.shop-cart-details-box {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	width: 100%;
	transform: translate3d(0, 0, 0);
	transition: all 0.5s;
	&.listShow {
		transform: translate3d(0, -100%, 0);
	}
	.list-header {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 36rpx;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		.title {
			float: left;
			font-size: 28rpx;
			color: #07111b;
		}
		.empty {
			float: right;
			font-size: 24rpx;
			color: #00a0dc;
		}
	}
	.list-content {
		padding: 0 36rpx;
		max-height: 434rpx;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
		.food {
			padding: 24rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			position: relative;
			.name {
				line-height: 48rpx;
				font-size: 28rpx;
				color: #07111b;
				width: 320rpx;
				overflow: hidden;
				display: inline-block;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.price {
				position: absolute;
				left: 400rpx;
				top: 24rpx;
				line-height: 48rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: rgb(240, 20, 20);
			}
			.cart-control-wrapper {
				position: absolute;
				right: 0;
				top: 16rpx;
			}
		}
	}
}
.list-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -2;
	backdrop-filter: blur(20rpx);
	background: rgba(7, 17, 27, 0.6);
	transition: all 0.5s;
	display: none;
	opacity: 0;
	&.listShow {
		display: inline-block;
		opacity: 1;
		background: rgba(7, 17, 27, 0);
	}
}
</style>
