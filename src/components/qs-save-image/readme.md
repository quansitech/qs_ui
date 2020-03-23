### saveImage

保存图片

### 使用方式

在 `script` 中引用组件

```javascript
import saveImage from "qs-ui/lib/qs-save-image/qs-save-image";
export default {
	components: { saveImage }
};
```

在 `template` 中使用组件

```html
<save-image
	:fileUrl="['http://pics.sc.chinaz.com/files/pic/pic9/201509/apic14546.jpg']"
	:isTempDir="false"
></save-image>
```

### 属性


| 字段        | 类型    | 必填 | 默认     | 描述                              |
| ----------- | ------- | ---- | -------- | --------------------------------- |
| btnText     | String  | 否   | 保存图片 | 按钮文本                          |
| fileUrl     | Array   | 是   | 无       | 需要保存的图片路径,可放入多张图片 |
| isTempDir   | Boolean | 是   | 无       | 是否本地路径                      |