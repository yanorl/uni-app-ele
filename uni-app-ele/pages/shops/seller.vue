<template>
  <view class="seller-box" v-if="sellerInfo">
    <view class="seller-wrap">
      <image :src="sellerInfo.header_image" alt>
      <h3>{{sellerInfo.title}}</h3>
      <text>{{sellerInfo.brand_intros[0].brief}}</text>
      <view class="destil">查看品牌故事</view>
    </view>
  </view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
export default {
  data() {
    return {
      sellerInfo: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.request({
      	url: interfaces.seller,
      	success: res => {
					 this.sellerInfo = res;
      	}
      });
    }
  }
};
</script>

<style lang="scss">
.seller-box {
	.seller-wrap{
		margin-bottom: 20rpx;
		padding: 30rpx;
		font-size: 28rpx;
		background-color: #fff;
		color: #666;
		border-bottom: 1px solid #eee;
		image{
			width: 690rpx;
			height: 384rpx;
			margin-bottom: 30rpx;
		}
		h3{
			color: #333;
			font-weight: 700;
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}
		text{
			height: 80rpx;
			line-height: 1.4;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.destil{
			margin: 30rpx 0 -30rpx;
			text-align: center;
			font-size: 24rpx;
			padding: 30rpx 0;
		}
	}
}
</style>
