# 基础

```html
<jo-space>
  <jo-button @click="handleSuccess">成功</jo-button>
  <jo-button @click="handleWarning">警告</jo-button>
  <jo-button @click="handleError">错误</jo-button>
</jo-space>
```

```js
import { defineComponent } from "vue";
import { useDialog } from "jolyne-ui";

export default defineComponent({
    setup() {
        const dialog = useDialog();
        return {
            handleSuccess() {
                dialog.success({
                    title: "赢了吗",
                    content: "赢了",
                    positiveText: "Yes"
                })
            },
            handleWarning() {
                dialog.warning({
                    title: "赢了吗",
                    content: "赢了",
                    positiveText: "Yes"
                })
            },
            handleError() {
                dialog.error({
                    title: "赢了吗",
                    content: "赢了",
                    positiveText: "Yes",
                    negativeText: "No Yes",
                })
            }
        }
    }
})
```