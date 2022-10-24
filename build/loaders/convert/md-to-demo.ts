import { marked } from "marked";
import fs from "fs-extra";
import path from "path";
import createMdRenderer from "../utils/md-renderer";
interface Parts {
  template: string | null;
  script: string | null;
  style: string | null;
  title: string | null;
  content: string;
  code?: string;
}
const mdRenderer = createMdRenderer();
const demoVue = fs
  .readFileSync(path.resolve(__dirname, "ComponentDemoTemplate.vue"))
  .toString();
/**
 * 获取相应配置
 * @param tokens
 * @returns
 */
function getPartsOfDemo(tokens: marked.TokensList): Parts {
  let template: string | null = null;
  let script: string | null = null;
  let style: string | null = null;
  let title: string | null = null;
  const contentTokens: any = [];
  contentTokens.links = tokens.links;
  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 1) {
      title = token.text;
    } else if (
      token.type === "code" &&
      ["template", "html"].includes(token.lang || "")
    ) {
      template = token.text;
    } else if (token.type === "code" && ["script", "js"].includes(token.lang || "")) {
      script = token.text;
    } else if (token.type === "code" && ["style", "css"].includes(token.lang || "")) {
      style = token.text;
    } else {
      contentTokens.push(token);
    }
  }
  return {
    template,
    script,
    style,
    title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer,
    }),
  };
}
/**
 * 把配置混成 code
 * @param parts
 * @returns
 */
function mergeParts(parts: Parts) {
  const mergedPartsData = {
    ...parts,
  };
  mergedPartsData.title = parts.title;
  mergedPartsData.content = parts.content;
  mergedPartsData.code = "";
  if (parts.template) {
    mergedPartsData.code += `<template>\n${parts.template
      .split("\n")
      .map((line) => (line.length ? " " + line : line))
      .join("\n")}\n</template>`;
  }
  if (parts.script) {
    if (parts.template) mergedPartsData.code += "\n\n";
    mergedPartsData.code += `<script>\n${parts.script}\n</script>`;
  }
  if (parts.style) {
    if (parts.template || parts.script) mergedPartsData.code += "\n\n";
    mergedPartsData.code += `<style>\n${parts.style}\n</style>`;
  }
  mergedPartsData.code = encodeURIComponent(mergedPartsData.code);
  return mergedPartsData;
}
function getFileName(path: string) {
  const dirs = path.split("/");
  const fileNameWithExtension = dirs[dirs.length - 1];
  return [fileNameWithExtension.split(".")[0], fileNameWithExtension];
}
/**
 * 生成 vue 组件
 */
function genVueComponent(
  parts: Parts,
  fileName: string,
  relativeUrl: string
): string {
  const demoFileNameReg = /<!--DEMO_FILE_NAME_SLOT-->/;
  const relativeUrlReg = /<!--URL_SLOT-->/;
  const titleReg = /<!--TITLE_SLOT-->/;
  const contentReg = /<!--CONTENT_SLOT-->/;
  const codeReg = /<!--CODE_SLOT-->/;
  const scriptReg = /<!--SCRIPT_SLOT-->/;
  const styleReg = /<!--STYLE_SLOT-->/;
  const demoReg = /<!--DEMO_SLOT-->/;
  let src = demoVue;
  src = src.replace(demoFileNameReg, fileName);
  src = src.replace(relativeUrlReg, relativeUrl);
  if (parts.content) {
    src = src.replace(contentReg, parts.content);
  }
  if (parts.title) {
    src = src.replace(titleReg, parts.title);
  }
  if (parts.code) {
    src = src.replace(codeReg, parts.code);
  }
  if (parts.script) {
    src = src.replace(scriptReg, `<script>\n${parts.script}\n</script>`);
  }
  if (parts.style) {
    src = src.replace(styleReg, `<style scoped>\n${parts.style}\n</style>`);
  }
  if (parts.template) {
    src = src.replace(demoReg, parts.template);
  }
  return src.trim();
}
export default function mdToDemo(
  code: string,
  resourecePath: string,
  relativeUrl: string
): string {
  const tokens = marked.lexer(code);
  const parts = getPartsOfDemo(tokens);
  const mergedParts = mergeParts(parts);
  const [fileName] = getFileName(resourecePath);
  const vueComponent = genVueComponent(mergedParts, fileName, relativeUrl);
  return vueComponent;
}