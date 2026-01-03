import { Octokit } from '@octokit/rest'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

// 所有的图片将存储在 public/uploads 目录下
// 这样 Next.js 可以直接作为静态资源访问它们

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const REPO_OWNER = process.env.GITHUB_OWNER || 'your-username'
const REPO_NAME = process.env.GITHUB_REPO || 'seven-resources'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64Content = buffer.toString('base64')
    
    // 生成唯一文件名
    const ext = file.name.split('.').pop()
    const filename = `${uuidv4()}.${ext}`
    const path = `public/uploads/${filename}`

    // Upload to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path,
      message: `Upload image: ${filename}`,
      content: base64Content,
      committer: {
        name: 'Seven Resources Bot',
        email: 'bot@77resources.com',
      },
    })

    // 返回可以直接访问的 URL (在 Vercel 上是 /uploads/filename)
    // 注意：如果是本地开发，需要稍等 Git 同步，或者直接把文件放到本地 public 目录
    // 生产环境下，GitHub 提交触发构建后，新图片就可以通过域名访问了
    const url = `/uploads/${filename}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
