# 基础

```html
<jo-radio v-model:checked="appleRef" name="a">苹果</jo-radio>
<jo-radio v-model:checked="appleRef">Apple</jo-radio>
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