import { useTheme } from "../../_mixins/use-theme";
import {
  h,
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  ref,
} from "vue";
import "./styles/index.css";

export default defineComponent({
  name: "Input",
  props: {
    hasStyle: { type: Boolean, default: true },
    type: {
      type: String as PropType<"textarea" | "input" | "password">,
      default: "input",
    },
    placeholder: String,
    size: {
      type: String as PropType<"small" | "medium">,
      default: "medium",
    },
    autofocus: Boolean,
    value: String,
    "onUpdate:value": Function as PropType<(value: string) => void>,
    onUpdateValue: Function as PropType<(value: string) => void>,
    /**失焦 */
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onInput: Function as PropType<(e: Event) => void>,
  },
  setup(props) {
    const theme = useTheme();
    const focuseRef = ref(false);
    const hasStyle = ref(props.hasStyle);
    const textareaElementRef = ref<HTMLTextAreaElement | null>(null);
    const inputElementRef = ref<HTMLInputElement | null>(null);
    function doUpdateValue(value: string) {
      const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props;
      if (onUpdateValue) onUpdateValue(value);
      if (_onUpdateValue) _onUpdateValue(value);
    }
    function doFocus(e: FocusEvent): void {
      if (props.onFocus) {
        props.onFocus(e);
      }
    }
    function doBlur(e: FocusEvent): void {
      if (props.onBlur) {
        props.onBlur(e);
      }
    }
    function handleInput(e: InputEvent | Event) {
      const targetValue = (e.target as HTMLInputElement).value;
      doUpdateValue(targetValue);
      props.onInput?.(e);
    }
    function handleWrapperFocus(e: FocusEvent): void {
      focuseRef.value = true;
    }
    function handleWrapperBlur() {
      focuseRef.value = false;
    }
    function handleWrapperClick() {
      if (props.type === "textarea") {
        textareaElementRef.value?.focus();
      } else {
        inputElementRef.value?.focus();
      }
    }
    function handleInputFocus(e: FocusEvent) {
      focuseRef.value = true;
      doFocus(e);
    }
    function handleInputBlur(e: FocusEvent) {
      focuseRef.value = false;
      doBlur(e);
    }
    function focus(): void {
      textareaElementRef.value?.focus();
      inputElementRef.value?.focus();
    }
    return {
      focus,
      textareaElementRef,
      inputElementRef,
      focuseRef,
      hasStyle,
      handleInput,
      handleWrapperBlur,
      handleWrapperFocus,
      handleWrapperClick,
      handleInputBlur,
      handleInputFocus,
      cssVars: computed(() => {
        const { borderColor, backgroundColor, fontColor, errorBorderColor } =
          theme.value.input;
        if (props.size === "medium") {
          return {
            "--height": "30px",
            "--line-height": "30px",
            "--border-color": borderColor,
            "--border-color-error": errorBorderColor,
            "--background-color": backgroundColor,
            "--font-color": fontColor,
            "--border-color-hover": hasStyle.value
              ? "#36ad6a"
              : errorBorderColor,
          };
        } else if (props.size === "small") {
          return {
            "--height": "28px",
            "--line-height": "28px",
            "--border-color": borderColor,
            "--border-color-error": errorBorderColor,
            "--background-color": backgroundColor,
            "--font-color": fontColor,
            "--border-color-hover": hasStyle.value
              ? "#36ad6a"
              : errorBorderColor,
          };
        }
      }),
    };
  },
  render() {
    return (
      <div
        style={this.cssVars as CSSProperties}
        class={[
          "jo-input",
          `jo-input--${this.type}`,
          { "jo-input--focus": this.focuseRef },
          { "jo-input--focus-error": this.focuseRef },
        ]}
        onBlur={this.handleWrapperBlur}
        onFocus={this.handleWrapperFocus}
        onClick={this.handleWrapperClick}
      >
        {this.$props.type === "textarea" ? (
          <textarea
            ref="textareaElementRef"
            placeholder={this.$props.placeholder}
            value={this.$props.value}
            class="jo-input__textarea-el"
            autofocus={this.$props.autofocus}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            onInput={this.handleInput}
          ></textarea>
        ) : (
          <input
            ref="inputElementRef"
            type={this.$props.type === "password" ? this.$props.type : "text"}
            placeholder={this.$props.placeholder}
            autofocus={this.$props.autofocus}
            value={this.$props.value}
            class="jo-input__input-el"
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            onInput={this.handleInput}
          />
        )}
      </div>
    );
  },
});
