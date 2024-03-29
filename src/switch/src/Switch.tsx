import { h, computed, CSSProperties, defineComponent, PropType, ref } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/index.css";
const switchProps = {
  value: Boolean,
  "onUpdate:value": Function as PropType<(value: boolean) => void>,
  onUpdateValue: Function as PropType<(value: boolean) => void>,
}
export type SwitchProps = ExtractPublicPropTypes<typeof switchProps>
export default defineComponent({
  name: "Switch",
  props: switchProps,
  setup(props) {
    const valueRef = ref(props.value || false);
    const theme = useTheme();
    function doUpdateValue(value: boolean): void {
      const { "onUpdate:value": _onUpdateValue, onUpdateValue } = props;
      if (_onUpdateValue) _onUpdateValue(value);
      if (onUpdateValue) onUpdateValue(value);
    }
    function handleClick(): void {
        valueRef.value = !valueRef.value;
        doUpdateValue(valueRef.value);
    }
    return {
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralBody
        }
      }),
      valueRef,
      handleClick
    };
  },
  render() {
    return (
      <span
        class={[
          "jo-switch",
          {
            ["jo-switch--active"]: this.valueRef,
          },
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.handleClick}
      >
        <span class="jo-switch__button"></span>
      </span>
    );
  },
});
