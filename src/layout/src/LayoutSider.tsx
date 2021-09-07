import { h, defineComponent, computed, CSSProperties } from "vue";
import { useTheme } from "../..";

export default defineComponent({
  name: "LayoutSider",
  props: {
    bordered: Boolean,
  },
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard,
          "--border-color": theme.value.input.borderColor,
        };
      }),
    };
  },
  render() {
    return (
      <div
        class={[
          "jo-layout-sider",
          { "jo-layout-sider--bordered": this.$props.bordered },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
