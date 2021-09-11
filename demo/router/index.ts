import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeVue from "../pages/home/Home.vue";
import ThemeVue from "../pages/theme/Theme.vue";
import ComponentsVue from "../pages/components/Components.vue";
import { componentsRoutes } from "./components";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: HomeVue
    },
    {
        path: "/theme",
        component: ThemeVue
    },
    {
        path: "/components",
        name: "components",
        component: ComponentsVue,
        children: componentsRoutes
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
});