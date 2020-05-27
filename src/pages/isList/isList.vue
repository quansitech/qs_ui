<template>
  <is-list ref="ref1"
           @getList="getList"
           :requestData="requestData"
           apiName="list">
        <template slot="items">
            <view class="xxx-list">
                <view class="xxx-item" v-for="(item,index) of listArr" :key="index"></view>
            </view>
        </template>
    </is-list>
</template>

<script>
import isList from "@/components/qs-is-list/qs-is-list.vue";
export default {
  components: {
    isList
  },
  data() {
    return {
      listArr: [],
      requestData: {key: 'word'}
    };
  },
  methods: {
    getList(list) {
      if (list.length) {
        this.listArr = this.$qs.base.jsonClone(list);
      }
    }
  },
  onLoad() {
    //再次改变请求参数
    this.requestData = {key: 'new word'};
    //默认是自动请求数据，如果你不想这样，请使用添加 :stopRequest="ture"给isList组件。
    //组件加载完毕后，你又想从第一页开始请求（可能在tab导航会用到，点击不同的tab，请求不同参数的列表）那么你可以使用rePull函数
  },
  onReachBottom() {
    this.$nextTick().then(res => {
      this.$refs.ref1.getList(false);
    });
  }
};
</script>

<style lang="less">
</style>