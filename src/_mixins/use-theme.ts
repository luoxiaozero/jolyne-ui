import { inject, ref } from "vue";
import { configProviderInjectionKey } from "../config-provider/src/ConfigProvider";
import { lightTheme } from "../themes";

export function useTheme() {
  const configProvider = inject(configProviderInjectionKey, null);
  let mergeTheme = configProvider?.theme || ref(Object.assign({}, lightTheme));
  return mergeTheme;
}
