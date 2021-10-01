# 偏移

```html
<jo-grid :cols="4">
  <jo-grid-item :offset="2">123</jo-grid-item>
  <jo-grid-item>456</jo-grid-item>
</jo-grid>
```

```css
.jo-grid-item {
    height: 130px;
    color: white;
    text-align: center;
    line-height: 130px;
}
.jo-grid-item:nth-child(odd) {
  background-color: #3d8ae5cc;
}
.jo-grid-item:nth-child(even) {
  background-color: #3d8ae5aa;
}
```