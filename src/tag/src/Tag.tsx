import { useTheme } from "../../_mixins/use-theme";
import { h, computed, CSSProperties, defineComponent, PropType } from "vue";
import "./styles/index.css";
import { toFirstLetterUpper } from "../../util";
import createTipIcon from "../../_common/TipIcon";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
const tagProps = {
  type: {
    type: String as PropType<
      "default" | "info" | "success" | "warning" | "error"
    >,
    default: "default",
  },
  closable: {
    type: Boolean,
    default: false,
  },
  onClose: Function as PropType<(e: MouseEvent) => void>,
}
export type TagProps = ExtractPublicPropTypes<typeof tagProps>
export default defineComponent({
  name: "Tag",
  props: tagProps,
  setup(props) {
    const theme = useTheme();
    function handleCloseClick(e: MouseEvent): void {
      if (props.onClose) props.onClose(e);
    }
    return {
      handleCloseClick,
      cssVars: computed(() => {
        const fontColor =
          Reflect.get(
            theme.value.common,
            `color${toFirstLetterUpper(props.type)}`
          ) || "inherit";
        const backgroundColor =
          Reflect.get(
            theme.value.common,
            `colorBg${toFirstLetterUpper(props.type)}`
          ) || theme.value.tag.backgroundColor;
        return {
          "--font-color": fontColor,
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
          <span onClick={this.handleCloseClick} class="jo-tag__close">
            {createTipIcon("close")}
          </span>
        ) : null}
      </div>
    );
  },
});
