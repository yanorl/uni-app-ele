<template>
	<view class="set-address">
		<set-address @setAddress="setAddress" fromHome='true'></set-address>
	</view>
</template>

<script>
import setAddress from '../../components/setAddress/setAddress.vue';
export default {
	data() {
		return {};
	},
	components:{
		setAddress
	},
	methods:{
		setAddress(params) {
			console.log('home')
			uni.switchTab({
				url: '../tabBar/home/home'
			})
		}
	}
};
</script>

<style lang="scss"></style>
