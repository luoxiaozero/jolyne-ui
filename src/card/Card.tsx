import {
  computed,
  CSSProperties,
  defineComponent,
  renderSlot,
  PropType,
} from "vue";
import { useTheme } from "../_mixins/use-theme";
import "./styles/index.css";
export default defineComponent({
  name: "Card",
  props: {
    title: String,
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
        };
      }),
    };
  },
  render() {
    return (
      <div class="jo-card" style={this.cssVars as CSSProperties}>
        {this.$slots.header || this.title ? (
          <div class="jo-card__header" style={this.headerStyle}>
            {renderSlot(this.$slots, "header", {}, () => [this.title])}
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
