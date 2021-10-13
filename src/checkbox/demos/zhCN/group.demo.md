# 多选

可以全都要

```html
<jo-checkbox-group v-model:value="valueRef" name="可乐">
  <jo-checkbox value="bai">百事</jo-checkbox>
  <jo-checkbox value="ke">可口</jo-checkbox>
</jo-checkbox-group>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        return {
            valueRef: ref(["bai", "ke"])
        }
    }
})
```
