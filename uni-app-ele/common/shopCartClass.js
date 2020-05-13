export default class shopCartClass{
	constructor({food_id, food_name, food_image, food_count, food_price, month_sales, satisfy_rate, description}) {
	    this.food_id = food_id
			this.food_name = food_name
			this.food_image = food_image
			this.food_count = food_count
			this.food_price = food_price
			this.month_sales = month_sales // 月售
			this.satisfy_rate = satisfy_rate // 好评率
			this.description = description
	}
}