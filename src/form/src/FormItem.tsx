import { h, defineComponent, inject, watch, ref, onBeforeUnmount, onUnmounted, Ref } from "vue"
import { ExtractPublicPropTypes } from "../../util/extract-public-props"
import { formApiInjectionKey } from "./Form"
import "./styles/index.css"

export interface FormItemInst {
    validate: () => string | undefined
}

const formItemProps = {
    label: String,
    feedback: String,
    path: String,
}
export type FormItemProps = ExtractPublicPropTypes<typeof formItemProps>

export default defineComponent({
    name: "FormItem",
    props: formItemProps,
    setup(props) {
        const formApi = inject(formApiInjectionKey)
        const feedbackRef: Ref<string | undefined> = ref(props.feedback)
        const isShowRequireMark = ref(false)

        if (formApi && props.path && formApi.rules && props.path in formApi.rules) {
            const rules = formApi.rules[props.path]
            for (const rule of rules) {
                if (rule.required) {
                    isShowRequireMark.value = true
                    break
                }
            }

            const validate = () => {
                if (!props.path) return
                const value = (formApi.model as any)[props.path]
                feedbackRef.value = undefined
                for (const rule of rules) {
                    if (rule.required) {
                        if (!value) {
                            feedbackRef.value = rule.message
                        }
                    }
                    if (rule.validator) {
                        const reValue = rule.validator(rule, value)
                        if (typeof reValue === "object") {
                            feedbackRef.value = reValue.message
                        }
                    }
                    if (feedbackRef.value) return feedbackRef.value
                }
                return
            }

            const formItemInst: FormItemInst = {
                validate,
            }

            const mountValidate = () => {
                if (!props.path) return
                if (!formApi.formItems[props.path]) {
                    formApi.formItems[props.path] = []
                }
                formApi.formItems[props.path].push(formItemInst)
            }

            const unmountValidate = () => {
                if (!props.path) return
                formApi.formItems[props.path].filter(item => item != formItemInst)
            }

            mountValidate()
            onBeforeUnmount(() => {
                unmountValidate()
            })

            watch(
                () => (formApi.model as any)[props.path as string],
                value => {
                    validate()
                }
            )
        }
        return {
            feedbackRef,
            isShowRequireMark,
        }
    },
    render() {
        return (
            <div
                class={[
                    `jo-form-item`,
                    this.feedbackRef ? "jo-form-item--error" : undefined,
                    this.feedbackRef ? "jo-form-item--focus-error" : "jo-form-item--focus",
                ]}
            >
                <div class="jo-form-item__label">
                    {this.label}
                    {this.isShowRequireMark ? (
                        <span style="color: #d03050">&nbsp;*</span>
                    ) : undefined}
                </div>
                <div class="jo-form-item__blank">{this.$slots.default?.()}</div>
                <div class="jo-form-item__feedback">{this.feedbackRef}</div>
            </div>
        )
    },
})
