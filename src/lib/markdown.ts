import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import slugify from 'slugify'

const contentDirectory = path.join(process.cwd(), 'src/content')
const publicImagesDirectory = path.join(process.cwd(), 'public/images/content')

export interface ResourceData {
  id: string
  title: string
  description: string
  category: string
  date: string
  views: number
  likes: number
  isVip: boolean
  image: string
  downloadUrl?: string
  content: string
}

// 递归获取所有 markdown 文件
function getAllMarkdownFiles(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList
  
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList)
    } else {
      if (path.extname(file) === '.md') {
        fileList.push(filePath)
      }
    }
  })
  
  return fileList
}

export function getSortedResourcesData(): ResourceData[] {
  // Ensure public images dir exists
  fs.ensureDirSync(publicImagesDirectory)

  const files = getAllMarkdownFiles(contentDirectory)
  
  const allResourcesData = files.map((fullPath) => {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    // Generate ID (slug) from filename (without extension)
    // Use slugify to ensure it's URL safe
    const fileName = path.basename(fullPath, '.md')
    const id = slugify(fileName, { lower: true, strict: false, remove: /[*+~.()'"!:@]/g })

    // --- Auto-Extraction Logic (Compatibility Layer) ---
    let { data, content } = matterResult
    
    // 1. Title Extraction
    if (!data.title) {
      const titleMatch = content.match(/^#\s+(.*)/m)
      data.title = titleMatch ? titleMatch[1] : fileName
      // Remove the title from content to avoid duplication
      content = content.replace(/^#\s+.*\n+/, '')
    }

    // 2. Description Extraction
    if (!data.description) {
      const descMatch = content.match(/^[^#\n!\[].{10,100}/m)
      data.description = descMatch ? descMatch[0].substring(0, 100) + '...' : '暂无简介'
    }

    // 3. Image Extraction & Copying
    // Regex to find images: ![alt](path)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    let match
    let firstImage = null
    
    // Process all images in content
    let newContent = content
    while ((match = imageRegex.exec(content)) !== null) {
      const [fullMatch, alt, imagePath] = match
      
      // If it's a local relative path (not http/https)
      if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        const sourceImagePath = path.join(path.dirname(fullPath), imagePath)
        
        if (fs.existsSync(sourceImagePath)) {
          // Determine target path
          const imageExt = path.extname(imagePath)
          const targetImageName = `${id}-${path.basename(imagePath)}` // ID prefix to avoid collisions
          const targetPath = path.join(publicImagesDirectory, targetImageName)
          const publicUrl = `/images/content/${targetImageName}`
          
          // Copy file
          fs.copySync(sourceImagePath, targetPath)
          
          // Replace path in content
          newContent = newContent.replace(imagePath, publicUrl)
          
          if (!firstImage) firstImage = publicUrl
        }
      } else if (!firstImage) {
          firstImage = imagePath
      }
    }
    content = newContent

    // Default Fallbacks
    const resourceData: ResourceData = {
      id,
      title: data.title,
      description: data.description,
      category: data.category || '未分类',
      date: data.date || new Date().toISOString().split('T')[0],
      views: data.views || 0,
      likes: data.likes || 0,
      isVip: data.isVip || false,
      image: data.image || firstImage || 'https://via.placeholder.com/800x600?text=No+Image',
      downloadUrl: data.downloadUrl || '',
      content: content
    }

    return resourceData
  })

  // Sort resources by date
  return allResourcesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getResourceData(id: string): ResourceData | null {
  const resources = getSortedResourcesData()
  return resources.find(r => r.id === id) || null
}
