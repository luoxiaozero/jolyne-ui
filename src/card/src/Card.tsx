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
    boxShadow: {
      type: Boolean,
      default: true,
    },
    segmented: String as PropType<"header" | "content" | "footer">,
    headerStyle: [Object, String] as PropType<CSSProperties | string>,
    contentStyle: [Object, String] as PropType<CSSProperties | string>,
    footerStyle: [Object, String] as PropType<CSSProperties | string>,
  },
  setup() {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard,
          "--border-color": theme.value.card.borderColor,
          "--box-shadow": theme.value.card.boxShadow,
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
