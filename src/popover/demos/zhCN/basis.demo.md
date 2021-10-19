# 基础

```html
<jo-space>
  <jo-popover>
    <template #trigger><jo-button>悬浮 上</jo-button> </template>
    test
  </jo-popover>
  <jo-popover trigger="click">
    <template #trigger><jo-button>点击 上</jo-button> </template>
    <span @click="aa">test</span>
  </jo-popover>
</jo-space>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    function aa() {
      console.log("123");
    }
    return {
       aa
    };
  },
});
```