<template>
	<view class="goods-box" v-if="recommend.length">
		<!-- 商家推荐 -->
		<scroll-view scroll-x="true" class="recommend" v-for="(recommend, index) in recommend" :key="index">
			<view class="recommend-name">{{ recommend.name }}</view>
			<view class="recommend-wrap">
				<ul>
					<li v-for="(item, i) in recommend.items" :key="i" @tap="handleFood(item)">
						<image :src="item.food_image" mode=""></image>
						<view class="recommend-food">
							<view class="recommend-food-name">{{ item.food_name }}</view>
							<view class="recommend-food-zm">月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}</view>
							<view class="recommend-food-price">
								<text>￥{{ item.food_price }}</text>
								<view class="cart-control-wrapper"><cart-control @add="add(item, $event)" @sub="sub(item, $event)" :items="item"></cart-control></view>
							</view>
						</view>
					</li>
				</ul>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import cartControl from '../../components/cartControl/cartControl.vue';
import { cartControlMixin } from '../../common/mixins.js';

export default {
	data() {
		return {
		};
	},
	props: {
		recommend: {
			type: Array,
			default: () => []
		}
	},
	mixins: [cartControlMixin],
	computed: {},
	components: {
		cartControl
	},
	methods: {
		handleFood(food) {
			this.$emit('handleFood', food)
		},
	}
};
</script>

<style lang="scss">
.goods-box {
	.recommend {
		padding-top: 32rpx;
		background-color: #fff;
		height: 506rpx;
		.recommend-name {
			padding-left: 32rpx;
			color: #333;
			font-size: 32rpx;
			font-weight: 700;
			margin-bottom: 20rpx;
		}
		.recommend-wrap {
			overflow-x: scroll;
			display: flex;
			width: 100%;
			padding-bottom: 20rpx;
			ul {
				display: flex;
				padding-left: 32rpx;
				li {
					flex: none;
					width: 240rpx;
					margin-right: 20rpx;
					image {
						display: block;
						width: 240rpx;
						height: 240rpx;
						border-top-left-radius: 8rpx;
						border-top-right-radius: 8rpx;
						max-width: 100%;
					}
					.recommend-food {
						.recommend-food-name {
							color: #333;
							font-size: 24rpx;
							margin: 14rpx 0 8rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.recommend-food-zm {
							color: #999;
							font-size: 24rpx;
							margin-bottom: 14rpx;
							min-height: 40rpx;
						}
						.recommend-food-price {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding-right: 20rpx;
							position: relative;
							text {
								font-size: 28rpx;
								color: #ff5339;
							}
							.cart-control-wrapper {
								position: absolute;
								right: 0;
							}
						}
					}
				}
			}
		}
	}
}
</style>
