import { h, defineComponent } from "vue";
import "./styles/index.css";
export default defineComponent({
  name: "ScrollBar",
  render() {
    return <div class="jo-scrollbar">{this.$slots.default?.()}</div>;
  },
});
