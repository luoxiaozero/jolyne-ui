import path from "path"
import fs from "fs-extra"
import process from "process"
import * as globalComponents from "../src/components"

const TYPE_ROOT = process.cwd()

async function generateReactFile() {
    const components = {}

    Object.keys(globalComponents).forEach(key => {
        if (key.startsWith("Jo")) {
            components[key] = `const ${key}: Function = applyVueInReact(globalComponents.${key})`
        }
    })

    const lines = Object.entries({
        ...components,
    })
        .filter(([name]) => {
            return components[name]
        })
        .map(([name, v]) => {
            if (!/^\w+$/.test(name)) {
                name = `'${name}'`
            }
            return `export ${v}`
        })
    const code = `// Auto generated
import * as globalComponents from "../components"
import { applyVueInReact } from "veaury"

${lines.join("\n")}
`
    if (!fs.existsSync(path.resolve(TYPE_ROOT, "./src/react")))
        await fs.mkdir(path.resolve(TYPE_ROOT, "./src/react"))
    await fs.writeFile(path.resolve(TYPE_ROOT, "./src/react/index.ts"), code, "utf-8")
}
generateReactFile()
