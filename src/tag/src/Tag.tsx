import { useTheme } from "../../_mixins/use-theme";
import { h, computed, CSSProperties, defineComponent, PropType } from "vue";
import "./styles/index.css";
export default defineComponent({
  name: "Tag",
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
    onClose: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props) {
    const theme = useTheme();
    function handleCloseClick(e: MouseEvent): void {
      if (props.onClose) props.onClose(e);
    }
    return {
      handleCloseClick,
      cssVars: computed(() => {
        const { backgroundColor } = theme.value.tag;
        return {
          "--background-color": backgroundColor,
        };
      }),
    };
  },
  render() {
    return (
      <div class="jo-tag" style={this.cssVars as CSSProperties}>
        <span class="jo-tag__content">{this.$slots.default?.()}</span>
        {this.$props.closable ? (
          <span class="jo-tag__close" onClick={this.handleCloseClick}>
            x
          </span>
        ) : null}
      </div>
    );
  },
});
