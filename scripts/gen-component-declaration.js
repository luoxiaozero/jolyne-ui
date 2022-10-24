// The file is not designed to run directly. `cwd` should be project root.
import path from "path"
import fs from "fs-extra"
import process from "process"
import * as globalComponents from "../src/components"

const TYPE_ROOT = process.cwd()

function exist(path) {
    return fs.existsSync(path)
}

function parseComponentsDeclaration(code) {
    if (!code) {
        return {}
    }
    return Object.fromEntries(
        Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(i => [
            i[1],
            i[2],
        ])
    )
}

async function generateComponentsType() {
    const components = {}

    Object.keys(globalComponents).forEach(key => {
        if (key.startsWith("Jo")) {
            components[key] = `typeof import('jolyne-ui')['${key}']`
        }
    })
    const originalContent = exist(path.resolve(TYPE_ROOT, "volar.d.ts"))
        ? await fs.readFile(path.resolve(TYPE_ROOT, "volar.d.ts"), "utf-8")
        : ""

    const originImports = parseComponentsDeclaration(originalContent)
    const lines = Object.entries({
        ...originImports,
        ...components,
    })
        .filter(([name]) => {
            return components[name]
        })
        .map(([name, v]) => {
            if (!/^\w+$/.test(name)) {
                name = `'${name}'`
            }
            return `${name}: ${v}`
        })
    const code = `// Auto generated component declarations
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join("\n    ")}
  }
}
export {}
`
    if (code !== originalContent) {
        await fs.writeFile(path.resolve(TYPE_ROOT, "volar.d.ts"), code, "utf-8")
    }
}
generateComponentsType()
