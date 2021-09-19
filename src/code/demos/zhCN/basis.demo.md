# 基础

```html
<jo-code :code="code" lang="html" />
```

```js
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      code: "<html>\n  <head>\n  </head>\n  <body>\n    <p>也许吧</p>\n  </body>\n</html>",
    };
  },
});
```
