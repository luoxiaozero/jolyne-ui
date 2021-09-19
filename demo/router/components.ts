export const componentsRoutes = [
    {
        path: "menu",
        component: () => import("../../src/menu/demos/zhCN/index.entry.md")
    },
    {
        path: "alert",
        component: () => import("../../src/alert/demos/zhCN/index.entry.md")
    },
    {

        path: "badge",
        component: () => import("../../src/badge/demos/zhCN/index.entry.md")
    },
    {
        path: "button",
        component: () => import("../../src/button/demos/zhCN/index.entry.md")

    },
    {
        path: "card",
        component: () => import("../../src/card/demos/zhCN/index.entry.md")
    },
    {
        path: "table",
        component: () => import("../../src/table/demos/zhCN/index.entry.md")
    },
    {
        path: "loading-bar",
        component: () => import("../../src/loading-bar/demos/zhCN/index.entry.md")
    },
    {
        path: "divider",
        component: () => import("../../src/divider/demos/zhCN/index.entry.md")
    },
    {
        path: "drawer",
        component: () => import("../../src/drawer/demos/zhCN/index.entry.md")
    },
    {
        path: "popover",
        component: () => import("../../src/popover/demos/zhCN/index.entry.md")
    },
    {
        path: "anchor",
        component: () => import("../../src/anchor/demos/zhCN/index.entry.md")
    },
    {
        path: "space",
        component: () => import("../../src/space/demos/zhCN/index.entry.md")
    },
    {
        path: "icon",
        component: () => import("../../src/icon/demos/zhCN/index.entry.md")
    },
    {
        path: "avatar",
        component: () => import("../../src/avatar/demos/zhCN/index.entry.md")
    },
    {
        path: "test",
        component: () => import("../../build/loaders/test/index.entry.md")
    }
]