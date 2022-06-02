import { defineComponent, h, PropType } from "vue"

export default defineComponent({
    name: "Tab",
    props: {
        tab: String,
        onClick: Function as PropType<(e: MouseEvent) => void>,
    },
    render() {
        return (
            <div class="jo-tab" onClick={this.onClick}>
                {this.tab}
            </div>
        )
    },
})
