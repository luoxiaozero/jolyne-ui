import mdToDoc from "./convert/md-to-doc";
import { projectPath } from "./utils/project-path";

export default async function docLoader(code: string, path: string): Promise<string> {
    const relativeUrl = path.replace(projectPath + "/", "");
    return mdToDoc(code, path, relativeUrl);
}
