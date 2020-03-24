<template>
  <block>
    <!-- #ifdef MP-ALIPAY -->
    <modal title="提示"
           showModalName="authorize"
           :userInfo="false"
           theme="dialog"
           :manualAction="true"
            :maskHideSwidth="false"
           @confirm="login"
           ref="ref1">
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <modal title="提示"
             showModalName="authorize"
             :userInfo="true"
             theme="dialog"
             :manualAction="true"
             :maskHideSwidth="false"
             @getUserInfo="login"
             ref="ref1">
        <!-- #endif -->
        <template slot="showModal">
          <view @click="checkAuthorize(url)">
            <slot name="view"></slot>
          </view>
        </template>
        <template slot="content">
          <view class="padding-xl">
            <view class>接下来的功能需要您授权登录</view>
          </view>
        </template>
      </modal>
  </block>
</template>

<script>
// import { mapState, mapMutations } from "vuex";
import modal from "@/components/qs-modal/qs-modal.vue"
import qsLogin from "../../common/login";
export default {
  name: "QsCheckLogin",
  components: {
    modal,
  },
  props: {
    customClass: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    jumpName: {
      type: String,
      default: 'redirect'
    }
  },
  // computed: {
  //   ...mapState(["loginProvider"])
  // },
  methods: {
    // ...mapMutations(["vuex_login"]),
    $redirect(_url) {
      uni[this.jumpName]({
        url: _url
      })
    },
    checkAuthorize(url) {
      let that = this;
      that.$nextTick().then(function() {
        that.api.login
          .get()
          .then(res => {
            //更新vuex的用户数据
            if (res.status === 0) {
              that.$refs.ref1.modalName = "authorize";
            } else {
              let userInfo = {nickName: res.data.nickname,avatar: res.data.avatar};
              // that.vuex_login(userInfo);
              if(url !== ''){
                that.$redirect(url);
              }else{
                that.$emit('loginSuccess',userInfo);
              }
            }
          })
          .catch(err => {
            if (err.statusCode === 444 || err.statusCode === 401) {
              that.$refs.ref1.modalName = "authorize";
            }
          });
      });
    },
    login(e) {
      let that = this;
      qsLogin._login(this.loginProvider || {id: 'weixin'}, true, false, function(data) {
        that.userInfo = data.userInfo;
        // that.vuex_login(data.userInfo);
        if(that.url){
          that.$redirect(that.url);
        }else{
          that.$emit('loginSuccess',data.userInfo);
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>