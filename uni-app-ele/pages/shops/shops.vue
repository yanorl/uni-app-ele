<template>
	<view class="page-section" v-if="shopInfo">
		<!-- 状态栏 -->
		<page-status></page-status>
		<view class="shops-box">
			<shopsHeader />
			<!-- <scroll-view class="shops-wrap" scroll-y="true" @scroll="scroll"> -->
			<view class="shops-wrap">
				<!-- 头部 -->
				<view class="header-nav">
					<view class="header-bg"><image :src="shopInfo.rst.scheme" mode=""></image></view>
					<view class="shop-img"><image :src="shopInfo.rst.image_path" mode=""></image></view>
				</view>

				<!-- 商家信息 -->
				<view class="shop-des">
					<view class="shop-des-name" @tap="showInfoModel = true">
						<text>{{ shopInfo.rst.name }}</text>
						<i class="fa fa-caret-right"></i>
					</view>
					<!-- 弹窗信息 -->
					<infoModel @close="showInfoModel = false" :rst="shopInfo.rst" :showInfoModel="showInfoModel" />

					<!-- 评分月售 -->
					<view class="shop-des-order">
						<text>评分{{ shopInfo.rst.rating }}</text>
						<text>月售{{ shopInfo.rst.recent_order_num }}单</text>
						<text>蜂鸟专送约{{ shopInfo.rst.order_lead_time }}分钟</text>
					</view>
					<!-- 优惠信息 -->
					<activity :activities="shopInfo.rst.activities" />
					<!-- 公告 -->
					<view class="shop-des-promotion">公告: {{ shopInfo.rst.promotion_info }}</view>
				</view>

				<!-- 导航 -->
				<view class="tab-nav">
					<ul>
						<li :class="{ active: currentIndex == index }" v-for="(item, index) in tabNav" @tap="clickNav(index)" :key="index">
							<text>{{ item.name }}</text>
						</li>
					</ul>
				</view>

				<!-- tab-content -->
				<view class="tab-content">
					<view class="tab-item" v-show="currentIndex == 0">
						<goods :shopInfo="shopInfo"></goods>
						<goods :shopInfo="shopInfo"></goods>
						<goods :shopInfo="shopInfo"></goods>
						<goods :shopInfo="shopInfo"></goods>
						<goods :shopInfo="shopInfo"></goods>
						<goods :shopInfo="shopInfo"></goods>
					</view>

					<view class="tab-item" v-show="currentIndex == 1">dd</view>

					<view class="tab-item" v-show="currentIndex == 2">aaa</view>
				</view>
				<!-- </scroll-view> -->
			</view>
		</view>
	</view>
</template>

<script>
import pageStatus from '../../components/status/status.vue';
import shopsHeader from './shopsHeader.vue';
import infoModel from './infoModel.vue';
import activity from './activity.vue';
import goods from './goods.vue';
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			shopInfo: null,
			showInfoModel: false,
			tabNav: [{ name: '点餐' }, { name: '评价' }, { name: '商家' }],
			currentIndex: 0
		};
	},
	onLoad(option) {
		// console.log(option)
		if (!option.name) {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
			return;
		}
		this.initData();
	},
	components: {
		pageStatus,
		shopsHeader,
		infoModel,
		activity,
		goods
	},
	methods: {
		initData() {
			this.request({
				url: interfaces.getShops,
				success: res => {
					console.log(res);
					this.shopInfo = res;
				}
			});
		},
		clickNav(index) {
			this.currentIndex = index;
		},
		scroll() {}
	}
};
</script>

<style lang="scss">
.shops-box {
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
	height: 100%;

	.shops-wrap {
		.header-nav {
			position: relative;
			.header-bg {
				width: 100%;
				height: 200rpx;
				image {
					width: 100%;
					height: 200rpx;
				}
			}
			.shop-img {
				position: absolute;
				top: 0;
				left: 50%;
				margin-left: -75rpx;
				margin-top: 82rpx;
				image {
					width: 150rpx;
					height: 150rpx;
					border-radius: 6rpx;
				}
			}
		}

		.shop-des {
			padding: 60rpx 0 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #fff;
			.shop-des-name {
				flex: 1;
				width: 500rpx;
				font-size: 44rpx;
				font-weight: 700;
				white-space: nowrap;
				padding-right: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 12rpx 0;
				text {
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			.shop-des-order {
				white-space: nowrap;
				height: 40rpx;
				margin-top: 10rpx;
				color: #666;
				text-align: center;
				font-size: 24rpx;
				text {
					margin: 0 6rpx;
				}
			}
			.shop-des-promotion {
				width: 600rpx;
				font-size: 24rpx;
				color: #999;
				overflow: hidden;
				text-overflow: ellipsis;
				margin: 16rpx auto 20rpx;
				padding: 0;
				white-space: nowrap;
			}
		}

		.tab-nav {
			position: sticky;
			top: 0px;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
						/*  #endif  */
			z-index: 10;
			ul {
				display: flex;
				width: 100%;
				line-height: 10.666667vw;
				border-bottom: 1px solid #e4e4e4;
				background: #fff;

				li {
					flex: 1;
					text-align: center;
					font-size: 0.95rem;
					text-decoration: none;
					color: #666;
					position: relative;
					&.active {
						color: #333;
						font-weight: 700;
					}
				}
			}
		}
	}
}
</style>
