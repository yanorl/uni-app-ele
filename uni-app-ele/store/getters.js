export const city = state => state.city

export const locationAddr = state => state.locationAddr

export const address = state => state.address

export const orderInfo = state => state.orderInfo

export const totalPrice = state => {
	let price = 0;
	if (state.orderInfo) {
		const selectFoods = state.orderInfo.selectFoods;
		selectFoods.forEach(food => {
			price += food.food_price * food.food_count;
		});
		price += state.orderInfo.shopInfo.float_delivery_fee;
	}
	return price;
}

export const userInfo = state => state.userInfo

export const remarkInfo = state => state.remarkInfo
