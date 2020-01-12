<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="less">
/*每个页面公共css */
@import url("./static/styles/main.less");
@import url("./static/styles/icon.less");
@keyframes halo {
  0% {
    box-shadow: 0rpx 0rpx 10rpx rgba(25, 181, 253, 0.6);
  }
  100% {
    box-shadow: 0rpx 0rpx 40rpx rgba(25, 181, 253, 0.6);
  }
}
page {
  background-color: #f5f5f9;
}
.mt20 {
  margin-top: 20rpx;
}
.mt10 {
  margin-top: 10rpx;
}
.mt100 {
  margin-top: 100rpx;
}
.mt5 {
  margin-top: 5rpx;
}
.mt35 {
  margin-top: 35rpx;
}
.mb0 {
  margin-bottom: 0;
}
.icon-tips {
  width: 24rpx;
  height: 24rpx;
  flex-shrink: 0;
}
.has-bottom {
  padding-bottom: 167rpx;
}
.s-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container {
  width: 690rpx;
  margin: 0 auto;
}
.hidden {
  display: none !important;
}
.toMore {
  display: flex;
  color: @light-grey;
  font-size: 24rpx;
  align-items: center;
}
.section-box {
  padding: 30rpx 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  margin-top: 20rpx;
}
.link-color {
  color: @blue;
}
.button-fixed-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  .all-center();
  padding: 10rpx 0;
  background-color: #ffffff;
  box-shadow: 0rpx 2rpx 16rpx 0rpx rgba(20, 21, 20, 0.3);
  z-index: 10;
  .btn {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 44rpx;
    color: #fff;
    font-size: 32rpx;
    &.btn-blue {
      background-color: @blue;
    }
  }
}
.select-box {
  padding: 33rpx 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  .title-box {
    margin-bottom: 25rpx;
    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: @dark-black;
    }
    .tips {
      font-size: 24rpx;
      color: @light-grey;
      margin-left: 15rpx;
    }
  }
}
.donate-progress {
  > .item {
    margin-top: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid @border;
    image {
      width: 220rpx;
      height: 138rpx;
      border-radius: 14rpx;
    }
    .right-content {
      margin-left: 25rpx;
      width: 390rpx;
      font-size: 28rpx;
      color: @black;
      line-height: 40rpx;
    }
    .title {
      width: 100%;
      .text-clamp(2);
      margin-bottom: 10rpx;
    }
    .date {
      color: @light-grey;
      font-size: 26rpx;
    }
    &:last-child {
      border: none;
    }
  }
}
.detail-container {
  width: 650rpx;
  margin: 50rpx;
  margin-bottom: 0;
}
.all-center,
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.success-icon,
.shine-icon {
  width: 104rpx;
  height: 104rpx;
  background-image: linear-gradient(
      -90deg,
      #19b5fd 0%,
      #059ade 100%,
      #2078c1 100%,
      #3a55a4 100%
    ),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  border-radius: 50%;
  animation: halo 0.6s infinite alternate;
  .all-center();
  .s-icon {
    font-size: 60rpx;
    color: #fff;
    font-weight: bold;
  }
}
.appointment-message {
  .line-box {
    display: flex;
    padding: 14rpx 0;
    font-size: 28rpx;
    // align-items: center;
    .field {
      width: 160rpx;
      flex-shrink: 0;
      line-height: 1;
      &.has-text {
        line-height: 1.4;
      }
    }
    .text {
      word-break: break-all;
    }
  }
}
</style>
