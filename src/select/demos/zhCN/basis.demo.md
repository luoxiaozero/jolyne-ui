# 基础

```html
<jo-select v-model:value="valueRef" :options="options"/>
```

```js
import { defineComponent, ref } from "vue"
export default defineComponent({
    setup() {
        return {
            valueRef: ref("1"),
            options: [
                {
                    label: "123",
                    value: "1",
                }
            ]
        }
    },
})
```
