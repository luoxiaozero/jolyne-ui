import TestEntryDemo from "../../build/loaders/test/index.entry.md";
export const componentsRoutes = [
    {
        path: "menu",
        component: () => import("../../src/menu/demos/zhCN/index.entry.md")
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
        path: "test",
        component: TestEntryDemo
    }
]