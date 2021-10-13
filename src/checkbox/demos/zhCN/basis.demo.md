# 基础

```html
<jo-checkbox v-model:checked="appleRef" name="a">苹果</jo-checkbox>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        return {
            appleRef: ref(false)
        }
    }
})
```