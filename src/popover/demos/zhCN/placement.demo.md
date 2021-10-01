# 位置

```html
<jo-grid :x-gap="8" :y-gap="8" :cols="3">
  <jo-grid-item>
    <jo-popover placement="top-start">
      <template #trigger><jo-button>Top Start</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="top">
      <template #trigger><jo-button>Top</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="top-end">
      <template #trigger><jo-button>Top End</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="left-start">
      <template #trigger><jo-button>Left Start</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item :offset="1">
    <jo-popover placement="right-start">
      <template #trigger><jo-button>Right Start</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="left">
      <template #trigger><jo-button>Left</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item :offset="1">
    <jo-popover placement="right">
      <template #trigger><jo-button>Right</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="left-end">
      <template #trigger><jo-button>Left End</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item :offset="1">
    <jo-popover placement="right-end">
      <template #trigger><jo-button>Right End</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="bottom-start">
      <template #trigger><jo-button>Bottom Start</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="bottom">
      <template #trigger><jo-button>Bottom</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
  <jo-grid-item>
    <jo-popover placement="bottom-end">
      <template #trigger><jo-button>Bottom End</jo-button></template>
      <div class="popover-text">Top</div>
    </jo-popover>
  </jo-grid-item>
</jo-grid>
```

```css
.jo-button {
  width: 100%;
}
.popover-text {
  width: 50px;
  height: 50px;
}
```
