const url = 'https://sourcegraph.com/.api/graphql'
const authorizationCode = '200a53748f09b3f682453275d04b126a7f03ded8'
const graphql = `
query ($query: String!) {
    search(query: $query, version: V2) {
        results {
            results {
            __typename
            ... on FileMatch {
                ...FileMatchFields
            }
            }
            limitHit
            cloning {
            name
            }
            missing {
            name
            }
            timedout {
            name
            }
            matchCount
            elapsedMilliseconds
        }
    }
}
fragment FileMatchFields on FileMatch {
    file {
      name
      path
    }
    lineMatches {
      preview
      lineNumber
      offsetAndLengths
      limitHit
    }
}
`
function parseResult(json: any): Array<string> {
  let list = json.data?.search?.results?.results || []
  if (list.length === 0) {
    return list
  }
  return list.map((i: { file: { name: string } }) => i.file.name)
}

async function fullTextSearch(text: string) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      query: graphql,
      variables: {
        // sourcegraph 自动过滤掉 “draft: true” 的文件
        query: `repo:^github\.com/armyja/blog$ path:^data/blog/ file:\.(md|mdx)$ ${text}`,
      },
    }),
    headers: {
      Authorization: authorizationCode,
    },
  })
  return parseResult(await response.json())
}

export default fullTextSearch
