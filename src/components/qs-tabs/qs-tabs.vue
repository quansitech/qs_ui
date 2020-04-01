<template>
  <view :class="['nav-w',customClass]">
    <scroll-view :scroll-x="isScroll"
                 :enable-flex="isScroll"
                 :scroll-left="scrollLeft"
                 scroll-with-animation
                 :style="{'transition-duration': animationDuration + 's'}"
                 class="nav">
      <view class="flex text-center nav-v">
        <view v-for="(item,index) in tabList"
              :key="index"
              :class="[index==tab_cur?'select-blue':'','cu-item flex-sub','cu-item-' + index]"
              @tap="tabSelect(index)">{{item.title}}</view>
      </view>
    </scroll-view>
    <view v-if="!customContent"
          class="tabs-content-wrap"
          :style="{'transform': 'translate3d(' + contentPosition + '%, 0px, 0px)','transition-duration': animationDuration + 's'}">
      <slot></slot>
    </view>
    <block v-else>
      <slot></slot>
    </block>
  </view>
</template>

<script>
export default {
  name: "QsTabs",
  data() {
    return {
      tab_cur: 0,
      contentPosition: 0,
      diffLeft: 0,
      scrollLeft: 0
    };
  },
  props: {
    customClass: {
      type: String,
      default: ''
    },
    tabCur: {
      type: Number,
      default: 0
    },
    isScroll: {
      type: Boolean,
      default: true
    },
    animationDuration: {
      type: [String, Number],
      default: 0.3
    },
    customContent: {
      type: Boolean,
      default: false
    },
    tabList: {
      type: Array,
      requred: true
    }
  },
  methods: {
    tabSelect(index) {
      this.tab_cur = index;
      this.$emit("change", index);
      this.contentPosition = "-" + index * 100;
      // #ifndef MP-ALIPAY
      this.refreshNavScroll();
      // #endif
    },
    refreshNavScroll(isInit) {
      this.$nextTick(() => {
        // 将选择器的选取范围更改为自定义组件 component 内，返回一个 SelectorQuery 对象实例,支付宝不支持
        const query = () => uni.createSelectorQuery().in(this);
        query()
          .select(".nav-w")
          .boundingClientRect()
          .exec(([wrap]) => {
            query()
              .select(".nav-v")
              .boundingClientRect()
              .exec(([view]) => {
                if (isInit) {
                  this.diffLeft = view.left - wrap.left;
                }
                const setNavScroll = item => {
                  if (item) {
                    const centerLeft = (wrap.width - item.width) / 2;
                    this.scrollLeft =
                      Math.abs(view.left - wrap.left - this.diffLeft) +
                      (item.left - centerLeft - wrap.left);
                  }
                };
                //获取被点击的tab位置,并计算scroll要移动的距离
                uni
                  .createSelectorQuery()
                  .in(this)
                  .select(".nav-v .cu-item-" + this.tab_cur)
                  .boundingClientRect()
                  .exec(([item]) => {
                    setNavScroll(item);
                  });
              });
          });
      });
    }
  },
  mounted() {
    // #ifndef MP-ALIPAY
    this.refreshNavScroll(true);
    // #endif
  }
};
</script>

<style lang="less">
.nav-w {
  width: 100%;
  padding-bottom: 36rpx;
  margin-bottom: 30rpx;
  > .nav {
    background-color: #ededed;
  }
}
.nav .cu-item {
  font-size: 36rpx;
  color: #666;
  justify-content: center;
  display: flex;
  &.select-blue {
    color: #059ade;
    position: relative;
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      width: 76rpx;
      height: 6rpx;
      background-color: #059ade;
      border-radius: 3rpx;
    }
  }
}
.tabs-content-wrap {
  display: flex;
  width: 100%;
}
</style>