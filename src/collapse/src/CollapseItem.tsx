import { h, defineComponent, ref } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/index.css";

const collapseItemProps = {
  title: String,
}
export type CollapseItemProps = ExtractPublicPropTypes<typeof collapseItemProps>

export default defineComponent({
  name: "CollapseItem",
  props: collapseItemProps,
  setup() {
    const isShow = ref(false);
    const openContent = () => {
      isShow.value = !isShow.value;
    };
    return {
      isShow,
      openContent,
    };
  },
  render() {
    return (
      <div class="jo-collapse-item">
        <div
          class={[
            "jo-collapse-item__header",
            this.isShow ? "jo-collapse-item__header--selected" : null,
          ]}
          onClick={this.openContent}
        >
          {this.$props.title}
          <span
            class={
              this.isShow
                ? "jo-collapse-item__triangle-down"
                : "jo-collapse-item__triangle-right"
            }
          ></span>
        </div>
        {this.isShow ? (
          <div class="jo-collapse-item__content">{this.$slots.default?.()}</div>
        ) : null}
      </div>
    );
  },
});
