### tabs

选项卡

### 注意
支付宝不支持uni.createSelectorQuery().in(),导致无法计算tab的位置.支付宝会少了自动滑动功能,不过少了该功能不影响使用.

### 使用方式

在 `script` 中引用组件

```javascript
import tabs from "qs-ui/lib/qs-tabs/qs-tabs";
export default {
	components: { tabs }
};
```

在 `template` 中使用组件

```html
<view>默认选项卡</view>
<tabs @change="tabSelect" :animationDuration="0.2" :tabList="tabList">
	<view class="tab-item">1</view>
	<view class="tab-item">2</view>
	<view class="tab-item">3</view>
	<view class="tab-item">4</view>
	<view class="tab-item">5</view>
	<view class="tab-item">6</view>
	<view class="tab-item">7</view>
	<view class="tab-item">8</view>
</tabs>
```

### 属性

| 字段      | 类型    | 必填 | 默认     | 描述                              |
| --------- | ------- | ---- | -------- | --------------------------------- |
| tabCur   | Number  | 否   | 0 | 选项卡高亮的位置                          |
| isScroll   | Boolean  | 否   | true |  是否滑动                         |
| animationDuration   | String, Number  | 否   | 0.3 | 切换选项卡的动画时间,这个属性只有在默认选项卡才能起作用,无法对自定义选项卡生效                        |
| customContent   | Boolean  | 否   | false |  是否自定义选项卡                         |
| tabList   | Array  | 是   | 无 |  选项卡标题 {title: 'xxxx'}                        |

### 自定义事件
| 事件名称        | 描述                                                             |
|  change      | tab被点击后触发的事件 |
