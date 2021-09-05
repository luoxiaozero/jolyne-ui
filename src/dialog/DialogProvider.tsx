import { h, Fragment, defineComponent, InjectionKey, provide, reactive, ref } from "vue";
import JoDialog from "./Dialog";
type DialogOptions = {
  type?: "info" | "success" | "warning" | "error" | "default";
  title: string;
  negativeText?: string;
  positiveText?: string;
  content: string;
  onPositiveClick?: () => boolean;
  onNegativeClick?: () => boolean;
  onClose?: () => boolean;
};
export interface DialogApiInjection {
  create: (options: DialogOptions) => void;
  success: (options: DialogOptions) => void;
  warning: (options: DialogOptions) => void;
  error: (options: DialogOptions) => void;
  info: (options: DialogOptions) => void;
}
interface DialogReactive extends DialogOptions {
  key: string;
}

export const dialogApiInjectionKey: InjectionKey<DialogApiInjection> =
  Symbol("dialogApi");

function createId(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16);
}
export default defineComponent({
  name: "DialogProvider",
  setup() {
    const dialogListRef = ref<DialogReactive[]>([]);
    const dialogInstRefs = ref<{ [key: string]: any }>({});
    function create (options: DialogOptions = Object()): DialogReactive {
      const key = createId()
      const dialogReactive = reactive({
        ...options,
        key,
        destroy: () => {
          dialogInstRefs.value[key].hide()
        }
      })
      dialogListRef.value.push(dialogReactive)
      return dialogReactive
    }
    const typedApi = (
      ['info', 'success', 'warning', 'error'] as Array<
      'info' | 'success' | 'warning' | 'error'
      >
    ).map((type) => (options: DialogOptions): DialogReactive => {
      return create({ ...options, type })
    })
    const api = {
      create,
      info: typedApi[0],
      success: typedApi[1],
      warning: typedApi[2],
      error: typedApi[3]
    }
    provide(dialogApiInjectionKey, api);
    function handleAfterLeave(key: String): void {
      const { value: dialogList } = dialogListRef;
      dialogList.splice(
        dialogList.findIndex((dialog) => dialog.key === key),
        1
      );
    }
    return {
      dialogListRef,
      handleAfterLeave,
    };
  },
  render() {
    return (
      <>
        {this.$slots.default?.()}
        {this.dialogListRef.map((dialog) => {
          return (
            <JoDialog
              internalKey={dialog.key}
              type={dialog.type}
              title={dialog.title}
              content={dialog.content}
              positiveText={dialog.positiveText}
              onPositiveClick={dialog.onPositiveClick}
              negativeText={dialog.negativeText}
              onNegativeClick={dialog.onNegativeClick}
              onInternalAfterLeave={this.handleAfterLeave}
            />
          );
        })}
      </>
    );
  },
});
