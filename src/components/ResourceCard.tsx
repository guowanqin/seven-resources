import Link from 'next/link'
import { Calendar, Eye, Download, Star, MessageSquare } from 'lucide-react'

interface ResourceProps {
  id: string | number
  title: string
  description: string | null
  category: string
  created_at?: string
  date?: string
  views: number
  likes: number
  is_vip?: boolean
  isVip?: boolean
  image_url?: string
  image?: string
}

export default function ResourceCard({ resource }: { resource: ResourceProps }) {
  const displayImage = resource.image_url || resource.image || 'https://via.placeholder.com/800x600?text=No+Image'
  const isVip = resource.is_vip ?? resource.isVip ?? false
  const displayDate = resource.created_at ? new Date(resource.created_at).toLocaleDateString() : (resource.date || '')

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full relative">
      {/* 顶部标签 (Puock 风格) */}
      <div className="absolute top-3 left-3 z-20 flex gap-2">
        <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-md shadow-sm bg-opacity-90 backdrop-blur-sm">
          {resource.category}
        </span>
        {isVip && (
          <span className="px-2 py-1 text-xs font-bold text-white bg-amber-500 rounded-md shadow-sm bg-opacity-90 backdrop-blur-sm flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" /> VIP
          </span>
        )}
      </div>

      {/* 图片区域 */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Link href={`/resource/${resource.id}`} className="block h-full">
           <img 
            src={displayImage} 
            alt={resource.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        {/* 悬浮遮罩 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <Link href={`/resource/${resource.id}`} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all transform scale-0 group-hover:scale-100 duration-300">
                <Eye className="h-6 w-6" />
             </Link>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          <Link href={`/resource/${resource.id}`}>
            {resource.title}
          </Link>
        </h3>
        
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-grow leading-relaxed">
          {resource.description || '暂无描述'}
        </p>
        
        {/* 底部信息栏 */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-3">
             <span className="flex items-center gap-1 hover:text-gray-600">
                <Calendar className="h-3 w-3" />
                {displayDate}
             </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <Eye className="h-3 w-3" />
              {resource.views}
            </span>
             <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <MessageSquare className="h-3 w-3" />
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
