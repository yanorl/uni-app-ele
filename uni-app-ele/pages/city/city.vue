<template>
	<view class="city-box">
		<!-- 状态栏 -->
		<page-status></page-status>

		<!-- 搜索地址 -->
		<view class="search-wrap">
			<view class="search">
				<i class="fa fa-search"></i>
				<input class="uni-input" confirm-type="search" placeholder="输入城市名" @input="onKeyInput" />
			</view>
			<button>取消</button>
		</view>
	</view>
</template>

<script>
import pageStatus from '../../components/status/status.vue';

export default {
	data() {
		return {
			inputValue: ''
		};
	},
	components: {
		pageStatus
	},
	methods: {
		onKeyInput: function(event) {
			this.inputValue = event.target.value;
		}
	}
};
</script>

<style lang="scss">
.city-box {
	.search-wrap {
		position: fixed;
		top: 0;
		height:90rpx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 6rpx 32rpx;
		display: flex;
		justify-content: space-between;
	}
}
</style>
