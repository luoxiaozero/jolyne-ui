# 基础

```html
<jo-space vertical>
  <jo-grid>
    <jo-grid-item> 123 </jo-grid-item>
    <jo-grid-item> 456 </jo-grid-item>
    <jo-grid-item> 789 </jo-grid-item>
  </jo-grid>

  <jo-grid :cols="2">
    <jo-grid-item> 123 </jo-grid-item>
    <jo-grid-item> 456 </jo-grid-item>
    <jo-grid-item> 789 </jo-grid-item>
  </jo-grid>
</jo-space>
```

```css
.jo-grid-item {
  height: 130px;
  color: white;
  text-align: center;
  line-height: 130px;
}
.jo-grid-item:nth-child(odd) {
  background-color: #3d8ae5dd;
}
.jo-grid-item:nth-child(even) {
  background-color: #3d8ae5aa;
}
```
