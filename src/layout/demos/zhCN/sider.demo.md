# 侧边栏

```html
<jo-layout has-sider>
  <jo-layout-sider :box-shadow="false"> Sider </jo-layout-sider>
  <jo-layout>
    <jo-layout-header> Header </jo-layout-header>
    <jo-layout-content> Content </jo-layout-content>
    <jo-layout-footer> Footer </jo-layout-footer>
  </jo-layout>
</jo-layout>
```

```css
.jo-layout-header,
.jo-layout-content,
.jo-layout-footer {
    padding: 20px;
}
.jo-layout-header {
    background-color: #aaa;
}
.jo-layout-content {
    background-color: #ccc;
}
.jo-layout-footer {
    background-color: #bbb;
}
.jo-layout-sider {
    background-color: #afafaf;
}
```