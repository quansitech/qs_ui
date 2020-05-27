import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hasLogin: false,
    v_userInfo: null,
    loginProvider: '',//登录是哪个服务商
    imgCropperObj: null,
    canvasWrap: null
  },
  mutations: { //必须同步执行，如果有异步调用可用actions
    vuex_login(state,userInfo) {
      state.hasLogin = true;
      state.v_userInfo = userInfo;
    },
    getCanvasWrap(state,wrap) {
      state.canvasWrap = wrap;
    },
    getProvider(state,provider){
      state.loginProvider = provider;
    },
    logout(state) {
      state.hasLogin = false;
      state.openid = null;
    },
    imgCropper(state,imgObj) {
      state.imgCropperObj = imgObj;
    }
  },
  // getters: {
  //   currentColor(state) {
  //     return state.colorList[state.colorIndex];
  //   }
  // },
  actions: {
    // lazy loading openid
    getUserOpenId: async function({ commit, state }) {//actions的参数接受一个与 store 实例具有相同方法和属性的 context 对象，并非store实例本身
      return await new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid);
        } else {
          uni.login({
            success: data => {
              commit('vuex_login');
              setTimeout(function() {
                //模拟异步请求服务器获取 openid
                const openid = '123456789';
                console.log('uni.request mock openid[' + openid + ']');
                commit('setOpenid', openid);
                resolve(openid);
              }, 1000);
            },
            fail: err => {
              console.log(
                'uni.login 接口调用失败，将无法正常使用开放接口等服务',
                err
              );
              reject(err);
            }
          });
        }
      });
    }
  }
});

export default store;
