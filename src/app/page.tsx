import ResourceCard from '@/components/ResourceCard'
import Sidebar from '@/components/Sidebar'
import { getSortedResourcesData } from '@/lib/markdown'
import { ArrowRight, Sparkles, Flame, RefreshCw } from 'lucide-react'

// 启用静态生成 (SSG)
export const dynamic = 'force-static' 

export default async function Home() {
  const resources = getSortedResourcesData()

  return (
    <div className="bg-[#f5f7fa] min-h-screen pb-12">
      <div className="container mx-auto px-4 py-6">
        
        {/* 顶部 Hero 区域 (Puock 风格：左侧轮播 + 右侧精选) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* 左侧轮播图 (占8列) */}
            <div className="lg:col-span-8 relative rounded-xl overflow-hidden shadow-sm group h-[380px]">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" 
                    alt="Hero" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-blue-600 rounded-md w-fit">
                        置顶推荐
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        探索优质数字资源：七七爱分享全新上线
                    </h2>
                    <p className="text-gray-200 line-clamp-1 opacity-90">
                         每日更新最实用的软件工具、最前沿的技术教程、最有价值的源码资源。
                    </p>
                </div>
            </div>

            {/* 右侧精选小图 (占4列) */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-[380px]">
                <div className="relative rounded-xl overflow-hidden shadow-sm flex-1 group">
                     <img 
                        src="https://images.unsplash.com/photo-1626785774573-4b7993143a26?w=800&q=80" 
                        alt="Sub 1" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white font-bold text-lg line-clamp-1">Adobe Photoshop 2025 完美破解版</h3>
                    </div>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-sm flex-1 group">
                     <img 
                        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80" 
                        alt="Sub 2" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                         <h3 className="text-white font-bold text-lg line-clamp-1">Next.js + Supabase 全栈开发实战</h3>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Section Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                  <RefreshCw className="h-5 w-5 text-blue-500 animate-spin-slow" />
                  最新发布
                </h2>
                <div className="hidden sm:flex gap-2 text-sm text-gray-500">
                    <span className="cursor-pointer hover:text-blue-600 font-medium text-blue-600">全部</span>
                    <span className="cursor-pointer hover:text-blue-600">实用软件</span>
                    <span className="cursor-pointer hover:text-blue-600">技术教程</span>
                </div>
              </div>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-600 flex items-center gap-1 group transition-colors">
                更多资源 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
            
             {/* Pagination Placeholder */}
             <div className="mt-12 flex justify-center">
                <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    <button className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600 text-sm">上一页</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-md shadow-blue-200">1</button>
                    <button className="px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-md text-sm">2</button>
                    <button className="px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-md text-sm">3</button>
                    <span className="px-2 py-2 text-gray-400 text-sm flex items-end">...</span>
                    <button className="px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-md text-sm">下一页</button>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

