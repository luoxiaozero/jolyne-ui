import { defineComponent, h } from "vue"

export default defineComponent({
    name: "TabPane",
    props: {
        name: String,
        tab: String,
    },
    render() {
        return <div class="jo-tab-pane">{this.$slots.default?.()}</div>
    },
})
