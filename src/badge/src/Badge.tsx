import { h, defineComponent, computed, CSSProperties, PropType } from "vue";
import { useTheme } from "../..";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";

const badgeProps = {
  type: {
    type: String as PropType<
      "default" | "error" | "info" | "success" | "warning"
    >,
    default: "default"
  },
  value: Number,
  maxValue: Number,
  dot: Boolean,
}
export type BadgeProps = ExtractPublicPropTypes<typeof badgeProps>

export default defineComponent({
  name: "Badge",
  props: badgeProps,
  setup(props) {
    const theme = useTheme();
    return {
      valueRef: computed(() => {
        if (!(props.value || props.maxValue)) {
          return null;
        }
        if (!props.maxValue) {
          return props.value;
        }
        if (!props.value || props.value <= 0) {
          return null;
        }
        return props.value > props.maxValue
          ? `${props.maxValue}+`
          : props.value;
      }),
      cssVars: computed(() => {
        const backgroundColor =
          Reflect.get(theme.value.badge, `${props.type}BackgroundColor`) ||
          theme.value.badge.BackgroundColor;
        return {
          "--background-color": backgroundColor,
          "--font-color": theme.value.common.fontColor,
        };
      }),
    };
  },
  render() {
    return (
      <div class="jo-badge" style={this.cssVars as CSSProperties}>
        <div
          class={[
            "jo-badge__sup",
            {
              "jo-badge__sup--value": !this.dot && this.valueRef,
              "jo-badge__sup--dot": this.dot,
            },
          ]}
        >
          {this.valueRef}
        </div>
        {this.$slots.default?.()}
      </div>
    );
  },
});
