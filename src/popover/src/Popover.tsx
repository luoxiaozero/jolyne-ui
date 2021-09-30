import {
  h,
  Fragment,
  defineComponent,
  Teleport,
  ref,
  nextTick,
  CSSProperties,
  computed,
  PropType,
} from "vue";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/index.css";

export default defineComponent({
  name: "Popover",
  props: {
    hasStyle: { type: Boolean, default: true },
    placement: {
      type: String as PropType<"top" | "bottom" | "left" | "right">,
      default: "top",
    },
    showAngle: { type: Boolean, default: true },
  },
  setup(props) {
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
        if (props.placement === "bottom") {
          (popoverRef.value as HTMLDivElement).style.transform = `translateX(${
            rect.x + rect.width / 2
          }px) translateY(${rect.y}px) translateX(-50%) translateY(100%)`;
        } else if (props.placement === "left") {
          (popoverRef.value as HTMLDivElement).style.transform = `translateX(${
            rect.x
          }px) translateY(${
            rect.y + rect.height / 2
          }px) translateX(calc(-10px + -100%)) translateY(-50%)`;
        } else if (props.placement === "right") {
          (popoverRef.value as HTMLDivElement).style.transform = `translateX(${
            rect.x + rect.width
          }px) translateY(${rect.y + rect.height / 2}px)  translateY(-50%)`;
        } else {
          (popoverRef.value as HTMLDivElement).style.transform = `translateX(${
            rect.x + rect.width / 2
          }px) translateY(${
            rect.y
          }px) translateX(-50%) translateY(calc(-10px + -100%))`;
        }
      });
    }
    function handleMouseLeave() {
      showPopoverTimer = setTimeout(() => {
        showPopoverRef.value = false;
        showPopoverTimer = null;
      }, 260);
    }
    return {
      showPopoverRef,
      triggerRef,
      popoverRef,
      handleMouseEnter,
      handleMouseLeave,
      cssVars: computed(() => {
        return {
          "--padding": props.hasStyle ? "8px 16px" : "0",
          "--border-radius": props.hasStyle
            ? theme.value.common.borderRadiusSmall
            : "0",
          "--background-color": theme.value.popover.backgroundColor,
          "--shadow": theme.value.popover.shadow,
        };
      }),
    };
  },
  render() {
    return (
      <>
        {this.showPopoverRef ? (
          <Teleport to="body">
            <div
              class={["jo-popover", `jo-popover--${this.placement}`]}
              ref="popoverRef"
              onMouseenter={this.handleMouseEnter}
              onMouseleave={this.handleMouseLeave}
              style={this.cssVars as CSSProperties}
            >
              {this.$slots.default?.()}
              <div class="jo-popover__angle-container">
                <span
                  class={[
                    "jo-popover__angle",
                    { "jo-popover__angle--show": this.showAngle },
                  ]}
                ></span>
              </div>
            </div>
          </Teleport>
        ) : null}
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
