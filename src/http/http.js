/*
 * @Description: In User Settings Edit
 * @Author: sai
 * @Date: 2019-07-22 10:06:09
 * @LastEditTime : 2020-01-08 09:23:04
 * @LastEditors  : Please set LastEditors
 */
import qsLogin from '../common/login';
class request {
  constructor() {
    this._header = {};
  }
  request(url, data, header, method, loading) {
    return new Promise((resolve, reject) => {
      let pages = getCurrentPages(); //获取加载的页面
      let currentPage = pages[pages.length - 1]; //获取当前页面的对象
      let pageUrl = '';
      try {
        pageUrl = currentPage.route;
      } catch (error) {
        pageUrl = '';
      }
      uni.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: res => {
          if (res.statusCode === 200) {
            if (res.data.status !== 1) {
              //不等于1后，微信通知用户错误信息
              if (loading) {
                uni.hideLoading({
                  success: function() {
                    uni.showToast({
                      title: res.data.info,
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
              }
            } else {
              if (loading) {
                uni.hideLoading();
              }
            }
            resolve(res.data);
          } else if (res.statusCode === 401) {
            //401表示这个token的请求不匹配,想要重新登录
            // let app = getApp();
            if (loading) {
              uni.hideLoading();
            }
            reject(res);
            // qsLogin.getProvider().then(res => {
            //   qsLogin._login(res, false, true);
            // });
          } else if (res.statusCode === 444) {
            if (loading) {
              uni.hideLoading();
            }
            // qsLogin.getProvider().then(res => {
            //   qsLogin._login(res, true);
            // });
            reject(res);
          }
        },
        fail: res => {
          if (this._errorHandler != null) {
            this._errorHandler(res);
          }
          uni.hideLoading({
            success: function() {
              uni.showToast({
                title: '网络出错',
                duration: 2000
              });
            }
          });
          reject(res);
        },
        complete: res => {}
      });
    });
  }

  requestAll(url, data, header, method, loading) {
    let value = '';
    value = uni.getStorageSync('userToken'); //toke
    let newHeader = null;
    value = value || 0;
    //合并
    header = header || {};
    newHeader = Object.assign({}, header, {
      'X-Requested-With': 'xmlhttprequest',
      Authorization: value
    });
    if (loading) {
      uni.showLoading({
        title: '加载中'
      });
    }
    return this.request(url, data, newHeader, method, loading);
  }
}

export default request;
