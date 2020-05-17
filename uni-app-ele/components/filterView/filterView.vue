<template>
	<view class="filter-view" @touchmove.stop.prevent="moveHandle" :class="{ fixedFilter: filterTop }">
		<view :class="{ open: isSort || isScreen }" @tap="hideView"></view>
		<!--导航 -->
		<view class="filter-wrap" v-if="filterData">
			<view class="filter-content">
				<view class="nav" v-for="(item, index) in filterData.navTab" :key="index" :class="{ 'filter-bold': currentFilter == index }" @tap="filterSort(index)">
					<text>{{ item.name }}</text>
					<i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
				</view>
			</view>
		</view>

		<!-- 排序 -->
		<view class="filter-extend sort-by" v-if="isSort">
			<ul>
				<li class="filter-extend-item" v-for="(item, index) in filterData.sortBy" :key="index" @tap="selectSort(item, index)">
					<text :class="{ selectName: currentSort == index }">{{ item.name }}</text>
					<i v-show="currentSort == index" class="fa fa-check"></i>
				</li>
			</ul>
		</view>

		<!-- 筛选 -->
		<scroll-view  scroll-y="true" class="filter-extend screen-by" v-if="isScreen">
			<view class="screen-by-content">
				<view class="more-filter" v-for="(list, index) in filterData.screenBy" :key="index">
					<view class="title">{{ list.title }}</view>
					<ul>
						<li v-for="(item, i) in list.data" :key="i" :class="{ selected: item.select }" @tap="selectScreen(item, list)">
							<image v-if="item.icon" :src="item.icon" mode=""></image>
							<text>{{ item.name }}</text>
						</li>
					</ul>
				</view>
			</view>
			<view class="more-filter-btn">
				<text class="more-filter-clear" :class="{ edit: edit }" @tap="clearFilter">清空</text>
				<text class="more-filter-ok" @tap="filterOk">确定</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentFilter: 0,
			currentSort: 0,
			isSort: false,
			isScreen: false,
			filterTop: false
		};
	},
	props: {
		filterData: {
			type: Object,
			default: () => {}
		}
	},
	computed: {
		edit() {
			let edit = false;
			if(this.filterData.screenBy){
				this.filterData.screenBy.forEach(screen => {
					screen.data.forEach(item => {
						if (item.select) {
							edit = true;
						}
					});
				});
				return edit;
			}
		}
	},
	components: {},
	methods: {
		filterSort(index) {
			this.currentFilter = index;
			switch (index) {
				case 0:
					this.filterTop = true;
					this.isSort = true;
					this.isScreen = false;
					break;
				case 1:
					this.$emit('update', {
						condition: this.filterData.navTab[1].condition
					});
					this.hideView();
					break;
				case 2:
					this.$emit('update', {
						condition: this.filterData.navTab[2].condition
					});
					this.hideView();
					break;
				case 3:
					this.filterTop = true;
					this.isScreen = true;
					this.isSort = false;
					break;
				default:
					this.hideView();
					break;
			}
		},
		selectSort(item, index) {
			this.currentSort = index;
			this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
			this.hideView();

			// 更新数据
			this.$emit('update', { condition: item.code });
		},
		hideView() {
			// if(!this.filterBoolean) {
				this.filterTop = false;
			// }
			this.isSort = false;
			this.isScreen = false;
		},
		selectScreen(item, list) {
			if (list.id !== 'MPI') {
				// 单选
				list.data.forEach(ele => {
					ele.select = false;
				});
			}
			item.select = !item.select;
			console.log(item.select);
		},
		clearFilter() {
			this.filterData.screenBy.forEach(screen => {
				screen.data.forEach(item => {
					item.select = false;
				});
			});
		},
		filterOk() {
			let screenData = {
				MPI: '',
				offer: '',
				per: ''
			};
			let mpiStr = [];
			this.filterData.screenBy.forEach(screen => {
				screen.data.forEach((item, index) => {
					if (item.select) {
						// 两种情况 1.多选 2.单选
						if (screen.id !== 'MPI') {
							// 单选
							screenData[screen.id] = item.code;
						} else {
							// 多选 fengniao,pinpai
							mpiStr.push(item.code);
						}
					}
				});
				screenData[screen.id] = mpiStr.join();
			});
			// console.log(mpiStr.join());
			this.$emit('update', { condition: screenData });
			this.hideView();
		},
		moveHandle() {}
	}
};
</script>

<style lang="scss">
.filter-view {
	.filter-wrap {
		background: #fff;
		position: relative;
		z-index: 9;
		.filter-content {
			position: relative;
			border-bottom: 1px solid #ddd;
			line-height: 80rpx;
			z-index: 101;
			height: 80rpx;
			display: flex;
			justify-content: space-around;
			.nav {
				flex: 1;
				text-align: center;
				color: #666;
				font-size: 28rpx;
				&.filter-bold {
					font-weight: 600;
					color: #333;
				}
				i {
					display: inline-block;
					width: 12px;
					height: 6rpx;
					margin-left: 10rpx;
					margin-bottom: 4rpx;
					fill: #333;
					will-change: transform;
				}
			}
		}
	}

	.filter-extend {
		background-color: #fff;
		color: #333;
		padding-top: 16rpx;
		// position: absolute;
		width: 100%;
		z-index: 4;
		position: relative;
		// left: 0;
		// top: 24.533333vw;
		// display: none;

		li {
			position: relative;
			padding-left: 40rpx;
			line-height: 80rpx;
			overflow: hidden;
			.fa-check {
				float: right;
				color: #009eef;
				margin-right: 28rpx;
				line-height: 80rpx;
			}
			.selectName {
				color: #009eef;
			}
		}
	}

	.screen-by {
		height: calc(100vh - var(--window-bottom) - 200rpx - 100rpx);
		/*  #ifdef  APP-PLUS  */
		height: calc(100vh - var(--window-bottom) - var(--status-bar-height) - 200rpx - 100rpx);
		/*  #endif  */
		
		.screen-by-content {
			background: #fff;
			padding: 0 20rpx;
			line-height: normal;
			.more-filter {
				margin: 20rpx 0;
				overflow: hidden;
				.title {
					margin-bottom: 16rpx;
					color: #666;
					font-size: 28rpx;
				}
				ul {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					font-size: 24rpx;
					li {
						box-sizing: border-box;
						width: 30%;
						height: 70rpx;
						line-height: 70rpx;
						margin: 6rpx 1%;
						background: #fafafa;
						image {
							width: 26rpx;
							height: 26rpx;
							vertical-align: middle;
							margin-right: 6rpx;
						}

						text {
							margin-left: 2%;
							vertical-align: middle;
						}
					}
				}
			}
		}
		.more-filter-btn {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: #fafafa;
			box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
			line-height: 11.466667vw;
			box-sizing: border-box;
			text {
				font-size: 24rpx;
				text-align: center;
				text-decoration: none;
				flex: 1;
			}
			.more-filter-clear {
				color: #ddd;
				background: #fff;
			}
			.more-filter-ok {
				color: #fff;
				background: #00d762;
				border: 0.133333vw solid #00d762;
			}
		}
	}
}

.fixedFilter {
	position: fixed;
	width: 100%;
	z-index: 9;
	top: 100rpx;
	/*  #ifdef  APP-PLUS  */
	top: calc(100rpx + var(--status-bar-height));
	/*  #endif  */
}
.selected {
	color: #3190e8 !important;
	background-color: #edf5ff !important;
}
.edit {
	color: #333 !important;
}
.open {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: all 0.3s ease-in-out;
	z-index: 3;
}
</style>
