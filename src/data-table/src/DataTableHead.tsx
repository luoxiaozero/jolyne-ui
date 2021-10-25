import { h, defineComponent, PropType, VNodeChild } from "vue";
import { TableDataType } from "./DataTable";

export interface ColumnsType {
  key: string;
  title: string | ((column: ColumnsType) => VNodeChild);
  render?: (row: TableDataType) => VNodeChild;
}

export default defineComponent({
  name: "DataTableHead",
  props: {
    columns: Array as PropType<ColumnsType[]>,
  },
  render() {
    return (
      <thead>
        <tr>
          {this.columns?.map((col) => {
            return (
              <th>
                {typeof col.title === "string" ? col.title : col.title(col)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  },
});
