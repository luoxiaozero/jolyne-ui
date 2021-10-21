# 基础

```html
<jo-space>
  <jo-popover>
    <template #trigger><jo-button>悬浮</jo-button> </template>
    test
  </jo-popover>
  <jo-popover trigger="click">
    <template #trigger><jo-button>点击</jo-button> </template>
    test
  </jo-popover>
</jo-space>
```

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    
  },
});
```