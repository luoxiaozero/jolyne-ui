import {
  h,
  Fragment,
  defineComponent,
  InjectionKey,
  Teleport,
  ref,
  provide,
  onMounted,
  nextTick,
} from "vue";
import LoadingBar from "./LoadingBar";

interface LoadingBarInst {
  start: () => void;
  finish: () => void;
  error: () => void;
}
type LoadingBarApiInjection = LoadingBarInst;

export const loadingBarApiInjectionKey: InjectionKey<LoadingBarApiInjection> =
  Symbol("loadingBar");
export default defineComponent({
  name: "LoadingBarProvider",
  setup() {
    const loadingBarRef = ref<LoadingBarInst | null>(null);
    let isMounted = false;
    provide(loadingBarApiInjectionKey, {
      start() {
        if (isMounted) {
          loadingBarRef.value?.start();
        } else {
          nextTick(() => {
            loadingBarRef.value?.start();
          });
        }
      },
      finish() {
        if (isMounted) {
          loadingBarRef.value?.finish();
        } else {
          nextTick(() => {
            loadingBarRef.value?.finish();
          });
        }
      },
      error() {
        if (isMounted) {
          loadingBarRef.value?.error();
        } else {
          nextTick(() => {
            loadingBarRef.value?.error();
          });
        }
      },
    });
    onMounted(() => {
      isMounted = true;
    });
    return {
      loadingBarRef,
    };
  },
  render() {
    return (
      <>
        <Teleport to="body">
          <LoadingBar ref="loadingBarRef" />
        </Teleport>
        {this.$slots.default?.()}
      </>
    );
  },
});
