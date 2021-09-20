# 基础

```html
<jo-config-provider :theme="theme">
  <jo-card>
    <jo-space>
      <jo-button @click="theme = null">浅色</jo-button>
      <jo-button @click="theme = darkTheme">深色</jo-button>
    </jo-space>
  </jo-card>
</jo-config-provider>
```

```js
import { defineComponent, ref } from "vue";
import { darkTheme } from "jolyne-ui";
export default defineComponent({
  setup() {
    return {
      theme: ref(null),
      darkTheme,
    };
  },
});
```
