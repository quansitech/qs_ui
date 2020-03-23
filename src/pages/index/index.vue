<template>
    <view class="uni-container">
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('modal')">模态框</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('saveImage')">保存图片</view>
        <view class="cu-btn base-btn block" :style="{backgroundColor: randomColor()}" @tap="toLink('asyncButton')">异步按钮</view>
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
                this.base._navigateTo({url: `/pages/${url}/${url}`})
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