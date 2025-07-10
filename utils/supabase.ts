import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

export const getSupabase = (event: H3Event): SupabaseClient => {
  const config = useRuntimeConfig()

  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey, {
    // 從 request header 直接帶上 cookie
    global: {
      headers: {
        cookie: event.node.req.headers.cookie || ''
      }
    }
  })

  return supabase
}
