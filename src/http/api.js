import site from './site'
const URL = site.baseUrl;
const METHOD = ["get", "post", "put", "delete"];
const install = (Vue, vm) => {
	let requestAll = (url) => {
		let obj = {};
		url = URL + '/Api/' + url;
		METHOD.forEach(item => {
			obj[item] = (params = {}) => vm.$qs[item](url,params);
		})
		return obj;
	}
	let colorList = requestAll('ColorList');
	let banner = requestAll('IndexBanner');
	let login = requestAll('Login');
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$qs.api = { colorList,banner,login};
}

export default {
	install
}