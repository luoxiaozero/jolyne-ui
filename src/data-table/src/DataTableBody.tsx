import { h, defineComponent, PropType } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import { TableDataType } from "./DataTable";
import type { ColumnsType } from "./DataTableHead";

const dataTableBodyProps = {
  columns: Array as PropType<ColumnsType[]>,
  data: Array as PropType<TableDataType[]>,
}
export type DataTableBodyProps = ExtractPublicPropTypes<typeof dataTableBodyProps>

export default defineComponent({
  name: "DataTableBody",
  props: {
    columns: Array as PropType<ColumnsType[]>,
    data: Array as PropType<TableDataType[]>,
  },
  render() {
    return (
      <tbody>
        {this.data?.map((d) => {
          return (
            <tr>
              {this.columns?.map((col) => {
                return <td>{col.render ? col.render(d) : d[col.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  },
});
