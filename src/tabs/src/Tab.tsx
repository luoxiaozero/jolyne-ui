import { defineComponent, h, PropType } from "vue"
import { ExtractPublicPropTypes } from "../../util/extract-public-props"
const tabProps = {
    tab: String,
    onClick: Function as PropType<(e: MouseEvent) => void>,
}
export type TabProps = ExtractPublicPropTypes<typeof tabProps>
export default defineComponent({
    name: "Tab",
    props: tabProps,
    render() {
        return (
            <div class="jo-tab" onClick={this.onClick}>
                {this.tab}
            </div>
        )
    },
})
