# 基础

```html
<jo-input-number v-model:value="value" placeholder="数字输入框"/>
```

```js
import { defineComponent, ref} from "vue";
export default defineComponent({
    setup() {
        return {
            value: ref(123),
        }
    }
})
```