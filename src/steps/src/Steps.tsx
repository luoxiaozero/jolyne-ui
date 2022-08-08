import {
  h,
  defineComponent,
  PropType,
  VNodeChild,
  VNode,
  InjectionKey,
  ExtractPropTypes,
  provide,
} from "vue";
import "./styles/Steps.css";
import getSlot from "../../util/getSlot";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
function stepWithIndex(step: VNodeChild, i: number): VNode | null {
  if (typeof step !== "object" || step === null || Array.isArray(step)) {
    return null;
  }
  if (!step.props) step.props = {};
  step.props.internalIndex = i + 1;
  return step;
}

function stepsWithIndex(steps: VNodeChild[]): Array<VNode | null> {
  return steps.map((step, i) => stepWithIndex(step, i));
}

const stepsProps = {
  current: Number,
  status: {
    type: String as PropType<"process" | "finish" | "error" | "wait">,
    default: "process",
  },
};

export interface StepsApiInjection {
  stepsProps: ExtractPropTypes<typeof stepsProps>;
}

export const stepsApiInjectionKey: InjectionKey<StepsApiInjection> =
  Symbol("stepsApi");

export type StepsProps = ExtractPublicPropTypes<typeof stepsProps>

export default defineComponent({
  name: "Steps",
  props: stepsProps,
  setup(props) {
    provide(stepsApiInjectionKey, {
      stepsProps: props,
    });
  },
  render() {
    return <div class="jo-steps">{stepsWithIndex(getSlot(this))}</div>;
  },
});
