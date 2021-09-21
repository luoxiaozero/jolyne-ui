# 大小

```html
<jo-space>
<jo-icon :size="20"><code-slash-outline-icon /> </jo-icon>
<jo-icon :size="[50, 20]"><code-slash-outline-icon /> </jo-icon>
</jo-space>
```

```js
import { defineComponent } from "vue";
import { CodeSlashOutline as CodeSlashOutlineIcon } from "@vicons/ionicons5";
export default defineComponent({
  components: { CodeSlashOutlineIcon },
});
```