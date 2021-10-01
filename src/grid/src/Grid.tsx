import { h, defineComponent, InjectionKey, provide } from "vue";
import "./styles/Grid.css";
interface GridApiInjection {
  xGap: Number;
}
export const gridApiInjectionKey: InjectionKey<GridApiInjection> =
  Symbol("gridApi");
export default defineComponent({
  name: "Grid",
  props: {
    cols: { type: Number, default: 1 },
    xGap: { type: Number, default: 0 },
    yGap: { type: Number, default: 0 },
  },
  setup(props) {
    provide(gridApiInjectionKey, {
      xGap: props.xGap,
    });
  },
  render() {
    return (
      <div
        class="jo-grid"
        style={{
          gridTemplateColumns: `repeat(${this.cols}, minmax(0px, 1fr))`,
          gridGap: `${this.xGap}px ${this.yGap}px`,
        }}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
