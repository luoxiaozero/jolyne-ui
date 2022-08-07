import { h, defineComponent, computed, PropType } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/Icon.css";

const iconProps = {
  size: [Number, Array] as PropType<number | [number, number]>,
  color: String,
}
export type IconProps = ExtractPublicPropTypes<typeof iconProps>

export default defineComponent({
  name: "Icon",
  props: {
    size: [Number, Array] as PropType<number | [number, number]>,
    color: String,
  },
  setup(props) {
    return {
      mergedStyle: computed(() => {
        let width, height;
        if (typeof props.size === "number") {
          width = height = props.size + "px";
        } else if (typeof props.size === "object") {
          width = props.size[0] + "px";
          height = props.size[1] + "px";
        }
        return {
          lineHeight: height,
          width,
          height,
          color: props.color,
        };
      }),
    };
  },
  render() {
    return (
      <span class="jo-icon" style={this.mergedStyle}>
        {this.$slots.default?.()}
      </span>
    );
  },
});
