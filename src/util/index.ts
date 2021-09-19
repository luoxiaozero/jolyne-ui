export * from "./warn"

/**
 * 字符串首字母大写
 * @param str 字符串
 */
export function toFirstLetterUpper(str: string): string {
    if (!str) return "";
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}