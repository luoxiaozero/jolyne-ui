import {
  defineComponent,
  InjectionKey,
  provide,
  reactive,
  ref,
  Teleport,
  h,
  renderSlot,
} from "vue";
import MessageEnvironment from "./MessageEnvironment";

type ContentType = string;

export interface MessageReactive {
  content?: ContentType;
  duration?: number;
  closable?: boolean;

  onClose?: () => void;
  destroy: () => void;
}

export interface MessageApiInjection {
  info: (content: ContentType) => void;
  success: (content: ContentType) => void;
  warning: (content: ContentType) => void;
  error: (content: ContentType) => void;
  loading: (content: ContentType) => void;
}

export const messageApiInjectionKey: InjectionKey<MessageApiInjection> =
  Symbol("messageApi");

function createId(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16);
}
export default defineComponent({
  name: "MessageProvider",
  setup() {
    const messageListRef = ref<any[]>([]);
    const messageRefs = ref<{ [key: string]: any }>({});
    const api: MessageApiInjection = {
      info(content: ContentType) {
        create(content, { ype: "info" });
      },
      success(content: ContentType) {
        create(content, { type: "success" });
      },
      warning(content: ContentType) {
        create(content, { type: "warning" });
      },
      error(content: ContentType) {
        create(content, { type: "error" });
      },
      loading(content: ContentType) {
        create(content, { type: "loading" });
      },
    };
    provide(messageApiInjectionKey, api);

    function create(content: ContentType, options = {}): MessageReactive {
      const key = createId();
      const messageReactive = reactive({
        ...options,
        content,
        key,
        destroy: () => {
          messageRefs.value[key].hide();
        },
      });
      messageListRef.value.push(messageReactive);
      return messageReactive;
    }
    function handleAfterLeave(key: string): void {
      messageListRef.value.splice(
        messageListRef.value.findIndex((message) => message.key === key),
        1
      );
    }
    return Object.assign(
      {
        messageRefs,
        messageList: messageListRef,
        handleAfterLeave,
      },
      api
    );
  },

  render() {
    return (
      <>
        {renderSlot(this.$slots, "default")}
        {this.messageList.length ? (
          <Teleport to={"body"}>
            <div class={`jo-message-container`} key="message-container">
              {this.messageList.map((message) => {
                return (
                  <MessageEnvironment
                    internalKey={message.key}
                    onInternalAfterLeave={this.handleAfterLeave}
                    content={message.content}
                    type={message.type}
                  />
                );
              })}
            </div>
          </Teleport>
        ) : null}
      </>
    );
  },
});
