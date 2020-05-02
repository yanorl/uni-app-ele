export const cartControlMixin = {
	methods: {
		add(item, count) {
			this.joinCart(item, count);
			// this.sum();
		},
		sub(item, count) {
			if (count <= 0) {
				// 更新storage
				uni.getStorage({
					key: "goodsList",
					success: (res => {
						let goodsList = res.data
						// 本地删除选中商品
						goodsList.forEach((goods, index) => {
							if (goods.food_id == item.specfoods[0].food_id) {
								goodsList.splice(index, 1)
							}
						})
						uni.setStorageSync("goodsList", goodsList);
					})
				})
			} else {
				this.joinCart(item, count);
			}
			// this.sum();
		},
		joinCart(item, count) {
			let parm = {
				'food_id': item.specfoods[0].food_id,
				'food_name': item.specfoods[0].name,
				'food_img': item.image_path,
				'foot_count': count,
				'food_price': item.specfoods[0].price
			}
			// 1.先去本地存储中取
			uni.getStorage({
				key: "goodsList",
				success: (res => {
					// 拿数据
					let goodsList = res.data;
					// 查找商品是否存在
					let isExist = false;
					goodsList.forEach(goods => {
						if (goods.food_id == parm.food_id) {
							// 如果存在  修改商品数量
							goods.foot_count = Number(parm.foot_count)
							isExist = true
						}
					})
					if (!isExist) { // 不存在，存入数组
						goodsList.push(parm)
					}
					this.setGoodsList(goodsList)
				}),
				fail: (err => { // 没有得到数据,那么就存
					// console.log("加入失败")
					let goodsList = [];
					goodsList.push(parm);

					// 往本地存储中存储数据
					this.setGoodsList(goodsList);
				})
			})

		},
		setGoodsList(goodsList) {
			// console.log("存储到本地存储中")
			// 存储到本地存储中
			uni.setStorage({
				key: 'goodsList',
				data: goodsList,
				success: function() {
					// uni.showToast({
					// 	icon:"success",
					// 	title:"添加购物车成功"
					// })
				}
			});
		}
	}
}
