'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function publishResource(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const download_url = formData.get('download_url') as string
  const image_url = formData.get('image_url') as string
  const is_vip = formData.get('is_vip') === 'on'
  const content = formData.get('content') as string

  const { error } = await supabase
    .from('resources')
    .insert({
      title,
      description,
      category,
      download_url,
      image_url,
      is_vip,
      content,
      views: 0,
      likes: 0
    })

  if (error) {
    console.error('Error inserting resource:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  redirect('/')
}
