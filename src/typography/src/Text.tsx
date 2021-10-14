import { useTheme } from "../../components";
import { h, defineComponent, CSSProperties, computed } from "vue";
import "./styles/Text.css";

export default defineComponent({
  name: "Text",
  props: {
    code: Boolean,
  },
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
