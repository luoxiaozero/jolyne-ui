import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeVue from "../pages/home/Home.vue";
import ThemeVue from "../pages/theme/Theme.vue";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: HomeVue
    },
    {
        path: "/theme",
        component: ThemeVue
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes
});