import { h, defineComponent, computed, CSSProperties } from "vue";
import { useTheme } from "../..";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const layoutHeaderProps = {
  bordered: Boolean,
  boxShadow: Boolean,
}
export type LayoutHeaderProps = ExtractPublicPropTypes<typeof layoutHeaderProps>

export default defineComponent({
  name: "LayoutHeader",
  props: layoutHeaderProps,
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard,
          "--border-color": theme.value.input.borderColor,
          "--shadow-color": theme.value.layout.shadowColor, 
        };
      }),
    };
  },
  render() {
    return (
      <div
        class={[
          "jo-layout-header",
          {
            "jo-layout-header--bordered": this.$props.bordered,
            "jo-layout-header--shadow": this.boxShadow,
          },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
