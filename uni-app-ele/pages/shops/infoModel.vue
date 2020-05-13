<template>
	<transition name="fade">
		<view class="info-model" v-show="showInfoModel">
			<view class="brief-modal">
				<h2>
					<i v-if="rst.is_premium">品牌</i>
					<text>{{ rst.name }}</text>
				</h2>
				<ul>
					<li>
						<h3>{{ rst.rating }}</h3>
						<text>评分</text>
					</li>
					<li>
						<h3>{{ rst.recent_order_num }}</h3>
						<text>月售</text>
					</li>
					<li v-if="rst.delivery_mode">
						<h3>蜂鸟转送</h3>
						<text>约{{ rst.order_lead_time }}分钟</text>
					</li>

					<li>
						<h3>¥{{ rst.float_delivery_fee }}元</h3>
						<text>配送费</text>
					</li>
					<li>
						<h3>{{ (rst.distance / 1000).toFixed(1) }}km</h3>
						<text>距离</text>
					</li>
				</ul>
				<h3 class="promotion"><text>公告</text></h3>
				<text class="brief-modal-yx">{{ rst.promotion_info }}</text>
			</view>
			<!-- x号 -->
			<view class="brief-modal-close" @tap="$emit('close')"><image src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/" alt /></view>
		</view>
	</transition>
</template>

<script>
export default {
	props: {
		rst: { 
			type: Object, 
			defaul: () => {} 
		},
		showInfoModel: { 
			type: Boolean, 
			default: false ,
		}
	}
};
</script>

<style lang="scss">
.info-model {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: rgba(0, 0, 0, 0.5);
	z-index: 99;
	.brief-modal {
		position: relative;
		width: 80%;
		max-height: 640rpx;
		padding: 40rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background: #fff;
		z-index: 100;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		h2 {
			font-size: 36rpx;
			color: #333;
			text-align: center;
			font-weight: bolder;
			i {
				display: inline-block;
				margin-right: 12rpx;
				border-radius: 4rpx;
				background-image: linear-gradient(90deg, #fff100, #ffe339);
				color: #6a3709;
				font-style: normal;
				padding:6rpx;
				font-weight: 700;
				font-size: 30rpx;
			}
		}
		ul {
			display: flex;
			margin: 40rpx -40rpx 0;
			li {
				flex: 1;
				text-align: center;
				h3 {
					font-size: 28rpx;
					font-weight: 600;
					color: #333;
					margin-bottom: 10rpx;
				}
				text {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
		
		.promotion {
			position: relative;
			text-align: center;
			margin: 20rpx 170rpx;
			width: 150rpx;
			background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
			background-size: 100% 1px;
			background-position: 50%;
			background-repeat: no-repeat;
			text {
				font-size: 32rpx;
				padding: 0 8rpx;
				color: #999;
				background-color: #fff;
			}
		}
		
		.brief-modal-yx {
			font-size: 28rpx;
			line-height: 1.54;
			color: #333;
			max-height: 200rpx;
			overflow-y: auto;
		}
	}
	
	.brief-modal-close {
		margin-top: 60rpx;
		width: 60rpx;
		height: 60rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
