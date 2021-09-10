import marked from "marked";
import hljs from "highlight.js";

export default function createMdRenderer() {
  const renderer = new marked.Renderer();
  return renderer;
}
