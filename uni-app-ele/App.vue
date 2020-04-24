<script>
import { key } from './common/config.js';
import amapFile from 'common/amap-wx.js';
import { mapMutations } from 'vuex';

export default {
	onLaunch: function() {
		// #ifdef MP
		this.appWeiXing();
		// #endif

		// #ifdef H5
		this.apph5();
		// #endif
		
		// #ifdef APP-PLUS
		this.appMap();
		// #endif
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapMutations({
			setCity: 'SET_CITY',
			setLocationAddr: 'SET_LOCATIONADDR'
		}),
		appMap() {
			this.setCity('广州');
			this.setLocationAddr('App 没有申请高德地图的api! 因此没有定位功能');
		},
		appWeiXing() {
			var that = this;
			var amapIfle = new amapFile.AMapWX({ key });
			amapIfle.getRegeo({
				success: function(data) {
					//成功回调
					console.log(data);

					var regeocodeData = data[0].regeocodeData;
					that.setCity(regeocodeData.addressComponent.city);
					that.setLocationAddr(regeocodeData.formatted_address);
					// that.city = regeocodeData.addressComponent.city;
					// that.address = regeocodeData.formatted_address;
				},
				fail: function(info) {
					//失败回调
					console.log(info);
				}
			});
		},
		apph5() {
			const self = this;
			
			var script = document.createElement('script');
			console.log(key);
			script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=mapInit`;
			document.body.appendChild(script);

			window.mapInit = function() {
				AMap.plugin('AMap.Geolocation', function() {
					var geolocation = new AMap.Geolocation({
						// 是否使用高精度定位，默认：true
						enableHighAccuracy: true,
						// 设置定位超时时间，默认：无穷大
						timeout: 10000
					});

					geolocation.getCurrentPosition();
					AMap.event.addListener(geolocation, 'complete', onComplete);
					AMap.event.addListener(geolocation, 'error', onError);

					function onComplete(data) {
						// data是具体的定位信息  精准定位
						console.log(data);
						
						self.setCity(data.addressComponent.city);
						self.setLocationAddr(data.formattedAddress);
					}

					function onError(data) {
						// 定位出错    非精准定位
						self.getLngLatLocation();
					}
				});
			};
		},
		getLngLatLocation() {
			const self = this;
			AMap.plugin('AMap.CitySearch', function() {
				var citySearch = new AMap.CitySearch();
				citySearch.getLocalCity(function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						// 查询成功，result即为当前所在城市信息
						// console.log(result);
						AMap.plugin('AMap.Geocoder', function() {
							var geocoder = new AMap.Geocoder({
								// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
								city: result.adcode
							});

							var lnglat = result.rectangle.split(';')[0].split(',');

							geocoder.getAddress(lnglat, function(status, data) {
								if (status === 'complete' && data.info === 'OK') {
									// result为对应的地理位置详细信息
									console.log(result);
									
									self.setCity(result.city);
									self.setLocationAddr(data.regeocode.formattedAddress);
									
								}
							});
						});
					}
				});
			});
		}
	}
};
</script>

<style>
/*每个页面公共css */
@import url('/static/fonts/font-awesome.css');
@import url('/static/iconfont/iconfont.css');

page {
	position: relative;
	background-color: #f1f1f1;
}
</style>
