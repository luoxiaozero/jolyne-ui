# 默认样式

```html
<jo-space>
  <jo-popover :hasStyle="false" :showAngle="false">
    <template #trigger><jo-button>悬浮</jo-button> </template>
    test
  </jo-popover>
  <jo-popover placement="right">
    <template #trigger ><jo-button>悬浮 右</jo-button> </template>
    <div
      style="width: 100px; height: 100px; background-color: red;"
    >
      Who kicks a hole in the sky so the heaven cry over me.
    </div>
  </jo-popover>
</jo-space>
```