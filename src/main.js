import Vue from "vue";
import App from "./App";
import store from './store'
import base from "@/common/base";
import redis from "@/common/redis";
import http from "@/http/http";

const $qs = {
	base,
	redis,
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	http
};

Vue.config.productionTip = false;
Vue.prototype.$qs = $qs;
App.mpType = "app";

const app = new Vue({
	store,
	...App
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from "@/http/interceptor.js";
Vue.use(httpInterceptor, app);
// http接口API抽离，免于写url或者一些固定的参数
import httpApi from "@/http/api.js";
Vue.use(httpApi, app);
// login登录接口
import login from "@/common/login.js";
Vue.use(login, app);

app.$mount();
