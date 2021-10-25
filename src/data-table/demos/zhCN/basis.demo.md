# 基础

```html
<jo-data-table :columns="columns" :data="data" />
```

```js
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      columns: [
        {
          key: "name",
          title: "Name",
        },
        {
          key: "age",
          title: "Age",
        },
        {
          key: "address",
          title: "Address",
        },
      ],
      data: [
        {
          name: "A",
          age: 21,
          address: "a-b-c",
        },
        {
          name: "B",
          age: 22,
          address: "b-c-a",
        },
        {
          name: "C",
          age: 23,
          address: "c-a-b",
        },
      ],
    };
  },
});
```
