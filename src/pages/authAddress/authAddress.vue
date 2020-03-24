<template>
  <view class="auth-address-box">
      <auth-address :filterList="['广东']" customClass="cu-btn block bg-blue" @getUserAddress="getUserAddress"></auth-address>
  </view>
</template>

<script>
import authAddress from '@/components/qs-auth-address/qs-auth-address.vue';
    export default {
        components: {
            authAddress,
        },
        methods: {
            getUserAddress(address) {
                console.log(address)
            }
        },
    }
</script>

<style lang="less">
.auth-address-box{
    margin-top: 20rpx;
}
</style>