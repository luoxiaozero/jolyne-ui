<template>
    <PageContainer has-sider :shadow="false">
        <div :style="{width: '100%',textAlign: 'center', backgroundColor: backgroundColor}">
            <img alt="Vue logo" src="../../assets/logo.png" />
            <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Jolyne-ui" />
        </div>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import { useTheme } from "../../../src";
import HelloWorld from '../../components/HelloWorld.vue'
import PageContainer from "../../components/PageContainer.vue";
export default defineComponent({
    components: {
        HelloWorld,
        PageContainer,
    },
    setup() {
        const theme = useTheme();
        return {
            backgroundColor: computed(() => {
                return theme.value.common.colorBody === "#f6f6f6" ? "#fff": theme.value.common.colorBody;
            })
        }
    }
})
</script>