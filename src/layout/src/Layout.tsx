import { h, defineComponent, CSSProperties, PropType, computed } from "vue";
import { useTheme, JoScrollbar } from "../..";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";

const layoutProps = {
  hasSider: Boolean,
  position: {
    type: String as PropType<"static" | "absolute">,
    default: "static",
  },
}
export type LayoutProps = ExtractPublicPropTypes<typeof layoutProps>
export type LayoutContentProps = ExtractPublicPropTypes<typeof layoutProps>

export default createLayoutComponent(false);
export function createLayoutComponent(isContent: boolean) {
  return defineComponent({
    name: isContent ? "LayoutContent" : "Layout",
    props: layoutProps,
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
            "--background-color": theme.value.layout.backgroundColor,
          };
        }),
      };
    },
    render() {
      return (
        <div
          class={[
            "jo-layout",
            `jo-layout--${this.position}-positioned`,
            { "jo-layout-content": isContent },
          ]}
          style={this.cssVars as CSSProperties}
        >
          <JoScrollbar
            contentStyle={this.hasSider ? this.hasSiderStyle : undefined}
          >
            {this.$slots.default?.()}
          </JoScrollbar>
        </div>
      );
    },
  });
}
