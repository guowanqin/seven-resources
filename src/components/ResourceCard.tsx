import Link from 'next/link'
import { Calendar, Download, Eye, ThumbsUp } from 'lucide-react'

interface ResourceProps {
  id: string | number
  title: string
  description: string | null
  category: string
  created_at?: string
  date?: string
  views: number
  likes: number
  is_vip?: boolean // Supabase field
  isVip?: boolean  // Mock data field
  image_url?: string // Supabase field
  image?: string     // Mock data field
  downloadUrl?: string
}

export default function ResourceCard({ resource }: { resource: ResourceProps }) {
  // Normalize data fields
  const displayImage = resource.image_url || resource.image || 'https://via.placeholder.com/800x600?text=No+Image'
  const isVip = resource.is_vip ?? resource.isVip ?? false
  const displayDate = resource.created_at ? new Date(resource.created_at).toLocaleDateString() : (resource.date || '')

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-md shadow-sm">
            {resource.category}
          </span>
        </div>
        {isVip && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 text-xs font-semibold bg-amber-500 text-white rounded-md shadow-sm flex items-center gap-1">
              VIP资源
            </span>
          </div>
        )}
        <img 
          src={displayImage} 
          alt={resource.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <Link href={`/resource/${resource.id}`} className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium text-sm hover:bg-blue-50 transition-colors">
                查看详情
            </Link>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          <Link href={`/resource/${resource.id}`}>
            {resource.title}
          </Link>
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {resource.description || '暂无描述'}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t mt-auto">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {displayDate}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {resource.views}
            </span>
          </div>
          <span className="flex items-center gap-1 text-blue-500 font-medium">
             <Download className="h-3.5 w-3.5" />
             下载
          </span>
        </div>
      </div>
    </div>
  )
}
