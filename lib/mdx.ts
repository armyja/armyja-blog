import fs from 'fs'
import path from 'path'
import getAllFilesRecursively from './utils/files'

const root = process.cwd()
export function getFiles(type: string) {
  const prefixPaths = path.join(root, 'data', type)
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

// export async function getFileBySlug(type: string, slug: string) {
//     const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
//     const mdPath = path.join(root, 'data', type, `${slug}.md`)
//     const source = fs.existsSync(mdxPath)
//       ? fs.readFileSync(mdxPath, 'utf8')
//       : fs.readFileSync(mdPath, 'utf8')

//     // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
//     if (process.platform === 'win32') {
//       process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
//     } else {
//       process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild')
//     }

//     let toc = []

//     const { code, frontmatter } = await bundleMDX({
//       source,
//       // mdx imports can be automatically source from the components directory
//       cwd: path.join(root, 'components'),
//       xdmOptions(options, frontmatter) {
//         // this is the recommended way to add custom remark/rehype plugins:
//         // The syntax might look weird, but it protects you in case we add/remove
//         // plugins in the future.
//         options.remarkPlugins = [
//           ...(options.remarkPlugins ?? []),
//           remarkExtractFrontmatter,
//           [remarkTocHeadings, { exportRef: toc }],
//           remarkGfm,
//           remarkCodeTitles,
//           [remarkFootnotes, { inlineNotes: true }],
//           remarkMath,
//           remarkImgToJsx,
//         ]
//         options.rehypePlugins = [
//           ...(options.rehypePlugins ?? []),
//           rehypeSlug,
//           rehypeAutolinkHeadings,
//           rehypeKatex,
//           [rehypeCitation, { path: path.join(root, 'data') }],
//           [rehypePrismPlus, { ignoreMissing: true }],
//           rehypePresetMinify,
//         ]
//         return options
//       },
//       esbuildOptions: (options) => {
//         options.loader = {
//           ...options.loader,
//           '.js': 'jsx',
//         }
//         return options
//       },
//     })

//     return {
//       mdxSource: code,
//       toc,
//       frontMatter: {
//         readingTime: readingTime(code),
//         slug: slug || null,
//         fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
//         ...frontmatter,
//         date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
//       },
//     }
//   }
