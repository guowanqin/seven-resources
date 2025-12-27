import { Flame, TrendingUp, MessageSquare } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Login Widget (Simulated as logged in state handled by header, maybe put an ad or profile summary here) */}
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-red-500" />
          热门资源
        </h3>
        <ul className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="flex gap-3 group cursor-pointer">
              <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-xs font-medium ${i <= 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                {i}
              </span>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 line-clamp-2">
                Adobe Photoshop 2025 破解版下载 (附安装教程) - 永久免费
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          本周推荐
        </h3>
        <div className="space-y-4">
            <div className="group cursor-pointer">
                <div className="h-24 bg-gray-200 rounded-lg mb-2 overflow-hidden">
                    {/* Placeholder image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    Next.js 15 全栈开发实战教程：从入门到精通
                </h4>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-500" />
          最新评论
        </h3>
        <ul className="space-y-4">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 mb-1">用户User{i} 评论了</div>
                <div className="text-sm text-gray-700 line-clamp-2">
                  这个软件太好用了，找了好久终于在这里找到了，感谢站长分享！
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
