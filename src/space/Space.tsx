import { flatten } from "../util/flatten";
import getSlot from "../util/getSlot";
import { h, defineComponent, PropType } from "vue";
import "./styles/index.css";

export default defineComponent({
  name: "Space",
  props: {
    vertical: Boolean,
    justify: {
      type: String as PropType<"start" | "end">,
      default: "start",
    },
    wrap: {
      type: Boolean,
      default: true,
    },
  },
  setup() {},
  render() {
    const children = flatten(getSlot(this));
    const lastIndex = children.length - 1;
    return (
      <div
        class="jo-space"
        style={{
          flexDirection: this.$props.vertical ? "column" : "row",
          flexWrap: this.$props.wrap ? "wrap" : "nowrap",
          justifyContent: "flex-" + this.$props.justify,
        }}
      >
        {children.map((child, index) => {
          return (
            <div
              style={
                (this.$props.vertical
                  ? {
                      marginBottom: index !== lastIndex ? "8px" : "",
                    }
                  : {
                      marginRight: index !== lastIndex ? "8px" : "",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                    }) as any
              }
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  },
});
