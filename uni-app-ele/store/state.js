import { loadOrderInfo  } from '../common/cache.js'
// console.log('state')
// console.log(loadOrderInfo())
const state = {
	city: '定位',
	locationAddr: '',
	address: {},
	orderInfo: loadOrderInfo(),
	userInfo: null,
	remarkInfo: {
		tableware: '',
		remark: ''
	}
}
export default state
