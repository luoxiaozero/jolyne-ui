import fs from "fs-extra";
import demoLoader from "../loaders/demo-loader";
import docLoader from "../loaders/doc-loader";

export async function getTransformedVueSrc(path: string) {
  if (path.endsWith(".demo.md")) {
    const code = await fs.readFile(path, "utf-8");
    return demoLoader(code, path);
  } else if (path.endsWith(".md")) {
    const code = await fs.readFile(path, "utf-8");
    return docLoader(code, path);
  }
}
