import { onBeforeUnmount, onMounted } from "vue";

export function bindBodyClickEvent(ev: (ev: MouseEvent) => any) {
  onMounted(() => {
    document.body.addEventListener("click", ev);
  });
  onBeforeUnmount(() => {
    document.body.removeEventListener("click", ev);
  });
}
