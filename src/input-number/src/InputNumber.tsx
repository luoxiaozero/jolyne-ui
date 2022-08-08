import { h, defineComponent, PropType, computed } from "vue";
import { JoInput } from "../../input";
import { JoIcon } from "../../icon";
import { JoButton } from "../../button";
import { Remove, Add } from "@vicons/ionicons5";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const inputNumberProps = {
  placeholder: String,
  value: Number,
  "onUpdate:value": Function as PropType<(value: number | undefined) => void>,
}
export type InputNumberProps = ExtractPublicPropTypes<typeof inputNumberProps>

export default defineComponent({
  name: "InputNumber",
  props: inputNumberProps,
  setup(props) {
    const displayVlaue = computed(() => {
      return props.value as unknown as string;
    });
    function doValue(value: number | undefined) {
      const { "onUpdate:value": _onUpdateValue } = props;
      if (_onUpdateValue) _onUpdateValue(value);
    }
    function onUpdateValue(value: string) {
      let _value: number | undefined = parseInt(value);
      if (_value === NaN) _value = undefined;
      doValue(_value);
    }
    function add() {
      let _value: number | undefined = parseInt(displayVlaue.value);
      console.log(_value);
      if (_value === NaN) _value = undefined;
      doValue(_value === undefined ? undefined : ++_value);
    }
    function sub() {
      let _value: number | undefined = parseInt(displayVlaue.value);
      if (_value === NaN) _value = undefined;
      doValue(_value === undefined ? undefined : --_value);
    }
    return {
      displayVlaue,
      add,
      sub,
      onUpdateValue,
    };
  },
  render() {
    return (
      <JoInput value={this.displayVlaue} onUpdateValue={this.onUpdateValue} placeholder={this.placeholder}>
        {{
          suffix: () => {
            return [
              <JoButton text onClick={this.sub}>
                <JoIcon size={18}>
                  <Remove />
                </JoIcon>
              </JoButton>,
              <JoButton text onClick={this.add}>
                <JoIcon size={18}>
                  <Add />
                </JoIcon>
              </JoButton>,
            ];
          },
        }}
      </JoInput>
    );
  },
});
