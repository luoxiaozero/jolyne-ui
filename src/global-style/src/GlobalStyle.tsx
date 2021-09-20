import { defineComponent, watchEffect } from "vue";
import { useTheme } from "../../_mixins/use-theme";

export default defineComponent({
    name: "GlobalStyle",
    setup() {
        const theme = useTheme();
        watchEffect(() => {
            document.body.style.backgroundColor = theme.value.common.colorBody;
            document.body.style.color = theme.value.common.fontColor;
            document.body.style.fontFamily = theme.value.common.fontFamily;
            document.body.style.fontSize = theme.value.common.fontSize;
        })
    },
    render() {
        return null;
    }
})