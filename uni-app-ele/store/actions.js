import * as types from './mutation-types'
import {
	saveOrderInfo, saveEleLogin
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


export const setEleLogin = function({commit}, ele_login) {
	commit(types.SET_ELE_LOGIN, saveEleLogin(ele_login))
}
