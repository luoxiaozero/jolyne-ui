import { ComponentPublicInstance, VNodeChild } from "vue";
/**获取 slot */
export default function getSlot(
  instance: ComponentPublicInstance,
  slotName: string = "default",
  fallback: VNodeChild[] = []
) {
  const slot = instance.$slots[slotName];
  if (slot === undefined) return fallback;
  return slot();
}
