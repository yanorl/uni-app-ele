<template>
	<view class="list_box">
		<!-- 菜单左边 -->
		<view class="left">
			<scroll-view scroll-y="true" class="scrollHeight">
				<view class="item" v-for="(item, index) in goodList" :key="index" :class="{ active: index == leftIndex }" :data-index="index" @tap="leftTap" @touchstart="touchStart">
					<image v-if="item.icon_url" :src="item.icon_url" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
		<view class="main">
			<scroll-view class="scrollHeight" scroll-y="true" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
				<block v-for="(item, index) in goodList" :key="index">
					<view class="food-item" :id="'item-' + index">
						<!-- title -->
						<view class="foot-item-title">
							<text class="foot-item-name">{{ item.name }}</text>
							<text class="foot-descript">{{ item.description }}</text>
						</view>
						<!-- content -->
						<view class="foot-item-list" v-for="(food, i) in item.foods" :key="i">
							<image :src="food.food_image" mode=""></image>
							<view class="food-item-list-info">
								<text class="foot-name">{{ food.food_name }}</text>
								<view class="food-item-list-des">{{ food.description }}</view>
								<view class="food-item-list-sales">月售{{ food.month_sales }}份 好评率{{ food.satisfy_rate }}</view>
								<view class="food-item-list-price">
									<text class="price">¥{{ food.food_price }}</text>
									<view class="cart-control-wrapper"><cart-control @add="add(food, $event)" @sub="sub(food, $event)" :items="food"></cart-control></view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import cartControl from '../../components/cartControl/cartControl.vue';
import {cartControlMixin} from '../../common/mixins.js';

export default {
	data() {
		return {
			mainArray: [],
			topArr: [],
			leftIndex: 0,
			isMainScroll: false,
			scrollInto: '',
			mainScrollInit: 0,
			tipsTop: '0px'
		};
	},
	props: {
		goodList: {
			type: Array,
			default: () => []
		}
	},
	mixins: [cartControlMixin],
	created() {
	},
	computed: {},
	mounted() {
		let that = this;
		that.$nextTick(() => {
			uni
				.createSelectorQuery()
				.in(this)
				.select('#item-0')
				.boundingClientRect(data => {
					that.mainScrollInit = data.top;
				})
				.exec();

			that.goodList.forEach(function(item) {
				that.mainArray.push(item.foods);
			});

			that.getElementTop();
		});
	},
	components: {
		cartControl
	},
	methods: {
		//获取距离顶部的高度
		getScrollTop(selector) {
			let that = this;
			return new Promise((resolve, reject) => {
				let query = uni.createSelectorQuery().in(this);
				query
					.select(selector + '')
					.boundingClientRect(data => {
						resolve(data.top - that.mainScrollInit);
					})
					.exec();
			});
		},
		/* 获取元素顶部信息 */
		async getElementTop() {
			// console.log(this.mainArray);
			/* Promise 对象数组 */
			let p_arr = [];

			/* 遍历数据，创建相应的 Promise 数组数据 */
			for (let i = 0; i < this.mainArray.length; i++) {
				const resu = await this.getScrollTop(`#item-${i}`);
				p_arr.push(resu);
			}

			// console.log('p_arr', p_arr)

			/* 主区域滚动容器的顶部距离 */
			this.getScrollTop('#scroll-el').then(res => {
				/* 所有节点信息返回后调用该方法 */
				Promise.all(p_arr).then(data => {
					// console.log('滚动', data);
					this.tipsTop = `${data}px`;
					this.topArr = data;
				});
			});
		},

		/* 主区域滚动监听 */
		mainScroll(e) {
			if (!this.isMainScroll) {
				return;
			}
			let top = e.detail.scrollTop;
			let index = -1;

			if (top >= this.topArr[this.topArr.length - 1]) {
				index = this.topArr.length - 1;
			} else {
				index = this.topArr.findIndex((item, index) => {
					return this.topArr[index + 1] >= top;
				});
			}
			this.leftIndex = index < 0 ? 0 : index;
			// console.log(top);
			// console.log(this.leftIndex);
		},
		/* 主区域触摸 */
		mainTouch() {
			this.isMainScroll = true;
		},
		/* 左侧导航点击 */
		leftTap(e) {
			let index = e.currentTarget.dataset.index;
			this.isMainScroll = false;
			this.leftIndex = Number(index);
			this.scrollInto = `item-${index}`;
		},
		touchStart(e) {
			// console.log(e);
		}
	}
};
</script>

<style lang="scss">
.scrollHeight {
	height: calc(100vh - 82rpx - 96rpx);  //82 tabNav高度， 96购物车高度
	/*  #ifdef  APP-PLUS  */
	height: calc(100vh - var(--status-bar-height) - 82rpx - 96rpx);
	/*  #endif  */
}
.list_box {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	font-size: 28rpx;
	margin-top: 20rpx;

	.left {
		width: 150rpx;
		background-color: #f8f8f8;
		box-sizing: border-box;
		font-size: 24rpx;

		.item {
			padding: 36rpx 16rpx;
			position: relative;
			display: flex;
			align-items: center;
			color: #333;
			image {
				width: 26rpx;
				height: 26rpx;
				margin-right: 6rpx;
			}

			&:not(:first-child) {
				margin-top: 1px;

				&:after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 120rpx;
					position: absolute;
					bottom: -1px;
					left: 50%;
					transform: translate(-50%, 0) scaleY(0.5);
					/* 1px像素 */
				}
			}
			&.active:after {
				display: none;
			}
			&.active,
			&:active {
				color: #333;
				background-color: #fff;
			}
		}
	}

	.main {
		background-color: #fff;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;

		.foot-item-title {
			display: flex;
			align-items: center;
			padding: 16rpx 20rpx;
			font-size: 24rpx;
			color: #93999f;
			background: #f3f5f7;
			border-left: 4rpx solid #d9dde1;

			.foot-item-name {
				font-weight: bold;
				margin-right: 10rpx;
			}
			.foot-descript {
				color: #999;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				flex: 1;
			}
		}

		.foot-item-list {
			padding: 20rpx;
			display: flex;
			min-height: 230rpx;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);

			image {
				width: 190rpx;
				height: 190rpx;
				margin-right: 20rpx;
				border-radius: 8rpx;
			}
			.food-item-list-info {
				flex: 1;
				.food-name {
					padding-right: 30rpx;
					font-weight: 700;
					overflow: hidden;
					font-size: 28rpx;
					white-space: nowrap;
					width: 300rpx;
					text-overflow: ellipsis;
					color: #333;
				}
				.food-item-list-des {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 320rpx;
				}
				.food-item-list-sales {
					margin: 14rpx 0 !important;
					color: #999;
					font-size: 24rpx;
					line-height: 1;
				}
				.food-item-list-price {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 28rpx;
					.price {
						font-size: 28rpx;
						line-height: 32rpx;
						color: #ff5339;
						padding-bottom: 8rpx;
						display: flex;
						align-items: baseline;
					}
				}
			}
		}

		.goods {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 10rpx;

			& > image {
				width: 120rpx;
				height: 120rpx;
				margin-right: 16rpx;
			}

			.describe {
				font-size: 24rpx;
				color: #999;
			}

			.money {
				font-size: 24rpx;
				color: #efba21;
			}
		}
	}
}
</style>
