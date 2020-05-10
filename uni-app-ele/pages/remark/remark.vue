<template>
	<view class="remark-wrap">
		<!-- 订单备注 -->
		<view class="remark-box">
			<view class="remark-content">
				<form @submit="submitClick">
				<textarea placeholder-style="color:#818181" placeholder="填写额外对餐厅或骑手小哥备注的信息" name="textarea"  />
				<view class="switch-box">
					<text @tap="handleRadioItem(item)" :class="{ selected: item.select }" v-for="(item, index) in radioItem" :key="index" class="switch-item item-line">{{ item.name }}</text>
				</view>

				<div class="switch-box" v-for="(item, index) in switchItem" :key="index">
					<text :class="{ selected: item.select }" @tap="handleSwitch(item)" class="switch-item">{{ item.name }}</text>
				</div>
			<button type="primary" form-type="submit" class="btn-submit">确定</button>
			</form>
			</view>
		</view>
	</view>
</template>
 
<script>
	import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			radioItem: [{ select: false, name: '不要辣' }, { select: false, name: '少点辣' }, { select: false, name: '多点辣' }],
			switchItem: [{ select: false, name: '不要香菜' }, { select: false, name: '不要洋葱' }, { select: false, name: '多点醋' }, { select: false, name: '多点葱' }],
		};
	},
	computed: {
		...mapGetters(['remarkInfo'])
	},
	methods: {
		...mapMutations({
			setRemarkInfo: 'SET_REMARK_INFO'
		}),
		handleRadioItem(item) {
			this.radioItem.forEach(element => {
				element.select = false;
			});
			item.select = true;
		},
		handleSwitch(item) {
			item.select = !item.select
		},
		submitClick(e) {
			let textareaValue = e.detail.value.textarea;
			
			let selectItems = '';
			this.radioItem.forEach(element => {
				if (element.select) {
					selectItems += element.name + ',';
				}
			});

			this.switchItem.forEach(element => {
				if (element.select) {
					selectItems += element.name + ',';
				}
			});

			selectItems += textareaValue;
			// console.log(selectItems);
			// 存储
			this.setRemarkInfo({
				 tableware: this.remarkInfo.tableware,
				 remark:selectItems 
			})
			uni.navigateBack()
		}
	}
};
</script>

<style lang="scss">
.remark-wrap {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	.remark-box {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		font-size: 32rpx;
		color: #333;
		.remark-content {
			margin-top: 20rpx;
			padding: 36rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			textarea {
				width: 100%;
				height: 250rpx;
				margin-bottom: 36rpx;
				padding: 36rpx;
				border: 1px solid #ccc;
				border-radius: 8rpx;
				background-color: #f9f9f9;
				color: #666;
				resize: none;
				box-sizing: border-box;
				outline: none;
			}
			.switch-box {
				display: inline-block;
				margin: 0 20rpx 20rpx 0;
				border: 1px solid #ddd;
				overflow: hidden;
				border-radius: 8rpx;
				.switch-item {
					display: inline-block;
					padding: 0 16rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					color: #666;
					&.selected {
						background: #0186ff;
						color: #fff;
						position: relative;
					}
					&:after {
						content: ' ';
						display: inline-block;
						height: 30rpx;
						width: 1px;
						background: #ddd;
						line-height: 60rpx;
						vertical-align: middle;
						left: 18rpx;
						position: relative;
					}
				}
			}
		}
		.btn-submit {
			display: block;
			color: #fff;
			background-color: #00e067;
			border-radius: 4rpx;
			opacity: 0.98;
			width: 690rpx;
			height: 100rpx;
			line-height: 100rpx;
			margin: 20rpx auto 0;
			font-size: 32rpx;
		}
	}
}
</style>
