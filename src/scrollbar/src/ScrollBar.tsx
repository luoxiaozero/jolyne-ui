import {
  h,
  defineComponent,
  PropType,
  CSSProperties,
  ref,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";
const scrollbarProps = {
  /**滚动条默认样式功能 */
  scrollStyle: {
    type: String as PropType<"default" | "hidden" | "remove" | "virtual">,
    default: "hidden",
  },
  contentStyle: [String, Object] as PropType<CSSProperties | string>,
}
export type ScrollbarProps = ExtractPublicPropTypes<typeof scrollbarProps>

export default defineComponent({
  name: "Scrollbar",
  props: scrollbarProps,
  setup() {
    const containerScrollTopRef = ref(0);
    const containerScrollLeftRef = ref(0);
    const showXScrollThumbRef = ref(false);
    const showYScrollThumbRef = ref(false);
    const containerRef = ref<HTMLDivElement | null>(null);
    const contentRef = ref<HTMLDivElement | null>(null);
    function handleScroll(payload: UIEvent) {
      const target = payload.target as HTMLDivElement;
      containerScrollTopRef.value = Math.round(
        (target.scrollTop /
          ((contentRef.value as HTMLElement).offsetHeight -
            (containerRef.value as HTMLElement).offsetHeight)) *
          (containerRef.value as HTMLElement).offsetHeight *
          0.7
      );

      containerScrollLeftRef.value = Math.round(
        (target.scrollLeft /
          ((contentRef.value as HTMLElement).offsetWidth -
            (containerRef.value as HTMLElement).offsetWidth)) *
          (containerRef.value as HTMLElement).offsetWidth *
          0.7
      );
    }
    /**鼠标是否在 containerRef 内 */
    let isMouseRect = false;
    let isXThumbMouseMove = false;
    let xThumbMouseOffset = 0;
    let isYThumbMouseMove = false;
    let yThumbMouseOffset = 0;
    function handleXThumbMouseDown(payload: MouseEvent) {
      xThumbMouseOffset =
        payload.x -
        (payload.target as HTMLDivElement).getBoundingClientRect().x;
      isXThumbMouseMove = true;
    }
    function handleYThumbMouseDown(payload: MouseEvent) {
      yThumbMouseOffset =
        payload.y -
        (payload.target as HTMLDivElement).getBoundingClientRect().y;
      isYThumbMouseMove = true;
    }
    function handleScrollMouseUp() {
      if (!(isXThumbMouseMove || isYThumbMouseMove)) return;
      isXThumbMouseMove = false;
      isYThumbMouseMove = false;
      if (isMouseRect) {
        showXScrollThumbRef.value = false;
        showYScrollThumbRef.value = false;
        isMouseRect = false;
      }
    }
    function handleScrollMouseMove(ev: MouseEvent) {
      /**移动滚动条时 取消默认事件。不加判断：页面内容不能复制，。 */
      if (isXThumbMouseMove || isYThumbMouseMove) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      
      if (isXThumbMouseMove) {
        const rect = containerRef.value!.getBoundingClientRect();
        if (ev.x <= rect.x + xThumbMouseOffset) {
          containerRef.value!.scrollTo(0, containerRef.value!.scrollTop);
        } else if (ev.x >= rect.x + rect.width * 0.7 + xThumbMouseOffset) {
          containerRef.value!.scrollTo(
            contentRef.value!.offsetWidth,
            containerRef.value!.scrollTop
          );
        } else {
          containerRef.value!.scrollTo(
            ((ev.x - rect.x - xThumbMouseOffset) /
              (containerRef.value!.offsetWidth * 0.7)) *
              (contentRef.value!.offsetWidth - containerRef.value!.offsetWidth),
            containerRef.value!.scrollTop
          );
        }
      } else if (isYThumbMouseMove) {
        const rect = containerRef.value!.getBoundingClientRect();
        if (ev.y <= rect.y + yThumbMouseOffset) {
          containerRef.value!.scrollTo(containerRef.value!.scrollLeft, 0);
        } else if (ev.y >= rect.y + rect.height * 0.7 + yThumbMouseOffset) {
          containerRef.value!.scrollTo(
            containerRef.value!.scrollLeft,
            contentRef.value!.offsetHeight
          );
        } else {
          containerRef.value!.scrollTo(
            containerRef.value!.scrollLeft,
            ((ev.y - rect.y - yThumbMouseOffset) /
              (containerRef.value!.offsetHeight * 0.7)) *
              (contentRef.value!.offsetHeight -
                containerRef.value!.offsetHeight)
          );
        }
      }
    }
    onMounted(() => {
      document.addEventListener("mousemove", handleScrollMouseMove);
      document.addEventListener("mouseup", handleScrollMouseUp);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", handleScrollMouseMove);
      document.removeEventListener("mouseup", handleScrollMouseUp);
    });
    function handleMouseEnter() {
      if (
        (contentRef.value as HTMLElement).offsetWidth >
        (containerRef.value as HTMLElement).offsetWidth
      ) {
        showXScrollThumbRef.value = true;
        isMouseRect = true;
      }
      if (
        (contentRef.value as HTMLElement).offsetHeight >
        (containerRef.value as HTMLElement).offsetHeight
      ) {
        showYScrollThumbRef.value = true;
        isMouseRect = true;
      }
    }
    function handleMouseLeave() {
      if (isXThumbMouseMove || isYThumbMouseMove) return;
      showXScrollThumbRef.value = false;
      showYScrollThumbRef.value = false;
      isMouseRect = false;
    }
    return {
      showXScrollThumbRef,
      showYScrollThumbRef,
      containerScrollTopRef,
      containerScrollLeftRef,
      containerRef,
      contentRef,
      handleScroll,
      handleMouseEnter,
      handleMouseLeave,
      handleXThumbMouseDown,
      handleYThumbMouseDown,
    };
  },
  render() {
    return this.scrollStyle === "virtual" ? (
      <div
        class="jo-scrollbar jo-scrollbar--virtual"
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
      >
        <div
          class="jo-scrollbar__container"
          onScroll={this.handleScroll}
          ref="containerRef"
        >
          <div class="jo-scrollbar__content" ref="contentRef">
            {this.$slots.default?.()}
          </div>
        </div>
        <div class="jo-scrollbar__track--vertical">
          {this.showYScrollThumbRef ? (
            <div
              class="jo-scrollabr__thumb"
              style={`transform: translateY(${this.containerScrollTopRef}px);`}
              onMousedown={this.handleYThumbMouseDown}
            ></div>
          ) : undefined}
        </div>
        <div class="jo-scrollbar__track--horizontal">
          {this.showXScrollThumbRef ? (
            <div
              class="jo-scrollabr__thumb"
              style={`transform: translateX(${this.containerScrollLeftRef}px);`}
              onMousedown={this.handleXThumbMouseDown}
            ></div>
          ) : undefined}
        </div>
      </div>
    ) : (
      <div
        class={`jo-scrollbar jo-scrollbar--${this.scrollStyle}`}
        style={this.contentStyle}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
