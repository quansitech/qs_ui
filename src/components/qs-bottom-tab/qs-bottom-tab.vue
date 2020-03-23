<template>
  <view class="bottom-tab">
    <view
      :class="item.center==true?'bottom-tab-item-center':'bottom-tab-item-sider' "
      @click="changeTap(item)"
      v-for="(item,index) in tabList"
      :key="index"
    >
      <block v-if="index === 1">
        <view class="tab-center-box">
          <image :src="item.imgOff" class="tab-image" />
        </view>
        <text
          :class="['text-center',curTab==item.id?'text-position text-on':'text-position']"
        >{{item.name}}</text>
      </block>
      <block v-else>
        <image v-if="curTab==item.id" class="first-img" :src="item.imgOn" />
        <image v-if="curTab!=item.id" class="first-img" :src="item.imgOff" />
        <text :class="curTab==item.id?'text-position text-on':'text-position'">{{item.name}}</text>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  name: "QsBottomTab",
  props: {
    tabIndex: {
      type: [String, Number],
      default: "1"
    },
    isRedirect: {
      //支付宝小程序不支持自定义底部导航，所以使用这种跳转方式
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curTab: 1,
      tabList: [
        {
          id: 1,
          name: "首页",
          imgOff: "../../static/img/index.png",
          imgOn: "../../static/img/select-index.png",
          url: "/pages/index/index"
        },
        {
          id: 2,
          name: "主按钮",
          imgOff: "../../static/img/donate.png",
          imgOn: "../../static/img/donate.png",
          url: "/pages/middle/middle",
          center: true
        },
        {
          id: 3,
          name: "我的",
          imgOff: "../../static/img/user.png",
          imgOn: "../../static/img/select-user.png",
          url: "/pages/user/user"
        }
      ],
      authorize: null
    };
  },
  created() {
    this.curTab = Number(this.tabIndex);
  },
  methods: {
    $switchTab(_url) {
      uni.switchTab({
        url: _url
      });
    },
    $redirect(_url) {
      uni.redirectTo({
        url: _url
      });
    },
    changeTap(e) {
      //如果点击的是高亮的tab，不允许被点击
      console.log(e);
      if (Number(this.curTab) === Number(e.id)) {
        return false;
      } else {
        if (this.isRedirect) {
          this.$redirect(e.url);
        } else {
          this.$switchTab(e.url);
        }
      }
    }
  }
};
</script>

<style lang="less">
.bottom-tab {
  position: fixed;
  background-color: #ffffff;
  bottom: 0%;
  left: 0%;
  width: 100%;
  min-height: 107rpx;
  height: 107rpx;
  box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  padding: 0 50rpx;
  .bottom-tab-item-center {
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .first-img {
      width: 94rpx;
      height: 94rpx;
      background-color: #059ade;
      box-shadow: 0rpx 2rpx 10rpx 0rpx #0c577a,
        0rpx 1rpx 6rpx 0rpx rgba(6, 145, 208, 0.4);
      border-radius: 38rpx;
    }

    .text-position {
      margin-top: 0;
      font-size: 20rpx;
      color: #757575;
    }

    .text-on {
      color: #059ade;
    }
  }
  .tab-center-box {
    width: 94rpx;
    height: 94rpx;
    background-color: #059ade;
    box-shadow: 0rpx 2rpx 10rpx 0rpx #0c577a,
      0rpx 1rpx 6rpx 0rpx rgba(6, 145, 208, 0.4);
    border-radius: 38rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -50rpx;
    margin-bottom: 10rpx;
    .tab-image {
      width: 49rpx;
      height: 46rpx;
    }
  }
  .text-center {
    width: 100%;
    text-align: center;
    display: block;
  }
  .bottom-tab-item-sider {
    width: 19%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .first-img {
      width: 54rpx;
      height: 54rpx;
    }
    .text-position {
      margin-top: 4rpx;
      font-size: 20rpx;
      color: #757575;
    }

    .text-on {
      color: #059ade;
    }
  }
}
// #ifdef MP-WEIXIN
@supports (bottom: constant(safe-area-inset-bottom)) or
  (bottom: env(safe-area-inset-bottom)) {
  .bottom-tab {
    height: calc(constant(safe-area-inset-bottom) / 2 + 107rpx);
    height: calc(env(safe-area-inset-bottom) / 2 + 107rpx);
    padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
    padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }
}
// #endif
// #ifdef MP-ALIPAY
@supports (bottom: constant(safe-area-inset-bottom)) or
  (bottom: env(safe-area-inset-bottom)) {
  .bottom-tab {
    height: calc(constant(safe-area-inset-bottom) / 2 + 1rem);
    height: calc(env(safe-area-inset-bottom) / 2 + 1rem);
    padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
    padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }
}
// #endif
</style>
