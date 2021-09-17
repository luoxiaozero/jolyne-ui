import { h, defineComponent, PropType, CSSProperties } from "vue";
import "./styles/index.css";
export default defineComponent({
  name: "ScrollBar",
  props: {
    contentStyle: [String, Object] as PropType<CSSProperties | string>,
  },
  render() {
    return (
      <div class="jo-scrollbar">
        <div class="jo-scrollbar-content" style={this.contentStyle}>{this.$slots.default?.()}</div>
      </div>
    );
  },
});
