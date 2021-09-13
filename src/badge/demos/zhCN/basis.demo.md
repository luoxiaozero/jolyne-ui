# 基础

这是一个 jolyne 组件

```html
<jo-space>
  <jo-badge :value="valueRef" :maxValue="10">
    <jo-avatar />
  </jo-badge>
  <jo-badge type="success" :value="valueRef" :maxValue="10">
    <jo-avatar />
  </jo-badge>
  <jo-badge type="warning" :value="valueRef" :maxValue="10">
    <jo-avatar />
  </jo-badge>
  <jo-badge type="warning" dot>
    <jo-avatar />
  </jo-badge>
  <jo-button @click="valueRef++">+</jo-button>
  <jo-button @click="valueRef--">-</jo-button>
</jo-space>
```

```js
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      valueRef: ref(1),
    };
  },
});
```
