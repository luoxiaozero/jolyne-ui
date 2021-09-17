import { flatten } from "../../util/flatten";
import getSlot from "../../util/getSlot";
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
    size: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: 8,
    }
  },
  setup(props) {
    let horizontalMargin = "";
    let verticalMargin = "";
    if (typeof props.size === "number") {
      horizontalMargin = props.size + "px";
      verticalMargin = props.size + "px";
    } else {
      horizontalMargin = props.size[0] + "px";
      verticalMargin = props.size[1] + "px";
    }
    return {
      horizontalMargin,
      verticalMargin,
    }
  },
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
                      marginBottom: index !== lastIndex ? this.verticalMargin : "",
                    }
                  : {
                      marginRight: index !== lastIndex ? this.horizontalMargin : "",
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
