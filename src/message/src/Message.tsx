import { h, defineComponent, createTextVNode, computed, CSSProperties } from "vue";
import { messageProps } from "./message-props";
import {
  CloseCircleOutline as ErrorIcon,
  CheckmarkCircleOutline as SuccessIcon,
  InformationCircleOutline as InfoIcon,
  AlertCircleOutline as WarningIcon,
  EllipseOutline as LoadingIcon
} from "@vicons/ionicons5";
import { useTheme } from "jolyne-ui";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
const iconMap = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  loading: <LoadingIcon />,
};


export type MessageProps = ExtractPublicPropTypes<typeof messageProps>

export default defineComponent({
  name: "Message",
  props: messageProps,
  setup() {
    const theme = useTheme();
    return {
      icon: iconMap,
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard, 
        }
      })
    };
  },
  render() {
    const { content, type } = this;
    return (
      <div class={`jo-message-wrapper`} style={this.cssVars as CSSProperties}>
        <div class={`jo-message jo-message--${type}-type`}>
          <div class={`jo-message__icon`}>{iconMap[type]}</div>
          <div class={`jo-message__content`}>{createTextVNode(content)}</div>
        </div>
      </div>
    );
  },
});
