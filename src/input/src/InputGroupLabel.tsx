import { h, defineComponent, computed, CSSProperties } from "vue"
import { useTheme } from "../../_mixins/use-theme"
import "./styles/InputGroupLabel.css"

export default defineComponent({
    name: "InputGroupLabel",
    setup() {
        const theme = useTheme()
        return {
            cssVars: computed(() => {
                const { labelBackgroundColor, borderColor } = theme.value.input
                return {
                    "--jo-label-background-color": labelBackgroundColor,
                    "--jo-border-color": borderColor,
                }
            }),
        }
    },
    render() {
        return (
            <div class="jo-input-group-label" style={this.cssVars as CSSProperties}>
                {this.$slots.default?.()}
            </div>
        )
    },
})
