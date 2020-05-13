<template>
	<view class="text_group" >
		<!-- 组件结构 -->
		<!-- 组件容器 -->
		<view class="input_group" :class="{ 'is-invalid': error, 'border': border }">
			<!-- 输入框 -->
			<input :type="type"  :placeholder="placeholder" :name="name" @input="onKeyInput" :value="value"/>
			<!-- 输入框后面的按钮 -->
			<button v-if="btnTitle" :disabled="disabled" @click="handelPhone">{{ btnTitle }}</button>
		</view>
		<!-- 错误提醒 -->
		<view v-if="error" class="invalid-feedback">{{ error }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputValue: ''
		}
	},
	behaviors: ['uni://form-field'],
	props: {
		type: {
			type: String,
			default: 'text'
		},
		border: {
			type: Boolean,
			default: true
		},
		value: String,
		placeholder: String,
		name: String,
		btnTitle: String,
		disabled: Boolean,
		error: String
	},
	methods:{
		onKeyInput(e) {
			this.inputValue = e.target.value
			this.$emit('modelInput', this.inputValue)
		},
		handelPhone() {
			this.$emit('btnClick', this.inputValue)
		}
	}
};
</script>

<style lang="scss">
.input_group {
	border-radius: 8rpx;
	padding: 10rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	&.border{
		border: 1px solid #ccc;
	}
	input {
		flex: 1;
		outline: none;
		font-size: 24rpx;
		min-height: 60rpx;
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
