export function saveOrderInfo(orderInfo) {
	
	try {
	    uni.setStorageSync('orderInfo', orderInfo);
			return orderInfo
	} catch (e) {
	   return null
	}

}

export function loadOrderInfo() { 
	try {
	    const value = uni.getStorageSync('orderInfo');
	    if (value) {
				return value
	    }
	} catch (e) {
	   return null
	}

}

export function saveEleLogin(ele_login) {
	
	try {
	    uni.setStorageSync('ele_login', ele_login);
			return ele_login
	} catch (e) {
	   return null
	}
}

export function loadEleLogin() { 
	try {
	    const value = uni.getStorageSync('ele_login');
	    if (value) {
				return value
	    }
	} catch (e) {
	   return null
	}

}