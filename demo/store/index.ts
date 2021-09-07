import { ref, Ref } from "vue";
import { Theme, darkTheme } from "../../src";
export const themeRef = ref<Theme | undefined>(undefined);
const themeNameRef = ref<"浅色" | "深色">("浅色");
export function useThemeName(): Ref<string> {
  return themeNameRef;
}
export function changeTheme(): void {
  if (themeRef.value) {
    themeRef.value = undefined;
    themeNameRef.value = "浅色";
  } else {
    themeRef.value = darkTheme;
    themeNameRef.value = "深色";
  }
}