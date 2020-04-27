<template>
	<view class="area-box" v-if="Object.keys(cityInfo).length > 0">
		<scroll-view scroll-y="true" class="area-wrap" @scroll="scroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
			<!-- 所有城市 -->
			<view class="city-wrap">
				<!-- 热门城市 -->
				<view class="hot-wrap" id="item-0">
					<view class="title">热门城市</view>
					<ul>
						<li v-for="(item, index) in cityInfo.hotCities" :key="index">
							<text>{{ item.name }}</text>
						</li>
					</ul>
				</view>
				<!-- 循环按字母排序的key -->
				<view class="city-content listGroup" v-for="(item, index) in keys" :key="index" :id="idName(index)">
					<view class="title">{{ item }}</view>
					<!-- 根据字母key展示城市名 -->
					<ul>
						<li v-for="(city, index) in cityInfo[item]" :key="index">
							<text>{{ city.name }}</text>
						</li>
					</ul>
				</view>
			</view>
		</scroll-view>

		<view class="area-keys">
			<ul @touchstart.stop="onShortcutTouchSart" @touchmove.stop="onShortcutTouchMove" id="toch">
				<li class="key" :class="{ current: currentIndex === 0 }" data-index="0" @tap="leftTap">热</li>
				<li v-for="(item, index) in keys" :key="index" :data-index="index + 1" :class="{ current: currentIndex === index + 1 }" @tap="leftTap">{{ item }}</li>
			</ul>
		</view>

		<div class="list-fixed fixed" v-show="fixedTittle" :style="{ transform: translateValue }">
			<view class="title">{{ fixedTittle }}</view>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollY: 0,
			currentIndex: -1,
			diff: -1,
			translateValue: 'translate3d(0, 0, 0)',
			titleHeight: 0,
			keyHeight: 0,
			topHeight: 0,
			touch: {},
			scrollInto: '',
			fixedTittle: '热门城市'
		};
	},
	props: {
		cityInfo: {
			type: Object,
			default: () => {}
		},
		keys: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		idName() {
			return function(index) {
				index = Number(index) + 1;
				return `item-${index}`;
			};
		}
	},
	watch: {
		cityInfo() {
			this.$nextTick(function() {
				this._calculateHeight();
			});
		},
		scrollY(newY) {
			console.log(newY);
			const listHeight = this.listHeight;
			//  当滚动到顶部， newY <= 0
			if (newY == 0) {
				this.currentIndex = 0;
				this.fixedTittle = '热门城市'
				return;
			} else if (newY < 0) {
				this.currentIndex = -1;
				this.fixedTittle = ''
				return;
			}
			//  在中间部分滚动
			for (let i = 0; i < listHeight.length; i++) {
				let height1 = listHeight[i];
				let height2 = listHeight[i + 1];
				// console.log(i)
				// console.log(newY)
				// console.log(height1)
				// console.log(height2)
				if (!height2 || (newY >= height1 && newY < height2)) {
					this.currentIndex = i;
					console.log(i)
					if(i > 0){
						this.fixedTittle = this.keys[i - 1];
					} else{
						this.fixedTittle = '热门城市'
					}
					// console.log(this.currentIndex)
					// this.diff = height2 - newY;
					return;
				}
			}
			//  当滚动到底部，且newY大于最后一个元素的上限
			// this.currentIndex = listHeight.length - 1;
		},
		diff(newVal) {
			let that = this;
			let viewFixed = uni
				.createSelectorQuery()
				.in(this)
				.select('.list-fixed');
			viewFixed
				.boundingClientRect(data => {
					// console.log(data.top);
					that.titleHeight = data.height;
				})
				.exec();

			let fixedTop = newVal > 0 && newVal < that.titleHeight ? newVal - that.titleHeight : 0;
			if (this.fixedTop === fixedTop) {
				return;
			}
			this.fixedTop = fixedTop;
			// console.log(fixedTop)
			this.translateValue = `translate3d(0, ${fixedTop}px, 0)`;
		}
	},
	created() {
		this.listHeight = 0;
	},
	mounted() {},
	methods: {
		scroll(e) {
			// console.log(e.detail.scrollTop);
			this.scrollY = e.detail.scrollTop;
			// console.log(this.scrollY)
		},
		_calculateHeight() {
			this.listHeight = [];
			let that = this;

			uni
				.createSelectorQuery()
				.in(this)
				.select('.key')
				.boundingClientRect(data => {
					console.log(data);
					that.keyHeight = data.height;
				})
				.exec();

			let viewHot = uni
				.createSelectorQuery()
				.in(this)
				.select('.hot-wrap');
			viewHot
				.boundingClientRect(data => {
					that.topHeight = data.top;
					that.listHeight.push(data.top - that.topHeight);
				})
				.exec();

			let view = uni
				.createSelectorQuery()
				.in(this)
				.selectAll('.listGroup');
			view
				.boundingClientRect(data => {
					// console.log(data);
					data.forEach(function(item) {
						that.listHeight.push(item.top - that.topHeight);
					});
				})
				.exec();

			// console.log(this.listHeight)
		},
		onShortcutTouchSart(e) {
			console.log(e);
			let anchorIndex = e.target.dataset.index;
			let firstTouch = e.touches[0];
			this.touch.y1 = firstTouch.pageY;
			this.touch.anchorIndex = anchorIndex;
			this.scrollInto = `item-${anchorIndex}`;
			console.log(this.scrollInto);
		},
		onShortcutTouchMove(e) {
			console.log(e);
			let firstTouch = e.touches[0];
			this.touch.y2 = firstTouch.pageY;

			let delta = ((this.touch.y2 - this.touch.y1) / this.keyHeight) | 0;
			console.log('delta' + delta);
			console.log(this.touch.anchorIndex);
			let anchorIndex = parseInt(this.touch.anchorIndex) + delta;

			let str = '';
			if (anchorIndex == 0) {
				str = '热门城市';
			} else {
				str = this.keys[anchorIndex - 1];
			}
			uni.showToast({
				title: str,
				icon: 'none'
			});

			this.scrollInto = `item-${anchorIndex}`;
			console.log(this.scrollInto);
			// debugger;
		},
		leftTap(e) {
				let str = ''
				let index = e.currentTarget.dataset.index;
				this.currentIndex = Number(index);
				if (this.currentIndex == 0) {
					str  = '热门城市';
				} else {
					str = this.keys[this.currentIndex - 1];
				}
				uni.showToast({
				    title: str,
						icon: 'none'
				});
				// console.log(this.currentIndex);
				this.scrollInto = `item-${index}`;
		}
	}
};
</script>

