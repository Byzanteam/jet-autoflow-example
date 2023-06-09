import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'

import * as prettier from 'prettier'

import type { Plugin } from 'vite'

export interface EnvPluginOptions {
  loadEnv(mode: string, dir: string): Record<string, string>
  moduleName?: string
  typeFile?: string
  dtsDir?: string
}

const defaultOptions = {
  moduleName: 'envs',
  dtsDir: '.jet',
}

export default function envPlugin(options: EnvPluginOptions): Plugin {
  const opts = {
    ...defaultOptions,
    ...options,
  }

  const mode = process.env.NODE_ENV ?? 'development'
  const moduleMatcher = new RegExp(`^${opts.moduleName}$`)

  let envs: Record<string, string>

  async function generateType() {
    const types = Object.keys(envs)
      .map(envKey => {
        return `${envKey}: string`
      })
      .join('\n')

    const typeFileContent = `
      // auto generated by jet:env plugin
      declare module '${opts.moduleName}' {
        type Env = {
          ${types}
        }

        export function getEnv<T extends keyof Env>(name: T): Env[T]
      }
    `

    const typeContent = prettier.format(typeFileContent, {
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      parser: 'typescript',
    })

    const dtsFilePath = resolve(
      process.cwd(),
      opts.dtsDir,
      `${opts.moduleName}.d.ts`,
    )

    const folder = dirname(dtsFilePath)

    await mkdir(folder, {
      recursive: true,
    })

    return writeFile(dtsFilePath, typeContent, {
      encoding: 'utf8',
    })
  }

  function getEnvJsContent() {
    const envVariables = Object.keys(envs)
      .map(envKey => {
        return `${envKey}: '${envs[envKey]}'`
      })
      .join(',')

    return `
      const envObject = {${envVariables}};
      export function getEnv(name) {
        return envObject[name];
      }
    `
  }

  return {
    name: 'rollup-plugin-jet-env',
    enforce: 'post',

    async buildStart() {
      if (mode !== 'production') {
        ;['.env', `.env.${mode}`, `.env.${mode}.local`].forEach(envFile => {
          this.addWatchFile(envFile)
        })
      }

      envs = opts.loadEnv(mode, process.cwd())

      return generateType()
    },

    resolveId(id) {
      if (moduleMatcher.test(id)) {
        return id
      }
    },

    load(id) {
      if (moduleMatcher.test(id)) {
        if (mode === 'production') {
          this.emitFile({
            type: 'chunk',
            id,
            name: opts.moduleName,
            // 确保导出变量的名字不会压缩成别的名字
            preserveSignature: 'exports-only',
          })
        }

        return getEnvJsContent()
      }
    },
  }
}
