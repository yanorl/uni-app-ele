<template>
	<div class="input-wrap">
		<span v-for="(item, index) in tags" :key="index" class="form-span" :class="{ checked: selectTag == item }" @click="$emit('checkTag', item)">{{ item }}</span>
	</div>
</template>

<script>
export default {
	props: {
		tags: Array,
		selectTag: String
	}
};
</script>

<style lang="scss">
.input-wrap {
	flex: 1 1 0;
	display: flex;
	align-items: center;
	.form-span {
		background: #fff;
		border: 1px solid #ddd;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #666;
		height: 60rpx;
		padding: 0 40rpx;
		line-height: 60rpx;
		margin-right: 20rpx;
		text-align: center;
		font-weight: normal;
		&.checked {
			color: #2395ff !important;
			background: #eef7ff !important;
			border-color: rgba(35, 149, 255, 0.18) !important;
		}
	}
}
</style>
