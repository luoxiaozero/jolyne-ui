# 基础

```html
<jo-space>
  <jo-dropdown :options="options" @select="handleSelect">
    <jo-button>test</jo-button>
  </jo-dropdown>
  <jo-dropdown :options="options" @select="handleSelect">
    <jo-button>test22222222222222222222222222222222222222</jo-button>
  </jo-dropdown>
  <jo-dropdown :options="options" @select="handleSelect">
    <jo-button>t</jo-button>
  </jo-dropdown>
</jo-space>
```

```js
import { defineComponent } from "vue";
import { useMessage } from "jolyne-ui";

export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      options: [
        {
          label: "滨海湾金沙，新加坡",
          key: "marina bay sands",
        },
        {
          label: "布朗酒店，伦敦",
          key: "brown's hotel, london",
        },
        {
          label: "亚特兰蒂斯巴哈马，拿骚",
          key: "atlantis nahamas, nassau",
        },
        {
          label: "比佛利山庄酒店，洛杉矶",
          key: "the beverly hills hotel, los angeles",
        },
      ],
      handleSelect(key) {
        message.info(key);
      },
    };
  },
});
```
