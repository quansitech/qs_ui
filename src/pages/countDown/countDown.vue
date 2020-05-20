<template>
    <view>
    <qs-count-down ref="uCountDown"
                    :timestamp="timestamp"
                    :showDays="false"
                    :separator="separator"></qs-count-down>
    <view @tap="showZh" class="cu-btn  block round bg-blue mt-20">中文格式</view>
    </view>
</template>

<script>
import qsCountDown from "../../components/qs-count-down/qs-count-down";
export default {
  components: {
    qsCountDown
  },
  data() {
    return {
        separator: 'colon',
        timestamp: '86400'
    };
  },
  methods: {
      showZh() {
        this.separator = 'zh';
      }
  },
};
</script>

<style>
</style>