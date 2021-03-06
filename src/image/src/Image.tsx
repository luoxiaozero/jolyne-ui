import { h, CSSProperties, defineComponent, PropType } from "vue";
import "./styles/index.css";
export default defineComponent({
  name: "Image",
  props: {
    alt: String,
    src: String,
    width: [Number, String] as PropType<number | string>,
    height: [Number, String] as PropType<number | string>,
    objectFit: {
      type: String as PropType<
        "fill" | "contain" | "cover" | "none" | "scale-down"
      >,
      default: "fill",
    },
    borderRadius: {
      type: String,
      default: "inherit",
    },
  },
  setup(props) {
    return {
      cssVars: {
        "--border-radius": props.borderRadius,
        /** DOM 渲染 width="100%" 失败*/
        "--width": props.width,
        "--height": props.height,
      },
    };
  },
  render() {
    return (
      <div class="jo-image" style={this.cssVars as CSSProperties}>
        <img
          class="jo-image__img"
          src={this.src}
          alt={this.alt}
          width={this.width}
          height={this.height}
          style={{ objectFit: this.objectFit, borderRadius: this.cssVars["--border-radius"] }}
        />
      </div>
    );
  },
});
