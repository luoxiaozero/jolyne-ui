import { h, defineComponent, PropType } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import MenuItem, { MenuItemType } from "./MenuItem";
import "./styles/MenuGroup.css";
export interface MenuGroupType {
  type: "group";
  label: string;
  key: string;
  children?: MenuItemType[];
}

const menuGroupProps = {
  option: {
    type: Object as PropType<MenuGroupType>,
    required: true as true,
  },
}
export type MenuGroupProps = ExtractPublicPropTypes<typeof menuGroupProps>

export default defineComponent({
  name: "MenuGroup",
  props: menuGroupProps,
  render() {
    return (
      <div class="jo-menu-group">
        <div class="jo-menu-group__header">{this.option.label}</div>
        <div class="jo-menu-group__content">
          {this.option.children?.map((option) => {
            return <MenuItem option={option} />;
          })}
        </div>
      </div>
    );
  },
});
