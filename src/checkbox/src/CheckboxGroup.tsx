import {
  h,
  defineComponent,
  PropType,
  InjectionKey,
  ComputedRef,
  computed,
  provide,
} from "vue";
interface CheckboxApiInjection {
  valueRef: ComputedRef<string[]>;
  doUpdateValue: (value: string[]) => void;
  name: string;
}
export const checkboxApiInjectionKey: InjectionKey<CheckboxApiInjection> =
  Symbol("checkboxApi");

export default defineComponent({
  name: "CheckboxGroup",
  props: {
    value: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    "onUpdate:value": Function as PropType<(value: string[]) => void>,
    name: String,
  },
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
