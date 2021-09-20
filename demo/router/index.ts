import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "../pages/home/Home.vue";
import ThemeVue from "../pages/theme/Theme.vue";
import ComponentsVue from "../pages/components/Components.vue";
import { componentsRoutes } from "./components";
import { loadingBarApiRef } from "../store";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomeVue,
  },
  {
    path: "/theme",
    component: ThemeVue,
  },
  {
    path: "/components",
    name: "components",
    component: ComponentsVue,
    children: componentsRoutes,
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!from || to.path !== from.path) {
    if (loadingBarApiRef.value) {
      loadingBarApiRef.value.start();
    }
  }
  next();
});
router.afterEach((to, from) => {
  if (!from || to.path !== from.path) {
    if (loadingBarApiRef.value) {
      loadingBarApiRef.value.finish();
    }
  }
});
