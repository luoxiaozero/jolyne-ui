import { h, defineComponent, ref, onMounted, PropType } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import JoMessage from "./Message";
import { messageProps } from "./message-props";

const messageEnvironmentProps = {
  ...messageProps,
  duration: {
    type: Number,
    default: 3000,
  },
  internalKey: {
    type: String,
    required: true as true,
  },
  onInternalAfterLeave: Function as PropType<(key: string) => void>,
}
export type MessageEnvironmentProps = ExtractPublicPropTypes<typeof messageEnvironmentProps>

export default defineComponent({
  name: "MessageEnvironment",
  props: messageEnvironmentProps,
  setup(props) {
    const timerIdRef = ref<number | null>(null);
    onMounted(() => {
      const { duration } = props;
      if (duration) {
        timerIdRef.value = window.setTimeout(hide, duration);
      }
    });
    function hide(): void {
      const { value: timerId } = timerIdRef;
      if (timerId) {
        window.clearTimeout(timerId);
      }
      props.onInternalAfterLeave && props.onInternalAfterLeave(props.internalKey);
    }
  },
  render() {
    return (
      <JoMessage content={this.content} type={this.type} />
    );
  },
});
