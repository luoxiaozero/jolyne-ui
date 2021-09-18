import { VNodeChild, createTextVNode } from "vue";
export default function render<T extends any[]>(
  r: string | number | undefined | null | ((...args: [...T]) => VNodeChild),
  ...args: [...T]
): VNodeChild {
    if (typeof r === "function") {
        return r(...args);
    } else if (typeof r === "string") {
        return createTextVNode(r);
    } else if (typeof r === "number") {
        return createTextVNode(String(r));
    } else {
        return null;
    }
}
