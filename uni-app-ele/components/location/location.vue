<template>
	<view class="location-box">
		<view class="title">{{locationText}}</view>
		<view class="location-addr" @tap="selectItem(address)">
			<i class="fa fa-location-arrow"></i>
			<text class="addr">{{ address }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		address: {
			type: String,
			default: ''
		},
		locationText: {
			type: String,
			default: '当前定位'
		}
	},
	methods: {
		selectItem(name) {
			this.$emit('selectItem', name)
		}
	}
};
</script>

<style lang="scss">
.location-box {
	.title {
		margin: 20rpx 0;
		font-size: 28rpx;
	}
	.location-addr {
		display: flex;
		align-items: center;
		i {
			color: #009eef;
		}
		.addr {
			color: #333;
			font-weight: bold;
			margin-left: 10rpx;
			display: inline-block;
			width: 90%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
</style>
