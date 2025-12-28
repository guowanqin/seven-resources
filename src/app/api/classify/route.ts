import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

// 使用兼容 OpenAI 接口的客户端 (支持 DeepSeek/Kimi 等)
// 需要在 Vercel 环境变量中配置:
// AI_API_KEY: 你的 API Key (例如 sk-ZvbBUl0jJKqlUkSKi7hZhZ15JaY9pQVtq0bF9Ra2CCZ9xdOU)
// AI_BASE_URL: API 地址 (例如 https://api.moonshot.cn/v1)
// AI_MODEL: 模型名称 (例如 kimi-k2-0711-preview)

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY || 'sk-ZvbBUl0jJKqlUkSKi7hZhZ15JaY9pQVtq0bF9Ra2CCZ9xdOU',
  baseURL: process.env.AI_BASE_URL || 'https://api.moonshot.cn/v1',
})

const CATEGORIES = [
  "实用软件",
  "技术教程",
  "源码分享",
  "操作系统",
  "游戏娱乐",
  "媒体素材",
  "其它资源"
]

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json()

    if (!title && !content) {
      return NextResponse.json({ error: '标题或内容不能为空' }, { status: 400 })
    }

    const prompt = `
    你是一个专业的资源站分类助手。请根据以下资源标题和描述，从给定的分类列表中选择最合适的一个分类。
    
    分类列表: ${CATEGORIES.join(', ')}
    
    资源标题: ${title}
    资源描述: ${content}
    
    请只返回分类名称，不要包含任何其他文字。如果无法确定，请返回"其它资源"。
    `

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: process.env.AI_MODEL || 'kimi-k2-0711-preview',
      temperature: 0.1, // 低温度以保证输出确定性
    })

    const category = completion.choices[0].message.content?.trim() || '其它资源'
    
    // 验证返回的分类是否在列表中
    const finalCategory = CATEGORIES.includes(category) ? category : '其它资源'

    return NextResponse.json({ category: finalCategory })
  } catch (error) {
    console.error('AI Classification Error:', error)
    return NextResponse.json({ error: 'AI 分类失败' }, { status: 500 })
  }
}
