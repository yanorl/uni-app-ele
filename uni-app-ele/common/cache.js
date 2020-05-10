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
				console.log('value')
				console.log(value)
				
				return value
	        // return value
	    }
	} catch (e) {
		console.log(1)
	   return null
	}
	
	
	// let load = {}
	// uni.getStorage({
	// 	key: 'orderInfo',
	// 	success: res => {
	// 		if(res.data){
	// 			load =  res.data
	// 		} else {
	// 			load =  res
	// 		}
	// 	},
	// 	fail() {
	// 		load = {}
	// 	}
	// });
	// return load
}