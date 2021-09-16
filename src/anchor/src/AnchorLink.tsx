import {
  h,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  inject,
  computed,
} from "vue";
import { anchorApiInjectionKey } from "./Anchor";
import "./styles/AnchorLink.css";

export default defineComponent({
  name: "AnchorLink",
  props: {
    title: String,
    href: String,
  },
  setup(props) {
    const anchor = inject(anchorApiInjectionKey, null);
    const isActive = computed(() => {
      return anchor?.selectedHrefRef.value === props.href;
    });
    onMounted(() => {
      props.href && anchor?.collectedLinkHrefs.push(props.href);
    });
    onBeforeUnmount(() => {
      props.href &&
        anchor?.collectedLinkHrefs.splice(
          anchor?.collectedLinkHrefs.indexOf(props.href),
          1
        );
    });
    function handleClick() {
        anchor?.setSelectedHrefRef(props.href || "");
    }
    return {
      isActive,
      handleClick
    };
  },
  render() {
    return (
      <div
        class={["jo-anchor-link", { "jo-anchor-link-active": this.isActive }]}
      >
        <a href={this.href} title={this.title} onClick={this.handleClick}>
          {this.title}
        </a>
        {this.$slots.default?.()}
      </div>
    );
  },
});
