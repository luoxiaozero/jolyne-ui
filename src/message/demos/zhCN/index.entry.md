# 信息 Message

<jo-alert type="warning" title="注意">
 当需要使用该组件时，你需要把调用其方法的组件放在 jo-message-provider 内部并且使用 useMessage 去获取 API。
</jo-alert>

<p></p>

```html
<template>
  <jo-message-provider>
    <router-view />
  </jo-message-provider>
</template>

<script>
  import { defineComponent } from "vue";
  import { useMessage } from "jolyne-ui";

  export default defineComponent({
    setup() {
      const message = useMessage();
      return {
        error () {
          message.error("bug");
        }
      }
    },
  });
```

## 演示

```demo
basis
```

## Message Api

| 名称    | 类型                             | 描述 |
| ------- | -------------------------------- | ---- |
| info    | `(content: ContentType) => void` | 信息 |
| success | `(content: ContentType) => void` | 成功 |
| warning | `(content: ContentType) => void` | 警告 |
| error   | `(content: ContentType) => void` | 错误 |

## ContentType

| 名称    | 类型     | 默认值      | 描述     |
| ------- | -------- | ----------- | -------- |
| content | `String` | `undefined` | 信息内容 |
| duration | `Number` | `3000` | 信息持续时长 |