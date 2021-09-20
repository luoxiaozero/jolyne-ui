import { h, Fragment, defineComponent, Teleport, PropType } from "vue";
import { JoCard } from "../../card";
import { JoIcon } from "../../icon";
import { Close as CloseIcon } from "@vicons/ionicons5";
import "./styles/index.css";

export default defineComponent({
  name: "Modal",
  props: {
    title: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
    "onUpdate:show": Function as PropType<(value: boolean) => void>,
    onClose: Function as PropType<() => boolean>,
  },
  setup(props) {
    function doUpdateShow(show: boolean): void {
      const { "onUpdate:show": _onUpdateShow } = props;
      if (_onUpdateShow) _onUpdateShow(show);
    }
    function handleCloseClick() {
      if (props.onClose) {
        if (props.onClose() !== false) {
          doUpdateShow(false);
        }
      } else {
        doUpdateShow(false);
      }
    }
    return { doUpdateShow, handleCloseClick };
  },
  render() {
    if (!this.$props.show) {
      return null;
    }
    return (
      <Teleport to="body">
        <div class="jo-modal-container">
          <div class="jo-modal-mask"></div>
          <div class="jo-modal-body">
            <JoCard class="jo-model-card" boxShadow={false}>
              {{
                header: () => {
                  return (
                    <span class="jo-model-card__header-title">
                      {this.$props.title}
                    </span>
                  );
                },
                "header-extra": () => {
                  return (
                    <span
                      class="jo-model-card__header-close"
                      onClick={() => this.handleCloseClick()}
                    >
                      <JoIcon size={18}>
                        <CloseIcon />
                      </JoIcon>
                    </span>
                  );
                },
                default: () => {
                  return this.$slots.default?.();
                },
                footer: () => {
                  return this.$slots.footer?.();
                },
              }}
            </JoCard>
          </div>
        </div>
      </Teleport>
    );
  },
});
