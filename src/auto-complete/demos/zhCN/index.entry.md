# 自动填充 Auto Complete

```demo
basis
after
```

## Props

| 名称             | 类型                      | 默认值      | 描述               |
| ---------------- | ------------------------- | ----------- | ------------------ |
| value            | `String`                  | `undefined` | 输入框的值         |
| options          | `AutoCompleteOption[]`    | `undefined` | 自动填充的选项     |
| clearAfterSelect | `Boolean`                 | `false`     | 选中后清除值       |
| blurAfterSelect  | `Boolean`                 | `false`     | 选中后失焦         |
| placeholder      | `String`                  | `undefined` | 自动填充的提示信息 |
| onSelect         | `(value: string) => void` | `undefined` | 选中值的回调       |

## AutoCompleteOption

| 名称  | 类型     | 默认值      | 描述            |
| ----- | -------- | ----------- | --------------- |
| value | `String` | `undefined` | 点击后输入的值  |
| label | `String` | `undefined` | 显示的 label 值 |
