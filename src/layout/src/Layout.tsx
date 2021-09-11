import { h, defineComponent, CSSProperties, PropType, computed } from "vue";
import { useTheme, JoScrollbar } from "../..";
import "./styles/index.css";

export default defineComponent({
  name: "Layout",
  props: {
    hasSider: Boolean,
    position: {
      type: String as PropType<"static" | "absolute">,
      default: "static",
    },
  },
  setup() {
    const theme = useTheme();
    const hasSiderStyle: CSSProperties = {
      display: "flex",
      flexWrap: "nowrap",
      width: "100%",
      flexDirection: "row",
    };
    return {
      hasSiderStyle,
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralBody,
        };
      }),
    };
  },
  render() {
    return (
      <div
        class={["jo-layout", `jo-layout--${this.position}-positioned`]}
        style={this.cssVars as CSSProperties}
      >
        <JoScrollbar style={this.hasSider ? this.hasSiderStyle : undefined}>
          {this.$slots.default?.()}
        </JoScrollbar>
      </div>
    );
  },
});