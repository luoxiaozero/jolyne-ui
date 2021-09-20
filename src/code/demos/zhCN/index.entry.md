# 代码 Code

<jo-alert type="warning" title="注意">
 当需要代码高亮时，需要配置以下代码。因为 Jolyne UI 并不把 highlight.js 内置
</jo-alert>

<p></p>

```html
<template>
  <jo-config-provider :hljs="hljs">
    <router-view />
  </jo-config-provider>
</template>

<script>
  import { defineComponent } from "vue";
  import hljs from "highlight.js/lib/core";
  import javascript from "highlight.js/lib/languages/javascript";

  hljs.registerLanguage("javascript", javascript);

  export default defineComponent({
    setup() {
      return {
        hljs,
      };
    },
  });
</script>
```

<p></p>

```demo
basis
```

# Props

| 名称 | 类型     | 默认值      | 描述         |
| ---- | -------- | ----------- | ------------ |
| code | `String` | `undefined` | 代码         |
| lang | `String` | `undefined` | 代码高亮语言 |
