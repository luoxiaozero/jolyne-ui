import { useTheme } from "../../_mixins/use-theme";
import {
  h,
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  renderSlot,
} from "vue";
import "./styles/index.css";
export type Type =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "error";
export default defineComponent({
  name: "Button",
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: "button",
    },
    type: {
      type: String as PropType<Type>,
      default: "default",
    },
    /**禁用 */
    disabled: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props) {
    const theme = useTheme();
    function handleClick(e: MouseEvent): void {
      if (props.onClick) {
        props.onClick(e);
      }
    }
    return {
      cssVars: computed(() => {
        const { borderColor, fontColor, fontColorInvert } = theme.value.button;
        return {
          "--border-color": borderColor,
          "--font-color": fontColor,
          "--font-color-invert": fontColorInvert,
        };
      }),
      handleClick,
    };
  },
  render() {
    const { $slots, tag: Component } = this;
    return (
      <Component
        class={[
          "jo-button",
          `jo-button--${this.type}-type`,
          {
            ["jo-button--disabled"]: this.$props.disabled,
          },
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
        disabled={this.$props.disabled}
      >
        {$slots.default ? (
          <span class={`jo-button__content`}>
            {renderSlot(this.$slots, "default")}
          </span>
        ) : null}
      </Component>
    );
  },
});
