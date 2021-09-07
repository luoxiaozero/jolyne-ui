import { h, defineComponent } from "@vue/runtime-core";
import { computed, CSSProperties } from "vue";
import { useTheme } from "../..";

export default defineComponent({
  name: "LayoutHeader",
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
        }
      })
    };
  },
  render() {
    return (
      <div
        class={[
          "jo-layout-header",
          { "jo-layout-header--bordered": this.$props.bordered },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});