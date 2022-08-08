import { useTheme } from "../../components";
import { h, defineComponent, CSSProperties, computed } from "vue";
import "./styles/Text.css";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
const textProps = {
  code: Boolean,
}
export type TextProps = ExtractPublicPropTypes<typeof textProps>
export default defineComponent({
  name: "Text",
  props: textProps,
  setup() {
      const theme = useTheme();
      return {
          cssVars: computed(() => {
              return {
                  "--background-color-code": theme.value.typography.backgroundColorCode,
              } as CSSProperties;
          })
      }
  },
  render() {
    return this.code ? (
      <code class="jo-text--code" style={this.cssVars}>{this.$slots.default?.()}</code>
    ) : (
      <span>{this.$slots.default?.()}</span>
    );
  },
});
