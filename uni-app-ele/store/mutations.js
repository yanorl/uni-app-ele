import * as types from './mutation-types.js'

const mutations = {
	[types.SET_CITY](state, city) {
		state.city = city
	},

	[types.SET_LOCATIONADDR](state, locationAddr) {
		state.locationAddr = locationAddr
	},

	[types.SET_ADDRESS](state, address) {
		state.address = address
	},

	[types.SET_WATCHOPTION](state, watchOption) {
		state.watchOption = watchOption
	},

	[types.SET_ORDER_INFO](state, orderInfo) {
		state.orderInfo = orderInfo
	},

	[types.SET_REMARK_INFO](state, remarkInfo) {
		state.remarkInfo = remarkInfo
	},

	[types.SET_USER_INFO](state, userInfo) {
		state.userInfo = userInfo
	}
}



export default mutations
