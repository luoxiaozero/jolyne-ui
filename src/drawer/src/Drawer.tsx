import {
  h,
  defineComponent,
  Teleport,
  PropType,
  computed,
  CSSProperties,
} from "vue";
import { useTheme } from "../..";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";

const drawerProps = {
  placement: String as PropType<"up" | "down" | "left" | "right">,
  show: Boolean,
  "onUpdate:show": Function as PropType<(value: boolean) => void>,
  onUpdateShow: Function as PropType<(value: boolean) => void>,
}
export type DrawerProps = ExtractPublicPropTypes<typeof drawerProps>

export default defineComponent({
  name: "Drawer",
  props: drawerProps,
  setup(props) {
    const theme = useTheme();
    function doUpdateShow(show: boolean): void {
      const { "onUpdate:show": _onUpdateShow, onUpdateShow } = props;
      if (_onUpdateShow) _onUpdateShow(show);
      if (onUpdateShow) onUpdateShow(show);
    }
    function handleClick() {
      doUpdateShow(false);
    }
    return {
      handleClick,
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard,
        };
      }),
    };
  },
  render() {
    if (!this.show) return null;
    return (
      <Teleport to="body">
        <div
          style={this.cssVars as CSSProperties}
          class={[
            "jo-drawer",
            {
              [`jo-drawer--${this.placement}`]: this.placement
            },
          ]}
        >
          <div class="jo-drawer__header">{this.$slots.header?.()}</div>
          <div class="jo-drawer__content">{this.$slots.content?.()}</div>
        </div>
        <div class="jo-drawer-mask" onClick={this.handleClick}></div>
      </Teleport>
    );
  },
});
