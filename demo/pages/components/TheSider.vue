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
                    {
                        label: '标记',
                        key: 'badge',
                    },
                    {
                        label: "按钮",
                        key: "button",
                    },
                    {
                        label: "卡片",
                        key: "card",
                    },
                    {
                        label: "表格",
                        key: "table",
                    },
                    {
                        label: "加载条",
                        key: "loading-bar",
                    },
                    {
                        label: "抽屉",
                        key: "drawer",
                    }
                ]
            },
            {
                type: "group",
                label: '测试组件',
                key: 'test-2',
                children: [
                    {
                        label: '测试',
                        key: 'test',
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