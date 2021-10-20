import { h, defineComponent, inject, computed, CSSProperties } from "vue";
import { useTheme } from "../../_mixins/use-theme";
import { JoIcon } from "../../icon";
import { Checkmark, Close } from "@vicons/ionicons5";
import { stepsApiInjectionKey } from "./Steps";

export default defineComponent({
  name: "Step",
  props: {
    title: String,
    description: String,
    /**由父类填充 */
    internalIndex: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const theme = useTheme();
    const stepsApi = inject(stepsApiInjectionKey);
    const status = computed(() => {
      if (stepsApi && stepsApi.stepsProps.current) {
        if (stepsApi.stepsProps.current > props.internalIndex) {
          // 完成
          return "finish";
        } else if (
          stepsApi.stepsProps.current === props.internalIndex &&
          stepsApi.stepsProps.status
        ) {
          return stepsApi.stepsProps.status;
        } else {
          return "wait";
        }
      }
      return "wait";
    });
    return {
      status,
      cssVars: computed(() => {
        let color = theme.value.common.colorFont3;
        let colorState = color;
        let bgCircle, colorCircle;
        switch (status.value) {
          case "finish":
            colorCircle = colorState = theme.value.common.colorSuccess;
            break;
          case "error":
            colorCircle = colorState = color = theme.value.common.colorError;
            break;
          case "process":
            color = theme.value.common.colorFont1;
            colorCircle = "#fff";
            bgCircle = theme.value.common.colorSuccess;
            break;
          case "wait":
            colorCircle = colorState = theme.value.common.colorFont3;
            break;
        }
        return {
          "--color-state": colorState,
          "--color-circle": colorCircle,
          "--background-color-circle": bgCircle,
          color,
        } as CSSProperties;
      }),
    };
  },
  render() {
    const circle = (status: "finish" | "process" | "error" | "wait") => {
      switch (status) {
        case "finish":
          return (
            <JoIcon size={20}>
              <Checkmark />
            </JoIcon>
          );
        case "error":
          return (
            <JoIcon size={20}>
              <Close />
            </JoIcon>
          );
        case "wait":
          return this.internalIndex;
      }
      return this.internalIndex;
    };
    return (
      <div class="jo-step" style={this.cssVars}>
        <div class="jo-step__circle">{circle(this.status)}</div>
        <div class="jo-step__content">
          <div class="jo-step__header">
            <div class="jo-step__title">{this.title}</div>
            <div class="jo-step__line"></div>
          </div>
          <div class="jo-step__description">{this.description}</div>
        </div>
      </div>
    );
  },
});
