import { createTextVNode, Fragment, VNode, VNodeChild } from "vue";

export function flatten(vNodes: VNodeChild[], result: VNode[] = []): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return;
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, result);
      }
    } else {
      result.push(vNode);
    }
  });
  return result;
}
