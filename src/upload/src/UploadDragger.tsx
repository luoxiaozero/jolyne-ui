import { useTheme } from "../../_mixins/use-theme";
import { h, computed, CSSProperties, defineComponent } from "vue";

export default defineComponent({
  name: "UploadDragger",
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        const { borderColor, backgroundColor, fontColor } = theme.value.input;
        return {
          "--border-color": borderColor,
          "--background-color": backgroundColor,
          "--font-color": fontColor,
        };
      }),
    };
  },
  render() {
    return (
      <div class="jo-upload-dragger" style={this.cssVars as CSSProperties}>
        {this.$slots.default?.()}
      </div>
    );
  },
});
