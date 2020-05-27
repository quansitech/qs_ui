<template>
  <block>
    <view @click="login">
      <slot name="view"></slot>
    </view>
    <!-- #ifdef MP-ALIPAY -->
    <modal title="提示"
           showModalName="authorize"
           :userInfo="false"
           theme="dialog"
           :maskHideSwidth="false"
           @afterHide="hideModal"
           @confirm="login"
           ref="ref1">
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <modal title="提示"
             showModalName="authorize"
             :userInfo="true"
             theme="dialog"
             :maskHideSwidth="false"
             @afterHide="hideModal"
             @getUserInfo="login"
             ref="ref1">
        <!-- #endif -->
        <template slot="content">
          <view class="padding-xl">
            <view>接下来的功能需要您授权登录</view>
          </view>
        </template>
      </modal>
  </block>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import modal from "@/components/qs-modal/qs-modal.vue";
export default {
  name: "QsCheckLogin",
  components: {
    modal
  },
  props: {
    customClass: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    jumpName: {
      type: String,
      default: "redirect"
    }
  },
  computed: {
    ...mapState(["loginProvider"]),
    ...mapState(["v_userInfo"])
  },
  methods: {
    ...mapMutations(["vuex_login"]),
    $redirect(_url) {
      uni[this.jumpName]({
        url: _url
      });
    },
    hideModal(){
      this.$refs.ref1.modalName = null;
    },
    success(userInfo) {
      if (this.url) {
        this.$redirect(this.url);
      } else {
        this.$emit("loginSuccess", userInfo);
      }
    },
    login() {
      let that = this;
      if (this.v_userInfo) {
        this.success(this.v_userInfo);
      } else {
        this.$qs.login
          ._login(this.loginProvider || { id: "weixin" })
          .then(res => {
            const userInfo = {
              avatar: res.data.avatar,
              nickname: res.data.nickname
            };
            that.userInfo = userInfo;
            that.vuex_login(userInfo);
            that.success(userInfo);
          })
          .catch(err => {
            console.error(err);
            that.$refs.ref1.modalName = "authorize";
          });
      }
    }
  }
};
</script>

<style lang="less">
</style>