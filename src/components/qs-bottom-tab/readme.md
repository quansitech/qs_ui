### bottomTab

底部导航

### 补充
作为公用组件，底部导航栏的耦合度和业务逻辑比较紧密，有些tab需要检查登录这个动作，如果用户没登录即弹窗提示用户登录。
一般这种也会被写作组件，例如：
```html
<check-login><tab-item>我的</tab-item></check-login>
```
建议下载后，再自行修改源码。

### 注意
组件默认是[switchTab](https://uniapp.dcloud.io/api/router?id=switchtab)跳转方式，这种跳转方式只能用于[tabBar](https://uniapp.dcloud.io/collocation/pages?id=tabbar),需要自行配置tabBar。
支付宝小程序不支持自定义，如果要使用本组件，那么需要指定**isRedirect**属性为true。

### 使用方式

在 `script` 中引用组件

```javascript
import bottomTab from 'qs-ui/lib/qs-bottom-tab/qs-bottom-tab.vue';
export default {
	components: { bottomTab }
};
```

在 `template` 中使用组件

```html
<bottom-tab tabIndex="1"></bottom-tab>
```

### 属性


| 字段        | 类型    | 必填 | 默认     | 描述                              |
| ----------- | ------- | ---- | -------- | --------------------------------- |
| tabIndex     | String,Number  | 否   | 1 | 指定当前页面属于哪个tab（下标从1开始）|
| isRedirect     | Boolean   | 否   | false | 跳转方式是否使用redirect，默认为switch |