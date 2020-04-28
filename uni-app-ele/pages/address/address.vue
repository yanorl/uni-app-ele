<template>
	<view class="address-box">
		<view class="city-search">
			<view class="search">
				<view class="city" @tap="handleCity">
					{{ city }}
					<view class="icon fa fa-angle-down"></view>
				</view>
				<view class="icon iconfont icon-search"></view>
				<input class="uni-input" confirm-type="search" placeholder="小区/写字楼/学校等" @input="onKeyInput" />
			</view>
			<!-- 当前定位 -->
			<location :address="locationAddr" @selectItem="selectItem"></location>
		</view>

		<!-- 搜索结果 -->
		<scroll-view scroll-y="true" class="area-box">
			<view class="area-list" v-for="(item, index) in areaList" :key="index" @tap="selectItem(item.name, item.district,  item.address)">
				<view class="area-item">
					<view class="title">{{ item.name }}</view>
					<text>
						{{ item.district }}
						<text v-if="item.address">{{ item.address }}</text>
					</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import location from '../../components/location/location.vue';
import amapFile from '../../common/amap-wx.js';
import { mapGetters } from 'vuex';
import { key } from '../../common/config.js';
import { debounce } from '../../utils/index.js';

export default {
	data() {
		return {
			myAmapFun: null,
			searchValue: '',
			areaList: []
		};
	},
	watch: {
		// searchValue() {
		// 	this.searchPlace();
		// }
	},
	onLoad() {},
	created() {
		this.$watch(
			'searchValue',
			debounce(newValue => {
				this.searchPlace();
			}, 1000)
		);
	},
	computed: {
		...mapGetters(['city', 'locationAddr'])
	},
	components: {
		location
	},
	methods: {
		onKeyInput: function(event) {
			this.searchValue = event.target.value;
		},
		searchPlace() {
			if (this.searchValue != '') {
				// #ifdef MP
				this.appWeiXing();
				// #endif

				// #ifdef H5
				this.apph5();
				// #endif
				
				// #ifdef APP-PLUS
				this.appMap();
				// #endif
			}
		},
		appMap() {
			this.areaList = [{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"},{name: "测试标题", district: "测试详细地址1234567890"}]
		},
		appWeiXing() {
			var that = this;
			that.myAmapFun = new amapFile.AMapWX({ key });
			uni.showLoading({
				title: '加载中...'
			});
			that.myAmapFun.getInputtips({
				keywords: that.searchValue,
				city: that.city,
				citylimit: true,
				success: function(data) {
					uni.hideLoading();
					if (data && data.tips) {
						that.areaList = data.tips;
						console.log(that.areaList);
					}
				},
				fail: function(info) {
					uni.hideLoading();
					//失败回调
					console.log(info);
				}
			});
		},
		apph5() {
			const self = this;
			// console.log(this.search_val);
			AMap.plugin('AMap.Autocomplete', function() {
				// 实例化Autocomplete
				var autoOptions = {
					//city 限定城市，默认全国
					city: self.city
				};
				var autoComplete = new AMap.Autocomplete(autoOptions);
				autoComplete.search(self.searchValue, function(status, result) {
					// 搜索成功时，result即是对应的匹配数据
					console.log(result);
					self.areaList = result.tips;
				});
			});
		},
		handleCity () {
			uni.navigateTo({
				url: '../city/city'
			});
		},
		selectItem (title, add, addDes) {
			console.log(title, add, addDes)
			uni.showToast({
				title: '地址设置成功',
			})
			setTimeout(function() {
				uni.switchTab({
					url:'../tabBar/home/home'
				})
			}, 1500)
		}
	}
};
</script>

<style lang="scss">
.address-box {
	font-size: 28rpx;
	.city-search {
		background-color: #fff;
		padding: 20rpx 4%;
		color: #333;
		width: 92%;
		margin-bottom: 30rpx;

		.search {
			background-color: #eee;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 20rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
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
				font-size: 28rpx;
			}
		}
	}
	.area-box {
		width: 92%;
		padding: 0 4%;
		background-color: #ffffff;
		position: absolute;
		/*  #ifdef  H5 */
		height: calc(100vh - 240rpx - 88rpx - 30rpx);
		/*  #endif  */

		/*  #ifdef  APP-PLUS || MP */
		height: calc(100vh - 240rpx - 30rpx);
		/*  #endif  */

		.area-list {
			border-bottom: 1px solid #eeeeee;
			padding: 20rpx 30rpx;
			color: #aaaaaa;
			.title {
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
			}
		}
	}
}
</style>
