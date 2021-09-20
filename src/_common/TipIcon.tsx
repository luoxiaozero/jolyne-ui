import { h } from "vue";
import { JoIcon } from "../icon";
import {
  InformationCircle,
  CloseCircle,
  CheckmarkCircle,
  AlertCircle,
  NotificationsCircle,
} from "@vicons/ionicons5";

/**
 * 创建类型图标
 * @param type 图表类型
 * @param option {size 图标大小, color 图标颜色, className 图标 DOM classNames}
 * @returns
 */
export default function createTipIcon(
  type: "default" | "info" | "success" | "warning" | "error",
  option?: { size?: number; color?: string; className?: any }
) {
  return (
    <JoIcon class={option?.className} size={option?.size} color={option?.color}>
      {() => {
        switch (type) {
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
  );
}
