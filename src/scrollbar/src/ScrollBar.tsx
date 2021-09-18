import { h, defineComponent, PropType, CSSProperties } from "vue";
import "./styles/index.css";
export default defineComponent({
  name: "ScrollBar",
  props: {
    /**滚动条默认样式功能 */
    scrollStyle: {
      type: String as PropType<"default" | "hidden" | "remove">,
      default: "hidden"
    },
    contentStyle: [String, Object] as PropType<CSSProperties | string>,
  },
  render() {
    return (
      <div class={`jo-scrollbar jo-scrollbar--${this.scrollStyle}`} style={this.contentStyle}>
        {this.$slots.default?.()}
      </div>
    );
  },
});
