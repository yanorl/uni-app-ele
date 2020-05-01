<template>
  <view class="rst-activity">
    <view class="activity-txt">
      <text :style="{background: '#'+ activities[0].icon_color}">{{activities[0].icon_name}}</text>
      <text>{{activities[0].description}}</text>
    </view>
    <view class="activity-count" @tap="showSheet = true">
      <text>{{activities.length}}个优惠</text>
      <i class="fa fa-caret-down"></i>
    </view>
    <!-- 优惠弹窗 -->
    <transition name="fade">
      <view class="act-model" v-show="showSheet">
        <view class="activity-sheet">
          <i @tap="showSheet=false" class="fa fa-times-circle"></i>
          <h2>优惠活动</h2>
          <ul>
            <li v-for="(item,index) in activities" :key="index">
              <text :style="{background: '#'+ item.icon_color}">{{item.icon_name}}</text>
              <text>{{item.description}}</text>
            </li>
          </ul>
        </view>
      </view>
    </transition>
  </view>
</template>

<script>
export default {
  name: "Activity",
  data() {
    return {
      showSheet: false
    };
  },
  props: {
    activities: {
			type: Array,
			default: () => []
		}
  }
};
</script>

<style lang="scss">
.rst-activity {
  display: flex;
  color: #333;
  margin: 10rpx auto 0;
  align-items: center;
  font-size: 24rpx;
  width: 600rpx;
	.activity-txt {
	  flex: 1;
	  overflow: hidden;
		text:first-child {
		  color: #fff;
		  line-height: 40rpx;
		  font-size: 24rpx;
		  padding: 4rpx 9rpx;
		  margin-right: 10rpx;
		  display: inline-block;
		  box-sizing: border-box;
		  border-radius: 4rpx;
		}
	}
	
	.activity-count {
	  width: 120rpx;
	  flex-shrink: 0;
	  padding-right: 22rpx;
	  text-align: right;
	  color: #999;
		text {
		  margin-right: 8rpx;
		}
	}
}

.act-model {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
	.activity-sheet {
	  position: absolute;
	  background-color: #f5f5f5;
	  box-shadow: 0 -2rpx 10rpx 0 rgba(0, 0, 0, 0.4);
	  bottom: 0;
	  left: 0;
	  right: 0;
	  z-index: 100;
	  padding: 40rpx;
	  box-sizing: border-box;
		h2 {
		  text-align: center;
		  font-size: 32rpx;
		  font-weight: 600;
		  margin-bottom: 30rpx;
		}
		i {
		  position: absolute;
		  font-size: 40rpx;
		  right: 20rpx;
		  top: 20rpx;
		  z-index: 1002;
		  color: #888;
		}
		ul {
		  // height: 50.8vw;
		  // overflow-y: scroll;
			li {
			  margin-bottom: 20rpx;
			  display: flex;
			  font-size: 28rpx;
			  align-items: center;
				text:first-child {
				  height: 40rpx;
				  padding: 0 12rpx;
				  margin-right: 10rpx;
				  display: inline-block;
				  box-sizing: border-box;
				  border-radius: 4rpx;
				  color: #fff;
				  white-space: nowrap;
				}
				text:last-child {
				  line-height: 1.38;
				  flex: 1;
					font-size: 26rpx;
				}
			}
		}
	}
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
