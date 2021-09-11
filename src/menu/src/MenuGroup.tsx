import { h, defineComponent, PropType } from "vue";
import MenuItem, { MenuItemType } from "./MenuItem";
import "./styles/MenuGroup.css";
export interface MenuGroupType {
  type: "group";
  label: string;
  key: string;
  children?: MenuItemType[];
}

export default defineComponent({
  name: "MenuGroup",
  props: {
    option: {
      type: Object as PropType<MenuGroupType>,
      required: true,
    },
  },
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
