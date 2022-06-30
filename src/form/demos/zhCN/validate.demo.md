# 验证

```html
<jo-form :model="model" :rules="rules" ref="formRef">
    <jo-form-item label="名字" path="name">
        <jo-input v-model:value="model.name" />
    </jo-form-item>
    <jo-form-item label="年龄" path="age">
        <jo-input v-model:value="model.age" />
    </jo-form-item>
    <jo-form-item label="密码" path="password">
        <jo-input v-model:value="model.password" />
    </jo-form-item>
    <jo-form-item>
        <jo-button @click="validate">验证</jo-button>
    </jo-form-item>
</jo-form>
```

```js
import { defineComponent, ref } from "vue"
import { useMessage } from "jolyne-ui"

export default defineComponent({
    setup() {
        const formRef = ref(null)
        const model = ref({
            age: null,
            password: null,
            name: null,
        })

        function validate() {
            const message = useMessage()
            formRef.value.validate(msg => {
                if (msg) {
                    message.error("错误" + msg)
                } else {
                    message.success("成功")
                }
            })
        }

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
            password: [
                {
                    required: true,
                    message: "密码不能为空",
                },
            ],
        }
        return {
            formRef,
            validate,
            model,
            rules,
        }
    },
})
```
