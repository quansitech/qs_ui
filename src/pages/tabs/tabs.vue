<template>
  <view class="nav-w">
    <view>默认选项卡</view>
    <tabs @change="tabSelect"
          :animationDuration="0.2"
          :tabList="tabList">
      <view class="tab-item">1</view>
      <view class="tab-item">2</view>
      <view class="tab-item">3</view>
      <view class="tab-item">4</view>
      <view class="tab-item">5</view>
      <view class="tab-item">6</view>
      <view class="tab-item">7</view>
      <view class="tab-item">8</view>
    </tabs>
    <view>自定义选项卡</view>
    <tabs @change="customTabSelect"
          customContent
          :tabList="customTabList">
      <view class="cu-content-list">
        <view :class="['list-box tab-item',showTabContent == 0 ? 'show' : '']">
          <view class="list-box-item">我是列表1,2</view>
        </view>
        <view :class="['list-box tab-item',showTabContent == 1 ? 'show' : '']">
          <view class="list-box-item">我是列表3</view>
        </view>
        <view :class="['user-box tab-item',showTabContent == 2 ? 'show' : '']">我是个人界面</view>
      </view>
    </tabs>
  </view>
</template>

<script>
import tabs from "@/components/qs-tabs/qs-tabs.vue";
export default {
  components: {
    tabs
  },
  data() {
    return {
      tabCur: 0,
      tabList: [
        { id: 0, title: "tab1" },
        { id: 1, title: "tab2" },
        { id: 2, title: "tab3" },
        { id: 3, title: "tab4" },
        { id: 4, title: "tab5" },
        { id: 5, title: "tab6" },
        { id: 6, title: "tab7" },
        { id: 7, title: "tab8" }
      ],
      customTabList: [
        { id: 0, title: "list1" },
        { id: 1, title: "list2" },
        { id: 2, title: "list3" },
        { id: 3, title: "user" }
      ]
    };
  },
  computed: {
    showTabContent() {
      return this.filterContent(this.tabCur);
    }
  },
  methods: {
    tabSelect(e) {
      console.log(e);
    },
    customTabSelect(e) {
      this.tabCur = e;
    },
    filterContent(index) {
      let page = 0;
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          page = 1;
          break;
        case 3:
          page = 2;
        default:
          break;
      }
      return page;
    }
  }
};
</script>

<style lang="less">
.Tabs-Page {
  .article {
    &:not(:first-child) {
      margin-top: 40rpx;
    }
    .title {
      padding: 20rpx;
      font-size: 28rpx;
      text-align: center;
    }
    .desc {
      padding: 0 40rpx;
      font-size: 26rpx;
    }
  }
  .s-tabs {
    .s-tab-panel {
      padding: 30rpx;
    }
  }
  .custom-tabs {
    .s-tab-nav-view {
      display: flex;
      justify-content: center;
      .s-tab-nav {
        &:not(:first-child) {
          margin-left: 40rpx;
        }
      }
    }
  }
}
.tab-item {
  width: 100%;
  flex-shrink: 0;
  background-color: orange;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
}
.cu-content-list{
  .tab-item{
    display: none;
    &.show{
      display: inline-block;
    }
  }
}
</style>