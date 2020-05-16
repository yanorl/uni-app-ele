<template>
	<view class="page-section" v-if="shopInfo">
		<!-- 状态栏 -->
		<view v-show="showStatus"><page-status></page-status></view>
		<view class="shops-box">
			<shopsHeader />
			<!-- <scroll-view class="shops-wrap" scroll-y="true" @scroll="scroll"> -->
			<view class="shops-wrap">
				<!-- 头部 -->
				<view class="header-nav">
					<view class="header-bg"><image :src="shopInfo.scheme" mode=""></image></view>
					<view class="shop-img"><image :src="shopInfo.image_path" mode=""></image></view>
				</view>

				<!-- 商家信息 -->
				<view class="shop-des">
					<view class="shop-des-name" @tap="showInfoModel = true">
						<text>{{ shopInfo.name }}</text>
						<i class="fa fa-caret-right"></i>
					</view>
					<!-- 弹窗信息 -->
					<infoModel @close="showInfoModel = false" :rst="shopInfo" :showInfoModel="showInfoModel" />

					<!-- 评分月售 -->
					<view class="shop-des-order">
						<text>评分{{ shopInfo.rating }}</text>
						<text>月售{{ shopInfo.recent_order_num }}单</text>
						<text>蜂鸟专送约{{ shopInfo.order_lead_time }}分钟</text>
					</view>
					<!-- 优惠信息 -->
					<activity :activities="shopInfo.activities" />
					<!-- 公告 -->
					<view class="shop-des-promotion">公告: {{ shopInfo.promotion_info }}</view>
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
						<!-- 推荐商品 -->
						<goods :recommend="recommend.recommend" @handleFood="handleFood" @add="add" @sub="sub"></goods>
						<!-- 商品列表左右联动 -->
						<goods-lists :goodList="goodList.menu" @handleFood="handleFood" @add="add" @sub="sub"></goods-lists>

						<!-- 购物车 -->
						<view class="shop-cart-wrap"><shop-cart :shopInfo="shopInfo" :cartSlectList="cartSlectList" @add="addAllList" @sub="subAllList" @empty="empty"></shop-cart></view>
					</view>

					<view class="tab-item" v-show="currentIndex == 1"><comments></comments></view>

					<view class="tab-item" v-show="currentIndex == 2"><seller></seller></view>
				</view>

				<!--  -->
				<!-- </scroll-view> -->
			</view>
		</view>
		<!-- 商品详情 -->
		<food-view :food="selectedFood" :isShow="showFood" @close="showFood = false"  @add="add" @sub="sub"></food-view>
	</view>
</template>

<script>
import pageStatus from '../../components/status/status.vue';
import shopsHeader from './shopsHeader.vue';
import infoModel from './infoModel.vue';
import activity from './activity.vue';
import goods from './goods.vue';
import goodsLists from './goodsLists.vue';
import shopCart from './shopCart.vue';
import seller from './seller.vue';
import comments from './comments.vue';
import foodView from './food.vue';
import interfaces from '../../utils/interfaces.js';
import shopCartClass from '../../common/shopCartClass.js';

