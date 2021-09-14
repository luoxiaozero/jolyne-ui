import { inject } from "vue";
import { throwError } from "../../util";
import { loadingBarApiInjectionKey } from "./LoadingBarProvider";

export function useLoadingBar() {
  const api = inject(loadingBarApiInjectionKey, null);
  if (api === null) {
    throwError(
      "use-loading-bar",
      "No outer <jo-laoding-bar-provider /> founded. "
    );
  }
  return api;
}
