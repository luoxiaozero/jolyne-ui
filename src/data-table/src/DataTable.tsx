import { h, defineComponent, PropType, computed, CSSProperties } from "vue";
import DateTableHead, { ColumnsType } from "./DataTableHead";
import DateTableBody from "./DataTableBody";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import "./styles/DataTable.css";
import { useTheme } from "../../components";
export interface TableDataType {
  [key: string]: any;
}
export default defineComponent({
  name: "DataTable",
  props: {
    columns: Array as PropType<ColumnsType[]>,
    data: Array as PropType<TableDataType[]>,
  },
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          "--border-color": theme.value.table.borderColor,
          "--background-color-th": theme.value.table.backgroundColorTh,
          "--background-color-td": theme.value.common.neutralCard,
        } as CSSProperties;
      }),
    };
  },
  render() {
    return (
      <div class="jo-data-table" style={this.cssVars}>
        <table class="jo-data-table__table">
          <DataTableHead columns={this.columns} />
          <DataTableBody columns={this.columns} data={this.data} />
        </table>
      </div>
    );
  },
});
