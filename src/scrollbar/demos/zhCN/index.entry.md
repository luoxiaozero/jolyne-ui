# 滚动条 Scrollbar

添加定义的滚动条

```html
<jo-scrollbar>
    <router-view />
</jo-scrollbar>
```

<p></p>

```demo
basis
virtual
```

## Props

| 名称         | 类型                                | 默认值      | 描述               |
| ------------ | ----------------------------------- | ----------- | ------------------ |
| scrollStyle  | `"default" \| "hidden" \| "remove" \| "virtual"` | `"hidden"`  | 滚动条默认样式功能 |
| contentStyle | `CSSProperties \| string`           | `undefined` | 滚动条样式         |
