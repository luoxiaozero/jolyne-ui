import { h, defineComponent, ref, onMounted } from "vue";
import { useHljs } from "../../_mixins/use-hljs";
import "./styles/index.css";

export default defineComponent({
  name: "Code",
  props: {
    code: String,
    lang: String,
  },
  setup(props) {
    const codeRef = ref<HTMLPreElement | null>(null);
    let hljs = useHljs();
    if (hljs && hljs.getLanguage(props.lang || "")) {
        onMounted(() => {
            if (codeRef.value) {
                codeRef.value.innerHTML = hljs?.highlight(props.code || "", {
                    language: props.lang || ""
                  }).value || props.code || "";
            }
          });
    } else {
      onMounted(() => {
        if (codeRef.value) {
          codeRef.value.innerText = props.code || "";
        }
      });
    }
    return {
      codeRef,
    };
  },
  render() {
    return (
      <code class="jo-code">
        <pre ref="codeRef"></pre>
      </code>
    );
  },
});
