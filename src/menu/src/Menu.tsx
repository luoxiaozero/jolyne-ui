import {
  h,
  defineComponent,
  PropType,
  InjectionKey,
  provide,
  ref,
  Ref,
  VNodeChild
} from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import MenuGroup from "./MenuGroup";
import MenuItem, { MenuItemType } from "./MenuItem";
interface MenuOption {
  type?: string;
  extra?: string | (() => VNodeChild);
  label: string | (() => VNodeChild[]);
  key: string;
  children?: MenuOption[];
}
export interface MenuInjection {
  key: Ref<string>;
  toggleExpand: (item: MenuItemType) => void;
}
export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol("menu");
const menuProps = {
  options: {
    type: Array as PropType<MenuOption[]>,
    default: () => [],
  },
  value: String,
  "onUpdate:value": Function as PropType<(key: string) => void>,
  onUpdateValue: Function as PropType<(key: string) => void>,
}
export type MenuProps = ExtractPublicPropTypes<typeof menuProps>

export default defineComponent({
  name: "Menu",
  props: menuProps,
  setup(props) {
    const keyRef = ref(props.value || "");
    function doUpdateValue(key: string) {
      const { "onUpdate:value": _onUpdateValue, onUpdateValue } = props;
      if (_onUpdateValue) _onUpdateValue(key);
      if (onUpdateValue) onUpdateValue(key);
    }
    function toggleExpand(item: MenuItemType): void {
      keyRef.value = item.key;
      doUpdateValue(keyRef.value);
    }
    provide(menuInjectionKey, {
      key: keyRef,
      toggleExpand,
    });
  },
  render() {
    return (
      <div class="jo-menu">
        {this.options.map((option) => {
          if (option.type && option.type === "group") {
            return <MenuGroup option={option as any} />;
          } else {
            return <MenuItem option={option as any} />;
          }
        })}
      </div>
    );
  },
});
