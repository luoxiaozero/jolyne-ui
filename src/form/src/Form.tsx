import { h, defineComponent, PropType, InjectionKey, provide, computed, CSSProperties } from "vue"
import { useTheme } from "../../_mixins/use-theme"
import type { FormItemInst } from "./FormItem"

export interface FormRules {
    [key: string | number | symbol]: {
        required?: boolean
        message?: string
        validator?: (rule: any, value: any) => boolean | Error
    }[]
}

export interface FormInst {
    validateField: (path: string, callback: (message?: string) => void) => void
    validate: (callback: (message?: string) => void) => void
}

interface FromApiInjection {
    model?: Object
    rules?: FormRules
    formItems: Record<string, FormItemInst[]>
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
        rules: Object as PropType<FormRules>,
    },
    setup(props) {
        const theme = useTheme()
        const formApi: FromApiInjection = {
            model: props.model,
            rules: props.rules,
            formItems: {},
        }
        provide(formApiInjectionKey, formApi)
        const formInst: FormInst = {
            validate: callback => {
                for (const itemValue of Object.values(formApi.formItems)) {
                    for (const formItem of itemValue) {
                        const msg = formItem.validate()
                        if (msg) {
                            callback(msg)
                            return
                        }
                    }
                }
                callback()
                return
            },
            validateField: (path, callback) => {
                if (Object.keys(formApi.formItems).includes(path)) {
                    const itemValue = formApi.formItems[path]
                    for (const formItem of itemValue) {
                        const msg = formItem.validate()
                        if (msg) {
                            callback(msg)
                            return
                        }
                    }
                }
                callback()
                return
            },
        }
        return {
            ...formInst,
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
