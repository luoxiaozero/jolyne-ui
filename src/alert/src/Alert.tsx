import { h, defineComponent, renderSlot } from "@vue/runtime-core";
import { computed, CSSProperties, PropType } from "vue";
import { useTheme } from "../../_mixins/use-theme";
import "./styles/index.css"

export default defineComponent({
    name: "Alert",
    props: {
        title: String,
        type: {
            type: String as PropType<"default" | "info" | "success" | "warning" | "error">,
            default: "default"
        }
    },
    setup(props) {
        const theme = useTheme();
        return {
            cssVars: computed(() => {
                const backgroundColor = Reflect.get(theme.value.alert, `${props.type}BackgroundColor`) || theme.value.alert.backgroundColor;
                return {
                    "--background-color": backgroundColor,
                    "--border": Reflect.get(theme.value.alert, `${props.type}Border`) || theme.value.alert.border
                }

            })

        }
    },
    render() {
        return (<div class="jo-alert" style={this.cssVars as CSSProperties}>
            <div>{renderSlot(this.$slots, "son-header", {}, () => [this.title])}</div>
            <div>{this.$slots.default?.()}</div>
        </div>)
    }
})