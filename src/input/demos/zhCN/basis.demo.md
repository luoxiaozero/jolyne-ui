# 基础

```html
<jo-space vertical>
  <jo-input v-model:value="value" placeholder="文本输入框" />
  <jo-input v-model:value="value" type="password" placeholder="密码输入框" />
  <jo-input v-model:value="value" type="textarea" placeholder="多行输入框" />
</jo-space>
```

```js
import { defineComponent, ref} from "vue";
export default defineComponent({
    setup() {
        return {
            value: ref(""),
        }
    }
})
```
