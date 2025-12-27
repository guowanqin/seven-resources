import ResourceCard from '@/components/ResourceCard'
import Sidebar from '@/components/Sidebar'
import { getSortedResourcesData } from '@/lib/markdown'
import { ArrowRight, Sparkles } from 'lucide-react'

// 启用静态生成 (SSG)
export const dynamic = 'force-static' 

export default async function Home() {
  const resources = getSortedResourcesData()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section (Carousel Placeholder) */}
      <section className="mb-12 rounded-2xl overflow-hidden relative h-[300px] md:h-[400px] bg-gray-900 text-white">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" 
                alt="Hero" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium w-fit mb-4 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            全新上线 v2.0
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            探索优质数字资源 <br/>
            <span className="text-blue-400">七七爱分享</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            每日更新最实用的软件工具、最前沿的技术教程、最有价值的源码资源。加入VIP，畅享无限下载。
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
              浏览资源
            </button>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium backdrop-blur-sm transition-colors">
              加入会员
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              最新发布
            </h2>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 group">
              查看全部 
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          
           {/* Pagination Placeholder */}
           <div className="mt-12 flex justify-center">
              <button className="px-6 py-2 border border-gray-200 rounded-l-lg hover:bg-gray-50 text-gray-600">上一页</button>
              <button className="px-4 py-2 bg-blue-600 text-white border border-blue-600">1</button>
              <button className="px-4 py-2 border-t border-b border-gray-200 hover:bg-gray-50 text-gray-600">2</button>
              <button className="px-4 py-2 border-t border-b border-gray-200 hover:bg-gray-50 text-gray-600">3</button>
              <button className="px-4 py-2 border-t border-b border-gray-200 hover:bg-gray-50 text-gray-600">...</button>
              <button className="px-6 py-2 border border-gray-200 rounded-r-lg hover:bg-gray-50 text-gray-600">下一页</button>
           </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  )
}
