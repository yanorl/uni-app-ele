<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>

		<view class="header">
			<view class="header-wraper">
				<!-- 定位城市 -->
				<view class="addr" @tap="handleCity">
					<view class="icon iconfont">&#xe650;</view>
					{{ city }}
				</view>
				<!-- 搜索框 -->
				<view class="input-box">
					<input type="text" placeholder="some words" placeholder-style="color:#c0c0c0" />
					<view class="icon iconfont">&#xe65c;</view>
				</view>
				<!-- 提示信息 -->
				<view class="icon-btn"><view class="icon iconfont">&#xe70a;</view></view>
			</view>
		</view>
	</view>
</template>

<script>
	import pageStatus from '../status/status.vue';
	import { mapGetters } from 'vuex'
	
export default {
	data() {
		return {
		};
	},
  computed:{
		...mapGetters([
		  'city'
		])
	},
	components:{
		pageStatus
	},
	methods:{
		handleCity() {
			uni.navigateTo({
				url: '../../address/address'
			});
		}
	}
};
</script>

<style lang="scss">
.header {
	background-color: #ffffff;
	height: 100rpx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
	.header-wraper {
		width: 92%;
		padding: 0 4%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		// 条件编译 设置离顶部的高度
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 100rpx;
			height: 60rpx;
			margin-right: 20rpx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.icon {
				height: 60rpx;
				margin-right: 5rpx;
				display: flex;
				align-items: center;
				font-size: 42rpx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60rpx;
			background-color: #f5f5f5;
			border-radius: 30rpx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60rpx;
				height: 60rpx;
				font-size: 34rpx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28rpx;
				height: 28rpx;
				font-size: 28rpx;
			}
		}

		.icon-btn {
			width: 60rpx;
			height: 60rpx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60rpx;
				height: 60rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42rpx;
			}
		}
	}
}
</style>
