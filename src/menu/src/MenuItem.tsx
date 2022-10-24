import { h, defineComponent, PropType, computed, VNodeChild, CSSProperties } from "vue";
import { useMenu } from "..";
import MenuGroup, { MenuGroupType } from "./MenuGroup";
import render from "../../util/render";
import "./styles/MenuItem.css";
import { useTheme } from "jolyne-ui";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
export interface MenuItemType {
  type?: "item";
  label: string;
  extra?: string | (() => VNodeChild);
  key: string;
  children?: Array<MenuGroupType | MenuItemType>;
}

const menuItemProps = {
  option: {
    type: Object as PropType<MenuItemType>,
    required: true as true,
  },
}
export type MenuItemProps = ExtractPublicPropTypes<typeof menuItemProps>

const MenuItem = defineComponent({
  name: "MenuItem",
  props: menuItemProps,
  setup(props) {
    const theme = useTheme();
    const menu = useMenu();
    let selectedRef = computed(() => {
      if (menu.key.value === props.option.key) {
        return true;
      } else {
        return false;
      }
    });
    function handleClick(e: MouseEvent): void {
      if (!selectedRef.value) menu.toggleExpand(props.option);
    }
    return {
      selectedRef,
      handleClick,
      cssVars: computed(() => {
        return { "--font-color-extra": theme.value.common.colorFont4 };
      }),
    };
  },
  render() {
    return (
      <div class="jo-menu-item" style={this.cssVars as CSSProperties}>
        <div
          class={[
            "jo-menu-item__content",
            { "jo-menu-item__content--selected": this.selectedRef },
          ]}
          onClick={this.handleClick}
        >
          {this.option.label}
          {this.option.extra ? (
            <span class="jo-menu-item__content-extra">
              {render(this.option.extra)}
            </span>
          ) : null}
        </div>
        {this.option.children ? (
          <div class="jo-menu-item__children">
            {this.option.children.map((option) => {
              if (option.type && option.type === "group") {
                return <MenuGroup option={option} />;
              } else {
                return <MenuItem option={option} />;
              }
            })}
          </div>
        ) : null}
      </div>
    );
  },
});
export default MenuItem;
