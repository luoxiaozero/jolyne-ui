# 标签显示的位置

```html
<h4>默认</h4>
<jo-form :model="model" :rules="rules">
    <jo-form-item label="年龄" path="age">
        <jo-input v-model:value="model.age" />
    </jo-form-item>
</jo-form>

<h4>上边</h4>
<jo-form :model="model" :rules="rules" label-placement="top">
    <jo-form-item label="年龄" path="age">
        <jo-input v-model:value="model.age" />
    </jo-form-item>
</jo-form>

<h4>左边</h4>
<jo-form :model="model" :rules="rules" label-placement="left">
    <jo-form-item label="名字" path="name">
        <jo-input v-model:value="model.name" />
    </jo-form-item>
    <jo-form-item label="年龄" path="age">
        <jo-input v-model:value="model.age" />
    </jo-form-item>
</jo-form>
<h4>左边 指定标签宽度</h4>
<jo-form :model="model" :rules="rules" label-placement="left" label-width="50px">
    <jo-form-item label="名字" path="name">
        <jo-input v-model:value="model.name" />
    </jo-form-item>
    <jo-form-item label="年龄" path="age">
        <jo-input v-model:value="model.age" />
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
