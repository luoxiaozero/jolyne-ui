# 基础

```html
<jo-space vertical>
  <jo-slider v-model:value="valueRef" :max="0"/>
  {{ valueRef }}
  <jo-slider v-model:value="valueRef" />
  步长
  <jo-slider v-model:value="valueRef" :step="5" />
</jo-space>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const valueRef = ref(0);
    return {
      valueRef,
    };
  },
});
```
