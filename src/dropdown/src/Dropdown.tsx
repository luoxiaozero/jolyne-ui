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
import "./styles/index.css";
interface DropdownOption {
  label: string;
  key: string;
}
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
      const client = (
        triggerRef.value as HTMLDivElement
      ).getBoundingClientRect();
      showDropdownRef.value = true;
      nextTick(
        () =>
          ((
            dropdownRef.value as HTMLDivElement
          ).style.transform = `translateX(${client.x}px) translateY(${
            client.y + 40
          }px)  translateX(-35%)`)
      );
    }
    function handleMouseLeave() {
      showDropdownTimer = setTimeout(() => {
        showDropdownRef.value = false;
        showDropdownTimer = null;
      }, 500);
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
          "--background-color-hover":
            theme.value.dropdown.backgroundColorHover,
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
