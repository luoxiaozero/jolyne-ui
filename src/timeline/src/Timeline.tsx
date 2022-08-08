import { h, defineComponent } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/Timeline.css";
const timelineProps = {
  horizontal: Boolean,
}
export type TimelineProps = ExtractPublicPropTypes<typeof timelineProps>
export default defineComponent({
  name: "Timeline",
  props: timelineProps,
  render() {
    return (
      <div
        class={["jo-timeline", { "jo-timeline--horizontal": this.horizontal }]}
      >
        {this.$slots.default?.()}
      </div>
    );
  },
});
