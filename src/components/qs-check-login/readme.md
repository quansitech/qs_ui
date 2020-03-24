### checkLogin

检查用户是否登录

### 注意

**如果你只是想单纯检查该用户是否登录，建议让后端写个可以检查登录的接口。**<br>

(+\_+)?第一次写流程图，勉强看下，如果实在看不明白，请查看源码。
![checkLogin流程图](<https://github.com/quansitech/qs_ui/blob/master/src/static/img/1585045563(1).jpg>)

这个组件需要配合./src/common/login.js 来使用，该 js 封装了用户注册，登录，登录成功后返回用户信息，不成功的话，继续静默登录的逻辑。（具体还需要看代码配合后端接口进行修改）<br>
还需要配合[modal 组件](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-modal/readme.md)的用户授权窗口使用。

源码中被注释的代码为vuex功能，一般这个组件都会配合vuex来记录用户信息与登录状态，但可能其它开发人员会不需要，所以注释了。

### 使用方式

在 `script` 中引用组件

```javascript
import checkLogin from "qs-ui/lib/qs-check-login/qs-check-login.vue";
export default {
	components: { checkLogin }
};
```

在 `template` 中使用组件

```html
<check-login @loginSuccess="loginSuccess">
	<template slot="view">
		<view class="cu-btn block bg-blue mt-20">不带url检查登录</view>
	</template>
</check-login>
<check-login url="/pages/xxx/xxx" jumpName="navigateTo">
	<template slot="view">
		<view class="cu-btn block bg-blue mt-20">带url检查登录</view>
	</template>
</check-login>
```

### 属性

| 字段     | 类型   | 必填 | 默认     | 描述                                                                                                           |
| -------- | ------ | ---- | -------- | -------------------------------------------------------------------------------------------------------------- |
| url      | String | 否   | ''       | 默认为空，如果这个属性有值，会优先进入对应的 url 页面                                                          |
| jumpName | String | 否   | redirect | 跳转名称，[小程序的路由跳转方式](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html) |

### 自定义事件

| 事件名称     | 描述                                                                  |
| ------------ | --------------------------------------------------------------------- |
| loginSuccess | 用户已登录，并且该组件 url 属性为空的时候才会触发的事件。返回用户信息 |
