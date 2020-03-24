### 兼容
目前该仓库下的组件只支持微信小程序与支付宝小程序
### 依赖的框架与库
该组件，依赖于[uni-app](https://github.com/dcloudio/uni-app)与[colorUI](https://github.com/weilanwl/ColorUI)。
使用前，需要安装ui-app,具体安装方法参考官方文档。colorUI的样式，可以在该项目的./src/static/styles的文件夹拷贝出你需要的样式。
非常感谢上面开源项目。d=====(￣▽￣*)b
### 使用方法
* 模态框            [modal.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-modal/readme.md)
* 保存图片          [saveImage.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-save-image/readme.md)
* 底部导航          [bottomTab.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-bottom-tab/readme.md)
* 异步按钮          [asyncButton.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-async-button/readme.md)
* 请求数据列表      [isList.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-is-list/readme.md)
* 授权地址          [authAddress.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-auth-address/readme.md)
* 检查是否已授权登录 [checkLogin.md](https://github.com/quansitech/qs_ui/blob/master/src/components/qs-check-login/readme.md)

**tips**
1. 详细用法,例子。请参考./src/pages文件夹中的例子。
2. 每个组件都会有自定义类名属性用来自定义样式
3. 所有不对外的属性,方法，都可以使用[ref特性](https://cn.vuejs.org/v2/api/#vm-refs)进行操作
4. 每个md组件说明，不会写出全部事件，属性。（作者认为重要的东西才会在里面）如果你想在当前组件做某些事情，当md说明没有，请先去组件源码查看。如果无果，请提交issue。谢谢:)

暂不发起到npm，需要使用的话，请下载项目./src/components的对应文件。也可以下载整个项目。在小程序中查看您需要的功能，