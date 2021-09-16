<template>
    <PageContainer has-sider>
        <TheSider :bordered="false"/>
        <JoLayout>
            <router-view></router-view>
        </JoLayout>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoLayout } from "../../../src";
import PageContainer from "../../components/PageContainer.vue";
import TheSider from "./TheSider.vue";
export default defineComponent({
    components: {
        PageContainer,
        TheSider,
        JoLayout,
    },
    setup() {

    },
})
</script>