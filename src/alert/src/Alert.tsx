import { h, defineComponent, renderSlot, computed, CSSProperties, PropType, ExtractPropTypes } from "vue";
import { JoIcon } from "../../icon";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/index.css";
import {
  InformationCircle,
  CloseCircle,
  CheckmarkCircle,
  AlertCircle,
  NotificationsCircle,
} from "@vicons/ionicons5";
import { toFirstLetterUpper } from "../../util";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const alertProps = {
  title: String,
  type: {
    type: String as PropType<
      "default" | "info" | "success" | "warning" | "error"
    >,
    default: "default",
  },
}

export type AlertProps = ExtractPublicPropTypes<typeof alertProps>

export default defineComponent({
  name: "Alert",
  props: alertProps,
  setup(props) {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        const backgroundColor =
          Reflect.get(theme.value.alert, `${props.type}BackgroundColor`) ||
          theme.value.alert.backgroundColor;
        return {
          "--color-icon": Reflect.get(theme.value.common, `color${toFirstLetterUpper(props.type)}`),
          "--background-color": backgroundColor,
          "--border":
            Reflect.get(theme.value.alert, `${props.type}Border`) ||
            theme.value.alert.border,
        };
      }),
    };
  },

  render() {
    return (
      <div class="jo-alert" style={this.cssVars as CSSProperties}>
        <JoIcon
          class="jo-alert__icon"
          size={26}
          color={this.cssVars["--color-icon"]}
        >
          {() => {
            switch (this.type) {
              case "info":
                return <InformationCircle />;
              case "warning":
                return <AlertCircle />;
              case "success":
                return <CheckmarkCircle />;
              case "error":
                return <CloseCircle />;
              default:
                return <NotificationsCircle />;
            }
          }}
        </JoIcon>
        <div class="jo-alert__body">
          <div class="jo-alert__header">
            {renderSlot(this.$slots, "son-header", {}, () => [this.title])}
          </div>
          <div>{this.$slots.default?.()}</div>
        </div>
      </div>
    );
  },
});
