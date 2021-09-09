<template>
    <JoCard :title="title">
        <slot name="content"></slot>
        <slot name="demo"></slot>
        <template #footer>
            
        </template>
    </JoCard>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoCard } from "../../src";

export default defineComponent({
    name: "ComponentDemo",
    components: {
        JoCard
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
    setup() {
        return {}
    },
})
</script>

<style scoped>
</style>
