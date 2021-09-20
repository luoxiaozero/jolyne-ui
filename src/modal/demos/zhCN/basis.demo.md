# 基础

```html
<jo-button @click="show = true">按钮</jo-button> 
<jo-modal title="标题" v-model:show="show"> 
    内容内容内容
</jo-modal>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
    setup() {
        return {
            show: ref(false),
        }
    }
})
```