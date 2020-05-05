<template>
	<view class="text_group">
		<!-- 组件结构 -->
		<!-- 组件容器 -->
		<view class="input_group" :class="{ 'is-invalid': error }">
			<!-- 输入框 -->
			<input :type="type" :value="value" :placeholder="placeholder" :name="name" @input="$emit('input', $event.target.value)" />
			<!-- 输入框后面的按钮 -->
			<button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">{{ btnTitle }}</button>
		</view>
		<!-- 错误提醒 -->
		<view v-if="error" class="invalid-feedback">{{ error }}</view>
	</view>
</template>

<script>
export default {
	name: 'inputGroup',
	props: {
		type: {
			type: String,
			default: 'text'
		},
		value: String,
		placeholder: String,
		name: String,
		btnTitle: String,
		disabled: Boolean,
		error: String
	}
};
</script>

<style lang="scss">
.input_group {
	border: 1px solid #ccc;
	border-radius: 8rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	input {
		flex: 1;
		outline: none;
		font-size: 24rpx;
	}
	button {
		font-size: 24rpx;
		border: none;
		outline: none;
		background: #fff;
		&[disabled] {
			color: #aaa;
		}
		&:after {
			border: none;
		}
	}
}
.is-invalid {
	border: 1px solid red;
}
.invalid-feedback {
	color: red;
	padding-top: 10rpx;
}
</style>
