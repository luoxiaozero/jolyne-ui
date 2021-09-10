import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import ComponentDemo from "./components/ComponentDemo.vue";
import ComponentDemos from "./components/ComponentDemos.vue";
import jolyne from "../src";

const app = createApp(App);
app.use(router);
app.use(jolyne);
app.component("ComponentDemo", ComponentDemo);
app.component("ComponentDemos", ComponentDemos);
app.mount('#app');
