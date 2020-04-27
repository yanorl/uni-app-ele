const domain = "https://ele-interface.herokuapp.com/api/";

const interfaces = {
	// 获取城市数据
	getCityData: domain + "posts/cities",
	// 获取分类数据
	getCategory: domain + "api/profiles/category",
	// 获取商品列表数据
	getGoodsList: domain + 'api/profiles/goodslist',
	// 商品详情信息
	getGoods: domain + "api/profiles/goods"
}
module.exports = interfaces;