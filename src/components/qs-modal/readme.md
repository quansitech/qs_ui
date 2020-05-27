### modal

模态框

### 使用方式

在 `script` 中引用组件

```javascript
import modal from "qs-ui/lib/qs-modal/qs-modal";
export default {
	components: { modal }
};
```

在 `template` 中使用组件

```html
<modal theme="default">
	<template v-slot:showModal>
		<view class="cu-btn block bg-blue base-btn">被点击的元素</view>
	</template>
	<template v-slot:content>
		<view class="padding-xl">自定义内容</view>
	</template>
</modal>
```

### 属性

| 字段           | 类型    | 必填 | 默认    | 描述                                                                 |
| -------------- | ------- | ---- | ------- | -------------------------------------------------------------------- |
| theme          | String  | 否   | default | 主题类型，具体有哪些主题可参考./src/pages/modal 文件                 |
| title          | String  | 否   | 提示    | 对话框的标题提示。（如果有隐藏需求，请使用自定义类名）               |
| showModalName  | String  | 否   | modal   | 对应要显示的模态框名称                                               |
| userInfo       | Boolean | 否   | false   | 请求用户授权用户信息，当前属性只有在主题为"dialog"的情况才会起作用。 |
| maskHideSwidth | Boolean | 否   | true    | 是否允许外层蒙版点击隐藏                                             |
| confirmText    | String  | 否   | 确认    | 主题为"dialog"时的确认按钮文本                                       |
| cancelText     | String  | 否   | 取消    | 主题为"dialog"时的取消按钮文本                                       |

### 自定义事件

| 钩子名称        | 描述                                                             |
| --------------- | ---------------------------------------------------------------- |
| afterShow       | 显示后                                                           |
| beforeShow      | 显示前                                                           |
| asyncBeforeShow | 异步显示前，异步事件必须配合 manualAction 属性使用。具体参考例子 |
| afterHide       | 同 show                                                          |
| beforeHide      | 同 show                                                          |
| asyncBeforeHide | 同 show                                                          |

| 对话框（主题为 dialog）事件 | 描述                                                 |
| --------------------------- | ---------------------------------------------------- |
| cancel                      | 触发了取消                                           |
| confirm                     | 触发了确认                                           |
| getUserInfo                 | 触发了用户授权按钮，这个事件必须配置 userInfo 属性。 |
