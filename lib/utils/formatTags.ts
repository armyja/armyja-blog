export default function convertStringTagToArray(frontmatter: { [key: string]: any }) {
  if (typeof frontmatter['tags'] === 'string') {
    frontmatter['tags'] = frontmatter['tags']
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s !== '')
  }
}
