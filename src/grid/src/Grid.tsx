import { h, defineComponent, InjectionKey, provide } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/Grid.css";
interface GridApiInjection {
  xGap: Number;
}
export const gridApiInjectionKey: InjectionKey<GridApiInjection> =
  Symbol("gridApi");

const gridProps = {
  cols: { type: Number, default: 1 },
  xGap: { type: Number, default: 0 },
  yGap: { type: Number, default: 0 },
}
export type GridProps = ExtractPublicPropTypes<typeof gridProps>
export default defineComponent({
  name: "Grid",
  props: gridProps,
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
          gridGap: `${this.yGap}px ${this.xGap}px`,
        }}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
