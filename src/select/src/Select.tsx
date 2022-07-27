import { h, computed, CSSProperties, defineComponent, PropType, ref, Fragment, Teleport } from "vue"
import "./styles/select.css"

interface SelectOption {
    label: string
    value: string
}

export default defineComponent({
    name: "Select",
    props: {
        value: String,
        "onUpdate:value": Function as PropType<(value: string) => void>,
        onUpdateValue: Function as PropType<(value: string) => void>,
        options: Array as PropType<SelectOption[]>,
    },
    setup(props) {
        const selectLabelRef = ref<String | null>(null)

        props.options?.find(option => {
            if (option.value == props.value) {
                selectLabelRef.value = option.label
                return true
            }
        })
        function doUpdateValue(value: string) {
            const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props
            if (onUpdateValue) onUpdateValue(value)
            if (_onUpdateValue) _onUpdateValue(value)
        }

        function handleMenuItemClick(option: SelectOption) {
            doUpdateValue(option.value)
            selectLabelRef.value = option.label
        }
        return {
            selectLabelRef,
            handleMenuItemClick,
        }
    },
    render() {
        return (
            <>
                <div class="jo-select">{this.selectLabelRef}</div>
                <Teleport to="body">
                    <div class="jo-select-menu">
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
            </>
        )
    },
})
