# 分组

二选一

```html
<jo-radio-group v-model:value="valueRef" name="可乐">
  <jo-radio value="bai">百事</jo-radio>
  <jo-radio value="ke">可口</jo-radio>
</jo-radio-group>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        return {
            valueRef: ref("")
        }
    }
})
```