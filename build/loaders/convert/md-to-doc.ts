import marked from "marked";
import fs from "fs-extra";
import path from "path";
import createMdRenderer from "../utils/md-renderer";
const mdRenderer = createMdRenderer();
interface DemoInfo {
  name: string;
  fileName: string;
  tag: string;
}
const demosVue = fs
  .readFileSync(path.resolve(__dirname, "ComponentDocTemplate.vue"))
  .toString();
/**
 * 获取 demo 文件配置
 * @param code
 * @returns
 */
function getDemoInfos(code: string): DemoInfo[] {
  const names = code.split("\n").map((line) => line.trim());
  const infos: DemoInfo[] = [];
  for (let name of names) {
    infos.push({
      name,
      fileName: `${name}.demo.md`,
      tag: `<${name}Demo/>`,
    });
  }
  return infos;
}

function genDemosTemplate(demoInfos: DemoInfo[]) {
  return `<component-demos>${demoInfos
    .map(({ tag }) => tag)
    .join("\n")}</component-demos>`;
}
export default function mdToDoc(
  code: string,
  resourecePath: string,
  relativeUrl: string
): string {
  const tokens = marked.lexer(code);
  const demosIndex = tokens.findIndex(
    (token) => token.type === "code" && token.lang === "demo"
  );
  let demoInfos = [];
  if (demosIndex > -1) {
    demoInfos = getDemoInfos((tokens[demosIndex] as { text: string }).text);
    tokens.splice(demosIndex, 1, {
      type: "html",
      pre: false,
      raw: "",
      text: genDemosTemplate(demoInfos),
    });
  }
  const docMainTemplate = marked.parser(tokens, {
    renderer: mdRenderer,
  });
  const contentReg = /<!--CONTENT_SLOT-->/;
  const importReg = /\/\/<!--IMPORT_SLOT-->/;
  const componentsReg = /\/\/<!--COMPONENTS_SLOT-->/;
  let src = demosVue;
  src = src.replace(contentReg, docMainTemplate);
  let importStr = "";
  demoInfos.forEach(({name, fileName}) => {
    importStr += `import ${name}Demo from './${fileName}';\n`
  })
  src = src.replace(importReg, importStr);
  src = src.replace(componentsReg, demoInfos.map(({name}) => {
    return `${name}Demo`;
}).toString())
  return src.trim();
}
