### isList

请求列表数据

### 注意

目前该组件使用的 qs 接口规范，譬如说后端数据返回的结构，带有页码，当前每页有多少条数据。
具体需要看情况修改 getList 函数，来正确的让父组件获取到需要的数据

### 使用方式

在 `script` 中引用组件

```javascript
import isList from "qs-ui/lib/qs-is-list/qs-is-list.vue";
export default {
	components: { isList }
};
```

在 `template` 中使用组件

```html
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
```

```javascript
data() {
    return {
      listArr: []
    };
  },
methods: {
    getList(list) {
      if (list.length) {
        this.listArr = this.base.jsonClone(list);
      }
    }
  },
onReachBottom() {//上拉到底的时候获取
    this.$nextTick().then(res => {
      this.$refs.ref1.getList(false);
    });
  }
```

### 属性

| 字段        | 类型    | 必填 | 默认  | 描述                                                                                        |
| ----------- | ------- | ---- | ----- | ------------------------------------------------------------------------------------------- |
| stopRequest | Boolean | 否   | false | 默认进入页面后自动请求，设置为 true，可手动请求                                             |
| apiName     | String  | 是   | 无    | 请求的地址名称（具体请配合./src/http 查看，如果你使用了 http 文件封装好的请求，可不用关心） |
| requestData     | Object  | 否   | {}   | 请求的参数 |

### 不对外属性

| 字段        | 描述                                                                                 |
| ----------- | ------------------------------------------------------------------------------------ |
| loading     | 如果请求后没内容，会被设置为 false，默认为 true                                      |
| page        | 当前页码                                                                             |
| maxPage     | 最大的页码                                                                           |
| list        | 列表数据                                                                             |

### 自定义事件

| 事件名称 | 描述                                                   |
| -------- | ------------------------------------------------------ |
| getList  | 在请求数据完毕后，触发的事件。会带有 list 数据给父组件 |

### 不对外事件

| 事件名称       | 描述                                                 |
| -------------- | ---------------------------------------------------- |
| getList(first) | 请求数据的函数，参数 first:第一次请求的话需要给 true |
| rePull()       | 从第一页重新请求数据                                 |
