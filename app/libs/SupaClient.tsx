
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const Supabase = createClient(process.env.SUPA_BASE_URL as string, process.env.SUPA_ANON as string)