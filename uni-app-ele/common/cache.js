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