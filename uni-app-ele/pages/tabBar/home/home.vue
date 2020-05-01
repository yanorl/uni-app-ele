<template>
	<view class="page-section">
		<!-- 自定义导航 -->
		<pageHeader />
		<view class="page-home">
			
		<scroll-view class="home-box" scroll-y="true"  @scrolltolower="scrolltolower">
			<!-- swiper banner -->
			<view class="page-section swiper-box">
				<swiper class="swiper" :circular="circular" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in swipeImgs" :key="index"><image :src="item"></image></swiper-item>
				</swiper>
			</view>

			<!-- 分类  -->
			<view class="page-section entries-box">
				<swiper class="swiper" :circular="circular">
					<swiper-item v-for="(entry, i) in entries" :key="i">
						<view class="entries-wrap" v-for="(item, index) in entry" :key="index">
							<view class="img-wrap"><image :src="item.image" mode="widthFix"></image></view>
							<text>{{ item.name }}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 商家推荐 -->
			<view class="page-section shop-box" id="filterSection">
				<view class="title">推荐商家</view>

				<!-- 导航 筛选-->
				<view class="filter-section"><filter-view :filterData="filterData" @update="update" ref="filterViews"></filter-view></view>

				<!-- 商家信息列表 -->
				<view class="shop-list-section"><shop-lists v-for="(item, index) in shopList" :key="index" :shopList="item.restaurant"></shop-lists></view>
			</view>
			
		</scroll-view>
		</view>
	</view>
</template>

<script>
import pageHeader from '../../../components/pageheader/pageHeader.vue';
import filterView from '../../../components/filterView/filterView.vue';
import shopLists from '../../../components/shopLists/shopLists.vue';
import interfaces from '../../../utils/interfaces.js';

export default {
	data() {
		return {
			swipeImgs: [],
			entries: [],
			shopList: [],
			filterData: {},
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			circular: true,
			page: 1,
			size: 5,
			allLoaded: false,
			postData: null,
			upDate: false
		};
	},
	onLoad() {
		this.getBanner();
		this.shopLists();
		this.getFilter();
	},
	components: {
		pageHeader,
		filterView,
		shopLists
	},
	// onReachBottom() {
	// 	if (!this.allLoaded) {
	// 		this.page++;
	// 		this.upDate = false;
	// 		this.shopLists();
	// 	}
	// },
	watch: {
	},
	mounted() {
		// this.$nextTick(function() {
		// 	uni
		// 		.createSelectorQuery()
		// 		.in(this)
		// 		.select('#filterSection')
		// 		.boundingClientRect(data => {
		// 			console.log(data);
		// 			this.filterTop = data.top;
		// 		})
		// 		.exec();
		// });
	},
	methods: {
		scrolltolower() {
			if (!this.allLoaded) {
				this.page++;
				this.upDate = false;
				this.shopLists();
			}
		},
		getBanner() {
			this.request({
				url: interfaces.getBanner,
				success: res => {
					// console.log(res);
					this.swipeImgs = res.swipeImgs;
					this.entries = res.entries;
				}
			});
		},
		getFilter() {
			this.request({
				url: interfaces.getfilter,
				success: res => {
					// console.log(res);
					this.filterData = res;
				}
			});
		},
		shopLists() {
			this.allLoaded = false;

			this.request({
				url: interfaces.getShoplists + '/' + this.page + '/' + this.size,
				// url: interfaces.getShoplists,
				data: this.postData,
				method: 'POST',
				success: res => {
					console.log(res);
					// this.shopList = res;
					if (!this.upDate) {
						if (res.length >= this.size) {
							res.forEach(item => {
								this.shopList.push(item);
							});
						} else {
							this.allLoaded = true;
						}
					} else {
						this.shopList = res;
					}
				}
			});
		},
		update(condation) {
			// console.log(condation);
			this.postData = condation;
			this.page = 1;
			this.upDate = true;
			this.shopLists();
		}
	}
};
</script>

<style lang="scss">
.home-box {
	height: calc(100vh - var(--window-bottom) - 100rpx);
	/*  #ifdef  APP-PLUS  */
	height: calc(100vh - var(--window-bottom) - var(--status-bar-height) - 100rpx);
	/*  #endif  */
}
.swiper-box {
	width: 100%;
	height: 200rpx;
	//兼容ios，微信小程序
	position: relative;
	z-index: 1;

	swiper {
		width: 100%;
		height: 200rpx;
		swiper-item {
			image {
				width: 100%;
				height: 200rpx;
			}
		}
	}
}

.entries-box {
	background: #fff;
	height: 354rpx;
	text-align: center;
	overflow: hidden;
	swiper {
		height: 354rpx;
		.entries-wrap {
			width: 20%;
			float: left;
			position: relative;
			margin-top: 22rpx;
			.img-wrap {
				position: relative;
				display: inline-block;
				width: 100rpx;
				height: 100rpx;
				image {
					width: 100rpx;
					height: 100rpx;
				}
			}
			text {
				display: block;
				color: #666;
				font-size: 24rpx;
			}
		}
	}
}

/* 推荐商家 */
.shop-box {
	.filter-section {
		position: sticky;
		top:0;
		z-index: 9;
		min-height: 81rpx;
	}
	.title {
		display: flex;
		align-items: flex;
		justify-content: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #333;
		background: #fff;

		&:before {
			margin-right: 28rpx;
		}
		&:after {
			margin-left: 28rpx;
		}
		&:after,
		&:before {
			display: block;
			content: '一';
			width: 44rpx;
			height: 1px;
			color: #999;
		}
	}
}
</style>
