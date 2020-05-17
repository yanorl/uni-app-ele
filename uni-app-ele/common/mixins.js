import {
	mapGetters,
	mapMutations
} from 'vuex';


export const isLoginMixin = {
		computed: {
			...mapGetters(['ele_login'])
		},
		methods:{
			isLogin(tabBar = false) {
				if(!this.ele_login || !this.ele_login.userId) {
					if(tabBar){
						uni.navigateTo({
							url: '../../login/login'
						})
					} else {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				}
			}
		}
}



// export const cartControlMixin = {
// 	computed: {
// 		...mapGetters(['watchOption'])
// 	},
// 	methods: {
// 		...mapMutations({
// 			setWatchOption: 'SET_WATCHOPTION'
// 		}),
// 		add(item, count) {
// 			this.joinCart(item, count);
			
// 		},
// 		sub(item, count) {
// 			let that = this
// 			if (count <= 0) {
// 				// 更新storage
// 				uni.getStorage({
// 					key: "goodsList",
// 					success: (res => {
// 						let goodsList = res.data
// 						// 本地删除选中商品
// 						goodsList.forEach((goods, index) => {
// 							if (goods.food_id == item.food_id) {
// 								goodsList.splice(index, 1)
// 							}
// 						})
// 						that.setGoodsList(goodsList)
// 						// uni.setStorageSync("goodsList", goodsList);
// 						// that.setWatchOption(!that.watchOption)
// 					})
// 				})
// 			} else {
// 				this.joinCart(item, count);
// 			}
// 		},
// 		joinCart(item, count) {
// 			let parm = {
// 				// 'selected': item.selected,
// 				'food_id': item.food_id,
// 				'food_name': item.food_name,
// 				'food_image': item.food_image,
// 				'food_count': count,
// 				'food_price': item.food_price
// 			}
// 			// 1.先去本地存储中取
// 			uni.getStorage({
// 				key: "goodsList",
// 				success: (res => {
// 					// 拿数据
// 					let goodsList = res.data;
// 					// 查找商品是否存在
// 					let isExist = false;
// 					goodsList.forEach(goods => {
						
// 						if (goods.food_id == parm.food_id) {
// 							// console.log(parm)
// 							// goods.selected = parm.selected
// 							// 如果存在  修改商品数量
// 							goods.food_count = Number(parm.food_count)
// 							isExist = true
// 						}
// 					})
// 					if (!isExist) { // 不存在，存入数组
// 						goodsList.push(parm)
// 					}
// 					this.setGoodsList(goodsList)
// 				}),
// 				fail: (err => { // 没有得到数据,那么就存
// 					// console.log("加入失败")
// 					let goodsList = [];
// 					goodsList.push(parm);

// 					// 往本地存储中存储数据
// 					this.setGoodsList(goodsList);
// 				})
// 			})

// 		},
// 		setGoodsList(goodsList) {
// 			// console.log("存储到本地存储中")
// 			console.log(goodsList)
// 			// 存储到本地存储中
// 			let that = this
// 			uni.setStorage({
// 				key: 'goodsList',
// 				data: goodsList,
// 				success: function() {
// 					console.log(that.goodsList)
// 					that.setWatchOption(!that.watchOption)
// 					if(that.cartSum) {
// 						that.sum();
// 					}
// 				}
// 			});
// 		}
// 	}
// }
