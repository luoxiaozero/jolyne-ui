# 表单 Form

```demo
basis
```

## Form Props

| 名称            | 类型            | 默认值      | 描述                       |
| --------------- | --------------- | ----------- | -------------------------- |
| model           | `Object`        | `undefined` | 获取表项中收集到的值的对象 |
| rules           | `Rules`         | `undefined` | 验证表项的规则             |
| label-placement | `'left'\|'top'` | `undefined` | 标签显示的位置         |

### Rules

懂得都懂

```ts
interface Rules {
  [key: string | number | symbol]: {
    validator: (rule: any, value: any) => boolean | Error;
  }[];
}
```

## FormItem Props

| 名称     | 类型     | 默认值      | 描述                                                      |
| -------- | -------- | ----------- | --------------------------------------------------------- |
| label    | `String` | `undefined` | 标签信息                                                  |
| feedback | `String` | `undefined` | 表项的反馈信息。不设为 undefined 时，会覆盖规则验证的结果 |
| path     | `String` | `undefined` | 将值收集到外层表单 model 对象的路径                       |
