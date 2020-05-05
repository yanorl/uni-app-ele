const domain = "https://ele-interface.herokuapp.com/api/";

const interfaces = {
	// 获取城市数据
	getCityData: domain + "posts/cities",
	// 获取banner数据
	getBanner: domain + "profile/shopping",
	// 获取商家列表筛选数据
	getfilter: domain + 'profile/filter',
	// 商家列表详情信息
	getShoplists: domain + "profile/restaurants",
	//商家详情信息
	getShops: domain + 'profile/batch_shop',
	
	sms_back: domain + 'posts/sms_back',
	
	sms_send: domain + 'posts/sms_send'
}
module.exports = interfaces;