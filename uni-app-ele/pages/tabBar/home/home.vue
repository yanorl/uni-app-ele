<template>
	<view class="home-box">
		<!-- 自定义导航 -->
		<pageHeader />
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
		<view class="page-section shop-box">
			<view class="title">推荐商家</view>

			<!-- 导航 -->
			<view class="filter-section"></view>

			<!-- 商家信息列表 -->
			<view class="shop-list-section"><shop-lists v-for="(item, index) in shopList" :key="index" :shopList="item.restaurant"></shop-lists></view>
		</view>
	</view>
</template>

<script>
import pageHeader from '../../../components/pageheader/pageHeader.vue';
import shopLists from '../../../components/shopLists/shopLists.vue';
import interfaces from '../../../utils/interfaces.js';

export default {
	data() {
		return {
			swipeImgs: [],
			entries: [],
			shopList: [],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			circular: true,
			page: 1,
			size: 5,
			allLoaded: false
		};
	},
	onLoad() {
		this.initData();
		this.shopLists();
	},
	components: {
		pageHeader,
		shopLists
	},
	onReachBottom() {
		if (!this.allLoaded) {
			this.page++;
			this.shopLists();
		}
	},
	methods: {
		initData() {
			this.request({
				url: interfaces.getBanner,
				success: res => {
					// console.log(res);
					this.swipeImgs = res.swipeImgs;
					this.entries = res.entries;
				}
			});
		},
		shopLists() {
			this.allLoaded = false;

			this.request({
				url: interfaces.getShoplists + '/' + this.page + '/' + this.size,
				// url: interfaces.getShoplists,
				data: {
					page: this.page,
					size: this.size
				},
				method: 'POST',
				success: res => {
					console.log(res);
					// this.shopList = res;
					if (res.length >= this.size) {
						res.forEach(item => {
							this.shopList.push(item);
						})
					} else {
						this.allLoaded = true;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
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
				font-size: 12px;
			}
		}
	}
}

/* 推荐商家 */
.shop-box {
	.title {
		display: flex;
		align-items: flex;
		justify-content: center;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 16px;
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
