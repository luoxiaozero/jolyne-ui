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
                        label: "头像",
                        key: "avatar",
                        extra: "Avatar",
                    },
                    {
                        label: "按钮",
                        key: "button",
                        extra: "Button"
                    },
                    {
                        label: "卡片",
                        key: "card",
                        extra: "Card"
                    },
                    {
                        label: "图标",
                        key: "icon",
                        extra: "Icon"
                    },
                    {
                        label: "分割线",
                        key: "divider",
                        extra: "Divider"
                    },
                    {
                        label: "折叠面板",
                        key: "collapse",
                        extra: "Collapse"
                    },
                    {
                        label: "下拉菜单",
                        key: "dropdown",
                        extra: "Dropdown"
                    }
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
                        extra: "Table"
                    },
                    {
                        label: "代码",
                        key: "code",
                        extra: "Code"
                    },
                    {
                        label: "图像",
                        key: "image",
                        extra: "Image"
                    },
                ]
            },
            {
                type: "group",
                label: "数据录入组件",
                key: "数据录入组件",
                children: [
                    {
                        label: "动态标签",
                        key: "dynamic-tags",
                        extra: "Dynamic Tags"
                    },
                    {
                        label: "文本输入",
                        key: "input",
                        extra: "Input"
                    }
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
                        extra: "Alert"
                    },
                    {
                        label: '标记',
                        key: 'badge',
                        extra: "Badge"
                    },
                    {
                        label: "抽屉",
                        key: "drawer",
                        extra: "Drawer"
                    },
                    {
                        label: "弹出消息",
                        key: "popover",
                        extra: "Popover"
                    },
                    {
                        label: "对话框",
                        key: "dialog",
                        extra: "Dialog"
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
                        extra: "Menu",
                    },
                    {
                        label: "加载条",
                        key: "loading-bar",
                        extra: "LoadingBar"
                    },
                    {
                        label: "侧边导航",
                        key: "anchor",
                        extra: "Anchor"
                    },
                ]
            },
            {
                type: "group",
                label: "布局组件",
                key: "test-3",
                children: [
                    {
                        label: "布局",
                        key: "layout",
                        extra: "Layout"
                    },
                    {
                        label: "间距",
                        key: "space",
                        extra: "Space"
                    }
                ]
            },
            {
                type: "group",
                label: "配置组件",
                key: "test-4",
                children: [
                    {
                        label: "全局化配置",
                        key: "config-provider",
                        extra: "Config Provider"
                    },
                    {
                        label: "全局样式",
                        key: "global-style",
                        extra: "Global Style"
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
                        extra: "Test"
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