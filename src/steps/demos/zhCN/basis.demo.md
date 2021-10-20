# 基础

```html
<jo-steps :current="current" :status="status">
  <jo-step title="第一" description="绝对不意气用事" />
  <jo-step title="第二" description="绝对不漏判任何一件坏事" />
  <jo-step title="第三" description="绝对裁判得公正漂亮" />
</jo-steps>
<div style="margin-top: 26px">
  <jo-button @click="prev">前</jo-button>
  <jo-button @click="next">后</jo-button>
  <span style="margin: 10px;"></span>
  <jo-button @click="status = 'error'">错误</jo-button>
  <jo-button @click="status = 'process'">过程</jo-button>
  <jo-button @click="status = 'wait'">等待</jo-button>
  <jo-button @click="status = 'finish'">完成</jo-button>
</div>
```

```js
import { defineComponent, ref } from "vue";
import { useMessage } from "jolyne-ui";
export default defineComponent({
  setup() {
    const current = ref(0);
    const status = ref("process");
    return {
      current,
      status,
      prev() {
        if (current.value > 0) current.value--;
      },
      next() {
        current.value++;
      },
    };
  },
});
```
