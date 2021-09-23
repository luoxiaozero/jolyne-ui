# 关闭

```html
<jo-space>
    <jo-tag closable @close="pop('defulat')">test</jo-tag>
    <jo-tag closable type="info" @close="pop('info')">test</jo-tag>
    <jo-tag closable type="success" @close="pop('success')">test</jo-tag>
    <jo-tag closable type="warning" @close="pop('warning')">test</jo-tag>
    <jo-tag closable type="error" @close="pop('error')">test</jo-tag>
</jo-space>
```

```js
import { defineComponent } from "vue";
import { useMessage } from "jolyne-ui";
export default defineComponent({
    setup() {
        const message = useMessage();
        return {
            pop(type) {
                message.create( type, { type });
            }
        }
    }
})
```
