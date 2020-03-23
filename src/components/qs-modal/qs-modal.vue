<template>
  <view :class="['group-modal',customClass]">
    <view @tap="showModal(showModalName)">
      <slot name="showModal"></slot>
    </view>
    <block v-if="theme === 'dialog'">
      <view class="cu-modal"
            :class="modalName==showModalName?'show':''"
            @tap="hideModal(maskHideSwidth)">
        <view class="cu-dialog">
          <view class="cu-bar cu-radius bg-white justify-end ">
            <view class="content">{{title}}</view>
            <text class="cuIcon-roundclose cu-modal-close"
                  @tap="hideModal(true)"></text>
          </view>
          <slot name="content"></slot>
          <view class="bottom-operation-view">
            <view class="cu-btn base-style"
                  @tap="hideModal(true)">
              <button class="cu-btn block base-button cancel radius"
                      @tap="cancel">{{cancelText}}</button>
            </view>
            <view class="cu-btn base-style"
                  @tap="hideModal(true)">
              <button v-if="userInfo"
                      class="cu-btn block base-button confirm radius"
                      open-type="getUserInfo"
                      @getuserinfo="mpGetUserInfo">{{confirmText}}</button>
              <button v-else
                      class="cu-btn block base-button confirm radius"
                      @tap="confirm">{{confirmText}}</button>
            </view>
          </view>
        </view>
      </view>
    </block>
    <block v-else-if="theme === 'default'">
      <view class="cu-modal"
            :class="modalName==showModalName?'show':''"
            @tap="hideModal(maskHideSwidth)">
        <view class="cu-dialog"
              @tap.stop="stopHandle">
          <slot name="content"></slot>
        </view>
      </view>
    </block>
    <block v-else-if="theme === 'notice'">
      <view class="cu-modal"
            :class="modalName==showModalName?'show':''">
        <view class="cu-dialog confirm-dialog">
          <slot name="content"></slot>
          <view class="cu-btn block radius bg-white confirm"
                @tap="confirm">{{confirmText}}</view>
        </view>
      </view>
    </block>
    <block v-else-if="theme === 'left'">
      <view class="cu-modal drawer-modal justify-start "
            :class="modalName==showModalName?'show':''"
            @tap="hideModal(maskHideSwidth)">
        <view class="cu-dialog basis-lg"
              @tap.stop="stopHandle">
          <slot name="content"></slot>
        </view>
      </view>
    </block>
    <block v-else-if="theme === 'right'">
      <view class="cu-modal drawer-modal justify-end "
            :class="modalName==showModalName?'show':''"
            @tap="hideModal(maskHideSwidth)">
        <view class="cu-dialog basis-lg"
              @tap.stop="stopHandle">
          <slot name="content"></slot>
        </view>
      </view>
    </block>
    <block v-else-if="theme === 'bottom'">
      <view class="cu-modal bottom-modal "
            :class="modalName==showModalName?'show':''"
            @tap="hideModal(maskHideSwidth)">
        <view class="cu-dialog"
              @tap.stop="stopHandle">
          <slot name="content"></slot>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "QsModal",
  props: {
    theme: {
      type: String,
      default: "default"
    },
    title: {
      type: String,
      default: "提示"
    },
    showModalName: {
      type: String,
      default: "modal"
    },
    customClass: {
      type: String,
      default: ""
    },
    userInfo: {
      type: Boolean,
      default: false
    },
    //是否允许外层蒙版点击隐藏
    maskHideSwidth: {
      type: Boolean,
      default: true
    },
    //手动处理（show,hide）弹窗，可配合异步使用
    manualAction: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    cancelText: {
      type: String,
      default: "取消"
    }
  },
  mounted() {},
  data() {
    return {
      modalName: null
    };
  },
  methods: {
    stopHandle() {
      return false;
    },
    handleTemplate(options) {
      let name = null;
      if (options.e) {
        name = options.e;
      }
      //使用异步的话，需要配置manualAction
      if (options.asyncBeforeEvent) {
        this.$emit(options.asyncBeforeEvent);
      }
      if (options.beforeEvent) {
        this.$emit(options.beforeEvent);
        if (!this.manualAction) {
          this.modalName = name;
        }
        if (options.afterEvent) {
          this.$emit(options.afterEvent);
        }
      }
    },
    hideModal(hideSwidth) {
      if (hideSwidth) {
        let options = {
          asyncBeforeEvent: "asyncBeforeHide",
          beforeEvent: "beforeHide",
          afterEvent: "afterHide"
        };
        this.handleTemplate(options);
      } else {
        return false;
      }
    },
    showModal(e) {
      let options = {
        e,
        asyncBeforeEvent: "asyncBeforeShow",
        beforeEvent: "beforeShow",
        afterEvent: "afterShow"
      };
      this.handleTemplate(options);
    },
    cancel() {
      this.modalName = null;
      this.$emit("cancel");
    },
    confirm() {
      this.modalName = null;
      this.$emit("confirm");
    },
    mpGetUserInfo(e) {
      this.$emit("getUserInfo", e);
    }
  }
};
</script>

<style lang="less">
.cu-dialog {
  overflow: visible;
}
.cu-modal-close {
  position: absolute;
  right: 0;
  top: -80rpx;
  color: #fff;
  font-size: 60rpx;
}
.bottom-operation-view {
  display: flex;
  justify-content: space-between;
  font-size: 32rpx;
  .base-style {
    flex: 1;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    background-color: #fff;
    padding: 0;
    border-radius: 10rpx;
  }
  .base-button {
    color: #059ade;
    background-color: #fff;
    height: 99rpx;
    line-height: 99rpx;
    &.cancel {
      color: #dd333f;
    }
    &.confirm {
      color: #059ade;
    }
  }
}
.confirm-dialog{
  .confirm{
    color: #059ade;
  }
}
.cu-btn.radius{
  border-radius: 10rpx;
}
</style>