# 基础

```html
<jo-dynamic-tags v-model:value="value" />
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      value: ref(["奶油", "面包"]),
    };
  },
});
```
