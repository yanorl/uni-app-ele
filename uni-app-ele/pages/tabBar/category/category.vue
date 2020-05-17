<template></template>

<script>
import { isLoginMixin } from '../../../common/mixins.js';
export default {
	data() {
		return {};
	},
	mixins: [isLoginMixin],
	onLoad() {
		this.isLogin(true)
	}
};
</script>

<style lang="scss"></style>
