import { CSSProperties, defineComponent, PropType } from "vue";
import "./styles/index.css";

export default defineComponent({
  name: "Avatar",
  props: {
    src: String,
    circle: Boolean,
    size: {
      type: [String, Number] as PropType<number | "medium">,
      default: "medium",
    },
  },
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
