<template>
	<view class="myAddress-wrap">
		<view class="myAddress-box">
			<!-- 显示收货地址 -->
			<view class="myAddress-content">
				<view class="address-list" v-for="(address, index) in allAddress" :key="index">
					<view class="address-list-select"><i class="fa fa-check-circle" v-if="selectIndex == index"></i></view>
					<view class="address-list-content" @tap="setAddressInfo(address, index)">
						<view class="address-list-title">
							<text class="username">{{ address.name }}</text>
							<text v-if="address.sex" class="gender">{{ address.sex }}</text>
							<text class="tag" v-if="address.tag">{{ address.tag }}</text>
						</view>
						<view class="address-list-address">
							<text class="address-text">{{ address.address }}</text>
						</view>
						<view class="phone">{{address.bottom}}</view>
						<view class="phone">
							<i class="fa fa-phone" aria-hidden="true"></i>
							({{ address.phone }})
						</view>
					</view>
					<view class="address-list-edit">
						<view><i @tap="handleEdit(address)" class="fa fa-edit"></i></view>
						<view><i @tap="handleDelete(address, index)" class="fa fa-close"></i></view>
					</view>
				</view>
			</view>
			<!-- 新增收货地址 -->
			<view class="address-view-bottom" @tap="addAddress">
				<i class="fa fa-plus-circle"></i>
				<text>新增收货地址</text>
			</view>
		</view>
	</view>
</template>

<script>
import interfaces from '../../utils/interfaces.js';
import { mapMutations } from 'vuex';

export default {
	data() {
		return {
			allAddress: [],
			selectIndex: 0,
			userId: ''
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		...mapMutations({
			setUserInfo: 'SET_USER_INFO'
		}),
		initData() {
			try {
				const value = uni.getStorageSync('ele_login');
				this.userId = value.userId;
				if (value) {
					this.request({
						url: interfaces.getUserAddress + '/' + this.userId,
						success: res => {
							this.allAddress = res.myAddress;
						}
					});
				}
			} catch (e) {
				console.log(e);
			}
		},
		setAddressInfo(address, index) {
			this.selectIndex = index;
			// 将address对象存储到vuex
			this.setUserInfo(address);
			uni.navigateTo({
				url: '../orders/orders'
			});
		},
		handleDelete(address, index) {
			this.request({
				url: interfaces.deletAddress + '/' + this.userId + '/' + address._id,
				method: 'delete',
				success: res => {
					this.allAddress.splice(index, 1);
				}
			});
		},
		addAddress() {
			let detail = {
				title: '添加地址',
				addressInfo: {
					name: '',
					sex: '',
					phone: '',
					bottom: '',
					address: '',
					tag: ''
				}
			};
			uni.navigateTo({
				url: '../addAddress/addAddress?params=' + encodeURIComponent(JSON.stringify(detail))
			});
		},
		handleEdit(address) {
			let detail = {
				title: '编辑地址',
				addressInfo: address
			};
			uni.navigateTo({
				url: '../addAddress/addAddress?params=' + encodeURIComponent(JSON.stringify(detail))
			});
		}
	}
};
</script>

<style lang="scss">
.myAddress-wrap {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	.myAddress-box {
		.myAddress-content {
			height: 100%;
			overflow-y: auto;
			padding-bottom: 104rpx;
			.address-list {
				background-color: #fff;
				padding: 20rpx;
				border-bottom: 1px solid #ddd;
				display: flex;
				min-height: 140rpx;
				.address-list-select {
					flex-basis: 56rpx;
					min-width: 56rpx;
					display: flex;
					align-items: center;
					i {
						font-size: 48rpx;
						color: #4cd964;
					}
				}
				.address-list-content {
					flex: 1;
					overflow: hidden;
					.phone {
						font-size: 28rpx;
						color: #666;
						i {
							margin-right: 10rpx;
						}
					}
					.address-list-title {
						font-size: 32rpx;
						color: #666;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-bottom: 8rpx;
						.username {
							color: #333;
							font-weight: 700;
						}
						.gender {
							padding: 0 12rpx 0 6rpx;
							font-size: 24rpx;
						}
						.tag {
							display: inline-block;
							position: relative;
							margin-left: 6rpx;
							padding: 4rpx;
							color: #ff5722;
							white-space: nowrap;
							border: 1px solid #ff5722;
							border-radius: 2rpx;
							font-size: 24rpx !important;
							line-height: 20rpx;
							border-radius: 4rpx;
						}
					}
					.address-list-address {
						color: #666;
						font-size: 28rpx;
						display: flex;
						align-items: center;
					}
				}
				.address-list-edit {
					flex-basis: 100rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					flex-direction: column;
					i {
						color: #aaa;
						font-size: 40rpx;
					}
				}
			}
		}
		.address-view-bottom {
			position: fixed;
			height: 104rpx;
			bottom: 0;
			width: 100%;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid #ddd;
			color: #3190e8;
			font-size: 32rpx;
			i {
				font-size: 40rpx;
				margin-right: 16rpx;
			}
		}
	}
}
</style>
