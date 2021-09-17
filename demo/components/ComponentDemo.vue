<template>
    <JoCard :title="title" segmented="footer" :id="demoFileName">
        <slot name="content"></slot>
        <slot name="demo"></slot>
        <template #footer>
            <JoScrollbar>
                <JoCode :code="codeStr" lang="html"></JoCode>
            </JoScrollbar>
        </template>
    </JoCard>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoCard, JoCode, JoScrollbar } from "../../src";

export default defineComponent({
    name: "ComponentDemo",
    components: {
        JoCard,
        JoCode,
        JoScrollbar,
    },
    props: {
        demoFileName: {
            type: String,
            required: true,
        },
        relativeUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const codeStr = decodeURIComponent(props.code || "");
        return {
            codeStr
        }
    },
})
</script>

<style scoped>
</style>
