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
	import { mapGetters } from 'vuex';
	
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
		},
		cartSum:{
			type: Boolean,
			default: false
		}
	},
	watch:{
		count(value) {
			if(value > 0) {
				this.move = true
			} else {
				this.move = false
			}
		},
		watchOption() {
			this.undate();
		}
		
	},
	created() {
		this.undate()
	},
computed: {
		...mapGetters(['watchOption'])
	},
	methods: {
		undate() {
			let that = this
			uni.getStorage({
				key: "goodsList",
				success: (res => {
					
					let bool = res.data.some((item) => {
					  return item.food_id == that.items.food_id;
					});  //先判断有没有存储都有和当前food_id相同都产品，没有count 为0，  有就循环把有相同food_id产品的food_count 赋值给count；如果不进行这一步，当food_count减小为0的时候，count的值依旧为1；
					if(bool) {
						res.data.forEach(function(item){
							if(item.food_id == that.items.food_id) {
								that.count = item.food_count
							} 
						})
					} else {
						that.count = 0
					}

				}),
				fail() {
					that.count = 0
				}
			})
			
		},
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
