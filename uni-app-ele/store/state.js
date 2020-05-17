import {
	loadOrderInfo,
	loadEleLogin
} from '../common/cache.js'

const state = {
	city: '定位',
	locationAddr: '',
	address: {},
	orderInfo: loadOrderInfo(),
	ele_login: loadEleLogin(),
	userInfo: null,
	remarkInfo: {
		tableware: '',
		remark: ''
	}
}
export default state
