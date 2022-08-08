import { useTheme } from "jolyne-ui";
import {
  h,
  defineComponent,
  Teleport,
  Fragment,
  ref,
  nextTick,
  PropType,
  computed,
  CSSProperties,
} from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";
interface DropdownOption {
  label: string;
  key: string;
}
const dropdownProps = {
  options: Array as PropType<DropdownOption[]>,
  onSelect: Function as PropType<(key: string) => void>,
}
export type DropdownProps = ExtractPublicPropTypes<typeof dropdownProps>
export default defineComponent({
  name: "Dropdown",
  props: {
    options: Array as PropType<DropdownOption[]>,
    onSelect: Function as PropType<(key: string) => void>,
  },
  setup(props) {
    const theme = useTheme();
    const triggerRef = ref<HTMLDivElement | null>(null);
    const showDropdownRef = ref(false);
    const dropdownRef = ref<HTMLDivElement | null>(null);
    let showDropdownTimer: NodeJS.Timeout | null = null;
    function handleMouseEnter() {
      if (showDropdownTimer) {
        clearTimeout(showDropdownTimer);
        showDropdownTimer = null;
        return;
      }
      const client = triggerRef.value!.getBoundingClientRect();
      showDropdownRef.value = true;
      nextTick(
        () =>
          (dropdownRef.value!.style.transform = `translate(${
            client.x + client.width / 2
          }px, ${client.y + client.height}px)  translateX(-50%)`)
      );
    }
    function handleMouseLeave() {
      showDropdownTimer = setTimeout(() => {
        showDropdownRef.value = false;
        showDropdownTimer = null;
      }, 300);
    }
    function handleClick(key: string) {
      return () => {
        props.onSelect?.(key);
        showDropdownRef.value = false;
      };
    }

    return {
      triggerRef,
      showDropdownRef,
      dropdownRef,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      cssVars: computed(() => {
        return {
          "--shadow": theme.value.dropdown.shadow,
          "--background-color": theme.value.dropdown.backgroundColor,
          "--background-color-hover": theme.value.dropdown.backgroundColorHover,
        };
      }),
    };
  },
  render() {
    return (
      <>
        <Teleport to="body">
          {this.showDropdownRef ? (
            <div
              class="jo-dropdown"
              ref="dropdownRef"
              onMouseenter={this.handleMouseEnter}
              onMouseleave={this.handleMouseLeave}
              style={this.cssVars as CSSProperties}
            >
              {this.options?.map((option) => {
                return (
                  <div
                    class="jo-dropdown__option"
                    onClick={this.handleClick(option.key)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          ) : null}
        </Teleport>
        <div
          ref="triggerRef"
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}
        >
          {this.$slots.default?.()}
        </div>
      </>
    );
  },
});
