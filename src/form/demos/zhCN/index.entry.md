# 表单 Form

```demo
basis
LabelPlacement
```

## Form Props

| 名称            | 类型            | 默认值      | 描述                       |
| --------------- | --------------- | ----------- | -------------------------- |
| model           | `Object`        | `undefined` | 获取表项中收集到的值的对象 |
| rules           | `FormRules`     | `undefined` | 验证表项的规则             |
| label-placement | `'left'\|'top'` | `top`       | 标签显示的位置             |
| label-width     | `String`        | `80px`      | 标签宽度                   |

### FormRules

```ts
interface FormRules {
    [key: string | number | symbol]: {
        required?: boolean
        message?: string
        validator?: (rule: any, value: any) => boolean | Error
    }[]
}
```

| 名称      | 类型                                          | 描述                 |
| --------- | --------------------------------------------- | -------------------- |
| required  | `boolean`                                     | 是否必填             |
| message   | `String`                                      | 校验失败时展示的信息 |
| validator | `(rule: any, value: any) => boolean \| Error` | 校验规则             |

## FormItem Props

| 名称     | 类型     | 默认值      | 描述                                                      |
| -------- | -------- | ----------- | --------------------------------------------------------- |
| label    | `String` | `undefined` | 标签信息                                                  |
| feedback | `String` | `undefined` | 表项的反馈信息。不设为 undefined 时，会覆盖规则验证的结果 |
| path     | `String` | `undefined` | 将值收集到外层表单 model 对象的路径                       |
