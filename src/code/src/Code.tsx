import {
  h,
  defineComponent,
  ref,
  onMounted,
  computed,
  CSSProperties,
} from "vue";
import { useTheme } from "../..";
import { useHljs } from "../../_mixins/use-hljs";
import "./styles/index.css";

export default defineComponent({
  name: "Code",
  props: {
    code: String,
    lang: String,
  },
  setup(props) {
    const theme = useTheme();
    const codeRef = ref<HTMLPreElement | null>(null);
    let hljs = useHljs();
    if (hljs && hljs.getLanguage(props.lang || "")) {
      onMounted(() => {
        if (codeRef.value) {
          codeRef.value.innerHTML =
            hljs?.highlight(props.code || "", {
              language: props.lang || "",
            }).value ||
            props.code ||
            "";
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
      cssVars: computed(() => {
        return {
          "--blue-font-color": theme.value.code.blueFontColor,
          "--red-font-color": theme.value.code.redFontColor,
          "--yellow-font-color": theme.value.code.yellowFontColor,
          "--green-font-color": theme.value.code.greenFontColor,
          "--purple-font-color": theme.value.code.purpleFontColor,
          "--light-blue-font-color": theme.value.code.lightBlueFontColor,
        };
      }),
    };
  },
  render() {
    return (
      <code class="jo-code" style={this.cssVars as CSSProperties}>
        {this.$slots.default ? (
          this.$slots.default()
        ) : (
          <pre ref="codeRef"></pre>
        )}
      </code>
    );
  },
});
