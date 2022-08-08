import { h, defineComponent, PropType, ref } from "vue";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

const uploadProps = {
  accept: String,
  multiple: {
    type: Boolean,
    default: false,
  },
  onBeforeUpload: {
    type: Function as PropType<(file: File) => void>,
  },
}
export type UploadProps = ExtractPublicPropTypes<typeof uploadProps>

export default defineComponent({
  name: "Upload",
  props: uploadProps,
  setup(props) {
    const inputElementRef = ref<HTMLInputElement | null>(null);
    const dargOverRef = ref(false);
    function openFileDialog(): void {
      inputElementRef.value?.click();
    }
    function handleTriggerClick(): void {
      openFileDialog();
    }
    function handleTriggerDragOver(e: DragEvent): void {
      e.preventDefault();
      dargOverRef.value = true;
    }
    function handleTriggerDragEnter(e: DragEvent): void {
      e.preventDefault();
      dargOverRef.value = true;
    }
    function handleTriggerDragLeave(e: DragEvent): void {
      e.preventDefault();
      dargOverRef.value = false;
    }
    function handleTriggerDrop(e: DragEvent): void {
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files) {
        handleFileAddition(files);
      }
      dargOverRef.value = false;
    }
    function handleFileInputChange(e: Event): void {
      const target = e.target as HTMLInputElement;
      handleFileAddition(target.files);
      target.value = "";
    }
    function handleFileAddition(files: FileList | null): void {
      if (!files) return;
      void Promise.all(
        Array.from(files).map(async (file) => {
          props.onBeforeUpload?.(file);
        })
      );
    }
    return {
      inputElementRef,
      dargOverRef,
      handleTriggerClick,
      handleFileInputChange,
      handleTriggerDragOver,
      handleTriggerDragEnter,
      handleTriggerDragLeave,
      handleTriggerDrop,
    };
  },
  render() {
    return (
      <div class={["jo-upload", { "jo-upload--drag-over": this.dargOverRef }]}>
        <input
          ref="inputElementRef"
          type="file"
          class="jo-upload__file-input"
          accept={this.$props.accept}
          multiple={this.$props.multiple}
          onChange={this.handleFileInputChange}
        />
        <div
          class="jo-upload__trigger"
          onClick={this.handleTriggerClick}
          onDrop={this.handleTriggerDrop}
          onDragover={this.handleTriggerDragOver}
          onDragenter={this.handleTriggerDragEnter}
          onDragleave={this.handleTriggerDragLeave}
        >
          {this.$slots.default?.()}
        </div>
      </div>
    );
  },
});
