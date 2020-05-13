<template>
	<view class="tableware" v-if="isShow">
		<view class="actions-sheet" @touchmove.stop.prevent="moveHandle">
			<i class="fa fa-remove" @tap="$emit('close')"></i>
			<h2 class="actions-sheet-header">
				<span class="tag"></span>
				<span class="title">餐具份数</span>
				<span class="tag"></span>
			</h2>
			<ul>
				<li :class="{ selected: selectItem == item }" @tap="clickItem(item)" v-for="(item, index) in tablewareList" :key="index">{{ item }}</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
	
export default {
	data() {
		return {
			tablewareList: ['1', '2', '3', '4', '5', '6'],
			selectItem: ''
		};
	},
	props: {
		isShow: Boolean
	},
	computed: {
		...mapGetters(['remarkInfo'])
	},
	methods: {
		...mapMutations({
			setRemarkInfo: 'SET_REMARK_INFO'
		}),
		clickItem(item) {
			this.selectItem = item;
			this.setRemarkInfo({
				 tableware: item + "份餐具",
				 remark: this.remarkInfo.remark
			})
			this.$emit('close');
		}
	},
	moveHandle() {}
};
</script>

<style lang="scss">
.tableware {
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
	.actions-sheet {
		position: absolute;
		background-color: #f5f5f5;
		box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 40rpx 50rpx;
		box-sizing: border-box;
		transition: transform 0.2s;
		will-change: transform;
		.actions-sheet-header {
			margin-bottom: 24rpx;
			padding: 0 56rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
			.tag {
				display: inline-block;
				width: 32rpx;
				height: 2rpx;
				border-top: 1px solid #333;
			}
			.title {
				margin: 0 24rpx;
			}
		}
		.fa-remove {
			position: absolute;
			height: 48rpx;
			width: 48rpx;
			right: 20rpx;
			top: 20rpx;
			color: #aaa;
			font-size: 40rpx;
		}
		ul {
			margin-top: 40rpx;
			max-height: 600rpx;
			overflow-y: scroll;
			li {
				margin-bottom: 40rpx;
				text-align: center;
				&.selected {
					color: #2396ff;
					font-weight: 500;
				}
			}
		}
	}
}
</style>
