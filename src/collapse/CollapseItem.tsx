import { defineComponent, ref } from "vue";
import "./styles/index.css";

export default defineComponent({
  name: "CollapseItem",
  props: {
    title: String,
  },
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
