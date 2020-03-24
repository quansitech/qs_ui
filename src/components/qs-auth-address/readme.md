### authAddress

授权地址

### 使用方式

在 `script` 中引用组件

```javascript
import authAddress from "qs-ui/lib/qs-auth-address/qs-auth-address.vue";
export default {
	components: { authAddress }
};
```

在 `template` 中使用组件

```html
<auth-address
	customClass="cu-btn block bg-blue"
	@getUserAddress="getUserAddress"
></auth-address>
```

### 属性

| 字段       | 类型    | 必填 | 默认                   | 描述                                                     |
| ---------- | ------- | ---- | ---------------------- | -------------------------------------------------------- |
| isWeixin   | Boolean | 否   | true                   | true 为微信，false 为支付宝                              |
| toastTitle | String  | 否   | 很抱歉，暂不支持该区域 | 不支持当前区域的提示语                                   |
| filterList | Array   | 否   | []                     | 省过滤的数组,比如：['西藏','广州']会提示用户不支持该区域 |

### 自定义事件

| 事件名称       | 描述                     |
| -------------- | ------------------------ |
| getUserAddress | 获取用户授权后的地址数据 |
