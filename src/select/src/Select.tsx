import {
    h,
    computed,
    CSSProperties,
    defineComponent,
    PropType,
    ref,
    Fragment,
    Teleport,
    nextTick,
} from "vue"
import "./styles/select.css"
import { useTheme } from "../../_mixins/use-theme"
import { bindBodyClickEvent } from "../../util/bodyElement"
import { ExtractPublicPropTypes } from "../../util/extract-public-props"

interface SelectOption {
    label: string
    value: string
}
const selectProps = {
    value: String,
    "onUpdate:value": Function as PropType<(value: string) => void>,
    onUpdateValue: Function as PropType<(value: string) => void>,
    options: Array as PropType<SelectOption[]>,
}
export type SelectProps = ExtractPublicPropTypes<typeof selectProps>
export default defineComponent({
    name: "Select",
    props: selectProps,
    setup(props) {
        const theme = useTheme()
        const selectLabelRef = ref<String | null>(null)
        const triggerRef = ref<HTMLDivElement | null>(null)
        const popoverRef = ref<HTMLDivElement | null>(null)
        const isShowPopoverRef = ref(false)
        function showPopover() {
            const rect = triggerRef.value!.getBoundingClientRect()

            isShowPopoverRef.value = true
            nextTick(() => {
                popoverRef.value!.style.width = `${rect.width}px`
                popoverRef.value!.style.transform = `translateX(${
                    rect.x + rect.width / 2
                }px) translateY(${rect.y + rect.height}px) translateX(-50%)`
            })
        }

        props.options?.find(option => {
            if (option.value == props.value) {
                selectLabelRef.value = option.label
                return true
            }
        })

        bindBodyClickEvent(ev => {
            let el = ev.target as HTMLElement
            while (el !== document.body) {
                if (el === popoverRef.value || el === triggerRef.value) {
                    return
                }
                el = el.parentElement as HTMLElement
            }
            isShowPopoverRef.value = false
        })

        function doUpdateValue(value: string) {
            const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props
            if (onUpdateValue) onUpdateValue(value)
            if (_onUpdateValue) _onUpdateValue(value)
        }

        function handleMenuItemClick(option: SelectOption) {
            doUpdateValue(option.value)
            selectLabelRef.value = option.label
            isShowPopoverRef.value = false
        }
        return {
            triggerRef,
            popoverRef,
            showPopover,
            isShowPopoverRef,
            selectLabelRef,
            handleMenuItemClick,
            cssVars: computed(() => {
                const { borderColor, backgroundColor, fontColor, errorBorderColor } =
                    theme.value.input
                return {
                    "--height": "30px",
                    "--line-height": "30px",
                    "--border-color": borderColor,
                    "--border-color-error": errorBorderColor,
                    "--background-color": backgroundColor,
                    "--font-color": fontColor,
                    "--border-color-hover": "#36ad6a",
                }
            }),
        }
    },
    render() {
        return (
            <>
                <div
                    class="jo-select"
                    ref="triggerRef"
                    style={this.cssVars as CSSProperties}
                    onClick={this.showPopover}
                >
                    {this.selectLabelRef}
                </div>
                {this.isShowPopoverRef ? (
                    <Teleport to="body">
                        <div
                            class="jo-select-menu"
                            ref="popoverRef"
                            style={this.cssVars as CSSProperties}
                        >
                            {this.options?.map(option => {
                                return (
                                    <div
                                        class="jo-select-menu-item"
                                        onClick={() => this.handleMenuItemClick(option)}
                                    >
                                        {option.label}
                                    </div>
                                )
                            })}
                        </div>
                    </Teleport>
                ) : null}
            </>
        )
    },
})
