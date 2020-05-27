// 这里的vm，就是vue文件里面的this，能在这里获取vuex的变量，比如存放在里面的token
const install = (Vue, vm) => {
	// 请求拦截，配置Token等参数
	Vue.prototype.$qs.http.interceptor.request = (config) => {
		//可用vuex,app.globalData,本地存储这些方式来获取token
        const userToken = uni.getStorageSync('userToken');
        if(userToken){
            config.header.Authorization = userToken;
        }
		
		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$qs.http.interceptor.response = (res,showModal) => {
		if(res.statusCode === 200 && res.data.status === 1) {
			return res.data;  
		} else {
			if(showModal){
				uni.showModal({
					title: '提示',
					content: res.data.info,
					showCancel: false
				})
			}
			return false;
		}
	}
}

export default {
	install
}