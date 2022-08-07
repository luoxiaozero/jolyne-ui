import { h, defineComponent, computed, CSSProperties } from "vue";
import { useTheme } from "../..";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const layoutSiderProps = {
  bordered: Boolean,
  boxShadow: {
    type: Boolean,
    default: true,
  },
}
export type LayoutSiderProps = ExtractPublicPropTypes<typeof layoutSiderProps>

export default defineComponent({
  name: "LayoutSider",
  props: layoutSiderProps,
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.layout.backgroundColorSider,
          "--border-color": theme.value.input.borderColor,
          "--box-shadow-sider": theme.value.layout.boxShadowSider,
        };
      }),
    };
  },
  render() {
    return (
      <div
        class={[
          "jo-layout-sider",
          {
            "jo-layout-sider--bordered": this.$props.bordered,
            "jo-layout-sider--box-shadow": this.boxShadow,
          },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
