<template>
  <block>
    <button
      v-if="showAuthorizeButton"
      :class="['cu-btn',customClass]"
      @click="openSetting"
    >授权{{btnText}}</button>
    <button v-else :class="['cu-btn',customClass]" @click="saveImageToPhone">{{btnText}}</button>
  </block>
</template>

<script>
export default {
  name: "QsSaveImage",
  props: {
    btnText: {
      type: String,
      default: "保存图片"
    },
    fileUrl: {
      type: Array,
      required: true
    },
    //是否已经是临时路径
    isTempDir: {
      type: Boolean,
      required: true
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showAuthorizeButton: false //显示授权按钮
    };
  },
  methods: {
    isIos() {
      return new Promise((resolve, reject) => {
        uni.getSystemInfo({
          success(res) {
            if (res.system.indexOf("iOS") !== -1) {
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
    saveImageChildFun(file) {
      let that = this;
      //#ifdef MP-WEIXIN
      uni.saveImageToPhotosAlbum({
        //saveImageToPhotosAlbum不支持支付宝
        filePath: file,
        success(res) {
          uni.hideLoading();
          that.isIos().then(res => {
            if (res) {
              uni.showToast({
                title: "图片保存成功",
                duration: 2000
              });
            }
          });
        },
        fail(err) {
          uni.hideLoading();
        }
      });
      //#endif
      //#ifdef MP-ALIPAY
      my.saveImage({
        url: file,
        showActionSheet: true,
        success: res => {
          uni.hideLoading();
          uni.showToast({
            title: "图片保存成功",
            duration: 2000
          });
        },
        fail: err => {
          uni.hideLoading();
          if (err.error === 2001) {
            this.showRejectTips();
          }
        }
      });
      //#endif
    },
    //检查是不是本地路径，不是的话进行转换，之后再进行保存图片
    saveImage() {
      let that = this;
      if (that.isTempDir) {
        for (let index = 0; index < that.fileUrl.length; index++) {
          that.saveImageChildFun(that.fileUrl[index]);
        }
      } else {
        let promiseArr = [];
        that.fileUrl.forEach(item => {
          promiseArr.push(that.getImageInfo(item));
        });
        // console.log('imageList:',promiseArr)
        console.log('imageList:',that.fileUrl)
        Promise.all(promiseArr).then(result => {
          result.forEach(img => {
            that.saveImageChildFun(img.path);
          });
        });
      }
    },
    showRejectTips() {
      uni.showToast({
        title: "您拒绝了授权图片",
        icon: "none",
        duration: 2000,
        success: result => {
          this.showAuthorizeButton = true;
        }
      });
    },
    //用于检查用户是否已经授权保存图片功能
    getAuthorize() {
      return new Promise((resolve, reject) => {
        uni.getSetting({
          success: result => {
            console.log(result);
            if (result.authSetting["scope.writePhotosAlbum"]) {
              resolve("true");
            } else {
              reject("false");
            }
          }
        });
      });
    },
    saveImageToPhone() {
      let that = this;
      uni.showLoading({
        title: "获取图片中",
        mask: true
      });
      //#ifdef MP-WEIXIN
      this.getAuthorize()
        .then(res => {
          that.saveImage();
        })
        .catch(err => {
          //没有权限，通知用户没有保存图片权限。并显示去授权的按钮
          uni.hideLoading();
          uni.authorize({
            scope: "scope.writePhotosAlbum",
            success: result => {
              that.saveImage();
            },
            fail: err => {
              that.showRejectTips();
            }
          });
        });
      //#endif
      //#ifdef MP-ALIPAY
      that.saveImage();
      //#endif
    },
    //打开授权设置页面
    openSetting() {
      uni.openSetting({
        success: set => {
          //#ifdef MP-WEIXIN
          if (set.authSetting["scope.writePhotosAlbum"]) {
            this.showAuthorizeButton = false;
          }
          //#endif
          //#ifdef MP-ALIPAY
          if (set.authSetting["album"]) {
            this.showAuthorizeButton = false;
          }
          //#endif
        },
        fail: error => {
          console.log(error);
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="less">
@import '../../common/color-ui/cu-btn.less';
</style>