### asyncButton

异步按钮

### 使用方式

在 `script` 中引用组件

```javascript
import asyncButton from "qs-ui/lib/qs-save-image/qs-save-image";
export default {
	components: { asyncButton }
};
```

在 `template` 中使用组件

```html
<async-button
	ref="btn1"
	@clickHandle="testHandle"
	customClass="bg-blue"
	beforeText="触发事件前"
	afterText="触发事件后"
></async-button>
```

### 属性

| 字段        | 类型    | 必填 | 默认  | 描述                |
| ----------- | ------- | ---- | ----- | ------------------- |
| afterText   | Array   | 是   | 无    | 请求前的按钮文本    |
| beforeText  | Boolean | 是   | 无    | 请求后的按钮文本    |
| loading     | Boolean | 否   | false | true 为显示 loading |

### 不对外的属性

| 字段    | 描述                |
| ------- | ------------------- |
| loading | true 为显示 loading图标 |

### 自定义事件

| 事件名称    | 描述                     |
| ----------- | ------------------------ |
| clickHandle | 用户点击按钮后触发的事件 |
