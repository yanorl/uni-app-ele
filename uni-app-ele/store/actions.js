import * as types from './mutation-types'
import {
	saveOrderInfo
} from '../common/cache.js'

export const setOrderInfo = function({
	commit
}, orderInfo) {
	commit(types.SET_ORDER_INFO, saveOrderInfo(orderInfo))
}

export const setUserInfo = function({
		commit
	}, userInfo) {
		commit(types.SET_USER_INFO, userInfo);
	}
