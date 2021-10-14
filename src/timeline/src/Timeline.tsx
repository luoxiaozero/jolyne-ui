import { h, defineComponent } from "vue";
import "./styles/Timeline.css";

export default defineComponent({
    name: "Timeline",
    render() {
        return <div class="jo-timeline">{this.$slots.default?.()}</div>;
    }
})