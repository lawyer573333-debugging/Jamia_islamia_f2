import { createClient } from '@supabase/supabase-js';

// Read credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabasePublishableKey &&
  supabaseUrl.trim() !== '' &&
  supabasePublishableKey.trim() !== '' &&
  !supabaseUrl.includes('YOUR_PROJECT_URL')
);

// Demo mode is ONLY allowed when explicitly enabled.
// In production, set VITE_DEMO_MODE=false (or leave unset) to prevent insecure fallback.
export const isDemoModeAllowed = import.meta.env.VITE_DEMO_MODE === 'true';

if (!isSupabaseConfigured) {
  console.warn(
    '[MMS Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is not configured. Please set them in .env.local.'
  );
}

// Instantiate the official Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'jamia_mms_supabase_auth_token',
    },
  }
);
