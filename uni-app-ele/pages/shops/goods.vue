<template>
	<view class="goods-box" v-if="shopInfo">
		<!-- 商家推荐 -->
		<scroll-view scroll-x="true" class="recommend" v-for="(recommend, index) in shopInfo.recommend" :key="index">
			<view class="recommend-name">{{ recommend.name }}</view>
			<view class="recommend-wrap">
				<ul>
					<li v-for="(item, i) in recommend.items" :key="i">
						<image :src="item.image_path" mode=""></image>
						<view class="recommend-food">
							<view class="recommend-food-name">{{ item.name }}</view>
							<view class="recommend-food-zm">月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}</view>
							<view class="recommend-food-price">
								<text>￥{{ item.activity.fixed_price }}</text>
								<view class="cart-control-wrapper"><cart-control @add="add(item, $event)" @sub="sub(item, $event)" :items="item"></cart-control></view>
							</view>
						</view>
					</li>
				</ul>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import cartControl from '../../components/cartControl/cartControl.vue';
import { cartControlMixin } from '../../common/mixins.js';

export default {
	data() {
		return {
			// goodsList: []
		};
	},
	props: {
		shopInfo: {
			type: Object,
			default: () => {}
		}
	},
	mixins: [cartControlMixin],
	computed: {},
	components: {
		cartControl
	},
	methods: {
		// add(item, count) {
		// 	this.joinCart(item, count);
		// 	// this.sum();
		// },
		// sub(item, count) {
		// 	if(count <= 0) {
		// 		// 更新storage
		// 		uni.getStorage({
		// 			key:"goodsList",
		// 			success: (res => {
		// 				let goodsList = res.data
		// 				// 本地删除选中商品
		// 				goodsList.forEach((goods, index)=>{
		// 					if(goods.food_id == item.specfoods[0].food_id){
		// 						goodsList.splice(index, 1)
		// 					}
		// 				})
		// 				uni.setStorageSync("goodsList",goodsList);
		// 			})
		// 		})
		// 	} else {
		// 		this.joinCart(item, count);
		// 	}
		// 	// this.sum();
		// },
		// joinCart(item, count) {
		// 	let parm = {'food_id': item.specfoods[0].food_id, 'food_name': item.specfoods[0].name,'food_img': item.image_path, 'foot_count': count, 'food_price':item.specfoods[0].price}
		// 	// 1.先去本地存储中取
		// 	uni.getStorage({
		// 		key:"goodsList",
		// 		success:(res => {
		// 			// 拿数据
		// 			let goodsList = res.data;
		// 			// 查找商品是否存在
		// 			let isExist = false;
		// 			goodsList.forEach(goods=>{
		// 				if(goods.food_id == parm.food_id){
		// 					// 如果存在  修改商品数量
		// 					goods.foot_count = Number(parm.foot_count)
		// 					isExist = true
		// 				}
		// 			})
		// 			if(!isExist){ // 不存在，存入数组
		// 			  goodsList.push(parm)
		// 			 }
		// 			this.setGoodsList(goodsList)
		// 		}),
		// 		fail: (err => { // 没有得到数据,那么就存
		// 			// console.log("加入失败")
		// 			let goodsList = [];
		// 			goodsList.push(parm);

		// 			// 往本地存储中存储数据
		// 			this.setGoodsList(goodsList);
		// 		})
		// 	})

		// },
		// setGoodsList(goodsList) {
		// 	// console.log("存储到本地存储中")
		// 	// 存储到本地存储中
		// 	uni.setStorage({
		// 		key: 'goodsList',
		// 		data: goodsList,
		// 		success: function() {
		// 			// uni.showToast({
		// 			// 	icon:"success",
		// 			// 	title:"添加购物车成功"
		// 			// })
		// 		}
		// 	});
		// }
	}
};
</script>

<style lang="scss">
.goods-box {
	.recommend {
		padding-top: 32rpx;
		background-color: #fff;
		height: 506rpx;
		.recommend-name {
			padding-left: 32rpx;
			color: #333;
			font-size: 32rpx;
			font-weight: 700;
			margin-bottom: 20rpx;
		}
		.recommend-wrap {
			overflow-x: scroll;
			display: flex;
			width: 100%;
			padding-bottom: 20rpx;
			ul {
				display: flex;
				padding-left: 32rpx;
				li {
					flex: none;
					width: 240rpx;
					margin-right: 20rpx;
					image {
						display: block;
						width: 240rpx;
						height: 240rpx;
						border-top-left-radius: 8rpx;
						border-top-right-radius: 8rpx;
						max-width: 100%;
					}
					.recommend-food {
						.recommend-food-name {
							color: #333;
							font-size: 24rpx;
							margin: 14rpx 0 8rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.recommend-food-zm {
							color: #999;
							font-size: 24rpx;
							margin-bottom: 14rpx;
							min-height: 40rpx;
						}
						.recommend-food-price {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding-right: 20rpx;
							position: relative;
							text {
								font-size: 28rpx;
								color: #ff5339;
							}
							.cart-control-wrapper {
								position: absolute;
								right: 0;
							}
						}
					}
				}
			}
		}
	}
}
</style>
