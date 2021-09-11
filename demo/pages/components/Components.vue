<template>
    <PageContainer has-sider>
        <TheSider />
        <JoLayout>
            <router-view></router-view>
        </JoLayout>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoLayout } from "../../../src";
import HelloWorld from '../../components/HelloWorld.vue'
import PageContainer from "../../components/PageContainer.vue";
import TheSider from "./TheSider.vue";
import TestEntryDemo from "../../../build/loaders/test/index.entry.md";
export default defineComponent({
    components: {
        HelloWorld,
        PageContainer,
        TheSider,
        JoLayout,
        TestEntryDemo
    },
    setup() {

    },
})
</script>