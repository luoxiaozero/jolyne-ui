# 文本输入 Input

```demo
basis
size
slots
group
```

# Props

| 名称        | 类型                                  | 默认值      | 描述           |
| ----------- | ------------------------------------- | ----------- | -------------- |
| type        | `"textarea" \| "input" \| "password"` | `"input"`   | 输入框类型     |
| placeholder | `String`                              | `undefined` | 输入字段的提示 |
| size        | `"small" \| "medium"`                 | `"medium"`  | 输入框大小     |
| autofocus   | `Boolean`                             | `false`     | 是否自动聚焦   |
| value       | `String`                              | `undefined` | 输入框的值     |
| onFocus     | `(e: FocusEvent) => void`             | `undefined` | 得到焦点回调   |
| onBlur      | `(e: FocusEvent) => void`             | `undefined` | 失去焦点回调   |
| onInput     | `(e: Event) => void`                  | `undefined` | 输入时回调     |
