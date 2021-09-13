import marked from "marked";
import hljs from "highlight.js";

export default function createMdRenderer() {
  const renderer = new marked.Renderer();
  const overrides = {
    table(header: string, body: string) {
      return `<jo-table>
      <thead> ${header}</thead>
      <tbody>${body}</tbody>
      </jo-table>`;
    },
  };
  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key];
  });
  return renderer;
}
