import { h, CSSProperties, defineComponent, PropType } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";

const avatarProps = {
  src: String,
  circle: Boolean,
  size: {
    type: [String, Number] as PropType<number | "medium">,
    default: "medium",
  },
}
export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

export default defineComponent({
  name: "Avatar",
  props: avatarProps,
  setup(props) {
    let size: string;
    if (typeof props.size === "number") {
      size = `${props.size}px`;
    } else {
      size = "30px";
    }
    return {
      cssVars: {
        "--size": size,
        "--border-radius": props.circle ? "50%" : "3px",
      },
    };
  },
  render() {
    return (
      <span class="jo-avatar" style={this.cssVars as CSSProperties}>
        {this.$props.src ? <img src={this.$props.src} /> : null}
      </span>
    );
  },
});
