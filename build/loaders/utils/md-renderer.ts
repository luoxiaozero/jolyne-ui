import marked from "marked";
import hljs from "highlight.js";

export default function createMdRenderer() {
  const renderer = new marked.Renderer();
  const overrides = {
    table(header: string, body: string) {
      return `<jo-card contentStyle="padding: 20px 28px" borderRadius="large"><jo-table>
      <thead> ${header}</thead>
      <tbody>${body}</tbody>
      </jo-table></jo-card>`;
    },
    code(code: string, language: string) {
      const highlighted = hljs.highlight(code, {language}).value;
      return `<jo-card><jo-code><pre>${highlighted}</pre></jo-code></jo-card>`
    },
    codespan (code: string) {
      return `<jo-text code>${code}</jo-text>`
    },
  };
  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key];
  });
  return renderer;
}
