import { JoButton } from "../../button";
import { h, defineComponent, nextTick, PropType, ref } from "vue";
import { JoInput } from "../../input";
import { JoSpace } from "../../space";
import { JoTag } from "../../tag";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const dynamicTagsProps = {
  value: Array as PropType<string[]>,
  "onUpdate:value": Function as PropType<(value: string[]) => void>,
}
export type DynamicTagsProps = ExtractPublicPropTypes<typeof dynamicTagsProps>

export default defineComponent({
  name: "DynamicTags",
  props: dynamicTagsProps,
  setup(props) {
    const showInputRef = ref(false);
    const controlledValueRef = ref(props.value || []);
    const inputElementRef = ref<HTMLInputElement | null>(null);
    const inputValueRef = ref("");
    function doChange(value: string[]): void {
      const { "onUpdate:value": _onUpdateValue } = props;
      if (_onUpdateValue) {
        _onUpdateValue(value);
      }
    }
    function handleCloseClick(index: number): void {
      const tags = controlledValueRef.value.slice(0);
      tags.splice(index, 1);
      doChange(tags);
      controlledValueRef.value = tags;
    }
    function handleAddClick(): void {
      showInputRef.value = true;
      inputValueRef.value = "";
      nextTick(() => {
        inputElementRef.value?.focus();
      })
    }
    function handleInputConfirm(): void {
      if (inputElementRef.value && inputValueRef.value) {
        const tags = controlledValueRef.value.slice(0);
        tags.push(inputValueRef.value);
        doChange(tags);
        controlledValueRef.value = tags;
      }
      showInputRef.value = false;
    }
    function handleInputBlur(): void {
      handleInputConfirm();
    }
    return {
      inputValueRef,
      inputElementRef,
      showInputRef,
      controlledValueRef,
      handleCloseClick,
      handleAddClick,
      handleInputBlur,
    };
  },
  render() {
    return (
      <JoSpace>
        {this.controlledValueRef
          .map((tag, index) => {
            return (
              <JoTag closable onClose={() => this.handleCloseClick(index)}>
                {tag}
              </JoTag>
            );
          })
          .concat(
            this.showInputRef ? (
              <JoInput
                ref="inputElementRef"
                size="small"
                value={this.inputValueRef}
                onUpdateValue={(value) => {
                  this.inputValueRef = value;
                }}
                onBlur={this.handleInputBlur}
              />
            ) : (
              <JoButton style="height: 28px" onClick={this.handleAddClick}>添加</JoButton>
            )
          )}
      </JoSpace>
    );
  },
});
