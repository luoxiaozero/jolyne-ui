import { h, defineComponent, computed, CSSProperties } from "vue";
import { useTheme } from "../..";
import "./styles/index.css";

export default defineComponent({
  name: "Table",
  props: {
    singleRow: Boolean,
    singleColumn: Boolean,
  },
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          "--border-color": theme.value.table.borderColor,
          "--background-color-th": theme.value.table.backgroundColorTh,
          "--background-color-td": theme.value.common.neutralCard,
        };
      }),
    };
  },
  render() {
    return (
      <table
        class={["jo-table", { "jo-table--single-row": this.singleRow, "jo-table--single-column": this.singleColumn }]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots.default?.()}
      </table>
    );
  },
});
