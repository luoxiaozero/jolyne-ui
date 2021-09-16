import marked from "marked";
import fs from "fs-extra";
import path from "path";
import createMdRenderer from "../utils/md-renderer";
const mdRenderer = createMdRenderer();
interface DemoInfo {
  name: string;
  fileName: string;
  tag: string;
  title: string;
}
const demosVue = fs
  .readFileSync(path.resolve(__dirname, "ComponentDocTemplate.vue"))
  .toString();

async function resolveDemoTitle(pathUrl: string, fileName) {
  const demoStr = await fs.readFile(
    path.resolve(pathUrl, fileName),
    "utf-8"
  );
  return demoStr.match(/# ([^\n]+)/)[1];
}
/**
 * 获取 demo 文件配置
 * @param code
 * @returns
 */
async function getDemoInfos(pathUrl: string, code: string): Promise<DemoInfo[]> {
  const names = code.split("\n").map((line) => line.trim());
  const infos: DemoInfo[] = [];
  for (let name of names) {
    infos.push({
      name,
      title: await resolveDemoTitle(pathUrl, `${name}.demo.md`),
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
export default async function mdToDoc(
  code: string,
  resourecePath: string,
  relativeUrl: string
): Promise<string> {
  const tokens = marked.lexer(code);
  const demosIndex = tokens.findIndex(
    (token) => token.type === "code" && token.lang === "demo"
  );
  let demoInfos = [];
  if (demosIndex > -1) {
    const matchResult = resourecePath.match(/(.*)\/([^\/].*?).entry.md$/);
    demoInfos = await getDemoInfos(matchResult[1], (tokens[demosIndex] as { text: string }).text);
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
  const anchorReg = /<!--ANCHOR_SLOT-->/;
  let src = demosVue;
  src = src.replace(contentReg, docMainTemplate);
  let importStr = "";
  let anchorStr = "";
  demoInfos.forEach(({ name, fileName, title }) => {
    importStr += `import ${name}Demo from './${fileName}';\n`;
    anchorStr += `<jo-anchor-link title="${title}" href="#${name}" />\n`;
  });
  src = src.replace(importReg, importStr);
  src = src.replace(anchorReg, anchorStr);

  src = src.replace(
    componentsReg,
    demoInfos
      .map(({ name }) => {
        return `${name}Demo`;
      })
      .toString()
  );
  return src.trim();
}
