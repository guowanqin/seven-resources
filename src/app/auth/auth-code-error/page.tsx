import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">登录失败</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        抱歉，验证您的登录信息时出现了问题。这可能是由于链接过期或网络问题导致的。
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回首页重试
      </Link>
    </div>
  )
}
