<template>
	<view class="shop-cart-box">
		<view class="content-wrapper" @tap.stop="toggleList">
			<view class="content-left">
				<view class="logo-wrapper">
					<view class="logo" :class="{ highlight: totalCount > 0 }">
						<i class="fa fa-cart-plus"></i>
						<text class="icon-shopping_cart"></text>
					</view>
					<view class="num" v-show="totalCount > 0">{{ totalCount }}</view>
				</view>
				<view class="price" :class="{ highlight: totalPrice > 0 }">¥{{ totalPrice }}</view>
				<view class="desc" v-if="shopInfo">另需配送费¥{{ shopInfo.float_delivery_fee }}元</view>
			</view>
			<view class="content-right" @tap.stop.prevent="pay">
				<view class="pay" :class="payClass">{{ payDesc }}</view>
			</view>
		</view>
		<!-- <ball></ball> -->
		<shop-cart-details  @parentFold="changeFold" :fold="fold" :selectGoods="goodsList" :totalCount="totalCount"></shop-cart-details>
	</view>
</template>

<script>
	import shopCartDetails from './shopCartDetails.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			goodsList: [],
			fold: true // 购物车详情页折叠状态,true表示折叠
		};
	},
	props: {
		shopInfo: {
			type: Object,
			default: () => {}
		}
	},
	watch: {
		watchOption() {
			this.getGoodsList();
		}
	},
	created() {
		this.getGoodsList();
	},
	computed: {
		...mapGetters(['watchOption']),
		totalPrice() {
			let total = 0;
			this.goodsList.forEach(item => {
				total += item.food_price * item.food_count;
			});
			return total;
		},
		totalCount() {
			let count = 0;
			this.goodsList.forEach(item => {
				count += item.food_count;
			});
			return count;
		},
		minPrice() {
			if (this.shopInfo) {
				return this.shopInfo.float_minimum_order_amount;
			}
		},
		payClass() {
			if (this.totalPrice < this.minPrice) {
				return 'not-enough';
			} else {
				return 'enough';
			}
		},
		payDesc() {
			if (this.totalPrice === 0) {
				return `¥${this.minPrice}元起送`;
			} else if (this.totalPrice < this.minPrice) {
				let diff = this.minPrice - this.totalPrice;
				return `还差${diff}`;
			} else {
				return '去结算';
			}
		}
	},
	components:{
		shopCartDetails
	},
	methods: {
		getGoodsList() {
			let that = this
			uni.getStorage({
				key: 'goodsList',
				success: res => {
					that.goodsList = res.data;
					// console.log(this.goodsList);
				},
				fail() {
					that.goodsList = []
				}
			});
		},
		toggleList() {
			if (!this.totalCount) {
				return;
			}
			this.fold = !this.fold;
		},
		changeFold() {
			this.fold = true;
		},
		...mapActions([
		      'setOrderInfo'
		    ]),
		pay() {
			if (this.totalPrice < this.minPrice) {
				return;
			}
			this.setOrderInfo({
        shopInfo: this.shopInfo,
        selectFoods: this.goodsList
      })
			uni.navigateTo({
				url:'../orders/orders'
			})
		}
	}
};
</script>

<style lang="scss">
.shop-cart-box {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 10;
	width: 100%;
	height: 96rpx;
	background: #000;
	.content-wrapper {
		display: flex;
		background: #141d27;
		font-size: 0;
		color: rgba(255, 255, 255, 0.4);
		.content-left {
			flex: 1;
			.logo-wrapper {
				display: inline-block;
				vertical-align: top;
				position: relative;
				top: -20rpx;
				margin: 0 36rpx;
				padding: 12rpx;
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				background: #141d27;
				.logo {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background: #2b343c;
					text-align: center;
					&.highlight {
						background-color: #00a0dc;
						i.fa-cart-plus {
							color: #fff;
						}
					}
					i.fa-cart-plus {
						font-size: 48rpx;
						line-height: 88rpx;
						color: #80858a;
					}
				}
				.num {
					position: absolute;
					top: 0;
					right: 0;
					width: 48rpx;
					height: 32rpx;
					line-height: 32rpx;
					text-align: center;
					border-radius: 32rpx;
					font-size: 18rpx;
					font-weight: 700;
					color: #fff;
					background: #f01414;
					box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.4);
				}
			}
			.price {
				display: inline-block;
				margin-top: 24rpx;
				line-height: 48rpx;
				padding-right: 24rpx;
				border-right: 1px solid rgba(255, 255, 255, 0.1);
				font-size: 32rpx;
				font-weight: 700;
				&.highlight {
					color: #fff;
				}
			}
			.desc {
				display: inline-block;
				margin-left: 24rpx;
				font-size: 20rpx;
				line-height: 48rpx;
			}
		}
		.content-right {
			flex: 0 0 210rpx;
			width: 210rpx;
			.pay {
				font-size: 24rpx;
				font-weight: 700;
				line-height: 96rpx;
				padding: 0 16rpx;
				text-align: center;
				&.not-enough {
					background-color: #2b343c;
				}
				&.enough {
					background-color: #00b43c;
					color: #fff;
				}
			}
		}
	}
}
</style>
