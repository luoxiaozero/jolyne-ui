# 基本

```html
<jo-space>
  <jo-button @click="info">信息</jo-button>
  <jo-button @click="success">成功</jo-button>
  <jo-button @click="warning">警告</jo-button>
  <jo-button @click="error">错误</jo-button>
</jo-space>
```

```js
import { defineComponent } from "vue";
import { useMessage } from "jolyne-ui";
export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      info() {
        message.info("信息");
      },
      success() {
        message.success("成功");
      },
      warning() {
        message.warning("警告");
      },
      error() {
        message.error("错误");
      },
    };
  },
});
```
