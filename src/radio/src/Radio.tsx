import {
  h,
  defineComponent,
  ref,
  computed,
  CSSProperties,
  PropType,
  inject,
} from "vue";
import { useTheme } from "../../components";
import { radioApiInjectionKey } from "./RadioGroup";
import "./styles/Radio.css";

export default defineComponent({
  name: "Radio",
  props: {
    checked: Boolean,
    "onUpdate:checked": Function as PropType<(checked: boolean) => void>,
    name: String,
    value: String,
  },
  setup(props) {
    const radioApi = inject(radioApiInjectionKey);
    const mergeName = props.name || radioApi?.name; 
    const checked = computed(() => {
      if (radioApi) {
        if (radioApi.valueRef.value === props.value) {
          return true;
        } else {
          return false;
        }
      }
      return props.checked;
    });
    const theme = useTheme();
    function doChecked(checked: boolean) {
      const { "onUpdate:checked": _onUpdateChecked } = props;
      if (_onUpdateChecked) _onUpdateChecked(checked);
    }
    function handleClick() {
      doChecked(!checked.value);
      radioApi?.doUpdateValue(props.value || "");
    }
    return {
      cssVars: computed(() => {
        return {
          "--background-color-checked": theme.value.common.colorPrimary,
        } as CSSProperties;
      }),
      checked,
      mergeName,
      handleClick,
    };
  },
  render() {
    return (
      <div class="jo-radio" onClick={this.handleClick} style={this.cssVars}>
        <input
          type="radio"
          class="jo-radio__input"
          checked={this.checked}
          name={this.mergeName}
          value={this.value}
        />
        <div
          class={["jo-radio__dot", { "jo-radio__dot--checked": this.checked }]}
        ></div>
        {this.$slots.default ? (
          <div class="jo-radio__label">{this.$slots.default()}</div>
        ) : undefined}
      </div>
    );
  },
});
