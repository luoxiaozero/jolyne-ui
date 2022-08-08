import {
  h,
  defineComponent,
  Teleport,
  PropType,
  computed,
  CSSProperties,
} from "vue";
import { useTheme } from "../../_mixins/use-theme";
import { JoIcon } from "../../icon";
import { JoButton } from "../../button";
import { Close as CloseIcon } from "@vicons/ionicons5";
import "./styles/index.css";
import createTipIcon from "../../_common/TipIcon";
import { toFirstLetterUpper } from "../../util";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const dialogProps = {
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
}
export type DialogProps = ExtractPublicPropTypes<typeof dialogProps>

export default defineComponent({
  name: "Dialog",
  props: dialogProps,
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
          "--color-icon": Reflect.get(
            theme.value.common,
            `color${toFirstLetterUpper(props.type)}`
          ),
          "--background-color": theme.value.common.neutralCard,
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
        <div class="jo-dialog" style={this.cssVars as CSSProperties}>
          <div class="jo-dialog__header">
            <span style={"display: inline-flex"}>
              {createTipIcon(this.type, {
                size: 22,
                className: "jo-dialog__icon",
                color: this.cssVars["--color-icon"],
              })}
              <span
                class={[
                  "jo-dialog__title",
                  `jo-dialog--${this.$props.type}-type`,
                ]}
              >
                {this.$props.title}
              </span>
            </span>

            <span class="jo-dialog__head-close" onClick={this.handCloseClick}>
              <JoIcon size={18}>
                <CloseIcon />
              </JoIcon>
            </span>
          </div>
          <div class="jo-dialog__main">{this.$props.content}</div>
          <div class="jo-dialog__footer">
            <JoButton text onClick={this.handNegativeClick}>
              {this.$props.negativeText}
            </JoButton>
            <JoButton
              class="jo-dialog__positive"
              text
              onClick={this.handPositiveClick}
              type={this.type}
            >
              {this.$props.positiveText}
            </JoButton>
          </div>
        </div>
        <div class="jo-dialog__mask"></div>
      </Teleport>
    );
  },
});
