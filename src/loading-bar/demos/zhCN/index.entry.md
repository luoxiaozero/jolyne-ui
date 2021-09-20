# 加载条 Loading Bar

<jo-alert type="warning" title="注意">
 当需要使用该组件时，你需要把调用其方法的组件放在 jo-loading-bar-provider 内部并且使用 useLoadingBar 去获取 API。
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
  import { useLoadingBar } from "jolyne-ui";

  export default defineComponent({
    setup() {
      const loadingBar = useLoadingBar();
      return {
        loading () {
          loadingBar.start();
        }
      }
    },
  });
```

## 演示

```demo
basis
```

## LoadingBar Api

| 名称   | 类型         | 描述       |
| ------ | ------------ | ---------- |
| start  | `() => void` | 开始加载条 |
| finish | `() => void` | 完成加载条 |
| error  | `() => void` | 错误加载条 |