<template>
  <view class="flex align-center justify-center flex-direction">
        <view><qs-rate :count="count" :current="2" :minCount="1"></qs-rate></view>
        <view><qs-rate :disabled="true" :count="count" :current="3" :minCount="1"></qs-rate></view>
  </view>
</template>

<script>
import qsRate from '../../components/qs-rate/qs-rate'
export default {
    components: {
        qsRate,
    },
    data() {
        return {
            count: 6
        }
    },
}
</script>

<style>

</style>