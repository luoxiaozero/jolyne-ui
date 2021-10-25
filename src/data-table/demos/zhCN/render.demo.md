# 自定义渲染

```html
<jo-data-table :columns="columns" :data="data" />
```

```js
import { h, defineComponent } from "vue";
import { JoIcon } from "jolyne-ui";
import { MusicalNotes, Play as PlayIcon } from "@vicons/ionicons5";
export default defineComponent({
  setup() {
    return {
      columns: [
        {
          key: "icon",
          title: () => {
            return h(JoIcon, { size: 16 }, { default: () => h(PlayIcon) });
          },
          render: () => {
            return h(JoIcon, null, { default: () => h(MusicalNotes) });
          },
        },
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
