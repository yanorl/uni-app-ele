<template>
	<view class="comment-box" v-if="evaluation">
		<!-- 商家评分 -->
		<view class="rating-wraps">
			<view class="rating-info">
				<h4>{{ evaluation.rating.shop_score.toFixed(1) }}</h4>
				<view class="shop-score">
					<text>商家评分</text>
					<rating :rating="evaluation.rating.shop_score" />
				</view>
			</view>
			<view class="other-score">
				<view class="tp-score">
					<view class="tp-score-item">
						<text>味道</text>
						<view class="tag">{{ evaluation.rating.taste_score.toFixed(1) }}</view>
					</view>
					<view class="tp-score-item">
						<text>包装</text>
						<view class="tag">{{ evaluation.rating.package_score.toFixed(1) }}</view>
					</view>
				</view>
				<view class="rider-score">
					<text>配送</text>
					<view class="tag">{{ evaluation.rating.rider_score.toFixed(1) }}</view>
				</view>
			</view>
		</view>

		<!-- 评论区 -->
		<view class="shop-info">
			<!-- 标签 -->
			<ul class="tags">
				<li :class="{ unsatisfied: item.unsatisfied }" v-for="(item, index) in evaluation.tags" :key="index">
					{{ item.name }}
					<text v-if="item.count > 0">{{ item.count }}</text>
				</li>
			</ul>

			<!-- 内容 -->
			<ul class="comments-wrap">
				<li v-for="(item, index) in evaluation.comments" :key="index">
					<view class="comment-user"><image :src="item.avatar || 'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'" alt /></view>
					<view class="comments-info">
						<view class="comment-name">
							<h4>{{ item.username }}</h4>
							<text>{{ item.rated_at }}</text>
						</view>
						<view class="comment-rating">
							<rating :rating="item.rating" />
							<text :style="{ color: ratingcontent(item.rating).color }">{{ ratingcontent(item.rating).txt }}</text>
						</view>
						<view class="comment-text">{{ item.comment_text }}</view>
						<view class="comment-reply">{{ item.reply.content }}</view>
						<ul class="comment-imgs">
							<li v-for="(img, i) in item.order_images" :key="i" @tap="showBigImg(img.image_hash, item.order_images)"><image :src="img.image_hash" alt /></li>
						</ul>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
import rating from '../../components/rating/rating.vue';
import interfaces from '../../utils/interfaces.js';

export default {
	data() {
		return {
			evaluation: null
		};
	},
	created() {
		this.getData();
	},
	methods: {
		getData() {
			this.request({
				url: interfaces.comments,
				success: res => {
					this.evaluation = res;
				}
			});
		},
		ratingcontent(rating) {
			const content = [
				{ txt: '吐槽', color: 'rgb(137,159,188)' },
				{ txt: '较差', color: 'rgb(137, 159, 188)' },
				{ txt: '一般', color: 'rgb(251, 154, 11)' },
				{ txt: '满意', color: 'rgb(251, 154, 11)' },
				{ txt: '超赞', color: 'rgb(255, 96, 0)' }
			];
			return content[rating - 1];
		},
		showBigImg(image, images) {
			
			let urlArray = []
			
			images.forEach((item) => {
				urlArray.push(item.image_hash)
			})
			
			uni.previewImage({
				current: image,
				urls: urlArray
			});
		}
	},
	components: {
		rating
	}
};
</script>

<style lang="scss">
.comment-box {
	height: 100vh;
	.rating-wraps {
		display: flex;
		margin-bottom: 16rpx;
		padding: 40rpx;
		background-color: #fff;
		.rating-info {
			display: flex;
			justify-content: space-between;
			width: 260rpx;
			align-items: center;
			color: #666;
			h4 {
				align-items: center;
				font-size: 70rpx;
				color: #ff6000;
			}
			.shop-score {
				align-items: flex-start;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
		.other-score {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			.tp-score {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				flex: 1;
				padding: 0 7.2vw;
				align-items: center;
				.tp-score-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					text {
						font-size: 24rpx;
						margin-bottom: 10rpx;
					}
				}
			}
		}
		.tag {
			font-size: 32rpx;
		}
		.rider-score {
			width: 150rpx;
			border-left: 1px solid #ddd;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	.shop-info {
		background-color: #fff;
		padding: 20rpx 30rpx 0;
		font-size: 24rpx;
		.tags {
			padding-bottom: 20rpx;
			border-bottom: 1px solid #eee;
			li {
				color: #6d7885;
				background-color: #ebf5ff;
				display: inline-block;
				padding: 0 20rpx;
				height: 50rpx;
				line-height: 50rpx;
				margin: 10rpx;
				font-size: 24rpx;
				border-radius: 4rpx;
				&.unsatisfied {
					color: #aaa !important;
					background-color: #f5f5f5 !important;
				}
			}
		}
		.comments-wrap {
			> li {
				padding: 30rpx 0 30rpx;
				border-bottom: 1px solid #eee;
				display: flex;
				.comment-user {
					width: 60rpx;
					margin-right: 20rpx;
					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}
				.comments-info {
					flex: 1;
					font-size: 28rpx;
					.comment-name {
						display: flex;
						align-items: center;
						justify-content: space-between;
						h4 {
							margin-top: 0;
							color: #333;
							margin-right: 10rpx;
						}
						text {
							font-size: 24rpx;
							color: #999;
						}
					}
					.comment-rating {
						display: flex;
						margin: 10rpx 0 4rpx;
						align-items: center;
						text {
							font-size: 24rpx;
							margin-left: 8rpx;
						}
					}
					.comment-text {
						color: #333;
						word-break: break-word;
						margin: 16rpx 0;
					}
					.comment-reply {
						margin: 20rpx 0;
						padding: 20rpx;
						border-radius: 8rpx;
						background: #f3f3f3;
						position: relative;
						font-size: 24rpx;
						&:after {
							content: ' ';
							position: absolute;
							bottom: 100%;
							left: 16rpx;
							width: 0;
							height: 0;
							border-style: solid;
							border-width: 0 16rpx 16rpx;
							border-color: transparent transparent #f3f3f3;
						}
					}
					.comment-imgs {
						margin-top: 8rpx;
						margin-bottom: 24rpx;
						display: flex;
						li {
							display: inline-block;
							margin: 0 4rpx;
							image {
								width: 300rpx;
								height: 300rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>
