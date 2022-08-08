import {
  h,
  defineComponent,
  provide,
  InjectionKey,
  reactive,
  ref,
  Ref,
  onMounted,
  onBeforeUnmount,
  PropType,
} from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";
import "./styles/Anchor.css";
interface AnchorApiInjection {
  collectedLinkHrefs: string[];
  selectedHrefRef: Ref<string>;
  setSelectedHrefRef: (hash: string) => void;
}
export const anchorApiInjectionKey: InjectionKey<AnchorApiInjection> =
  Symbol("anchorApi");

const anchorProps = {
  listenTo: [Object, String] as PropType<HTMLElement | string>,
}
export type AnchorProps = ExtractPublicPropTypes<typeof anchorProps>
  
export default defineComponent({
  name: "Anchor",
  props: anchorProps,
  setup(props) {
    const collectedLinkHrefs = reactive<string[]>([]);
    const selectedHrefRef = ref("");
    provide(anchorApiInjectionKey, {
      collectedLinkHrefs,
      selectedHrefRef,
      setSelectedHrefRef,
    });
    function setSelectedHrefRef(hash: string) {
      selectedHrefRef.value = decodeURIComponent(hash);
    }
    function throttle(fn: Function, delay: number) {
      let valid = true;
      return function () {
        if (!valid) {
          return false;
        }
        valid = false;
        setTimeout(() => {
          fn();
          valid = true;
        }, delay);
      };
    }
    const handleScroll = throttle(_handleScroll, 150);
    function _handleScroll() {
      interface LinkInfo {
        top: number;
        height: number;
        href: string;
      }
      const links: LinkInfo[] = [];
      collectedLinkHrefs.forEach((href) => {
        const idMatchResult = href.match(/#(.*?)$/);
        if (!idMatchResult) return;
        const linkEl = document.getElementById(idMatchResult[1]);
        if (linkEl) {
          const { top, height } = linkEl.getBoundingClientRect();
          links.push({
            top,
            height,
            href,
          });
        }
        links.sort((a, b) => {
          if (a.top > b.top) {
            return 1;
          }
          return -1;
        });
      });
      let listenToElTop = 0; 
      if (props.listenTo) {
        let el: HTMLElement | null = null;
        if (props.listenTo instanceof HTMLElement) {
          listenToElTop = props.listenTo.getBoundingClientRect().top;
        } else if ((el = document.querySelector(props.listenTo))) {
          listenToElTop =  el.getBoundingClientRect().top;
        }
      }
      
      for (let link of links) {
        if (link.top > listenToElTop) {
          selectedHrefRef.value = link.href;
          break;
        }
      }
    }
    onMounted(() => {
      if (props.listenTo) {
        let el: HTMLElement | null = null;
        if (props.listenTo instanceof HTMLElement) {
          return props.listenTo.addEventListener("scroll", handleScroll);
        } else if ((el = document.querySelector(props.listenTo))) {
          el.addEventListener("scroll", handleScroll);
        }
      }
      return document.addEventListener("scroll", handleScroll);
    });
    onBeforeUnmount(() => {
      if (props.listenTo) {
        let el: HTMLElement | null = null;
        if (props.listenTo instanceof HTMLElement) {
          return props.listenTo.removeEventListener("scroll", handleScroll);
        } else if ((el = document.querySelector(props.listenTo))) {
          el.removeEventListener("scroll", handleScroll);
        }
      }
      return document.removeEventListener("scroll", handleScroll);
    });
    setSelectedHrefRef(window.location.hash);
  },
  render() {
    return <div class="jo-anchor">{this.$slots.default?.()}</div>;
  },
});
