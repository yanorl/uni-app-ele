const domain = "https://ele-interface.herokuapp.com/api/";

const interfaces = {
	// 获取城市数据
	getCityData: domain + "posts/cities",
	// 获取分类数据
	getBanner: domain + "profile/shopping",
	// 获取商品列表数据
	getfilter: domain + 'profile/filter',
	// 商品详情信息
	getShoplists: domain + "profile/restaurants"
}
module.exports = interfaces;