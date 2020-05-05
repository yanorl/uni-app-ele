import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import http from './utils/https.js'

Vue.prototype.request = http
Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync(key);
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		  store
})
app.$mount()
