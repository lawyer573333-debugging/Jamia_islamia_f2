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

// Demo mode is ONLY allowed during local development (import.meta.env.DEV and MODE === 'development')
// AND when VITE_DEMO_MODE is explicitly set to 'true'.
// Production builds (vite build) always set MODE === 'production', preventing demo fallback even if NODE_ENV=development is set in the shell.
export const isDemoModeAllowed =
  import.meta.env.DEV &&
  !import.meta.env.PROD &&
  import.meta.env.MODE === 'development' &&
  import.meta.env.VITE_DEMO_MODE === 'true';

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
      persistSession: isSupabaseConfigured,
      autoRefreshToken: isSupabaseConfigured,
      detectSessionInUrl: isSupabaseConfigured,
      storageKey: 'jamia_mms_supabase_auth_token',
    },
  }
);