export default {
	data() {
		return {
			shopInfo: null,
			showInfoModel: false,
			tabNav: [{ name: '点餐' }, { name: '评价' }, { name: '商家' }],
			currentIndex: 0,
			scrollTop: 0,
			statusBarHeight: 0,
			showStatus: false,
			recommend: {},
			goodList: {},
			cartSlectList: [],
			selectedFood: null,
			showFood: false
		};
	},
	onLoad(option) {
		// console.log(option)
		if (!option.shop_id) {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
			return;
		}
		this.initData();
	},
	watch: {
		// #ifdef APP-PLUS
		scrollTop(newValue) {
			if (newValue >= this.statusBarHeight) {
				this.showStatus = true;
			} else {
				this.showStatus = false;
			}
		}
		// #endif
	},
	mounted() {
		// #ifdef APP-PLUS
		let that = this;
		that.$nextTick(function() {
			that.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		});
		// #endif
	},
	components: {
		pageStatus,
		shopsHeader,
		infoModel,
		activity,
		goods,
		goodsLists,
		shopCart,
		seller,
		comments,
		foodView
	},
	onPageScroll(e) {
		// #ifdef APP-PLUS
		this.scrollTop = e.scrollTop;
		// #endif
	},
	onPullDownRefresh() {
		setTimeout(() => {
			this.initData();
			uni.stopPullDownRefresh();
		}, 1000);
	},
	methods: {
		upCountData() {
			let that = this;
			uni.getStorage({
				key: 'goodsList',
				success: res => {
					res.data.forEach(function(item) {
						that.getCartStorage(item);
					});
					this.cartSlectList = res.data;
				},
				fail() {}
			});
		},
		getCartStorage(list) {
			this.goodList.menu.map(item => {
				return item.foods.map(v => {
					if (v.food_id === list.food_id) {
						return (v.food_count = list.food_count);
					}
				});
			});

			this.recommend.recommend[0].items.map(v => {
				if (v.food_id === list.food_id) {
					return (v.food_count = list.food_count);
				}
			});
		},
		handleFood(food) {
			// console.log(food)
			this.selectedFood = food;
			this.showFood = true;
		},
		initData() {
			this.request({
				url: interfaces.getShops,
				success: res => {
					this.shopInfo = res.rst;
					this.recommend = this._normalizeRecommend(res.recommend);
					this.goodList = this._normalizeMenu(res.menu);
					this.upCountData();
				}
			});
		},
		_normalizeRecommend(list) {
			let that = this;
			let map = {
				recommend: []
			};
			list.forEach(res => {
				let recomItem = [];
				res.items.forEach(item => {
					recomItem.push(that.newClass(item));
				});
				map.recommend.push({
					name: res.name,
					items: recomItem
				});
			});
			return map;
		},
		_normalizeMenu(list) {
			let that = this;
			let map = {
				menu: []
			};

			list.forEach(res => {
				let foodsItem = [];
				res.foods.forEach(item => {
					foodsItem.push(that.newClass(item));
				});
				map.menu.push({
					icon_url: res.icon_url,
					name: res.name,
					description: res.description,
					foods: foodsItem
				});
			});
			return map;
		},
		newClass(item) {
			return new shopCartClass({
				food_id: item.specfoods[0].food_id,
				food_name: item.specfoods[0].name,
				food_image: item.image_path,
				food_count: 0,
				food_price: item.specfoods[0].price,
				month_sales: item.month_sales,
				satisfy_rate: item.satisfy_rate,
				description: item.description
			});
		},
		clickNav(index) {
			this.currentIndex = index;
		},
		add(id) {
			this.addAllList(id);
		},
		sub(id) {
			this.subAllList(id);
		},
		addAllList(id) {
			this.goodList.menu.map(item => {
				return item.foods.map(v => {
					if (v.food_id === id) {
						return v.food_count++;
					}
				});
			});

			this.recommend.recommend[0].items.map(v => {
				if (v.food_id === id) {
					return v.food_count++;
				}
			});

			this.setAllList();
		},
		subAllList(id) {
			this.goodList.menu.map(item => {
				return item.foods.map(v => {
					if (v.food_id === id) {
						return v.food_count--;
					}
				});
			});

			this.recommend.recommend[0].items.map(v => {
				if (v.food_id === id) {
					return v.food_count--;
				}
			});
			this.setAllList();
		},
		setAllList() {
			let arr = [];
			this.goodList.menu.forEach(item => {
				item.foods.forEach(list => {
					if (list.food_count > 0) {
						arr.push(list);
					}
				});
			});
			this.recommend.recommend[0].items.forEach(item => {
				if (item.food_count > 0) {
					arr.push(item);
				}
			});
			this.cartSlectList = this.uniq(arr);
			this.setCartStorage(this.cartSlectList);
		},
		uniq(arr) {
			//数组对象去重
			let obj = {};
			return arr.reduce((cur, next) => {
				obj[next.food_id] ? '' : (obj[next.food_id] = true && cur.push(next));
				return cur;
			}, []); //设置cur默认类型为数组，并且初始值为空的数组
		},
		setCartStorage(goodsList) {
			// 存储到本地存储中
			uni.setStorage({
				key: 'goodsList',
				data: goodsList,
				success: function(res) {}
			});
		},
		empty() {
			let that = this;
			uni.removeStorage({
				key: 'goodsList',
				success: function(res) {
					that.cartSlectList = [];
					that.goodList.menu.map(item => {
						return item.foods.map(v => {
							return v.food_count = 0;
						});
					});

					that.recommend.recommend[0].items.map(v => {
						return v.food_count = 0;
					});
				}
			});
		},
		scroll() {}
	}
};
</script>

<style lang="scss">
// .showStatus{
// 	/*  #ifdef  APP-PLUS  */
// 	margin-top: var(--status-bar-height);
// 	/*  #endif  */
// }
.shops-box {
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
					&.active:after {
						content: '';
						height: 4rpx;
						background: #2395ff;
						width: 100rpx;
						position: absolute;
						bottom: -1px;
						left: 50%;
						transform: translate(-50%, 0);
					}
				}
			}
		}
	}
}
.shop-cart-wrap {
	width: 100%;
	height: 96rpx;
}
</style>
