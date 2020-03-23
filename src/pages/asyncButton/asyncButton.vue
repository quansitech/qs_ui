<template>
    <view class="async-button-box">
        <async-button ref="btn1" @clickHandle="testHandle" customClass="bg-blue" beforeText="触发事件前" afterText="触发事件后"></async-button>
    </view>
</template>

<script>
    import asyncButton from '@/components/qs-async-button/qs-async-button.vue';
    export default {
        components: {
            asyncButton,
        },
        methods: {
            testHandle() {
                setTimeout(() => {
                    this.$refs.btn1.loading = false;
                }, 2000);
            }
        },
    }
</script>

<style lang="less">
    .async-button-box{
        margin-top: 20rpx;
    }
</style>