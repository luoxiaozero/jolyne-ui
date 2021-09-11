import { h, defineComponent, PropType, computed } from "vue";
import { useMenu } from "..";
import MenuGroup, { MenuGroupType } from "./MenuGroup";
import "./styles/MenuItem.css";
export interface MenuItemType {
  type?: "item";
  label: string;
  key: string;
  children?: Array<MenuGroupType | MenuItemType>;
}
const MenuItem = defineComponent({
  name: "MenuItem",
  props: {
    option: {
      type: Object as PropType<MenuItemType>,
      required: true,
    },
  },
  setup(props) {
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
    };
  },
  render() {
    return (
      <div class="jo-menu-item">
        <div
          class={[
            "jo-menu-item__content",
            { "jo-menu-item__content--selected": this.selectedRef },
          ]}
          onClick={this.handleClick}
        >
          {this.option.label}
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
