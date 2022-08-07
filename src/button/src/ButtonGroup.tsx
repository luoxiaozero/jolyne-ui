import { h, defineComponent } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/ButtonGroup.css";

const buttonGroupProps = {
  vertical: Boolean,
}
export type ButtonGroupProps = ExtractPublicPropTypes<typeof buttonGroupProps>

export default defineComponent({
  name: "ButtonGroup",
  props: buttonGroupProps,
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
