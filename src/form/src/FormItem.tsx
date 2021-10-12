import { h, defineComponent, inject, watch, ref, PropType } from "vue";
import { formApiInjectionKey } from "./Form";
import "./styles/index.css";

export default defineComponent({
  name: "FormItem",
  props: {
    label: String,
    feedback: String,
    path: String,
  },
  setup(props) {
    const formApi = inject(formApiInjectionKey);
    const feedbackRef = ref(props.feedback);
    if (formApi && props.path && formApi.rules && props.path in formApi.rules) {
      const rules = formApi.rules[props.path];
      watch(
        () => (formApi.model as any)[props.path as string],
        (value) => {
          for (const rule of rules) {
            const reValue = rule.validator(rule, value);
            feedbackRef.value =
              typeof reValue === "object" ? reValue.message : undefined;
          }
        }
      );
    }
    return {
      feedbackRef,
    };
  },
  render() {
    return (
      <div
        class={[
          `jo-form-item`,
          this.feedbackRef ? "jo-form-item--error" : undefined,
          this.feedbackRef ? "jo-form-item--focus-error" : "jo-form-item--focus"
        ]}
      >
        <div class="jo-form-item__label">{this.label}</div>
        <div class="jo-form-item__blank">{this.$slots.default?.()}</div>
        <div class="jo-form-item__feedback">{this.feedbackRef}</div>
      </div>
    );
  },
});
