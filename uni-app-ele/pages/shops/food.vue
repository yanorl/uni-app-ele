<template>
		<view class="food-box" v-if="isShow" :class="{'active': isShow}">
			<view class="foodpanel-close" @click="$emit('close')"><image src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt /></view>
			<view class="foodpanel-body">
				<view class="foodpanel-foodimg"><image :src="food.food_image" alt mode="widthFix"/></view>
				<view class="foodpanel-foodinfo">
					<h4>{{ food.food_name }}</h4>
					<view class="foodpanel-foodsales">
						<text>月售{{ food.month_sales }}</text>
						<text>好评率 {{ food.satisfy_rate }}%</text>
					</view>
					<view class="foodpanel-priceLine">
						<text>¥{{ food.food_price }}</text>
						<view class="cart-control-wrapper"><cart-control @add="add(food, $event)" @sub="sub(food, $event)" :items="food"></cart-control></view>
					</view>
					<text>{{ food.description }}</text>
				</view>
			</view>
		</view>
</template>

<script>
import cartControl from '../../components/cartControl/cartControl.vue';
import  {cartControlMixin} from './../../common/mixins.js'

export default {
	props: {
		food: Object,
		isShow: Boolean
	},
	mixins: [cartControlMixin],
	components: {
		cartControl
	}
};
</script>

<style lang="scss">
.food-box {
	transform: translate(0, 100%);
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 10;
	&.active{
		transition: all 0.25s ease-in;
		transform: translate(0, 0);
	}
	.foodpanel-close {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 1;
		top: 20rpx;
		right: 20rpx;
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
	.foodpanel-body {
		position: relative;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		padding-bottom: 150rpx;
		box-sizing: border-box;
		overflow-x: hidden;
		.foodpanel-foodimg {
			width: 100%;
			display: block;
			image {
				width: 750rpx;
			}
		}
		.foodpanel-foodinfo {
			padding: 30rpx;
				h4 {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				font-size: 36rpx;
				font-weight: 700;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.foodpanel-foodsales {
				font-size: 24rpx;
				color: #666;
				line-height: 1;
				margin-bottom: 20rpx;
				text{
					margin-right: 10rpx;
				}
			}
			.foodpanel-priceLine {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				position: relative;
				text{
					font-size: 32rpx;
					color: #ff5339;
					padding-bottom: 5rpx;
					display: flex;
					align-items: baseline;
				}
				.cart-control-wrapper{
					position: absolute;
					right: 0;
				}
			}
		}
	}
}

</style>
