# 选中部分

```html
<jo-space>
  <jo-checkbox :indeterminate="iRef" v-model:checked="appleRef" name="a">苹果</jo-checkbox>
  <jo-button @click="appleRef = !appleRef">选中全体</jo-button>
  <jo-button @click="iRef = !iRef">选中部分</jo-button>
</jo-space>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      appleRef: ref(false),
      iRef: ref(false),
    };
  },
});
```
