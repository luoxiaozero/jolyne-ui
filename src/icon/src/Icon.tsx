import { h, defineComponent, computed } from "vue";
import "./styles/Icon.css";
export default defineComponent({
  name: "Icon",
  props: {
    size: Number,
    color: String,
  },
  setup(props) {
    return {
      mergedStyle: computed(() => {
        return {
          fontSize: props.size ? props.size + "px" : undefined,
          color: props.color,
        };
      }),
    };
  },
  render() {
    return (
      <span class="jo-icon" style={this.mergedStyle}>
        {this.$slots.default?.()}
      </span>
    );
  },
});
