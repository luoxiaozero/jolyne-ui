import { h, defineComponent, PropType, computed, CSSProperties } from "vue";
import { toFirstLetterUpper } from "../../util";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/TimelineItem.css";

export default defineComponent({
  name: "TimelineItem",
  props: {
    title: String,
    time: String,
    type: {
      type: String as PropType<
        "default" | "info" | "success" | "error" | "warning"
      >,
      default: "deafult",
    },
  },
  setup(props) {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        const borderColorCircle =
          Reflect.get(
            theme.value.common,
            `color${toFirstLetterUpper(props.type)}`
          ) || theme.value.timeline.borderColorCircle;
        return {
          "--font-size-time": theme.value.common.fontSizeTiny,
          "--font-color-time": theme.value.common.colorFont3,
          "--background-color-line": theme.value.timeline.backgroundColorLine,
          "--border-color-circle": borderColorCircle,
        } as CSSProperties;
      }),
    };
  },
  render() {
    return (
      <div class="jo-timeline-item" style={this.cssVars}>
        <div class="jo-timeline-item__timeline">
          <div class="jo-timeline-item__circle"></div>
          <div class="jo-timeline-item__line"></div>
        </div>
        <div class="jo-timeline-item__content">
          <div>{this.title}</div>
          <div class="jo-timeline-item__time">{this.time}</div>
          <div class="jo-timeline-item__slot">{this.$slots.default?.()}</div>
        </div>
      </div>
    );
  },
});
