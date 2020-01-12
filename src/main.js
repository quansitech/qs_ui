import Vue from 'vue'
import App from './App'
import store from './store'
import './static/styles/var.less'
import base from './common/base'
import api from './http/api'
Vue.config.productionTip = false
import modal from './components/modal/modal.vue'
Vue.component('modal',modal)
Vue.prototype.base = base;
Vue.prototype.api = api;
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
