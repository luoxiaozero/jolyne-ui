# 滑动时延迟更新值

```html
<jo-space vertical>
  {{ valueRef }}
  <jo-slider v-model:value="valueRef" isSliderDelay/>
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
