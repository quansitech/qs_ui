# qs_weapp_template

基于 uni-app 框架，集成常用组件，基础布局，动画。
tips: **以下组件只兼容支付宝与微信小程序**

## 代办组件

- [x] 保存图片
- [x] 弹窗
- [ ] 上拉加载
- [ ] 进度条
- [ ] 授权登录
- [ ] 消息订阅
- [ ] 普通 tabbar（导航栏）
- [ ] 底部 tabbar 列表
- [ ] 手风琴
- [ ] 列表
- [ ] 表单
- [ ] 时间轴
- [ ] 轮播
- [ ] 地区选择
- [ ] 富文本解析
- [ ] 海报

## 组件

### 保存图片

| 字段        | 类型    | 必填 | 默认     | 描述                              |
| ----------- | ------- | ---- | -------- | --------------------------------- |
| btnText     | String  | 否   | 保存图片 | 按钮文本                          |
| fileUrl     | Array   | 是   | 无       | 需要保存的图片路径,可放入多张图片 |
| isTempDir   | Boolean | 是   | 无       | 是否本地路径                      |
| customClass | String  | 否   | 无       | 自定义类名                        |

### 弹窗

说明：**必须写入需要被点击的元素和要显示的 content**
"被点击的元素" => **slot name="showModal"**
"要显示的 content" => **slot name="content"**
可能上面解释得不明白，参照下代码：

```html
<modal
  :showCloseBtn="false"
  showModalName="modalTwo"
  customClass="red-color-title"
  title="我是2号标题"
  :afterHideModal="ByeModal"
>
  <template slot="showModal">
    <button class="cu-btn bg-blue block">点我展开2号弹窗</button>
  </template>
  <template slot="content">
    <view class="modal-box-1 padding-xl">我是2号弹窗</view>
  </template>
</modal>
```

| 字段                 | 类型     | 必填 | 默认  | 描述                                                                                    |
| -------------------- | -------- | ---- | ----- | --------------------------------------------------------------------------------------- |
| title                | String   | 否   | 标题  | 弹窗头部的标题                                                                          |
| showModalName        | String   | 否   | modal | 需要被显示的弹窗名称                                                                    |
| showCloseBtn         | Boolean  | 否   | true  | 是否显示关闭按钮（选择不显示的话，隐藏事件会被放在最外的图层）                          |
| customClass          | String   | 否   | 无    | 自定义类名                                                                              |
| asyncBeforeShowModal | Function | 否   | 无    | 显示弹窗前的异步钩子（异步事件必须使用 Promise,栗子：return new Promise(res => xxxxx)） |
| beforeShowModal      | Function | 否   | 无    | 显示弹窗前的钩子                                                                        |
| afterShowModal       | Function | 否   | 无    | 显示弹窗后的钩子                                                                        |
| asyncBeforeHideModal | Function | 否   | 无    | 隐藏弹窗前的异步钩子(同异步显示前)                                                      |
| beforeHideModal      | Function | 否   | 无    | 隐藏弹窗前的钩子                                                                        |
| afterHideModal       | Function | 否   | 无    | 隐藏弹窗后的钩子                                                                        |
