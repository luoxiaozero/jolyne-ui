import { inject } from "vue";
import { throwError } from "../../util";
import { menuInjectionKey } from "./Menu";

export function useMenu() {
  const api = inject(menuInjectionKey, null);
  if (api === null) {
    throwError("jo-menu", "No outer <jo-menu /> founded. ");
  }
  return api;
}
