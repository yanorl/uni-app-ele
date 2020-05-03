import * as types from './mutation-types.js'

const mutations = {
	[types.SET_CITY] (state, city) {
		state.city = city
	},
	
	[types.SET_LOCATIONADDR] (state, locationAddr) {
		state.locationAddr = locationAddr
	},
	
	[types.SET_WATCHOPTION] (state, watchOption) {
		state.watchOption = watchOption
	}
}



export default mutations