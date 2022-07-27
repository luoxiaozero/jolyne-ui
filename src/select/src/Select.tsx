import { h, computed, CSSProperties, defineComponent, PropType, Fragment, Teleport } from "vue"
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
        function doUpdateValue(value: string) {
            const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props
            if (onUpdateValue) onUpdateValue(value)
            if (_onUpdateValue) _onUpdateValue(value)
        }

        function handleMenuItemClick(value: string) {
            doUpdateValue(value)
        }
        return {
            handleMenuItemClick,
        }
    },
    render() {
        return (
            <>
                <div class="jo-select"></div>
                <Teleport to="body">
                    <div class="jo-select-menu">
                        {this.options?.map(option => {
                            return (
                                <div
                                    class="jo-select-menu-item"
                                    onClick={() => this.handleMenuItemClick(option.value)}
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
