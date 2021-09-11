<template>
    <JoLayoutSider bordered>
        <JoMenu :options="menuOptions" v-model:value="keyRef" />
    </JoLayoutSider>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { JoLayoutSider, JoMenu } from "../../../src";
import { router } from '../../router';
export default defineComponent({
    components: {
        JoLayoutSider,
        JoMenu
    },
    setup() {
        const route = useRoute();
        const path = route.path;
        const name = path.match(/components\/(.*?)$/)?.[1];
        const keyRef = ref(name || "");
        const menuOptions = [
            {
                type: "group",
                label: '通用组件',
                key: 'test-1',
                children: [
                    {
                        label: '菜单',
                        key: 'menu',
                    },
                ]
            },
        ]
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