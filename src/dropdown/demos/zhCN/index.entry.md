# Dropdown

```demo
 basis
```

# Props

### JoDropdown

| 名称     | 类型                    | 默认值      | 描述                        |
| -------- | ----------------------- | ----------- | --------------------------- |
| options  | `DropdownOption[]`      | `undefined` | 存放下拉框数组内容          |
| onSelect | `(key: string) => void` | `undefined` | select 选中时触发的回调函数 |

### DropdownOption

| 名称  | 类型     | 默认值      | 描述           |
| ----- | -------- | ----------- | -------------- |
| label | `string` | `undefined` | 下拉框内容名称 |
| key   | `string` | `undefined` | 下拉框键值     |
