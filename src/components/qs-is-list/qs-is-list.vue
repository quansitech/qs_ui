<template>
  <view :class="[customClass]">
    <slot name="items"></slot>
    <view class="load-more">
      <view class="cu-load" :class="loading?'loading':'over'"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "QsIsList",
  data() {
    return {
      loading: true,
      page: 1,
      maxPage: 1,
      list: [],
    };
  },
  props: {
    stopRequest: {
      type: Boolean,
      default: false
    },
    requestData: {
      type: Object,
      default: {}
    },
    apiName: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      default: ""
    },
  },
  watch: {
    requestData(newValue, oldValue) {
      if(newValue !== oldValue){
        this.requestData = newValue;
      }
    }
  },
  methods: {
    createEnoughList(count) {
      if(count < 10){
        let multiple = Math.floor(10 / count );
        for (let i = 0; i < multiple; i++) {
          this.getList(false);
        }
      }
    },
    getList(first) {
      if (this.maxPage >= this.page) {
        let newRequestParameter = Object.assign({page: this.page},this.requestData);
        this.api[this.apiName].get(newRequestParameter).then(res => {
          if (first) {
            this.list = res.data.list;
            this.count = Number(res.data.count);
            this.maxPage = Math.ceil(this.count / Number(res.data.page_size));
            this.loading = this.maxPage <= 1 ? false : true;
            //如果大于10条数据
            if(this.count >= 10){
              this.createEnoughList(Number(res.data.page_size));
            }
          } else {
            this.list.push(...res.data.list);
          }
          this.page += 1;
          this.$emit('getList',this.list)
        });
      } else {
        this.loading = false;
      }
    },
    //有时候在别的页面跳转回来列表页。例如删除了列表某个页面，需要更新，那么就可以使用rePull（这个方法用于列表组件已经加载完毕，但又想重新加载）
    rePull() {
      this.maxPage = 1;
      this.page = 1;
      this.getList(true);
    }
  },
  created () {
  },
  mounted () {
    if(!this.stopRequest){
      this.getList(true);
    }
  },
};
</script>

<style lang="less">
</style>