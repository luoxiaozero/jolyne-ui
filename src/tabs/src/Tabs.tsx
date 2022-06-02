import { computed, defineComponent, h, PropType, VNode, vShow, withDirectives } from "vue"
import { flatten } from "../../util/flatten"
import Tab from "./Tab"
import "./styles/tabs.css"
import { useTheme } from "../../components"

export default defineComponent({
    name: "Tabs",
    props: {
        value: String,
        "onUpdate:value": Function as PropType<(value: string) => void>,
        onUpdateValue: Function as PropType<(value: string) => void>,
    },
    setup(props) {
        const theme = useTheme()
        const valueRef = computed(() => props.value || "")
        function doUpdateValue(value: string) {
            const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props
            if (onUpdateValue) onUpdateValue(value)
            if (_onUpdateValue) _onUpdateValue(value)
        }
        return {
            cssVars: computed(() => {
                const { colorPrimary } = theme.value.common
                return {
                    "--text-color-selected": colorPrimary,
                }
            }),
            valueRef,
            doUpdateValue,
        }
    },
    render() {
        const {
            $slots: { default: defaultSlot },
        } = this
        const tabPaneChildren: any[] = defaultSlot ? flatten(defaultSlot()) : []
        let children: VNode[] = []
        tabPaneChildren.forEach(item => {
            const show = item.props.name == this.valueRef
            children.push(withDirectives(item, [[vShow, show]]))
        })
        return (
            <div class="jo-tabs" style={this.cssVars}>
                <div class="jo-tabs-nav">
                    {tabPaneChildren.map(item => (
                        <Tab
                            class={{ "jo-tab--selected": item.props.name == this.valueRef }}
                            tab={item.props.tab}
                            onClick={() => this.doUpdateValue(item.props.name)}
                        ></Tab>
                    ))}
                </div>
                <div class="jo-tabs-pane-wrapper">{{ default: () => children }}</div>
            </div>
        )
    },
})
