<template>
    <view class="uni-container">
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('modal')">模态框</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('saveImage')">保存图片</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('asyncButton')">异步按钮</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('isList')">请求数据列表</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('authAddress')">获取用户地址</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('checkLogin')">检查用户是否已登录</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('tabs')">导航菜单</view>
        <bottom-tab tabIndex="1"></bottom-tab>
    </view>
</template>

<script>
    import bottomTab from '@/components/qs-bottom-tab/qs-bottom-tab.vue';
    export default {
        components: {
            bottomTab,
        },
        methods: {
            toLink(url) {
                this.$qs.base._navigateTo({url: `/pages/${url}/${url}`})
            },
            randomColor(){
                let r = Math.floor(Math.random()*255);
                let g = Math.floor(Math.random()*255);
                let b = Math.floor(Math.random()*255);
                let color = `rgba(${r},${g},${b},0.8)`;
                return color;
            }
        },
    }
</script>

<style lang="less">
.cu-btn{
    color: #fff;
}
</style>