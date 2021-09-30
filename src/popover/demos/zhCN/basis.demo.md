# 基础

```html
<jo-space>
  <jo-popover>
    <template #trigger><jo-button>悬浮 上</jo-button> </template>
    test
  </jo-popover>
  <jo-popover placement="bottom">
    <template #trigger ><jo-button>悬浮 下</jo-button> </template>
    test
  </jo-popover>
  <jo-popover placement="left">
    <template #trigger ><jo-button>悬浮 左</jo-button> </template>
    <div
      style="width: 100px; height: 100px; background-color: red;"
    >
      Who kicks a hole in the sky so the heaven cry over me.
    </div>
  </jo-popover>
  <jo-popover placement="right">
    <template #trigger ><jo-button>悬浮 右</jo-button> </template>
    test
  </jo-popover>
</jo-space>
```
