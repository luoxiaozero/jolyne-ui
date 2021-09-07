<template>
    <JoLayout position="absolute">
        <TheHeader />
        <JoLayout :hasSider="hasSider" position="absolute" style="top: 50px">
            <slot></slot>
        </JoLayout>
    </JoLayout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoLayout } from "../../src";
import TheHeader from "./TheHeader.vue";
export default defineComponent({
    components: {
        JoLayout,
        TheHeader
    },
    props: {
        hasSider: Boolean
    }
})
</script>