<template>
    <view :class="['group-modal',customClass]">
        <view @click="showModal(showModalName)"><slot name="showModal"></slot></view>
        <block v-if="showCloseBtn">
            <view class="cu-modal has-top-close" :class="modalName==showModalName?'show':''">
                <view class="cu-dialog">
                    <view class="cu-bar cu-radius bg-white justify-end">
                    <view class="content">{{title}}</view>
                    <text class="cuIcon-close text-red cu-modal-close" @click="hideModal"></text>
                    </view>
                    <slot name="content"></slot>
                </view>
            </view>
        </block>
        <block v-else>
            <view class="cu-modal has-top-close" :class="modalName==showModalName?'show':''" @click="hideModal">
                <view class="cu-dialog">
                    <view class="cu-bar cu-radius bg-white justify-end">
                    <view class="content">{{title}}</view>
                    </view>
                    <slot name="content"></slot>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
    export default {
        props: {
            showCloseBtn: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: '标题'
            },
            showModalName: {
                type: String,
                default: 'modal'
            },
            customClass: {
                type: String,
                default: ''
            },
            asyncBeforeShowModal: {
                type: Function,
                default: null
            },
            beforeShowModal: {
                type: Function,
                default() {
                    return ()=>{console.log('显示前')}
                }
            },
            afterShowModal: {
                type: Function,
                default: null
            },
            asyncBeforeHideModal: {
                type: Function,
                default: null
            },
            beforeHideModal: {
                type: Function,
                default() {
                    return ()=>{console.log('隐藏前')}
                }
            },
            afterHideModal: {
                type: Function,
                default: null
            }
        },
        mounted () {
            
        },
        data() {
            return {
                modalName: null
            }
        },
        methods: {
            handleTemplate(options) {
                let name = null;
                if(options.e){
                    name = options.e
                }
                if(options.asyncBeforeEvent){
                    options.asyncBeforeEvent().then(res => {
                        console.log(res);
                        this.modalName = name;
                        if(options.afterEvent){
                            options.afterEvent();
                        }
                    })
                }
                if(options.beforeEvent){
                    options.beforeEvent();
                    this.modalName = name;
                    if(options.afterEvent){
                        options.afterEvent();
                    }
                }
            },
            hideModal() {
                let options = {
                    asyncBeforeEvent: this.asyncBeforeHideModal,
                    beforeEvent: this.beforeHideModal,
                    afterEvent: this.afterHideModal
                }
                this.handleTemplate(options);
            },
            showModal(e) {
                let options = {
                    e,
                    asyncBeforeEvent: this.asyncBeforeShowModal,
                    beforeEvent: this.beforeShowModal,
                    afterEvent: this.afterShowModal
                }
                this.handleTemplate(options);
            }
        },
    }
</script>

<style lang="less">

</style>