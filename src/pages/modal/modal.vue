<template>
    <view class="uni-container">
        <modal ref="modal1" showModalName="dialogModal" theme="dialog">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">对话框</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">{{messageList}}</view>
            </template>
        </modal>
        <modal ref="modal2" showModalName="login" :userInfo="true" @getUserInfo="myGetUserInfo"  theme="dialog">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">对话框之授权</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">接下来的功能需要您的授权</view>
            </template>
        </modal>
        <modal ref="modal3" showModalName="leftModal" theme="left">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">左抽屉</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">自定义内容</view>
            </template>
        </modal>
        <modal ref="modal4" showModalName="rightModal" theme="right">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">右抽屉</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">自定义内容</view>
            </template>
        </modal>
        <modal ref="modal5" showModalName="bottomModal" theme="bottom">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">底部抽屉</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">自定义内容</view>
            </template>
        </modal>
        <modal ref="modal6" showModalName="defaultModal">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">自定义默认弹窗</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">自定义内容</view>
            </template>
        </modal>
        <modal ref="modal7" showModalName="noticeModal" theme="notice">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">通知信息弹窗</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">输入的xxx错误，请重新输入</view>
            </template>
        </modal>
        <modal ref="modal8" showModalName="handleModal" theme="default" @beforeShow="beforeShow" @afterHide="afterHide">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">事件弹窗</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">请查看console控制台</view>
            </template>
        </modal>
        <modal ref="modal9" showModalName="handleModal2" :manualAction="true" theme="default" @asyncBeforeHide="asyncBeforeHide('modal8')" @asyncBeforeShow="asyncBeforeShow('modal8')">
            <template v-slot:showModal>
                <async-button ref="asyncButton1" customClass="bg-blue base-btn" beforeText="异步事件弹窗" afterText="获取数据中" ></async-button>
                <!-- <view v-if="!loading" class="cu-btn block bg-blue base-btn">异步事件弹窗</view>
                <view v-else class="cu-btn block bg-blue base-btn"><text class="cuIcon-loading2 cuIconfont-spin"></text>异步事件弹窗</view> -->
            </template>
            <template v-slot:content>
                <view class="padding-xl">请查看console控制台</view>
            </template>
        </modal>
        <modal ref="modal10" showModalName="textareaModal" theme="default" @beforeShow="textareaHandle(true)" @afterHide="textareaHandle(false)">
            <template v-slot:showModal>
                <view class="cu-btn block bg-blue base-btn">显示textarea原生组件弹窗</view>
            </template>
            <template v-slot:content>
                <view class="padding-xl">
                    <view class="tips-text">textarea原生组件在安卓端隐藏的情况下，还是会显示在页面。</view>
                    <textarea :class="['textarea-box',showTextarea ? 'show' : '']" name="" id="" cols="30" rows="10" v-model="textareValue"></textarea>
                </view>
            </template>
        </modal>
    </view>
</template>

<script>
    import modal from '@/components/qs-modal/qs-modal.vue';
    import asyncButton from '@/components/qs-async-button/qs-async-button.vue';
    export default {
        components: {
            modal,
            asyncButton
        },
        data() {
            return {
                messageList: '对话框',
                loading: false,
                textareValue: '',
                showTextarea: false
            }
        },
        methods: {
            beforeShow() {
                console.log('我是显示前打开的')
            },
            afterHide() {
                console.log('我是隐藏后打开的')
            },
            asyncBeforeHide(refName) {
                setTimeout(() => {
                    this.$nextTick().then(res => {
                        console.log('隐藏前')
                        this.$refs[refName].modalName = null;
                    })                    
                }, 1000);
            },
            asyncBeforeShow(refName) {
                this.loading = true;
                setTimeout(() => {
                    this.$nextTick().then(res => {
                        console.log('获取请求数据完毕')
                        this.$refs.asyncButton1.loading = false;
                        this.$refs[refName].modalName = this.$refs[refName].showModalName;
                    })
                }, 1300);
            },
            textareaHandle(show) {
                if(!show){
                    this.textareValue = '';
                }
                this.showTextarea = show;
            },
            myGetUserInfo(e) {
                console.log('用户信息：',e);
            },
            getDataList() {
                let that = this;
                this.$nextTick(res => {
                    setTimeout(() => {
                        that.$refs.modalOne.modalName = 'hiModal';
                        that.messageList = 'hi I am datalist';
                    }, 3000);
                })
            }
        },
        created () {
            
        },
    }
</script>

<style lang="less">
.tips-text{
    margin-bottom: 20rpx;
}
.textarea-box{
    position: absolute;
    width: 100%;
    background-color: #fff;
    left: 10000rpx;
    top: 10000rpx;
    &.show{
        position: static;
    }
}
</style>