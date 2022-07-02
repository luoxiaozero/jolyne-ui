# 输入组

```html
<jo-space vertical>
    <jo-input-group>
        <jo-input v-model:value="value" placeholder="文本输入框" />
        <jo-input v-model:value="value" type="password" placeholder="密码输入框" />
    </jo-input-group>
    <jo-input-group>
        <jo-input v-model:value="value" placeholder="验证码" />
        <jo-input-group-label @click="handleClick" style="cursor: pointer">
            {{ text }}
        </jo-input-group-label>
    </jo-input-group>
</jo-space>
```

```js
import { defineComponent, ref } from "vue"
export default defineComponent({
    setup() {
        const text = ref("发送")
        function handleClick() {
            text.value = text.value == "60" ? "发送" : "60"
        }
        return {
            value: ref(""),
            text,
            handleClick
        }
    },
})
```
