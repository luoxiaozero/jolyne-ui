import {
  h,
  Fragment,
  defineComponent,
  Teleport,
  ref,
  nextTick,
  CSSProperties,
  computed,
} from "vue";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/index.css";

export default defineComponent({
  name: "Popover",
  setup() {
    const triggerRef = ref<HTMLDivElement | null>(null);
    const popoverRef = ref<HTMLDivElement | null>(null);
    const showPopoverRef = ref(false);
    const theme = useTheme();
    let showPopoverTimer: NodeJS.Timeout | null = null;
    function handleMouseEnter() {
      if (showPopoverTimer) {
        clearTimeout(showPopoverTimer);
        showPopoverTimer = null;
        return;
      }
      const rect = (triggerRef.value as HTMLDivElement).getBoundingClientRect();
      showPopoverRef.value = true;
      nextTick(() => {
        (popoverRef.value as HTMLDivElement).style.transform = `translateX(${
          rect.x + rect.width / 2
        }px) translateY(${rect.y}px) translateY(-100%) translateX(-50%)`;
      });
    }
    function handleMouseLeave() {
      showPopoverTimer = setTimeout(() => {
        showPopoverRef.value = false;
        showPopoverTimer = null;
      }, 300);
    }
    return {
      showPopoverRef,
      triggerRef,
      popoverRef,
      handleMouseEnter,
      handleMouseLeave,
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.popover.backgroundColor,
          "--shadow": theme.value.popover.shadow,
        };
      }),
    };
  },
  render() {
    return (
      <>
        <Teleport to="body">
          {this.showPopoverRef ? (
            <div
              class="jo-popover"
              ref="popoverRef"
              onMouseenter={this.handleMouseEnter}
              onMouseleave={this.handleMouseLeave}
              style={this.cssVars as CSSProperties}
            >
              <div class="jo-popover__content">{this.$slots.default?.()}</div>
              <div class="jo-popover__angle-container">
                <span class="jo-popover__angle"></span>
              </div>
            </div>
          ) : null}
        </Teleport>
        <div
          ref="triggerRef"
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}
        >
          {this.$slots.trigger?.()}
        </div>
      </>
    );
  },
});
