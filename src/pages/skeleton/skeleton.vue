<template>
  <view class="qs-container">
    <qs-skeleton ref="skeleton1" :animation="animation" :loading="loading"></qs-skeleton>
    <view class="qs-skeleton">
      <view>
        <img src=""
             alt=""
             class="avatar qs-skeleton-circle" />
      </view>
      <view>
        <view class="qs-skeleton-rect text-item">我是文字</view>
        <view class="qs-skeleton-rect text-item">我是文字</view>
        <view class="qs-skeleton-rect text-item">我是文字</view>
        <view class="qs-skeleton-rect text-item">我是文字</view>
      </view>
    </view>
  </view>
</template>

<script>
import qsSkeleton from "../../components/qs-skeleton/qs-skeleton";
export default {
  components: {
    qsSkeleton
  },
  data() {
      return {
          loading: true,
          animation: true,
      }
  },
  onLoad() {
      setTimeout(() => {
          this.loading = false
      }, 3000);
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 300rpx;
  height: 300rpx;
  border-radius: 50%;
  background-color: orange;
}
.text-item{
    margin-top: 20rpx;
}
</style>