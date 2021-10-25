# 数据表格 DataTable

## 演示

<!--single-column-->

```demo
basis
render
```

## Props

| 名称    | 类型              | 默认值      | 描述           |
| ------- | ----------------- | ----------- | -------------- |
| columns | `ColumnsType[]`   | `undefined` | 需要展示的列   |
| data    | `TableDataType[]` | `undefined` | 需要展示的数据 |

### ColumnsType

```ts
interface ColumnsType {
  key: string;
  title: string | ((column: ColumnsType) => VNodeChild);
  render?: (row: TableDataType) => VNodeChild;
}
```

### TableDataType

```ts
interface TableDataType {
  [key: string]: any;
}
```
