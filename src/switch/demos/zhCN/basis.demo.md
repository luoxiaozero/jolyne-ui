# 基础

```html
  <jo-space>
      <jo-switch v-model:value="value"></jo-switch>
  </jo-space>
```
```js
import { defineComponent, ref} from "vue";
export default defineComponent({
    setup() {
        return {
            value: ref(false),
        }
    }
})
```