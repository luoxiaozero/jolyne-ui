<template>
    <JoCard :title="title" segmented="footer">
        <slot name="content"></slot>
        <slot name="demo"></slot>
        <template #footer>
            <JoCode :code="codeStr" lang="html"></JoCode>
        </template>
    </JoCard>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoCard, JoCode } from "../../src";

export default defineComponent({
    name: "ComponentDemo",
    components: {
        JoCard,
        JoCode
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
