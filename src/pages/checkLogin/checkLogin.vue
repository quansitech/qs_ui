<template>
  <view>
    <check-login @loginSuccess="loginSuccess">
      <template slot="view">
        <view class="cu-btn block bg-blue mt-20">不带url检查登录</view>
      </template>
    </check-login>

    <check-login url="/pages/xxx/xxx"
                 jumpName="navigateTo">
      <template slot="view">
        <view class="cu-btn block bg-blue mt-20">带url检查登录</view>
      </template>
    </check-login>
  </view>
</template>

<script>
import checkLogin from "@/components/qs-check-login/qs-check-login.vue";
export default {
  components: {
    checkLogin
  },
  methods: {
    loginSuccess(userInfo) {
      console.log(userInfo);
    }
  }
};
</script>

<style lange="less">
.mt-20 {
  margin-top: 20rpx;
}
</style>