'use server'

import { createResourceFile } from '@/lib/github'
import { redirect } from 'next/navigation'
import slugify from 'slugify'

export async function publishToGithub(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const downloadUrl = formData.get('download_url') as string
  const imageUrl = formData.get('image_url') as string
  const isVip = formData.get('is_vip') === 'on'
  const content = formData.get('content') as string
  
  const date = new Date().toISOString().split('T')[0]
  const filename = `${slugify(title, { lower: true, strict: true })}.md`

  // 构建 Markdown 内容 (Front-matter + Body)
  const markdownContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
category: "${category}"
date: "${date}"
views: 0
likes: 0
isVip: ${isVip}
image: "${imageUrl}"
downloadUrl: "${downloadUrl}"
---

${content}
`

  try {
    await createResourceFile(filename, markdownContent, `Add resource: ${title}`)
  } catch (error) {
    console.error('Failed to publish to GitHub:', error)
    return { error: '发布失败，请检查 GitHub Token 配置' }
  }

  // 注意：推送到 GitHub 后，Vercel 会自动重新构建，构建完成后内容才会更新
  // 这里我们无法立即看到更新，所以重定向到一个提示页面或者首页
  redirect('/')
}
