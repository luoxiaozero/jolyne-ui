<template>
    <PageContainer>
        <TheSider />
        <JoLayout>
            <div style="text-align: center;">
                <img alt="Vue logo" src="../../assets/logo.png" />
                <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
            </div>
        </JoLayout>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoLayout } from "../../../src";
import HelloWorld from '../../components/HelloWorld.vue'
import PageContainer from "../../components/PageContainer.vue";
import TheSider from "./TheSider.vue";
export default defineComponent({
    components: {
        HelloWorld,
        PageContainer,
        TheSider,
        JoLayout,
    },
    setup() {

    },
})
</script>