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
interface CheckboxApiInjection {
  valueRef: ComputedRef<string[]>;
  doUpdateValue: (value: string[]) => void;
  name: string;
}
export const checkboxApiInjectionKey: InjectionKey<CheckboxApiInjection> =
  Symbol("checkboxApi");

const checkboxGroupProps = {
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  "onUpdate:value": Function as PropType<(value: string[]) => void>,
  name: String,
}
export type CheckboxGroupProps = ExtractPublicPropTypes<typeof checkboxGroupProps>

export default defineComponent({
  name: "CheckboxGroup",
  props: checkboxGroupProps,
  setup(props) {
    const valueRef = computed(() => props.value);
    function doUpdateValue(value: string[]) {
      const { "onUpdate:value": _onUpdateValue } = props;
      if (_onUpdateValue) _onUpdateValue(value);
    }
    provide(checkboxApiInjectionKey, {
      name: props.name,
      valueRef,
      doUpdateValue,
    });
  },
  render() {
    return <div class="jo-checkbox-group">{this.$slots.default?.()}</div>;
  },
});
