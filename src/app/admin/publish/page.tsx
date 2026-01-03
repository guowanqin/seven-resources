'use client'

import { publishToGithub } from '@/actions/github-publish'
import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'

export default function PublishPage() {
  const [isPending, setIsPending] = useState(false)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)
    const formData = new FormData(event.currentTarget)
    
    try {
      await publishToGithub(formData)
      alert('发布请求已提交！GitHub 正在自动构建新页面，请稍等几分钟后刷新首页。')
    } catch (error) {
      console.error(error)
      alert('发布失败，请确保 GitHub Token 配置正确')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Upload className="h-6 w-6 text-blue-600" />
          发布新资源
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源标题</label>
            <input 
              name="title" 
              required 
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="例如：Adobe Photoshop 2025 破解版"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">资源分类</label>
            <div className="flex gap-4">
              <select 
                 name="category" 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
               >
                 <option value="实用软件">实用软件</option>
                 <option value="技术教程">技术教程</option>
                 <option value="源码分享">源码分享</option>
                 <option value="操作系统">操作系统</option>
                 <option value="游戏娱乐">游戏娱乐</option>
                 <option value="媒体素材">媒体素材</option>
                 <option value="其它资源">其它资源</option>
               </select>
               <button
                 type="button"
                 onClick={handleAutoClassify}
                 disabled={isClassifying}
                 className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <Sparkles className={`h-4 w-4 ${isClassifying ? 'animate-spin' : ''}`} />
                 {isClassifying ? '分析中...' : 'AI 自动分类'}
               </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">目前支持手动选择，即将接入 DeepSeek 实现内容自动分析归类。</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">简短描述</label>
            <textarea 
              name="description" 
              required 
              rows={3}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="简单介绍一下这个资源..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input 
                    name="image_url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="输入图片链接 或 点击右侧上传"
                    />
                    <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2">
                        {isUploading ? '上传中...' : '上传本地图片'}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        {!isUploading && <Upload className="h-4 w-4" />}
                    </label>
                </div>
                {imageUrl && (
                    <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">下载/访问链接</label>
            <input 
              name="download_url" 
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="网盘链接或官网地址"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">详细内容 (支持 Markdown)</label>
             <textarea
                name="content"
                rows={6}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                placeholder="# 详细介绍..."
             />
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="is_vip" 
              id="is_vip"
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_vip" className="text-sm font-medium text-gray-700">设置为 VIP 专属资源</label>
          </div>

          <div className="pt-4 border-t">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isPending ? '发布中...' : '立即发布'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
