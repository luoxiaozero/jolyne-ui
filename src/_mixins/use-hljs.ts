import { inject } from "vue";
import { configProviderInjectionKey } from "../config-provider/src/ConfigProvider";
import type { HLJSApi } from 'highlight.js'

export function useHljs(): HLJSApi | undefined {
  const configProvider = inject(configProviderInjectionKey, null);
  return configProvider?.hljs;
}
