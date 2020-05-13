<template>
	<view class="pay-box">
		<view class="pay-wrap" v-if="orderInfo">
			<view class="tip">
				<view class="countdown-title">支付剩余时间</view>
				<h3 class="countdown-text">{{ countDown }}</h3>
			</view>
			<view class="pay-content">
				<ul class="list info-list">
					<li>
						<text class="order-name">{{ orderInfo.shopInfo.name }}</text>
						<text class="text-highlight">¥{{ totalPrice }}</text>
					</li>
				</ul>
				<view class="title">在线支付</view>
				<ul class="list payment-list">
					<li class="payment-list-item">
						<view class="icon">
							<image src="../../static/img/wechart.jpg"></image>
							<text>微信</text>
						</view>
						<i class="fa fa-check-circle selected"></i>
					</li>
				</ul>
			</view>
			<view class="button-wrap">
				<button @click="pay" :disabled="timeOut" class="btn-submit">确认支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			countDown: '00:15:00',
			timer: null,
			timeOut: false
		};
	},
	onLoad() {
		this.countTimeDown()
	},
	computed: {
		...mapGetters(['orderInfo', 'totalPrice', 'remarkInfo', 'userInfo'])
	},
	methods: {
		countTimeDown() {
			let minute = 14;
			let second = 59;

			this.timer = setInterval(() => {
				second--;

				if (second == '00' && minute == '00') {
					this.countDown = '订单已超时';
					clearInterval(this.timer);
					this.timeOut = true;
					return;
				}

				if (second == '00') {
					second = 59;
					minute--;

					if (minute < 10) {
						minute = '0' + minute;
					}
				}

				if (second < 10) {
					second = '0' + second;
				}

				this.countDown = '00:' + minute + ':' + second;
			}, 1000);
		},
		pay() {
			uni.showToast({
				title: '跳到支付页面'
			})
		}
	},
	components: {}
};
</script>

<style lang="scss">
.pay-box {
	.pay-wrap {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		.tip {
			display: block;
			text-align: center;
			background-color: #fff;
			color: #333;
			padding: 60rpx;
			line-height: 60rpx;
			.countdown-title {
				font-size: 28rpx;
				color: #999;
			}
			.countdown-text {
				height: 60rpx;
				color: #333;
				font-size: 56rpx;
			}
		}
		.pay-content {
			.list {
				border-bottom: 1px solid #eee;
				background: #fff;
			}
			.info-list {
				padding: 0 50rpx;
				li {
					border-top: 1px solid #eee;
					display: flex;
					padding: 50rpx 0;
					font-size: 32rpx;
					line-height: 32rpx;
					justify-content: space-between;
					.order-name {
						color: #333;
						display: inline-block;
						vertical-align: bottom;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-right: 30rpx;
						max-width: 60%;
					}
					.text-highlight {
						color: #ff6000;
					}
				}
			}
			.title {
				background-color: #f5f5f5;
				font-size: 28rpx;
				padding: 10rpx;
				color: #999;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.payment-list-item {
				border-bottom: 0.5px solid #eee;
				padding:30rpx;
				font-size: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.icon {
					display: flex;
					align-items: center;
				}
				image {
					width: 80rpx;
					height: 80rpx;
					margin-right: 40rpx;
				}
				i {
					font-size: 48rpx;
					color: #eee;
				}
				.selected {
					color: #4cd964 !important;
				}
			}
		}
		.button-wrap{
			margin: 20rpx auto;
			  width: 90%;
			.btn-submit {
				font-size: 36rpx;
				line-height: 48rpx;
				background-color: #4cd964;
				width: 100%;
				outline: none;
				border: none;
				color: #fff;
				border-radius: 10rpx;
				padding: 16rpx;
				box-sizing: border-box;
			}
			/* 不可点击btn */
			.btn-submit[disabled] {
				background-color: #bbb !important;
			}
		}

	
	}
}
</style>
