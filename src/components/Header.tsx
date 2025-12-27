import Link from 'next/link'
import { Search, Menu, Globe } from 'lucide-react'
import AuthButton from './AuthButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              七七爱分享
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
            <Link href="/software" className="hover:text-blue-600 transition-colors">实用软件</Link>
            <Link href="/tutorials" className="hover:text-blue-600 transition-colors">技术教程</Link>
            <Link href="/source-code" className="hover:text-blue-600 transition-colors">源码分享</Link>
            <Link href="/vip" className="hover:text-blue-600 transition-colors text-amber-600">VIP会员</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="搜索资源..."
              className="h-9 w-64 rounded-full border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 cursor-pointer px-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">CN</span>
          </div>

          <AuthButton />
          
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  )
}
