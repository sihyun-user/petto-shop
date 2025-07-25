import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

export const getSupabase = (event: H3Event, useServiceKey = false): SupabaseClient => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl as string,
    (useServiceKey ? config.SUPABASE_SERVICE_ROLE_KEY : config.public.supabaseKey) as string,
    {
      global: {
        headers: {
          cookie: event.node.req.headers.cookie || ''
        }
      }
    }
  )

  return supabase
}
