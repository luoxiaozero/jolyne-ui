import { defineComponent, Teleport, PropType } from "vue";
import { JoCard } from "../card";
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
            <JoCard class="jo-model-card">
              {{
                header: () => {
                  return (
                    <>
                      <strong>{this.$props.title}</strong>
                      <span
                        class="jo-model-card__header-close"
                        onClick={() => this.handleCloseClick()}
                      >
                        x
                      </span>
                    </>
                  );
                },
                default: () => {
                  return this.$slots.default?.();
                },
                footer: () => {
                  return this.$slots.footer?.();
                }
              }}
            </JoCard>
          </div>
        </div>
      </Teleport>
    );
  },
});
