import { h, defineComponent, PropType, InjectionKey, provide } from "vue";
interface Rules {
  [key: string | number | symbol]: {
    validator: (rule: any, value: any) => boolean | Error;
  }[];
}

interface FromApiInjection {
    model: Object,
    rules: Rules,
}
export const formApiInjectionKey: InjectionKey<FromApiInjection> = Symbol("formApi");
export default defineComponent({
  name: "Form",
  props: {
    model: Object,
    rules: Object as PropType<Rules>,
  },
  setup(props) {
      provide(formApiInjectionKey, {
          model: props.model,
          rules: props.rules
      })
  },
  render() {
    return <div class="jo-form">{this.$slots.default?.()}</div>;
  },
});
