import {
  h,
  computed,
  CSSProperties,
  defineComponent,
  renderSlot,
  PropType,
} from "vue";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/index.css";
export default defineComponent({
  name: "Card",
  props: {
    title: String,
    bordered: {
      type: Boolean,
      default: false,
    },
    borderRadius: {
      type: [String, Number] as PropType<number | "small" | "medium" | "large" | "base">,
      default: "base",
    },
    boxShadow: {
      type: Boolean,
      default: true,
    },
    segmented: String as PropType<"header" | "content" | "footer">,
    headerStyle: [Object, String] as PropType<CSSProperties | string>,
    contentStyle: [Object, String] as PropType<CSSProperties | string>,
    footerStyle: [Object, String] as PropType<CSSProperties | string>,
  },
  setup(props) {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        let borderRadius = "0px";
        if (typeof props.borderRadius === "number") {
          borderRadius = props.borderRadius + "px";
        } else {
          borderRadius = Reflect.get(theme.value.common, `borderRadius${props.borderRadius.toUpperCase().slice(0, 1) + props.borderRadius.slice(1)}`) || theme.value.common.borderRadius;
        }
        return {
          "--background-color": theme.value.common.neutralCard,
          "--border-color": theme.value.card.borderColor,
          "--box-shadow": theme.value.card.boxShadow,
          "--border-radius": borderRadius,
        };
      }),
    };
  },
  render() {
    return (
      <div
        class={[
          "jo-card",
          {
            "jo-card--bordered": this.bordered,
            "jo-card--box-shadow": this.boxShadow,
            [`jo-card--segmented-${this.segmented}`]: this.segmented,
          },
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots.header || this.title ? (
          <div class="jo-card__header" style={this.headerStyle}>
            <div class="jo-card__header-content">
              {renderSlot(this.$slots, "header", {}, () => [this.title])}
            </div>
            {this.$slots["header-extra"] ? (
              <div class="jo-card__header-extra">{renderSlot(this.$slots, "header-extra", {})}</div>
            ) : null}
          </div>
        ) : null}
        <div class="jo-card__content" style={this.contentStyle}>
          {this.$slots.default?.()}
        </div>
        {this.$slots.footer ? (
          <div class="jo-card__footer" style={this.footerStyle}>
            {this.$slots.footer?.()}
          </div>
        ) : null}
      </div>
    );
  },
});
