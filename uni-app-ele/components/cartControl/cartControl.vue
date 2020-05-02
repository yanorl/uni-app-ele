<template>
	<view class="cart-Control-box">
		<!-- <transition name="move"> -->
			<view class="cart-decrease"  @tap.stop="decreaseCart" :class="{move: move}"><i class="fa fa-minus-circle"></i></view>
		<!-- </transition> -->
		<view class="cart-count" v-if="count > 0">{{ count }}</view>
		<view class="cart-add" @tap.stop="addCart"><i class="fa fa-plus-circle"></i></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			count: 0,
			move: false
		};
	},
	props: {
		items:{
			type: Object,
			default: () => {}
		}
	},
	watch:{
		count(value) {
			if(value > 0) {
				this.move = true
			} else {
				this.move = false
			}
		}
	},
	created() {
		let that = this
		uni.getStorage({
			key: "goodsList",
			success: (res => {
				res.data.forEach(function(item){
					if(item.food_id == that.items.specfoods[0].food_id) {
						that.count = item.foot_count
						// console.log(that.count)
					}
				})
				
			})
		})
	},
	computed: {
	},
	methods: {
		addCart() {
			this.count++;
			this.$emit('add', this.count);
		},
		decreaseCart() {
			if (this.count) {
				this.count--;
			}
			this.$emit('sub', this.count);
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
		padding: 16rpx;
		transition: all 0.4s linear;
		i {
			display: inline-block;
			line-height: 36rpx;
			font-size: 36rpx;
			color: #00a0dc;
			transition: all 0.4s linear;
		}
		&.move-enter-active,
		&.move-leave-active {
			transition: all 0.4s linear;
		}
		&.move-enter,
		&.move-leave-to {
			opacity: 0;
			transform: translate3d(36rpx, 0, 0);
			i {
				transform: rotate(180deg);
			}
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
