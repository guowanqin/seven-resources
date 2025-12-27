import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const resourcesDirectory = path.join(process.cwd(), 'src/content/resources')

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

export function getSortedResourcesData(): ResourceData[] {
  // Get file names under /src/content/resources
  if (!fs.existsSync(resourcesDirectory)) {
      return []
  }
  
  const fileNames = fs.readdirSync(resourcesDirectory)
  const allResourcesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(resourcesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      content: matterResult.content
    } as ResourceData
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
  const fullPath = path.join(resourcesDirectory, `${id}.md`)
  if (!fs.existsSync(fullPath)) {
      return null
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return {
    id,
    ...matterResult.data,
    content: matterResult.content,
  } as ResourceData
}
