<template>
		<view class="shop-list">
			<view class="shop-list-info">
				<!-- 左侧图片 -->
				<view class="shop-list-logo"><image :src="shopList.image_path"></image></view>
				<!-- 右侧内容 -->
				<view class="shop-list-content">
					<!-- 第一行 品牌 -->
					<view class="shop-list-name">
						<i v-if="shopList.is_premium">品牌</i>
						<text>{{ shopList.name }}</text>
					</view>
					<!-- 第二行 星级 -->
					<view class="shop-list-rate">
						<view class="rate-wrap">
							<rating :rating="shopList.rating"></rating>
							<text class="rate-num">{{ shopList.rating }}</text>
							<text>月售{{ shopList.recent_order_num }}单</text>
						</view>
						<view v-if="shopList.delivery_mode" class="delivery">
							<text class="icon-hollow">{{ shopList.delivery_mode.text }}</text>
						</view>
					</view>

					<!-- 第三行 配送 -->
					<view class="shop-delivery">
						<view>
							<text>¥{{ shopList.float_minimum_order_amount }}起送</text>
							|
							<text>配送费¥{{ shopList.float_delivery_fee }}</text>
						</view>
						<view class="shop-delivery-distance">
							<text>{{ (shopList.distance / 1000).toFixed(2) }}km</text>
							|
							<text>{{ shopList.order_lead_time }}分钟</text>
						</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import rating from '../rating/rating.vue';
export default {
	data() {
		return {};
	},
	props: {
		shopList: {
			type: Object,
			default: () => {}
		}
	},
	components:{
		rating
	}
};
</script>

<style lang="scss">
	.shop-list {
		background: #fff;
		color: #666;
		padding: 10rpx 0;
		border-bottom: 1 solid #eee;
		.shop-list-info {
			display: flex;
			justify-content: flex-start;
			padding: 0 4%;
			align-items: stretch;

			.shop-list-logo {
				width: 130rpx;
				height: 130rpx;
				image {
					display: block;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					border: 1px solid rgba(0, 0, 0, 0.08);
					border-radius: 8rpx;
				}
			}
			.shop-list-content {
				display: flex;
				justify-content: space-between;
				overflow: hidden;
				flex-direction: column;
				padding-left: 20rpx;
				font-size: 12px;
				flex-grow: 1;
				.shop-list-name {
					align-items: center;
					color: #333;
					font-weight: 700;
					font-size: 14px;
					i {
						background: #ffe800;
						margin-right: 10rpx;
						padding: 2rpx 5rpx;
						text-align: center;
						white-space: nowrap;
						font-size: 12px;
						font-style: normal;
						display: inline-block;
					}
					text {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.shop-list-rate {
					display: flex;
					align-items: center;
					overflow: hidden;
					justify-content: space-between;
					.rate-wrap {
						.rate-num {
							margin-right: 10rpx;
						}
					}
					.delivery {
						display: flex;
						align-items: center;
						font-size: 12px;
						margin-left: 10rpx;
						.icon-hollow {
							color: #fff;
							background-color: #2395ff;
							padding: 4rpx;
							box-sizing: border-box;
						}
					}
				}

				.shop-delivery {
					width: 100%;
					display: flex;
					justify-content: space-between;
					text {
						margin: 0 10rpx;
					}
					.shop-delivery-distance {
						color: #999;
					}
				}
			}
		}
	}
</style>
