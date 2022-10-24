import { defineComponent, h } from "vue"
import { ExtractPublicPropTypes } from "../../util/extract-public-props"
const tabPaneProps = {
    name: String,
    tab: String,
}
export type TabPaneProps = ExtractPublicPropTypes<typeof tabPaneProps>
export default defineComponent({
    name: "TabPane",
    props: tabPaneProps,
    render() {
        return <div class="jo-tab-pane">{this.$slots.default?.()}</div>
    },
})
