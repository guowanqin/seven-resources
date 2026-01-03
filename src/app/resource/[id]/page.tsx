import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, Eye, Download, ShieldCheck, Tag } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { getResourceData, getSortedResourcesData } from '@/lib/markdown'

// 生成所有可能的静态路径
export async function generateStaticParams() {
  const resources = getSortedResourcesData()
  return resources.map((resource) => ({
    id: resource.id,
  }))
}

// 静态页面的 Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const resource = getResourceData(id)

  if (!resource) {
    return {
      title: '资源未找到 - 七七爱分享',
    }
  }

  return {
    title: `${resource.title} - 七七爱分享`,
    description: resource.description,
  }
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // 对 id 进行解码，处理中文 URL
  const decodedId = decodeURIComponent(id)
  const resource = getResourceData(decodedId)

  if (!resource) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 border-b pb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 rounded-full flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  {resource.category}
                </span>
                {resource.isVip && (
                  <span className="px-3 py-1 text-sm font-medium bg-amber-50 text-amber-600 rounded-full flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    VIP专属
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {resource.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {resource.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {resource.views} 次浏览
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {resource.image && (
              <div className="mb-8 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-blue max-w-none mb-8">
               <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r mb-6 text-gray-700">
                  <p className="font-medium">资源简介：</p>
                  <p>{resource.description}</p>
               </div>
               
               {/* Markdown Content */}
               <ReactMarkdown remarkPlugins={[remarkGfm]}>
                 {resource.content || '暂无详细介绍...'}
               </ReactMarkdown>
            </div>

            {/* Download Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                资源下载
              </h3>
              
              {resource.isVip ? (
                // VIP Logic Placeholder
                <div className="text-center py-6">
                   <p className="text-gray-600 mb-4">此资源为 VIP 专属资源，请登录或开通 VIP 后查看下载链接。</p>
                   <Link href="/vip" className="inline-flex items-center justify-center px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
                     开通 VIP 会员
                   </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  {resource.downloadUrl ? (
                    <a 
                      href={resource.downloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      点击下载
                    </a>
                  ) : (
                    <button disabled className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed">
                      暂无下载链接
                    </button>
                  )}
                  
                  <div className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg">
                    提取码：<span className="font-mono bg-gray-100 px-2 py-0.5 rounded">无</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}
