import { h, defineComponent, computed, CSSProperties } from "vue";
import { useTheme } from "../..";

export default defineComponent({
  name: "LayoutSider",
  props: {
    bordered: Boolean,
    boxShadow: {
      type: Boolean,
      default: true,
    },
  },
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
