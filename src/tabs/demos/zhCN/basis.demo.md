# 基础

```html
<jo-tabs v-model:value="valueRef">
    <jo-tab-pane tab="start0" name="2020">
        <div>开始0</div>
    </jo-tab-pane>
    <jo-tab-pane tab="start1" name="2021">
        <div>开始1</div>
    </jo-tab-pane>
    <jo-tab-pane tab="start2" name="2022">
        <div>开始2</div>
    </jo-tab-pane>
</jo-tabs>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const valueRef = ref("1");
    return {
      valueRef,
    };
  },
});
```