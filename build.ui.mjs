import path from 'node:path'
import fs from 'node:fs/promises'
import { exit } from 'node:process'
import { loadConfigFromFile, build } from 'vite'

/** The directory path in which outputs are finally placed. */
const OUTPUT_DIR = 'dist'

const configResult = await loadConfigFromFile({
  command: 'build',
  mode: 'production',
})
if (configResult === null) {
  console.error('Cannot load vite config.')
  exit(1)
}

console.log(`Loaded vite config: ${configResult.path}.`)

const baseConfig = configResult.config

/**
 * Extract HTML file paths from the Rollup input option.
 * @param {import('rollup').InputOption | undefined} input - The Rollup input option.
 * @returns {string[]} - An array of HTML file paths.
 */
const getHtmlPaths = input => {
  if (Array.isArray(input)) {
    return input
  }

  if (typeof input === 'object') {
    return Object.values(input)
  }

  if (typeof input === 'string') {
    return [input]
  }

  return []
}

const htmlPaths = getHtmlPaths(baseConfig.build?.rollupOptions?.input)
if (htmlPaths.length === 0) {
  console.log('No html files to be built found.')
  exit(0)
}

const firstOutDir = baseConfig.build?.outDir
if (typeof firstOutDir === 'undefined') {
  console.error('Not specified outDir.')
  exit(2)
}

/**
 * Check if a given path is a directory.
 * @param {import('node:fs').PathLike} path - The path to check.
 * @returns {Promise<boolean>} - True if the path is a directory, false otherwise.
 */
const directoryExists = path =>
  new Promise(resolve =>
    fs
      .stat(path)
      .then(stat => resolve(stat.isDirectory))
      .catch(() => resolve(false))
  )

const secondOutDir = path.resolve(firstOutDir, '..', OUTPUT_DIR)
if (!(await directoryExists(secondOutDir))) {
  await fs.mkdir(secondOutDir)
}

/**
 * Copy the build output to the second output directory.
 * @param {import('rollup').RollupOutput} param - The Rollup output object.
 */
const copyOutput = ({ output }) => {
  console.assert(output.length === 1)
  const { fileName } = output[0]
  const newFilename = `${path.dirname(fileName)}.html`
  const from = path.resolve(firstOutDir, fileName)
  const to = path.resolve(secondOutDir, newFilename)
  return fs.copyFile(from, to)
}

const promises = htmlPaths.map(async htmlPath => {
  const result = await build({
    ...baseConfig,
    build: {
      ...baseConfig.build,
      rollupOptions: {
        ...baseConfig.build?.rollupOptions,
        input: htmlPath,
      },
    },
  })

  if (Array.isArray(result)) {
    await Promise.all(result.map(copyOutput))
  } else if ('output' in result) {
    await copyOutput(result)
  } else {
    console.warn('Unexpected build result type.')
  }
})

await Promise.all(promises)
