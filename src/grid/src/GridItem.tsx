import { h, defineComponent, inject } from "vue";
import { gridApiInjectionKey } from "./Grid";

export default defineComponent({
  name: "GridItem",
  props: {
    span: { type: Number, default: 1 },
    offset: { type: Number, default: 0 },
  },
  setup(props) {
    const gridApi = inject(gridApiInjectionKey);
    const mergeXGap = (gridApi?.xGap || 0) as number;
    let marginLeft: string | undefined;
    if (props.offset > 0)
      marginLeft = `calc((100% - ${
        (props.span + props.offset - 1) * mergeXGap
      }px) / ${props.span + props.offset} * ${props.offset} + ${
        (props.offset - 1) * mergeXGap
      }px)`;
    console.log(marginLeft, props.offset);
    return {
      mergeStyle: {
        marginLeft,
        gridColumn: `span ${props.span + props.offset} / span ${
          props.span + props.offset
        }`,
      },
    };
  },
  render() {
    return (
      <div class="jo-grid-item" style={this.mergeStyle}>
        {this.$slots.default?.()}
      </div>
    );
  },
});
