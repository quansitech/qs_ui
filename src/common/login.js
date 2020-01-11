import api from '../http/api';
import redis from './redis';
const qsLogin = {
  getProvider() {
    return new Promise((resolve, reject) => {
      let providerList = {};
      uni.getProvider({
        //获取服务供应商serveice:服务类型
        service: 'oauth',
        success: result => {
          providerList = result.provider.map(value => {
            let providerName = '';
            switch (value) {
              case 'weixin':
                providerName = '微信登录';
                break;
              case 'qq':
                providerName = 'QQ登录';
                break;
              case 'sinaweibo':
                providerName = '新浪微博登录';
                break;
              case 'xiaomi':
                providerName = '小米登录';
                break;
              case 'alipay':
                providerName = '支付宝登录';
                break;
              case 'baidu':
                providerName = '百度登录';
                break;
              case 'toutiao':
                providerName = '头条登录';
                break;
            }
            return {
              name: providerName,
              id: value
            };
          });
          resolve(providerList);
        },
        fail: error => {
          console.log('获取登录通道失败', error);
          reject(error);
        }
      });
    });
  },
  /**
   * @description: 获取用户信息
   * @param {provider: 服务商的名称}
   * @return:
   */
  _getUserInfo(provider) {
    return new Promise((resolve, reject) => {
      uni.getUserInfo({
        provider: provider,
        success: result => {
          let userInfo = {};
          //#ifdef MP-ALIPAY
          userInfo = {
            avatar: result.avatar,
            nickName: result.nickName
          };
          //#endif
          //#ifdef MP-WEIXIN
          userInfo = {
            avatar: result.userInfo.avatarUrl,
            nickName: result.userInfo.nickName
          };
          userInfo.hasUserInfo = true;
          //#endif
          redis.put('userInfo',JSON.stringify(userInfo));
          resolve(userInfo);
        },
        fail: error => {
          console.log('getUserInfo fail', error);
          let content = error.errMsg;
          if (~content.indexOf('uni.login')) {
            content = '请在登录页面完成登录操作';
          }
          reject(error);
        }
      });
    });
  },
  /**
   * @description: 支付宝与微信的登录
   * @param {
   * provider:服务商
   * forUser: 带昵称头像请求
   * reset： 登录成功后重新加载当前页面
   * cb: 登录成功后的回调       
   * }
   * @return:
   */

  _login(provider, forUser,reset,cb) {
    uni.login({
      provider: provider.id,
      //#ifdef MP-ALIPAY
      scopes: 'auth_user', //支付宝小程序需设置授权类型
      //#endif
      success: res => {
        console.log('login success:', res);
        // 更新保存在 store 中的登录状态
        //   context.login(provider.id);
        //   resolve(res);
        //#ifdef MP-ALIPAY
        let provider_channel_id = 1;
        forUser = true;
        //#endif
        //#ifdef MP-WEIXIN
        let provider_channel_id = 0;
        //#endif
        let data = {};
        //获取用户信息
        if(forUser){
          this._getUserInfo(provider.id)
            .then(userInfo => {
              //支付宝登录需要昵称和头像，微信登录，如果后端返回未授权（数据库没有这个用户），才需要添加昵称和头像
              // this.serverLogin({code: res.code,nickname:userInfo.nickName,avatarUrl: userInfo.avatarUrl});
              data = {
                code: res.code,
                channel_id: provider_channel_id,
                nickname: userInfo.nickName,
                avatarUrl: userInfo.avatar
              };
              this.serverLogin(data,reset,cb);
            })
        }else{
          data = { code: res.code, channel_id: provider_channel_id };
          this.serverLogin(data,reset,cb);
        }
      },
      fail: err => {
        console.log('login fail:', err);
      }
    });;
  },
  /**
   * @description:
   * @param {data: 如果已经登录则使用code即可，在数据库没有这个用户的话，添加用户名和头像}
   * @return:
   */
  //服务器登录
  serverLogin(data, reset, cb) {
    api.login
      .post(data, { 'content-type': 'application/x-www-form-urlencoded' })
      .then(res => {
        if (res.sid) {
          redis.put('userToken', res.sid);
        }
        let userInfo = {
          avatar: res.data.avatar,
          nickName: res.data.nickname
        };
        redis.put('userInfo',JSON.stringify(userInfo));
        //可能需要重置当前页面
        if (reset) {
          getCurrentPages()[getCurrentPages().length - 1].onLoad();
        }
        let cbData = {


          
          sid: res.sid,
          userInfo
        }
        if (cb) {
          cb(cbData);
        }
      })
      .catch(error => {
        if (error.statusCode === 444) {
          console.log(444);
          //TODO 未授权，需要弹窗，用户点击启动后才登录.这里还需要一个弹窗功能
          this.getProvider().then(res => {
            this._login(res, true,cb);
          })
        }
        if (error.statusCode === 401) {
          console.log('未登录：401');
          this.getProvider().then(res => {
            this._login(res);
          })
        }
        // console.log(error);
      });
  }
};
module.exports = qsLogin;
