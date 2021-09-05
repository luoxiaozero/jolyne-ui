import { defineComponent, watchEffect } from "vue";
import { useTheme } from "../_mixins/use-theme";

export default defineComponent({
    name: "GlobalStyle",
    setup() {

    },
    render() {
        const theme = useTheme();
        watchEffect(() => {
            document.body.style.backgroundColor = theme.value.common.neutralBody;
            document.body.style.color = theme.value.common.neutralTextBase;
        })
    }
})