-- ============================================================================
-- Jamia Tul Uloom Al-Islamia — Madaris Management System (MMS)
-- PHASE 2: Supabase Foundation, Profiles, Roles, and Row Level Security (RLS)
-- ============================================================================
-- Execute this script in the Supabase SQL Editor:
-- Project Dashboard -> SQL Editor -> New query -> Paste & Run
-- ============================================================================

-- 1. Create custom enum for supported MMS roles
-- Exactly 4 Phase 2 roles: 'mudeer', 'teacher', 'counter', 'parent'
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'mms_role') THEN
        CREATE TYPE public.mms_role AS ENUM ('mudeer', 'teacher', 'counter', 'parent');
    END IF;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 2. Create the foundational 'profiles' table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    name_urdu TEXT,
    role public.mms_role NOT NULL DEFAULT 'parent',
    designation_english TEXT,
    designation_urdu TEXT,
    department_english TEXT,
    department_urdu TEXT,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for rapid lookups and role-based filtering
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON public.profiles(is_active);

-- 4. Trigger to automatically update 'updated_at' column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 5. Helper function to read the current user's role without recursive RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$;

-- 6. Helper function to check if current user is active
CREATE OR REPLACE FUNCTION public.is_current_user_active()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COALESCE((SELECT is_active FROM public.profiles WHERE id = auth.uid()), false);
$$;

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on profiles (MANDATORY)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to ensure idempotent execution
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Mudeer can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Mudeer can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow user to insert own profile" ON public.profiles;

-- Policy 1: Authenticated users can view their own profile
CREATE POLICY "Users can read own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Policy 2: Authenticated users can update their own profile fields,
-- BUT they are strictly forbidden from changing their role or active status.
-- (Non-Mudeer users cannot promote themselves or alter institutional roles)
CREATE POLICY "Users can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
        AND is_active = (SELECT p.is_active FROM public.profiles p WHERE p.id = auth.uid())
    );

-- Policy 3: Mudeer (Executive Director / Principal) can view all user profiles
CREATE POLICY "Mudeer can view all profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- Policy 4: Only Mudeer can update any user profile, assign roles, or change active status
CREATE POLICY "Mudeer can update any profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

-- Policy 5: Users can insert their initial profile row if matching auth.uid,
-- strictly enforcing role = 'parent' so client-side INSERT cannot bypass the role constraint.
CREATE POLICY "Allow user to insert own profile"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = id
        AND role = 'parent'::public.mms_role
    );

-- ============================================================================
-- 8. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
-- ============================================================================
-- Security Hardened: A new user created through Supabase Auth ALWAYS receives
-- role = 'parent'. We DO NOT trust or read 'role' from raw_user_meta_data during signup.
-- Role elevation to 'mudeer', 'teacher', or 'counter' can ONLY be performed
-- by an authenticated Mudeer (Policy 4) or via administrative database operations.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        name_urdu,
        role,
        designation_english,
        designation_urdu,
        department_english,
        department_urdu,
        is_active
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(
            NULLIF(NEW.raw_user_meta_data->>'full_name', ''),
            NULLIF(NEW.raw_user_meta_data->>'name', ''),
            split_part(NEW.email, '@', 1)
        ),
        NEW.raw_user_meta_data->>'name_urdu',
        'parent'::public.mms_role, -- ALWAYS default to 'parent'; never trust client metadata for elevated roles
        'Parent / Guardian',
        'سرپرست طالب علم',
        'Parents Portal',
        'اولیاء کرام پورٹل',
        true
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = timezone('utc'::text, now());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 9. INITIAL SEEDING INSTRUCTIONS FOR DEFAULT INSTITUTIONAL ACCOUNTS
-- ============================================================================
-- Because every newly registered user starts as 'parent', create your
-- administrative accounts in Supabase Auth (or via MMS registration), then
-- promote them once using the SQL snippet below in the Supabase SQL Editor:
/*
-- 1. Promote Muhtamim to Mudeer:
UPDATE public.profiles
SET role = 'mudeer',
    full_name = 'Maulana Muhammad Abdul Rehman',
    name_urdu = 'مولانا محمد عبد الرحمٰن',
    designation_english = 'Director & Muhtamim',
    designation_urdu = 'مہتمم و ناظمِ اعلیٰ',
    department_english = 'Central Administration',
    department_urdu = 'مرکزی انتظامیہ'
WHERE email = 'mudeer@jamia.edu.pk';

-- 2. Promote Teacher:
UPDATE public.profiles
SET role = 'teacher',
    full_name = 'Mufti Qari Shabbir Ahmad',
    name_urdu = 'مفتی قاری شبیر احمد',
    designation_english = 'Hadith Lecturer & Hifz Supervisor',
    designation_urdu = 'استاذِ حدیث و نگراں شعبہ حفظ',
    department_english = 'Dars-e-Nizami & Hifz Department',
    department_urdu = 'درسِ نظامی و شعبہ حفظ'
WHERE email = 'teacher@jamia.edu.pk';

-- 3. Promote Counter / Finance Clerk:
UPDATE public.profiles
SET role = 'counter',
    full_name = 'Hafiz Waqas Mahmood',
    name_urdu = 'حافظ وقاص محمود',
    designation_english = 'Accounts Clerk & Cashier',
    designation_urdu = 'اکاؤنٹس کلرک و فیس انچارج',
    department_english = 'Accounts & Donation Counter',
    department_urdu = 'شعبہ مالیات و فیس کاؤنٹر'
WHERE email = 'counter@jamia.edu.pk';

-- 4. Parent (automatically created with role = 'parent', update details if needed):
UPDATE public.profiles
SET full_name = 'Chaudhry Tariq Aziz',
    name_urdu = 'چوہدری طارق عزیز',
    designation_english = 'Parent / Guardian',
    designation_urdu = 'سرپرست طالب علم',
    department_english = 'Parents Portal',
    department_urdu = 'اولیاء کرام پورٹل'
WHERE email = 'parent@jamia.edu.pk';
*/
