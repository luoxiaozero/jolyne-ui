# 间隔

```html
<jo-grid :cols="3" :x-gap="8" :y-gap="8">
  <jo-grid-item>123</jo-grid-item>
  <jo-grid-item>321</jo-grid-item>
  <jo-grid-item>123</jo-grid-item>
  <jo-grid-item>456</jo-grid-item>
  <jo-grid-item>7</jo-grid-item>
  <jo-grid-item>123</jo-grid-item>
  <jo-grid-item>123</jo-grid-item>
  <jo-grid-item :span="2">1234</jo-grid-item>
  <jo-grid-item >567</jo-grid-item>
  <jo-grid-item >567</jo-grid-item>
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
