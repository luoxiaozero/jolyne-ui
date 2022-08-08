import { useTheme } from "jolyne-ui";
import {
  h,
  defineComponent,
  PropType,
  ref,
  computed,
  CSSProperties,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/Slider.css";
const sliderProps = {
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  value: Number,
  "onUpdate:value": Function as PropType<(value: number) => void>,
  isSliderDelay: Boolean,
}
export type SliderProps = ExtractPublicPropTypes<typeof sliderProps>
export default defineComponent({
  name: "Slider",
  props: sliderProps,
  setup(props) {
    const theme = useTheme();
    const sliderRailRef = ref<HTMLDivElement | null>(null);
    function doUpdateValue(value: number) {
      const { "onUpdate:value": _onUpdateValue } = props;
      if (
        Math.floor(value / props.step) * props.step + props.step / 2 <=
        value
      ) {
        value = Math.floor(value / props.step) * props.step + props.step;
      } else {
        value = Math.floor(value / props.step) * props.step;
      }
      if (_onUpdateValue) _onUpdateValue(value);
    }
    let isMouseMove = false;
    const mouseMoveValue = ref<number | undefined>(undefined);
    const valueRef = computed(() => {
      if (!props.value) return 0;
      let value = props.value;
      // 判断顺序不可打乱，否则无法收集 mouseMoveValue 的依赖
      if (mouseMoveValue.value !== undefined && isMouseMove) {
        value = mouseMoveValue.value;
      }
      if (
        Math.floor(value / props.step) * props.step + props.step / 2 <=
        value
      ) {
        return Math.floor(value / props.step) * props.step + props.step;
      } else {
        return Math.floor(value / props.step) * props.step;
      }
    });
    const percentageRef = computed(() => {
      if (valueRef.value < 0 || props.max <= 0) {
        return 0;
      } else if (valueRef.value > props.max) {
        return 100;
      }
      return (valueRef.value / props.max) * 100;
    });
    function handleClick(e: MouseEvent) {
      if (isMouseMove) return;
      if ((e.target as HTMLDivElement).classList.contains("jo-slider-handle"))
        return;
      doUpdateValue(
        (e.offsetX / (sliderRailRef.value?.offsetWidth || 1)) * props.max
      );
    }
    
    function handleMouseDown() {
      isMouseMove = true;
      mouseMoveValue.value = undefined;
    }

    function handleMouseUp() {
      isMouseMove = false;
      if (props.isSliderDelay && mouseMoveValue.value !== undefined)
        doUpdateValue(mouseMoveValue.value);
    }
    function handleMouseMove(ev: MouseEvent) {
      if (isMouseMove) {
        const rect = sliderRailRef.value?.getBoundingClientRect() as DOMRect;
        if (ev.x <= rect.x) {
          mouseMoveValue.value = 0;
        } else if (ev.x >= rect.x + rect.width) {
          mouseMoveValue.value = 100;
        } else {
          mouseMoveValue.value = ((ev.x - rect.x) / rect.width) * props.max;
        }
        if (!props.isSliderDelay) doUpdateValue(mouseMoveValue.value);
      }
    }

    onMounted(() => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    });
    return {
      cssVars: computed(() => {
        return {
          "--background-color-fill": theme.value.common.colorPrimary,
          "--background-color": theme.value.slider.backgroundColor
        } as CSSProperties;
      }),
      sliderRailRef,
      percentageRef,
      handleClick,
      handleMouseDown,
    };
  },
  render() {
    return (
      <div class="jo-slider" onClick={this.handleClick} style={this.cssVars}>
        <div class="jo-slider-rail" ref="sliderRailRef">
          <div
            class="jo-slider-rail__fill"
            style={{ width: `${this.percentageRef}%` }}
          ></div>
        </div>
        <div
          class="jo-slider-handle"
          onMousedown={this.handleMouseDown}
          style={{
            left: `${this.percentageRef}%`,
            transform: `translateX(-${this.percentageRef}%)`,
          }}
        ></div>
      </div>
    );
  },
});
