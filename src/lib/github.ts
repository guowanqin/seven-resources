import { Octokit } from '@octokit/rest'

// 这个 Token 需要在 Vercel 环境变量中配置 GITHUB_TOKEN
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const REPO_OWNER = process.env.GITHUB_OWNER || 'your-username'
const REPO_NAME = process.env.GITHUB_REPO || 'seven-resources'

export async function createResourceFile(filename: string, content: string, message: string) {
  try {
    // Check if file exists to get sha for update
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `src/content/resources/${filename}`,
      })
      if (!Array.isArray(data)) {
         sha = data.sha
      }
    } catch (e) {
      // File doesn't exist, ignore
    }

    // Create or update file
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `src/content/resources/${filename}`,
      message: message,
      content: Buffer.from(content).toString('base64'),
      sha: sha,
      committer: {
        name: 'Seven Resources Bot',
        email: 'bot@77resources.com',
      },
      author: {
        name: 'Seven Resources Bot',
        email: 'bot@77resources.com',
      },
    })
    return { success: true }
  } catch (error) {
    console.error('GitHub API Error:', error)
    throw error
  }
}
