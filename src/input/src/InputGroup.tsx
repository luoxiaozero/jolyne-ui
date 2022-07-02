import { h, defineComponent } from "vue"
import "./styles/InputGroup.css"

export default defineComponent({
    name: "InputGroup",
    render() {
        return <div class={["jo-input-group"]}>{this.$slots.default?.()}</div>
    },
})
