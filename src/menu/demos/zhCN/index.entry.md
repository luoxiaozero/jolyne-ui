# 菜单 Menu

## 演示

```demo
basis
```

## Props

| 名称    | 类型           | 默认值      | 描述             |
| ------- | -------------- | ----------- | ---------------- |
| options | `MenuOption[]` | `[]`        | 菜单配置         |
| value   | `String`       | `undefined` | 选中菜单项的 key |

## MenuOption

| 名称      | 类型                | 默认值      | 描述           |
| --------- | ------------------- | ----------- | -------------- |
| type?     | `"item" \| "group"` | `"item"`    | 菜单项类型     |
| label     | `String`            | `undefined` | 菜单项的内容   |
| key       | `String`            | `undefined` | 菜单项的标识符 |
| extra?    | `String`            | `undefined` | 菜单项的额外内容 |
| children? | `MenuOption[]`            | `undefined` | 菜单项的子选项 |
