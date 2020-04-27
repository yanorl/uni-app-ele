<template>
	<view class="city-box">
		<!-- 状态栏 -->
		<page-status></page-status>

		<!-- 搜索地址 -->
		<view class="city-search">
			<view class="city-search-wrap">
				<i v-if="showback" class="back fa fa-angle-left" aria-hidden="true" @tap="handelBack"></i>
				<view class="search">
					<view class="icon iconfont icon-search"></view>
					<input class="uni-input" confirm-type="search" placeholder="小区/写字楼/学校等" @input="onKeyInput" @focus="onFocus" />
				</view>
				<text v-show="focusFlag" @tap="handelBack">取消</text>
			</view>
			<!-- 当前定位 -->
			<location locationText="当前城市" :address="city"></location>
		</view>

		<!-- 城市列表 -->
		<view class="city-lists"><alphabet ref="allcity" :cityInfo="cityInfo" :keys="keys" /></view>
	</view>
</template>

<script>
import pageStatus from '../../components/status/status.vue';
import location from '../../components/location/location.vue';
import alphabet from '../../components/alphabet/alphabet.vue';

import citys from '../../mock/citys.json';

import { mapGetters } from 'vuex';
import interfaces from '../../utils/interfaces.js';

export default {
	data() {
		return {
			inputValue: '',
			focusFlag: false,
			cityInfo: {},
			keys: [],
			allCities: [],
			searchList: [],
			// 是否显示返回按钮
			// #ifndef MP
			showback: true
			// #endif
		};
	},
	components: {
		pageStatus,
		location,
		alphabet
	},
	computed: {
		...mapGetters(['city'])
	},
	onLoad() {
		this.initData();
		// #ifdef MP
		// 如果是小程序端 隐藏返回按钮
		this.showback = false;
		// #endif
	},
	methods: {
		initData() {
			this.request({
				url: interfaces.getCityData,
				success: res => {
					console.log(res);
					this.cityInfo = res;
					// this.cityInfo = citys;
					// 处理key 计算key
					// this.keys = Object.keys(citys);
					this.keys = Object.keys(res);
					// hotcities这个key移除掉
					this.keys.pop();
					// keys 排序
					this.keys.sort();
				}
			});
		},
		onKeyInput: function(event) {
			this.inputValue = event.target.value;
		},
		onFocus() {
			this.focusFlag = true;
		},
		handelBack() {
			uni.navigateTo({
				url: '../address/address'
			});
		}
	}
};
</script>

<style lang="scss">
.city-box {
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
	.city-search {
		background-color: #fff;
		padding: 20rpx 4%;
		color: #333;
		width: 92%;
		height: 200rpx;
		z-index: 2;
		position: relative;
		 
		.city-search-wrap {
			display: flex;
			align-items: center;
			justify-content: space-around;
			.back {
				font-size: 20px;
			}
			.search {
				background-color: #eee;
				height: 80rpx;
				line-height: 80rpx;
				border-radius: 20rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				flex-grow: 1;
				margin: 0 20rpx;
				.city {
					padding-right: 20rpx;
					.icon {
						margin: 0 20rpx;
					}
				}
				input {
					flex-grow: 2;
					margin-left: 20rpx;
					background-color: #eee;
					outline: none;
					border: none;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
