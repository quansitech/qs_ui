/*
 * @Description: In User Settings Edit
 * @Author: sai
 * @Date: 2019-07-22 10:06:09
 * @LastEditTime : 2019-12-27 19:11:57
 * @LastEditors  : Please set LastEditors
 */
const app = getApp();
const DEVICE = uni.getSystemInfoSync();
const DEVICEWIDTH = DEVICE.windowWidth;
const DEVICEHEIGHT = DEVICE.windowHeight;
import redis from './redis';
// import dpi from './dpi';
import api from '../http/api';
import store from '../store/index';
const URL = redis.get('apiUrl');
const isLog = true;
const base = {
  /**
   * [isXXX 基础方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isUndefined(item) {
    return typeof item === 'undefined';
  },
  isDefined(item) {
    return !base.isUndefined(item);
  },
  isString(item) {
    return typeof item === 'string';
  },
  isNumber(item) {
    return typeof item === 'number';
  },
  isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]';
  },
  isObject(item) {
    return item && typeof item === 'object' && !base.isArray(item);
  },
  isFunction(item) {
    return typeof item === 'function';
  },

  /**
   * [功能方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isPhone(str) {
    return /^1\d{10}$/.test(str);
  },

  /**
   * [公共方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  hasOwn(obj, type) {
    return Object.prototype.hasOwnProperty.call(obj, type);
  },

  /**
   * [getXXX 增强方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  getString(item, defaultStr) {
    if (base.isString(item)) return item.trim();
    if (base.isNumber(item)) return `${item}`.trim();
    return defaultStr || '';
  },
  /**
   * 深拷贝对象，但对undefind和function无效。
   * @param {obj}} 源对象
   */
  jsonClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * [
   *   getNumber(0),
   *   getNumber(-0),
   *   getNumber('0'),
   *   getNumber('-0'),
   *   getNumber(123),
   *   getNumber(-12),
   *   getNumber(1/0),
   *   getNumber(-1/0),
   *   getNumber(''),
   *   getNumber('a'),
   *   getNumber(true),
   *   getNumber(false),
   *   getNumber([]),
   *   getNumber({}),
   *   getNumber(null),
   *   getNumber(undefined)
   * ]
   */
  getNumber(item, defaultNum) {
    const isValidNumber =
      ['NaN', 'Infinity', '-Infinity'].indexOf(`${+item}`) === -1;
    const hasStrNumber = /\d+/.test(`${item}`);
    return isValidNumber && hasStrNumber
      ? +item
      : base.isDefined(defaultNum)
      ? defaultNum
      : -1;
  },
  getArray(item, defaultArr) {
    return base.isArray(item) ? item : defaultArr || [];
  },
  getObject(item, defaultObj) {
    return item && base.isObject(item) ? item : defaultObj || {};
  },
  getFunction(item) {
    return base.isFunction(item) ? item : null;
  },

  /**
   * [JSON方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  _json(item) {
    let str = { type: Object.prototype.toString.call(item) };
    try {
      str = JSON.stringify(item, null, 2);
    } catch (e) {
      str.error = (e && e.message) || '';
    }
    return base.isString(str) ? str : base.getString(str, `${str}`);
  },
  _parse(item) {
    let obj = { type: Object.prototype.toString.call(item) };
    try {
      obj = JSON.parse(item);
    } catch (e) {
      obj.error = (e && e.message) || '';
    }
    return base.isObject(obj) ? obj : base.$parse(obj);
  },
  /**
   * [自定义导航方法]
   * @param  {...[type]} arg [description]
   * @return {[type]}        [description]
   */
  _navigateTo(obj) {
    const len = getCurrentPages().length;
    if (!obj.hasOwnProperty('success')) {
      obj.success = function(res) {
        console.log(res);
      };
    }
    if (!obj.hasOwnProperty('fail')) {
      obj.fail = function(err) {
        console.log(err);
      };
    }
    if (len >= 10) {
      /* eslint-disable */
      console.warn(
        '[getCurrentPages] length: ',
        len,
        '. navigateTo -> redirectTo'
      );
      /* eslint-enable */
      uni.redirectTo(obj);
    } else {
      uni.navigateTo(obj);
    }
  },
  //输出
  _log(logObj) {
    if (isLog) {
      console.log(logObj);
    }
  },
  //显示信息
  _showToast(msg) {
    uni.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      mask: false,
      success: result => {
        this._log(result);
      },
      fail: error => {
        console.error(error);
      }
    });
  },
  //关闭所有页面，跳转
  _reLaunch(obj) {
    if (!obj.hasOwnProperty('success')) {
      obj.success = function(res) {
        console.log(res);
      };
    }
    if (!obj.hasOwnProperty('fail')) {
      obj.fail = function(err) {
        console.log(err);
      };
    }
    uni.reLaunch(obj);
  },
  //截取字符
  cutLength(str, length) {
    if (typeof str !== 'string') return '';
    if (str.length > length) {
      return str.slice(0, length) + '...';
    }
    return str;
  },
  authorization(obj) {
    uni.hideLoading();
    if (obj) {
      obj.popup.show();
    }
  },
  //是否已经授权
  isAuthorization(options) {
    let that = this;
    that.wxLogin({
      app: options.app,
      context: options.context,
      cb: options.cb || null
    });
  },
  //查询是否属于Ios系统
  isIos() {
    return new Promise((resolve, reject) => {
      uni.getSystemInfo({
        success(res) {
          if (res.system.indexOf('iOS') !== -1) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  },
  /*函数节流*/
  throttle(fn, interval) {
    var enterTime = 0; //触发的时间
    var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
    return function() {
      var context = this;
      var backTime = new Date(); //第一次函数return即触发的时间
      if (backTime - enterTime > gapTime) {
        fn.call(context, arguments);
        enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
      }
    };
  },

  /*函数防抖*/
  debounce(fn, interval) {
    var timer;
    var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
    return function() {
      clearTimeout(timer);
      var context = this;
      var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
      let n = 0;
      timer = setTimeout(function() {
        fn.call(context, args);
      }, gapTime);
    };
  },
  /**
   * 图片按宽高比例进行自动缩放
   * @param image
   *     缩放图片对象
   * @param maxWidth
   *     允许缩放的最大宽度
   * @param maxHeight
   *     允许缩放的最大高度
   */
  imgZoom(image, maxWidth, maxHeight) {
    //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
    let imgObj = {};
    image.width = Number(image.width);
    image.height = Number(image.height);
    // 用于设定图片的宽度和高度
    let tempWidth = 0;
    let tempHeight = 0;
    if (image.width > 0 && image.height > 0) {
      //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
      if (image.width / image.height >= maxWidth / maxHeight) {
        if (image.width > maxWidth) {
          tempWidth = maxWidth;
          // 按原图片的比例进行缩放
          tempHeight = (image.height * maxWidth) / image.width;
        } else {
          // 按原图片的大小进行缩放
          tempWidth = image.width;
          tempHeight = image.height;
        }
      } else {
        // 原图片的高度必然 > 宽度
        if (image.height > maxHeight) {
          tempHeight = maxHeight;
          // 按原图片的比例进行缩放
          tempWidth = (image.width * maxHeight) / image.height;
        } else {
          // 按原图片的大小进行缩放
          tempWidth = image.width;
          tempHeight = image.height;
        }
      }
      // 设置页面图片的宽和高
      //如果高度大于400
      if (tempHeight > 400) {
        imgObj.height = Math.ceil(tempHeight) * 0.6;
        imgObj.width = Math.ceil(tempWidth) * 0.6;
      } else {
        imgObj.height = Math.ceil(tempHeight) * 0.8;
        imgObj.width = Math.ceil(tempWidth) * 0.8;
      }
      return imgObj;
    }
  },
  //rpx转px
  rpxToPx(rpx) {
    let systemInfo = uni.getSystemInfoSync();
    return (rpx / 750) * systemInfo.windowWidth;
  },
  //数组有null返回false，没有返回true
  arrayHasNull(arr) {
    return arr.every(item => {
      return item !== null;
    });
  },
  //获取当前网址
  site() {
    return URL;
  },
  //获取图片信息
  getImageInfo(src) {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: src,
        success: result => {
          resolve(result);
        },
        fail: error => {
          reject(error);
        }
      });
    });
  },
  //带loading的Promise
  awaitResult(arr, cb) {
    uni.showLoading({
      title: '加载中',
      mask: true
    });
    Promise.all(arr)
      .then(res => {
        uni.hideLoading();
        if (cb) {
          cb(res);
        }
      })
      .catch(error => {
        uni.hideLoading();
        this._showToast('请求出错');
      });
  },
  //图片转base64
  imageToBase(image) {
    return new Promise((resolve, reject) => {
      let FileSystemManager = uni.getFileSystemManager();
      FileSystemManager.readFile({
        filePath: image,
        encoding: 'base64',
        success: function(res) {
          let type = image.slice(image.lastIndexOf('.' + 1));
          let data = 'data:image/' + type + ';base64,' + res.data;
          resolve(data);
        },
        fail: function(err) {
          reject(err);
        }
      });
    });
  },
  navigateTo(url) {
    let len = getCurrentPages().length;
    uni.showLoading({
      title: '加载中',
      mask: true
    });
    if (len >= 10) {
      //大于10个页面
      /* eslint-disable */
      console.warn(
        '[getCurrentPages] length: ',
        len,
        '. navigateTo -> redirectTo'
      );
      /* eslint-enable */
      uni.redirectTo({
        url: url,
        complete: () => {
          uni.hideLoading();
        }
      });
    } else {
      uni.navigateTo({
        url: url,
        success: result => {},
        fail: () => {},
        complete: () => {
          uni.hideLoading();
        }
      });
    }
  },
  toPx(rpx, int) {
    if (int) {
      return parseInt(rpx * this.factor * this.pixelRatio);
    }
    return rpx * this.factor * this.pixelRatio;
  },

  //创建特定的行高
  createLineHeight(size) {
    size = Number(size);
    switch (size) {
      case 28:
        return 72;
        break;
      case 24:
        return 62;
        break;
      case 20:
        return 52;
        break;
      default:
        break;
    }
  },
  /**
   * @description: login
   * @param {
   *  app: app的实例对象
   *  context: 调用的上下文
   *  reset: 是否重置当前页面
   *  getUser: 是否要调用授权弹框
   *  showPopup: 显示弹框
   * }
   * @return:
   */

  wxLogin(options) {
    let defaultOption = {
      reset: false,
      cb: null,
      getUser: false,
      showPopup: true
    };
    Object.assign(defaultOption, options);
    defaultOption.app
      .login(defaultOption.reset, null, defaultOption.getUser)
      .then(res => {
        if (defaultOption.cb) {
          defaultOption.cb(res);
        }
      })
      .catch(error => {
        if (defaultOption.showPopup) {
          uni.hideLoading();
          defaultOption.context.popup.show();
        }
      });
  },
  /**
   * @description:获取服务商
   * @param {}
   * @return: 服务商的id和value
   */
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
          console.log('getUserInfo success', result);
          let userInfo = {};
          //#ifdef MP-ALIpay
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
   * @param {}
   * @return:
   */

  _login(provider,forUser) {
    return new Promise((resolve, reject) => {
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
          //获取用户信息
          this._getUserInfo(provider.id)
            .then(userInfo => {
              resolve(userInfo);
              let data = {}
              //服务器登录
              // this.serverLogin({code: res.code,nickname:userInfo.nickName,avatarUrl: userInfo.avatarUrl});
              //#ifdef MP-ALIPAY
              if(forUser){
                data = {code: res.code,channel_id:1,nickname:userInfo.nickName,avatarUrl: userInfo.avatar}
              }else{
                data = {code: res.code,channel_id:1}
              }
              //#endif
              //#ifdef MP-WEIXIN
              if(forUser){
                data = {code: res.code,channel_id:0,nickname:userInfo.nickName,avatarUrl: userInfo.avatar}
              }else{
                data = {code: res.code,channel_id:0}
              }
              //#endif
              this.serverLogin(data);
            })
            .catch(error => {
              console.log('打开弹窗');
              console.error(error);
            });
        },
        fail: err => {
          console.log('login fail:', err);
          reject(err);
        }
      });
    });
  },
  /**
   * @description: 
   * @param {data: 如果已经登录则使用code即可，在数据库没有这个用户的话，添加用户名和头像} 
   * @return: 
   */
  //服务器登录
  serverLogin(data,reset,cb) {
    api.login.post(data,{'content-type': 'application/x-www-form-urlencoded'}).then(res => {
      if(res.sid){
        redis.put('userToken',res.sid);
      }
      //可能需要重置当前页面
      if(reset) {
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
      }
      if(base.isFunction(cb)) {
        cb(res.sid);
      }
    }).catch(error => {
      console.log(error.statusCode)
      if(error.statusCode === 444){
        console.log(444);
        // this._login(store.state.loginProvider,true);
      }
      if(error.statusCode === 401){
        console.log('未登录：401');
        // this._login(store.state.loginProvider);
      }
      // console.log(error);
    })
  },
  //检查用户是否授权了某个权限
  checkAuthorize(scope) {
    return new Promise((resolve,reject) => {
      uni.authorize({
        scope: 'scope.' + scope,
        success() {
          resolve('用户授权了' + scope);    
        },
        fail(err) {
          reject('用户还没有授权' + scope);  
        }
      })
    })
  },
  //检查用户是否
};

module.exports = base;
