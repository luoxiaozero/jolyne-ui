<template>
    <JoLayoutSider style="padding: 2px 0 4px;">
        <JoScrollbar :scroll-style="'remove'">
            <JoMenu :options="menuOptions" v-model:value="keyRef" />
        </JoScrollbar>
    </JoLayoutSider>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, h } from 'vue';
import { useRoute } from 'vue-router';
import { JoLayoutSider, JoMenu, JoScrollbar } from "../../../src";
import { router } from '../../router';
import { menuOptions } from '../../store/menuOptions';

export default defineComponent({
    components: {
        JoLayoutSider,
        JoMenu,
        JoScrollbar
    },
    setup() {
        const route = useRoute();
        const path = route.path;
        const name = path.match(/components\/(.*?)$/)?.[1];
        const keyRef = ref(name || "");
        watch(keyRef, (value) => {
            router.push(`/components/${value}`);
        })
        return {
            keyRef,
            menuOptions
        }
    },
})
</script>

<style scoped>
</style>