import { h, defineComponent, createTextVNode } from "vue";
import { messageProps } from "./message-props";
import {
  CloseCircleOutline as ErrorIcon,
  CheckmarkCircleOutline as SuccessIcon,
  InformationCircleOutline as InfoIcon,
  AlertCircleOutline as WarningIcon,
  EllipseOutline as LoadingIcon
} from "@vicons/ionicons5";
const iconMap = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  loading: <LoadingIcon />,
};
export default defineComponent({
  name: "Message",
  props: messageProps,
  setup() {
    return {
      icon: iconMap,
    };
  },
  render() {
    const { content, type } = this;
    return (
      <div class={`jo-message-wrapper`}>
        <div class={`jo-message jo-message--${type}-type`}>
          <div class={`jo-message__icon`}>{iconMap[type]}</div>
          <div class={`jo-message__content`}>{createTextVNode(content)}</div>
        </div>
      </div>
    );
  },
});
