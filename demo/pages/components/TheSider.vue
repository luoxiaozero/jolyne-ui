<template>
    <JoLayoutSider style="padding: 2px 0 4px;">
        <JoScrollbar :scroll-style="'remove'">
            <JoMenu :options="menuOptions" v-model:value="keyRef" />
        </JoScrollbar>
    </JoLayoutSider>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { JoLayoutSider, JoMenu, JoScrollbar } from "../../../src";
import { router } from '../../router';
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
        const menuOptions = [
            {
                type: "group",
                label: '通用组件',
                key: 'test-1',
                children: [
                    {
                        label: "按钮",
                        key: "button",
                    },
                    {
                        label: "卡片",
                        key: "card",
                    },
                ]
            },
            {
                type: "group",
                label: "数据展示组件",
                key: "数据展示组件",
                children: [
                    {
                        label: "表格",
                        key: "table",
                    },
                ]
            },
            {
                type: "group",
                label: "反馈组件",
                key: "反馈组件",
                children: [
                    {
                        label: '警告',
                        key: 'alert',
                    },
                    {
                        label: '标记',
                        key: 'badge',
                    },
                    {
                        label: "抽屉",
                        key: "drawer",
                    },
                    {
                        label: "弹出消息",
                        key: "popover",
                    },
                ]
            },
            {
                type: "group",
                label: "导航组件",
                key: "导航组件",
                children: [
                    {
                        label: '菜单',
                        key: 'menu',
                    },
                    {
                        label: "加载条",
                        key: "loading-bar",
                    },
                    {
                        label: "侧边导航",
                        key: "anchor",
                    },
                ]
            },
            {
                type: "group",
                label: "布局组件",
                key: "test-3",
                children: [
                    {
                        label: "间距",
                        key: "space",
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