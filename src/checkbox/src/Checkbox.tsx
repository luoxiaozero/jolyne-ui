import {
  h,
  defineComponent,
  computed,
  CSSProperties,
  inject,
  PropType,
} from "vue";
import { useTheme } from "../../components";
import { checkboxApiInjectionKey } from "./CheckboxGroup";
import "./styles/Checkbox.css";

export default defineComponent({
  name: "Checkbox",
  props: {
    checked: Boolean,
    "onUpdate:checked": Function as PropType<(checked: boolean) => void>,
    name: String,
    value: String,
  },
  setup(props) {
    const checkboxApi = inject(checkboxApiInjectionKey);
    const mergeName = props.name || checkboxApi?.name;
    const checked = computed(() => {
      if (checkboxApi && props.value) {
        return checkboxApi.valueRef.value.includes(props.value);
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
      if (!checkboxApi) return;
      if (!props.value) return;
      const values = checkboxApi.valueRef.value.slice(0);
      if (!checked.value) {
        !values.includes(props.value) && values.push(props.value);
      } else {
        values.splice(values.indexOf(props.value), 1);
      }
      checkboxApi.doUpdateValue(values);
    }
    return {
      mergeName,
      cssVars: computed(() => {
        return {
          "--background-color-checked": theme.value.common.colorPrimary,
        } as CSSProperties;
      }),
      checked,
      handleClick,
    };
  },
  render() {
    return (
      <div class="jo-checkbox" onClick={this.handleClick} style={this.cssVars}>
        <input
          type="checkbox"
          class="jo-checkbox__input"
          checked={this.checked}
          name={this.mergeName}
          value={this.value}
        />
        <div
          class={[
            "jo-checkbox__dot",
            { "jo-checkbox__dot--checked": this.checked },
          ]}
        >
          <svg viewBox="0 0 64 64" class="jo-checkbox__icon">
            <path d="M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"></path>
          </svg>
        </div>
        {this.$slots.default ? (
          <div class="jo-checkbox__label">{this.$slots.default()}</div>
        ) : undefined}
      </div>
    );
  },
});
