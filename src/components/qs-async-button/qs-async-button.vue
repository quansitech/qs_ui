<template>
  <block>
    <button v-if="loading" :class="['cu-btn block',customClass]">
      <text class="cuIcon-loading2 cuIconfont-spin"></text>
      {{afterText}}
    </button>
    <button
      v-else
      @tap="showLoading"
      :class="['cu-btn block',customClass]"
    >{{beforeText}}</button>
  </block>
</template>

<script>
export default {
  name: "QsAsyncButton",
  props: {
    customClass: {
      type: String,
      default: ""
    },
    afterText: {
      type: String,
      required: true
    },
    beforeText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    showLoading() {
      this.loading = true;
      this.$emit("clickHandle");
    }
  }
};
</script>

<style lang="less">
</style>