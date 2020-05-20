<template>
  <view class="count-to-page">
      <block v-if="endVal">
          <qs-count-to :endVal="endVal" @end="end"></qs-count-to>
      </block>
      <block v-else>
          <view>暂无数据</view>
      </block>
  </view>
</template>

<script>
import qsCountTo from '../../components/qs-count-to/qs-count-to'
export default {
    components: {
        qsCountTo,
    },
    data() {
        return {
            endVal: null
        }
    },
    methods: {
        end() {
            console.log('滚动结束')
        }
    },
    onLoad() {
        setTimeout(() => {
            this.endVal = 3000;
        }, 3000);
    }
}
</script>

<style>

</style>