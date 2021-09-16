<template>
    <JoLayout position="absolute">
        <TheHeader :shadow="shadow"/>
        <JoLayout :hasSider="hasSider" position="absolute" style="top: 54px" id="page-layout">
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
        hasSider: Boolean,
        shadow: {
            type: Boolean,
            default: true,
        }
    }
})
</script>