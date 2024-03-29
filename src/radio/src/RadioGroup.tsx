import {
  h,
  defineComponent,
  PropType,
  InjectionKey,
  ComputedRef,
  computed,
  provide,
} from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
interface RadioApiInjection {
  name?: string;
  valueRef: ComputedRef<string>;
  doUpdateValue: (value: string) => void;
}
export const radioApiInjectionKey: InjectionKey<RadioApiInjection> =
  Symbol("radioApi");

const radioGroupProps = {
  value: String,
  "onUpdate:value": Function as PropType<(value: string) => void>,
  name: String,
}
export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>

export default defineComponent({
  name: "RadioGroup",
  props: radioGroupProps,
  setup(props) {
    const valueRef = computed(() => props.value || "");
    function doUpdateValue(value: string) {
      const { "onUpdate:value": _onUpdateValue } = props;
      if (_onUpdateValue) _onUpdateValue(value);
    }
    provide(radioApiInjectionKey, {
      valueRef,
      name: props.name,
      doUpdateValue,
    });
  },
  render() {
    return <div class="jo-radio-group">{this.$slots.default?.()}</div>;
  },
});
