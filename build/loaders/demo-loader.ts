import mdToDemo from "./convert/md-to-demo";
import { projectPath } from "./utils/project-path";

export default function demoLoader(code: string, path: string): string {
    const relativeUrl = path.replace(projectPath + "/", "");
    return mdToDemo(code, path, relativeUrl);
}
