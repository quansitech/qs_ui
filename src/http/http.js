//开发者可通过setConfig函数配置config，例如token,请求头之类的
class Request {
  static isHttp(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }
  constructor() {
    this.config = {
      baseUrl: '',
      header: {
        'X-Requested-With': 'xmlhttprequest'
      },
      method: 'POST',
      dataType: 'json',
      // 此参数5+和支付宝小程序不支持，默认为text即可
			responseType: 'text',
			showLoading: true, // 是否显示请求中的loading
			loadingText: '请求中...',
			loadingTime: 1000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
			timer: null, // 定时器
      loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      notShowModalUrlList: ['Login']//不显示错误信息弹框的url名单
    },
    //拦截器
    this.interceptor = {
      request: null,
      response: null
    },
    //请求外部接口时，baseUrl就派不上了，可以调用下面的方法来进行请求，默认项目调用的接口代码在./api.js
    this.get = (url,data={},header={}) => {
      return this.request({url,data,method: 'GET',header})
    },
    this.post = (url,data={},header={'content-type': 'application/x-www-form-urlencoded'}) => {
      return this.request({url,data,method: 'POST',header})
    },
    this.put = (url,data={},header={'content-type': 'application/x-www-form-urlencoded'}) => {
      return this.request({url,data,method: 'PUT',header})
    },
    this.delete = (url,data={},header={}) => {
      return this.request({url,data,method: 'DELETE',header})
    }
  }

  // 设置默认配置
	setConfig(customConfig) {
		this.config = Object.assign(this.config, customConfig);
  }
  // 该url是否显示弹窗
  filterUrl(url) {
    return this.config.notShowModalUrlList.every(item => {
      url.indexOf(item) < 0
    })
  }

  async request(options = {}) {
    //请求前拦截
    if(this.interceptor.request  && typeof this.interceptor.request === 'function'){
      let interceptorRequest = this.interceptor.request(options);
      if(!interceptorRequest){
        return false;
      }
      options = interceptorRequest;
    }
    //配置的属性，方法，具体参考文档https://uniapp.dcloud.io/api/request/request?id=request
    options.dataType = options.dataType || this.config.dataType;
    options.responseType = options.responseType || this.config.responseType;
    options.url = options.url || '';
		options.params = options.params || {};
		options.header = Object.assign(this.config.header, options.header);
		options.method = options.method || this.config.method;
    return new Promise((resolve,reject) => {
      options.complete = (res) => {
        uni.hideLoading();
        clearTimeout(this.timer);
        //请求后拦截
        const showModal = this.filterUrl(options.url);
        if(this.interceptor.response && typeof this.interceptor.response  === 'function'){
          let interceptorRequest = this.interceptor.response(res,showModal);
          if(interceptorRequest){
            resolve(res.data);
          }else{
            reject(res);
          }
        }else{
          resolve(res);
        }
      }

      //判断地址是否写全，可用baseurl+options.url的方式，也可以用options.url作为url的方式。一般没有用到http之类的就可以视作为：需要加上baseurl
      options.url = Request.isHttp(options.url) ? options.url : (this.config.baseUrl + (options.url.indexOf('/Api/') == 0 ?
				options.url : '/Api/' + options.url));

      if(this.showLoading && !this.config.timer){
        this.config.timer = setTimeout(() => {
          uni.showLoading({
            title: this.config.loadingText,
            mask: this.config.loadingMask
          })
          this.config.timer = null;
        }, this.config.loadingTime);
      }
      uni.request(options);
    })
  }

}

export default new Request;
