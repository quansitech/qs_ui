import Vue from 'vue'
import App from './App'
import store from './store'
// import './static/styles/var.less'
import base from './common/base'
import api from './http/api'
Vue.config.productionTip = false
import saveImage from './components/save-image/save-image.vue'
// Vue.component('painter',painter)
Vue.component('saveImage',saveImage)
// Vue.component('bottomTab',bottomTab)
// Vue.component('modal',modal)
Vue.prototype.base = base;
Vue.prototype.api = api;
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
