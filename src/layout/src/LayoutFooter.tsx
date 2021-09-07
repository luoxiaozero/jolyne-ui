import { h, defineComponent } from "vue";

export default defineComponent({
  name: "LayoutFooter",
  render() {
    return <div class="jo-layout-footer">{this.$slots.default?.()}</div>;
  },
});