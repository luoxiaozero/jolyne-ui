import { defineComponent, Teleport, PropType, computed, CSSProperties } from "vue";
import { useTheme } from "../_mixins/use-theme";
import "./styles/index.css";
export default defineComponent({
  name: "Dialog",
  props: {
    type: {
      type: String as PropType<
        "info" | "success" | "warning" | "error" | "default"
      >,
      default: "default",
    },
    title: String,
    negativeText: String,
    positiveText: String,
    content: String,
    onPositiveClick: Function as PropType<() => boolean>,
    onNegativeClick: Function as PropType<() => boolean>,
    onClose: Function as PropType<() => boolean>,
    internalKey: {
      type: String,
      required: true,
    },
    onInternalAfterLeave: Function as PropType<(key: string) => void>,
  },
  setup(props) {
    const theme = useTheme();
    function hide() {
      props.onInternalAfterLeave &&
        props.onInternalAfterLeave(props.internalKey);
    }
    function handCloseClick() {
      if (props.onClose) {
        if (props.onClose() !== false) {
          hide();
        }
      } else {
        hide();
      }
    }
    function handNegativeClick() {
      if (props.onNegativeClick) {
        if (props.onNegativeClick() !== false) {
          hide();
        }
      } else {
        hide();
      }
    }
    function handPositiveClick() {
      if (props.onPositiveClick) {
        if (props.onPositiveClick() !== false) {
          hide();
        }
      } else {
        hide();
      }
    }
    return {
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard
        };
      }),
      handCloseClick,
      handNegativeClick,
      handPositiveClick,
    };
  },
  render() {
    return (
      <Teleport to="body">
        <div class="jo-dialog" style={ this.cssVars as CSSProperties }>
          <div class="jo-dialog__header">
            <span class={["jo-dialog__title", `jo-dialog--${this.$props.type}-type`]}>{this.$props.title}</span>
            <span class="jo-dialog__head-close" onClick={this.handCloseClick}>
              x
            </span>
          </div>
          <div class="jo-dialog__main">{this.$props.content}</div>
          <div class="jo-dialog__footer">
            <span class="jo-dialog__close" onClick={this.handNegativeClick}>
              {this.$props.negativeText}
            </span>
            <span class="jo-dialog__determine" onClick={this.handPositiveClick}>
              {this.$props.positiveText}
            </span>
          </div>
        </div>
        <div class="jo-dialog__mask"></div>
      </Teleport>
    );
  },
});
