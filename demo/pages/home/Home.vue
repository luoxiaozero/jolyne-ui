<template>
    <PageContainer has-sider :bordered="false">
        <div style="width: 100%;text-align: center;">
            <img alt="Vue logo" src="../../assets/logo.png" />
            <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Jolyne-ui" />
        </div>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import HelloWorld from '../../components/HelloWorld.vue'
import PageContainer from "../../components/PageContainer.vue";
export default defineComponent({
    components: {
        HelloWorld,
        PageContainer,
    },
})
</script>