import { h, defineComponent } from "vue";
import "./styles/ButtonGroup.css";

export default defineComponent({
  name: "ButtonGroup",
  props: {
    vertical: Boolean,
  },
  render() {
    return (
      <div
        class={[
          "jo-button-group",
          { "jo-button-group--vertical": this.vertical },
        ]}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
