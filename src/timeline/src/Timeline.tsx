import { h, defineComponent } from "vue";
import "./styles/Timeline.css";

export default defineComponent({
  name: "Timeline",
  props: {
    horizontal: Boolean,
  },
  render() {
    return (
      <div
        class={["jo-timeline", { "jo-timeline--horizontal": this.horizontal }]}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
