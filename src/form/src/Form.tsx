import { h, defineComponent, PropType, InjectionKey, provide, computed, CSSProperties } from "vue"
import { useTheme } from "../../_mixins/use-theme"

interface Rules {
    [key: string | number | symbol]: {
        validator: (rule: any, value: any) => boolean | Error
    }[]
}

interface FromApiInjection {
    model: Object
    rules: Rules
}
export const formApiInjectionKey: InjectionKey<FromApiInjection> = Symbol("formApi")
export default defineComponent({
    name: "Form",
    props: {
        labelWidth: {
            type: String,
            default: "80px",
        },
        labelPlacement: {
            type: String as PropType<"left" | "top">,
            default: "top",
        },
        model: Object,
        rules: Object as PropType<Rules>,
    },
    setup(props) {
        const theme = useTheme()
        provide(formApiInjectionKey, {
            model: props.model,
            rules: props.rules,
        })
        return {
            cssVars: computed(() => {
                const { errorBorderColor } = theme.value.input
                return {
                    "--jo-label-width": props.labelWidth,
                    "--jo-border-color-error": errorBorderColor,
                }
            }),
        }
    },
    render() {
        return (
            <div style={this.cssVars as CSSProperties} class={[`jo-form--${this.labelPlacement}`]}>
                {this.$slots.default?.()}
            </div>
        )
    },
})
