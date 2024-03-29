import { App } from "vue";
import version from './version'
import * as components from "./components";
function create(compoents: any[]) {
  function registerComponent(app: App, name: string, compoent: any) {
      if (!app.component("Jo" + name)) {
          app.component("Jo" + name, compoent);
      }
  }
  function install(app: App): void {
    compoents.forEach((component) => {
      const { name } = component;
      registerComponent(app, name, component);
    });
  }
  return {
    version,
    install,
  };
}
export default create(
  Object.keys(components).map(
    (key) => components[key as keyof typeof components]
  )
);
