import { Github, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">七七爱分享</h3>
            <p className="text-sm text-gray-500">
              专注分享高质量实用软件、技术教程、源码资源。
              致力为开发者和极客提供最优质的内容。
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-gray-400 hover:text-gray-900 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">关于我们</a></li>
              <li><a href="#" className="hover:text-blue-600">免责声明</a></li>
              <li><a href="#" className="hover:text-blue-600">隐私政策</a></li>
              <li><a href="#" className="hover:text-blue-600">联系方式</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">热门标签</h4>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Next.js', 'WordPress', 'Windows', 'Mac', 'Android', '破解版', '源码'].map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs bg-white border rounded text-gray-600 hover:text-blue-600 hover:border-blue-600 cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>邮箱：contact@77resources.com</li>
              <li>QQ群：12345678</li>
              <li>工作时间：周一至周五 9:00 - 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} 七七爱分享. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
