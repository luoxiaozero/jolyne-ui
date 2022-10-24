import { h, defineComponent, PropType, VNodeChild } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import { TableDataType } from "./DataTable";

export interface ColumnsType {
  key: string;
  title: string | ((column: ColumnsType) => VNodeChild);
  render?: (row: TableDataType) => VNodeChild;
}

const dataTableHeadProps = {
  columns: Array as PropType<ColumnsType[]>,
}
export type DataTableHeadProps = ExtractPublicPropTypes<typeof dataTableHeadProps>

export default defineComponent({
  name: "DataTableHead",
  props: dataTableHeadProps,
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
