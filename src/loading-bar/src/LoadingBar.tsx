import {
  h,
  defineComponent,
  computed,
  CSSProperties,
  ref,
  nextTick,
} from "vue";
import { useTheme } from "../..";

import "./styles/index.css";
export default defineComponent({
  name: "LoadingBar",
  setup() {
    const theme = useTheme();
    const loadingBarRef = ref<HTMLDivElement | null>(null);
    const loadingRef = ref(false);
    function start() {
      loadingRef.value = true;
      nextTick(() => {
        if (!loadingBarRef.value) return null;
        loadingBarRef.value.style.backgroundColor = "var(--background-color)";
        loadingBarRef.value.style.transition = "none";
        loadingBarRef.value.style.maxWidth = "0";
        void loadingBarRef.value.offsetWidth;
        loadingBarRef.value.style.transition = "max-width 4s linear";
        loadingBarRef.value.style.maxWidth = "80%";
      });
    }
    function finish() {
      if (!loadingBarRef.value) return null;
      loadingBarRef.value.style.backgroundColor = "var(--background-color)";
      loadingBarRef.value.style.transition = "max-width 0.5s linear";
      loadingBarRef.value.style.maxWidth = "100%";
      loadingBarRef.value.ontransitionend = () => {
        loadingRef.value = false;
      };
    }
    function error() {
      if (!(loadingRef.value || loadingBarRef.value)) {
        loadingRef.value = true;
        nextTick(() => {
          if (!loadingBarRef.value) return null;
          loadingBarRef.value.style.transition = "none";
          loadingBarRef.value.style.maxWidth = "0";
          void loadingBarRef.value.offsetWidth;
          error();
        });
      }
      if (!loadingBarRef.value) return null;
      loadingBarRef.value.style.backgroundColor =
        "var(--background-color-error)";
      loadingBarRef.value.style.transition = "max-width 0.5s linear";
      loadingBarRef.value.style.maxWidth = "100%";
      loadingBarRef.value.ontransitionend = () => {
        loadingRef.value = false;
      };
    }
    return {
      start,
      finish,
      error,
      loadingRef,
      loadingBarRef,
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.colorSuccess,
          "--background-color-error": theme.value.common.colorError,
        };
      }),
    };
  },
  render() {
    if (!this.loadingRef) return null;

    return (
      <div class="jo-loading-bar-container">
        <div
          ref="loadingBarRef"
          class="jo-loading-bar"
          style={this.cssVars as CSSProperties}
        ></div>
      </div>
    );
  },
});
