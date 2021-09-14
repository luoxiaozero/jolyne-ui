# 基础

```html
<jo-space>
   <jo-button @click="activate('up')">上</jo-button>
   <jo-button @click="activate('down')">下</jo-button>
   <jo-button @click="activate('left')">左</jo-button>
   <jo-button @click="activate('right')">右</jo-button>
   <jo-drawer v-model:show="active" :placement="placement">
      <template #header>1111</template>
      <template #content>2222</template>
   </jo-drawer>
</jo-space>
```

```js
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const active = ref(false)
    const placement = ref('right')
    const activate = (value) =>{
        active.value = true,
        placement.value = value
    }
    return {
       active,
      placement,
      activate
    };
  },
});
```