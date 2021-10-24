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
import { JoIcon } from "../../icon";
import { Remove, CheckmarkSharp } from "@vicons/ionicons5";
import "./styles/Checkbox.css";

export default defineComponent({
  name: "Checkbox",
  props: {
    checked: Boolean,
    "onUpdate:checked": Function as PropType<(checked: boolean) => void>,
    indeterminate: Boolean,
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
            { "jo-checkbox__dot--checked": this.checked || this.indeterminate },
          ]}
        >
          <JoIcon color="white">
            {this.indeterminate ? (
              <Remove />
            ) : this.checked ? (
              <CheckmarkSharp />
            ) : undefined}
          </JoIcon>
        </div>
        {this.$slots.default ? (
          <div class="jo-checkbox__label">{this.$slots.default()}</div>
        ) : undefined}
      </div>
    );
  },
});
