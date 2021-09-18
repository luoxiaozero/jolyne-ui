import {h,defineComponent,ref} from 'vue'
import "./styles/index.css"

export default defineComponent({
    name:"Divider",
    render(){
        return (
        <div class="jo-divider">
            <div class="jo-divider__line"></div>
        </div>
        )
    }
})