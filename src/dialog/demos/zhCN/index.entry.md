# 对话框 Dialog

<jo-alert type="warning" title="注意">
 当需要使用该组件时，你需要把调用其方法的组件放在 jo-dialog-provider 内部并且使用 useDialog 去获取 API。
</jo-alert>

<p></p>

```html
<template>
  <jo-dialog-provider>
    <router-view />
  </jo-dialog-provider>
</template>

<script>
  import { defineComponent } from "vue";
  import { useDialog } from "jolyne-ui";

  export default defineComponent({
    setup() {
      const dialog = useDialog();
      dialog.success({});
    },
  });
</script>
```

<p></p>

```demo
basis
```

# Dialog Api

| 名称    | 类型                               | 描述       |
| ------- | ---------------------------------- | ---------- |
| info    | `(options: DialogOptions) => void` | 信息对话框 |
| success | `(options: DialogOptions) => void` | 成功对话框 |
| warning | `(options: DialogOptions) => void` | 警告对话框 |
| error   | `(options: DialogOptions) => void` | 错误对话框 |

# DialogOptions

| 名称            | 类型            | 默认值      | 描述                                                    |
| --------------- | --------------- | ----------- | ------------------------------------------------------- |
| title           | `String`        | `undefined` | 对话框标题                                              |
| positiveText    | `String`        | `undefined` | 积极的文本（例：确认）                                  |
| negativeText    | `String`        | `undefined` | 消极的文本（例：取消）                                  |
| content         | `String`        | `undefined` | 对话框内容                                              |
| onPositiveClick | `() => Boolean` | `undefined` | 积极的点击回调，返回 false 时取消默认行为（关闭确认框） |
| onNegativeClick | `() => Boolean` | `undefined` | 消极的点击回调，返回 false 时取消默认行为（关闭确认框） |
