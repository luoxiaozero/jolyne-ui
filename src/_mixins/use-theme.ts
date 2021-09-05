import { inject, ref } from "vue";
import { configProviderInjectionKey } from "../config-provider/ConfigProvider";
import { lightTheme } from "../themes";

export function useTheme() {
  const configProvider = inject(configProviderInjectionKey, null);
  let mergeTheme = configProvider?.theme;
  if (configProvider === null) {
    mergeTheme = ref(Object.assign({}, lightTheme));
  }
  return mergeTheme;
}
