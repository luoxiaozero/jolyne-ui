# 基础

```html
<jo-menu v-model:value="keyRef" :options="menuOptions" />
```

```js
import { defineComponent, ref } from "vue";

const menuOptions = [
  {
    type: "group",
    label: "通用组件",
    key: "test-1",
    children: [
      {
        label: "菜单",
        key: "menu",
      },
    ],
  },
  {
    type: "group",
    label: "测试组件",
    key: "test-2",
    children: [
      {
        label: "测试",
        key: "test",
      },
    ],
  },
];

export default defineComponent({
  setup() {
    return {
      keyRef: ref("menu"),
      menuOptions,
    };
  },
});
```
