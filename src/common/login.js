const install = (Vue, vm) => {
  const qsLogin = {
    getProvider() {
      return new Promise((resolve, reject) => {
        let providerList = {};
        uni.getProvider({
          //获取服务供应商serveice:服务类型
          service: 'oauth',
          success: (result) => {
            providerList = result.provider.map((value) => {
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
                id: value,
              };
            });
            resolve(providerList);
          },
          fail: (error) => {
            console.log('获取登录通道失败', error);
            reject(error);
          },
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
          //#ifdef MP-WEIXIN
          withCredentials: true,
          //#endif
          success: (result) => {
            let userInfo = {};
            //#ifdef MP-ALIPAY
            userInfo = {
              avatar: result.avatar,
              nickName: result.nickName,
            };
            //#endif
            //#ifdef MP-WEIXIN
            userInfo = {
              avatar: result.userInfo.avatarUrl,
              nickName: result.userInfo.nickName,
              encryptedData: result.encryptedData,
              signature: result.signature,
              iv: result.iv,
            };
            userInfo.avatar = userInfo.avatar.replace(/132$/, '0');
            userInfo.hasUserInfo = true;
            //#endif
            vm.$qs.redis.put('userInfo', JSON.stringify(userInfo));
            //防止用户昵称无法被json.parse解析,
            vm.$qs.redis.put('nickName', JSON.stringify(userInfo.nickName));
            resolve(userInfo);
          },
          fail: (error) => {
            console.log('getUserInfo fail', error);
            reject(error);
          },
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

    _login(provider, reset = false) {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: provider.id,
          //#ifdef MP-ALIPAY
          scopes: 'auth_user', //支付宝小程序需设置授权类型
          //#endif
          success: (res) => {
            //#ifdef MP-ALIPAY
            let provider_channel_id = 1;
            //#endif
            //#ifdef MP-WEIXIN
            let provider_channel_id = 0;
            //#endif
            let data = {};
            //获取用户信息
            this._getUserInfo(provider.id)
              .then((userInfo) => {
                data = {
                  code: res.code,
                  encryptedData: userInfo.encryptedData,
                  iv: userInfo.iv,
                };

                this.serverLogin(data,reset).then(res => {
                  resolve(res);
                }).catch(err => {
                  reject(err);
                })

              })
              .catch((err) => {
                reject(err);
              });
          },
          fail: (err) => {
            console.log('login fail:', err);
          },
        });
      });
    },
    /**
     * @description:
     * @param {data: 如果已经登录则使用code即可，在数据库没有这个用户的话，添加用户名和头像}
     * @return:
     */
    //服务器登录
    serverLogin(data, reset) {
      return new Promise((resolve, reject) => {
        vm.$qs.api.login
          .post(data)
          .then((res) => {
            if (res.sid) {
              vm.$qs.redis.put('userToken', res.sid);
            }
            let userInfo = {
              avatar: res.data.avatar,
              nickName: res.data.nickname,
            };
            vm.$qs.redis.put('userInfo', JSON.stringify(userInfo));
            //可能需要重置当前页面
            if (reset) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad();
            }
            resolve(res);
          })
          .catch((error) => {
            if (error.statusCode === 401 || error.statusCode === 500) {
              console.log(error.data.info);
              reject(error);
            }
          });
      });
    },
  };
  Vue.prototype.$qs.login = qsLogin;
};
export default {
  install,
};
