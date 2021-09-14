# 基础

```html
<jo-space>
  <jo-button @click="start">开始</jo-button>
  <jo-button @click="finish">完成</jo-button>
  <jo-button @click="error">错误</jo-button>
</jo-space>
```

```js
import { useLoadingBar } from "jolyne-ui";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const loadingBar = useLoadingBar();
    function start() {
      loadingBar.start();
    }
    function finish() {
      loadingBar.finish();
    }
    function error() {
      loadingBar.error();
    }
    return {
      start,
      finish,
      error
    };
  },
});
```
