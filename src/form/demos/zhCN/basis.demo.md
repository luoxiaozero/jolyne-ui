# 基础

这是一个 jolyne 组件

```html
<jo-form :model="model" :rules="rules">
    <jo-form-item label="名字" path="name">
        <jo-input v-model:value="model.name" />
    </jo-form-item>
    <jo-form-item label="年龄" path="age">
        <jo-input v-model:value="model.age" />
    </jo-form-item>
    <jo-form-item label="密码" path="password">
        <jo-input v-model:value="model.password" />
    </jo-form-item>
</jo-form>
```

```js
import { defineComponent, ref } from "vue"
export default defineComponent({
    setup() {
        const model = ref({
            age: null,
            password: null,
            name: null,
        })
        const rules = {
            age: [
                {
                    validator(rule, value) {
                        if (value < 0 || value > 200) {
                            return new Error("年龄 gg")
                        }
                        return true
                    },
                },
            ],
        }
        return {
            model,
            rules,
        }
    },
})
```