<style lang="scss">
.area-box {
	.title {
		padding: 10rpx 4%;
		width: 92%;
		color: #aaa;
	}
	.area-wrap {
		height: calc(100vh - 240rpx);

		.city-wrap {
			.hot-wrap {
				border-bottom: 1px solid #e8e8e8;

				ul {
					display: flex;
					flex-wrap: wrap;
					background-color: #ffffff;
					li {
						text-align: center;
						width: calc(100vw / 3);
						text {
							background: #eeeeee;
							display: block;
							margin: 20rpx;
							padding: 20rpx;
							border-radius: 10rpx;
						}
					}
				}
			}

			ul {
				li {
					text {
						padding: 20rpx 40rpx;
						border-bottom: 1px solid #eee;
						background: #fff;
						display: block;
					}
				}
			}
		}
	}

	.area-keys {
		position: fixed;
		right: 0;
		top: 25%;
		color: #ffffff;
		font-size: 12px;
		line-height: 1.5;
		text-align: center;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		padding: 20rpx 10rpx;
		z-index: 1;
		ul {
			li {
				&.current {
					color: #ffcd32;
				}
			}
		}
	}

	.list-fixed {
		position: absolute;
		width: 100%;
		height: 60rpx;
		top: 240rpx;
		.title {
			background-color: #f1f1f1;
		}
	}
}
</style>
