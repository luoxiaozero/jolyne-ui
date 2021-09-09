import mdToDoc from "./convert/md-to-doc";
import { projectPath } from "./utils/project-path";

export default function docLoader(code: string, path: string): string {
    const relativeUrl = path.replace(projectPath + "/", "");
    return mdToDoc(code, path, relativeUrl);
}
