import { useTheme } from "../../_mixins/use-theme";
import { h, Fragment, defineComponent, computed, CSSProperties } from "vue";
import "./styles/Skeleton.css";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const skeletonProps = {
  width: String,
  height: String,
  repeat: { type: Number, default: 1 },
  animated: { type: Boolean, default: true },
  text: Boolean,
}
export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>

export default defineComponent({
  name: "Skeleton",
  props: skeletonProps,
  setup(props) {
    const theme = useTheme();
    return {
      cssVars: computed(() => {
        return {
          display: props.text ? "inline-block" : undefined,
          width: props.width,
          heigth: props.height,
          "--background-color-start": theme.value.skeleton.backgroundColorStart,
          "--background-color-end": theme.value.skeleton.backgroundColorEnd,
        } as CSSProperties;
      }),
    };
  },
  render() {
    return (
      <>
        {Array.apply(null, { length: this.repeat } as any).map((_) => {
          return (
            <div
            style={this.cssVars}
              class={[
                "jo-skeleton",
                this.animated ? "jo-skeleton--animated" : undefined,
              ]}
            ></div>
          );
        })}
      </>
    );
  },
});
