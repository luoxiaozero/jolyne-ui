import { JoInput } from "../../input";
import {
  h,
  Fragment,
  defineComponent,
  Teleport,
  ref,
  nextTick,
  ComponentPublicInstance,
  computed,
  CSSProperties,
  PropType,
} from "vue";
import "./styles/index.css";
import { useTheme } from "jolyne-ui";

interface AutoCompleteOption {
  label: string;
  value: string;
}

export default defineComponent({
  name: "AutoComplete",
  props: {
    value: String,
    "onUpdate:value": Function as PropType<(value: string) => void>,
    options: Array as PropType<AutoCompleteOption[]>,
    clearAfterSelect: Boolean,
    blurAfterSelect: Boolean,
    placeholder: String,
    onSelect: Function as PropType<(value: string) => void>,
  },
  setup(props) {
    const theme = useTheme();
    const isComposingRef = ref(false);
    const showAutoCompleteRef = ref(false);
    const inputRef = ref<ComponentPublicInstance | null>(null);
    const autoCompleteRef = ref<HTMLDivElement | null>(null);
    function doUpdateValue(value: string) {
      const { "onUpdate:value": _onUpdateValue } = props;
      _onUpdateValue && _onUpdateValue(value);
    }
    function handleFocus() {
      showAutoCompleteRef.value = true;
      const client = (
        (inputRef.value as ComponentPublicInstance).$el as HTMLElement
      ).getBoundingClientRect();
      nextTick(() => {
        const autoCompleteEl = autoCompleteRef.value as HTMLDivElement;
        autoCompleteEl.style.width = client.width + "px";
        autoCompleteEl.style.transform = `translateX(${
          client.x
        }px) translateY(${client.y + client.height}px)`;
      });
    }
    function handleBlur() {
      showAutoCompleteRef.value = false;
    }
    let composongValue = "";
    function handleUpdateValue(value: string) {
      if (isComposingRef.value) {
        composongValue = value;
      } else {
        doUpdateValue(value);
      }
      if (!showAutoCompleteRef.value) handleFocus();
    }
    function bindClick(value: string) {
      return function handleClick(e: MouseEvent) {
        props.clearAfterSelect ? doUpdateValue("") : doUpdateValue(value);
        props.onSelect?.(value);
        handleBlur();
        props.blurAfterSelect &&
          (document.activeElement as HTMLElement)?.blur();
      };
    }
    function handleMouseDown(payload: MouseEvent) {
      payload.preventDefault();
    }
    function handleCompositionStart() {
      isComposingRef.value = true
      composongValue = props.value || "";
    }
    function handleCompositionEnd() {
      isComposingRef.value = false;
      handleUpdateValue(composongValue);
    }
    const mergedOption = computed(() => {
      return props.options;
    });
    return {
      inputRef,
      autoCompleteRef,
      showAutoCompleteRef,
      cssVars: computed(() => {
        return {
          "--background-color": theme.value.common.neutralCard,
          "--box-shadow": theme.value.card.boxShadow,
        };
      }),
      mergedOption,
      handleMouseDown,
      bindClick,
      handleUpdateValue,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionEnd,
    };
  },
  render() {
    return (
      <div
        class="jo-auto-complete"
        onCompositionstart={this.handleCompositionStart}
        onCompositionend={this.handleCompositionEnd}
      >
        <JoInput
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onUpdateValue={this.handleUpdateValue}
          placeholder={this.placeholder}
          value={this.value}
          ref="inputRef"
        />
        {this.showAutoCompleteRef ? (
          <Teleport to={"body"}>
            <div
              class="jo-auto-complete__menu"
              ref="autoCompleteRef"
              style={this.cssVars as CSSProperties}
            >
              {this.mergedOption?.map((option) => {
                return (
                  <div
                    class="jo-auto-complete__item"
                    onClick={this.bindClick(option.value)}
                    onMousedown={this.handleMouseDown}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          </Teleport>
        ) : null}
      </div>
    );
  },
});
