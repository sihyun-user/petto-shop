import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

  const { data: articles, error } = await supabase.from('articles').select('name')

  if (error || !articles) return []

  return articles.map((article) => ({
    loc: `/articles/${encodeURIComponent(article.name)}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.9
  }))
})
