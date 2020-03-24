<template>
  <block>
    <view
      v-if="showAuthorizeButton"
      :class="[customClass]"
      @click="openSetting"
    >授权获取{{isWeixin ? weixinText : alipayText}}地址权限</view>
    <view v-else :class="[customClass]" @click="addressToStore">读取{{isWeixin ? weixinText : alipayText}}地址薄</view>
  </block>
</template>

<script>
export default {
  name: "QsAuthAddress",
  props: {
    customClass: {
      type: String,
      default: ""
    },
    isWeixin: {
      type: Boolean,
      default: true
    },
    toastTitle: {
      type: String,
      default: '很抱歉，暂不支持该区域'
    },
    filterList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showAuthorizeButton: false, //显示授权按钮
      weixinText: '微信',
      alipayText: '支付宝'
    };
  },
  methods: {
    filterProvince(provinceName) {
      return this.filterList.every(item => {
        return provinceName.indexOf(item) < 0;
      });
    },
    getSystemAddress() {
      let that = this;
      // #ifdef MP-WEIXIN
      uni.chooseAddress({
        success(res) {
          //从接口获取到地址添加到服务器
          if (that.filterProvince(res.provinceName)) {
            console.log(that.userAddress)
            res.countyName = res.countyName || '';
            that.userAddress = res;
            that.userAddress.detail_address =
              res.provinceName + res.cityName + res.countyName + res.detailInfo;
            that.userAddress.city =
              res.provinceName + res.cityName + res.countyName;
            that.userAddress.address = res.detailInfo;
            that.userAddress.picker = [res.provinceName,res.cityName,res.countyName];
            that.$emit("getUserAddress", that.userAddress);
          } else {
            uni.showToast({
              icon: "none",
              title: that.toastTitle,
              duration: 2000
            });
          }
        },
        fail(err) {
          uni.showToast({
            icon: "none",
            title: "获取地址失败",
            duration: 2000
          });
        }
      });
      // #endif
      // #ifdef MP-ALIPAY
      my.getAddress({
        success(res) {
          if (that.filterProvince(res.result.prov)) {
            let result = res.result;
            console.log(result)
            result.prov = result.prov || '';
            result.city = result.city || '';
            result.area = result.area || '';
            that.userAddress = {
              userName: result.fullname,
              telNumber: result.mobilePhone,
              city: result.prov + result.city + result.area,
              picker: [result.prov,result.city,result.area],
              address: result.address,
              detail_address:
                result.prov + result.city + result.area + result.address
            };
            console.log(that.userAddress)
            that.$emit("getUserAddress", that.userAddress);
          } else {
            uni.showToast({
              icon: "none",
              title: that.toastTitle,
              duration: 2000
            });
          }
        },
        fail(err) {
          uni.showToast({
            icon: "none",
            title: "获取地址失败"
          });
        }
      });
      // #endif
    },

    showRejectTips() {
      uni.showToast({
        title: "没有获取到地址的权限",
        icon: "none",
        duration: 2000,
        success: result => {
          this.showAuthorizeButton = true;
        }
      });
    },
    //用于检查用户是否已经授权地址功能
    getAuthorize() {
      return new Promise((resolve, reject) => {
        uni.getSetting({
          success: result => {
            console.log(result);
            if (result.authSetting["scope.address"]) {
              resolve("true");
            } else {
              reject("false");
            }
          }
        });
      });
    },
    addressToStore() {
      let that = this;
      //#ifdef MP-WEIXIN
      this.getAuthorize()
        .then(res => {
          that.getSystemAddress();
        })
        .catch(err => {
          console.log(err);
          uni.hideLoading();
          uni.authorize({
            scope: "scope.address",
            success: result => {
              that.getSystemAddress();
            },
            fail: err => {
              that.showRejectTips();
            }
          });
        });
      //#endif
      //#ifdef MP-ALIPAY
      that.getSystemAddress();
      //#endif
    },
    //打开授权设置页面
    openSetting() {
      uni.openSetting({
        success: set => {
          console.log(set);
          //#ifdef MP-WEIXIN
          if (set.authSetting["scope.address"]) {
            this.showAuthorizeButton = false;
          }
          //#endif
          //#ifdef MP-ALIPAY
          if (set.authSetting["address"]) {
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
</style>