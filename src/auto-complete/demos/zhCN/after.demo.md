# 选中后动作

```html
<jo-space vertical>
  <jo-auto-complete
    v-model:value="valueRef"
    :options="options"
    placeholder="选中后失焦"
    blurAfterSelect
  />
  <jo-auto-complete
    v-model:value="valueRef"
    :options="options"
    placeholder="选中后清除"
    clearAfterSelect
  />
</jo-space>
```

```js
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  setup() {
    const valueRef = ref("");
    return {
      valueRef,
      options: computed(() => {
        return ["@gmail.com", "@163.com", "@qq.com"].map((suffix) => {
          const prefix = valueRef.value.split("@")[0];
          return {
            label: prefix + suffix,
            value: prefix + suffix,
          };
        });
      }),
    };
  },
});
```
