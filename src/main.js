import Vue from 'vue'
import App from './App'
import base from './common/base'
import api from './http/api'

Vue.config.productionTip = false
Vue.prototype.base = base;
Vue.prototype.api = api;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
