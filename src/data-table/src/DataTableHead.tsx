import { h, defineComponent, PropType } from "vue";

export interface ColumnsType {
  key: string;
  title: string;
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
            return <th>{col.title}</th>;
          })}
        </tr>
      </thead>
    );
  },
});
