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
        path: "test",
        component: TestEntryDemo
    }
]