-- ============================================================================
-- JAMIA TUL ULOOM AL-ISLAMIA — MADARIS MANAGEMENT SYSTEM (MMS)
-- PHASE 4: INSTITUTIONAL AUTHORITY FOUNDATION
-- Migration: phase4_institutional_authority.sql
-- ============================================================================
-- Architecture:
--   1. Authenticated User Identity (auth.users)
--   2. Institutional Position (public.institutional_position / profiles.institutional_position)
--   3. Generic Department/Domain Scope (profiles.assigned_domain)
--   4. Action Authority & Security Definer Resolvers
--   5. Scoped RLS on Phase 3 People & Academic Foundation
--   6. Full backward compatibility with legacy 'mudeer' role
-- ============================================================================

-- Step 1: Create Institutional Position Enum / Type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'institutional_position') THEN
    CREATE TYPE public.institutional_position AS ENUM (
      'muhtamim',            -- مہتمم (Institutional oversight & inspection, read-only on operations)
      'nazim_aala',          -- ناظمِ اعلیٰ (Chief operational authority, full institutional management)
      'departmental_nazim',  -- ناظمِ شعبہ (Scoped management of an assigned domain)
      'teacher',             -- استاذ (Operational instructional work, assignment-scoped)
      'worker',              -- کارکن / دفتری عملہ (Operational support work)
      'counter',             -- کاؤنٹر کلرک (Front-desk registration & fee verification)
      'parent'               -- سرپرست (Linked children only)
    );
  END IF;
END $$;

-- Step 2: Extend public.profiles with Institutional Position and Domain Scope
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS institutional_position public.institutional_position,
  ADD COLUMN IF NOT EXISTS assigned_domain text;

-- Create index for rapid authority lookups
CREATE INDEX IF NOT EXISTS idx_profiles_institutional_position 
  ON public.profiles (institutional_position);

CREATE INDEX IF NOT EXISTS idx_profiles_assigned_domain 
  ON public.profiles (assigned_domain);

-- Step 3: Migration / Transitional Resolver for existing accounts
-- Any existing user with role = 'mudeer' and NULL institutional_position
-- safely resolves to 'nazim_aala' by default for operational continuity,
-- allowing Muhtamim to be explicitly designated without breaking active admin operations.
UPDATE public.profiles
SET institutional_position = 'nazim_aala',
    assigned_domain = 'all'
WHERE role = 'mudeer' AND institutional_position IS NULL;

UPDATE public.profiles
SET institutional_position = 'teacher',
    assigned_domain = 'academic'
WHERE role = 'teacher' AND institutional_position IS NULL;

UPDATE public.profiles
SET institutional_position = 'counter',
    assigned_domain = 'finance'
WHERE role = 'counter' AND institutional_position IS NULL;

UPDATE public.profiles
SET institutional_position = 'parent',
    assigned_domain = NULL
WHERE role = 'parent' AND institutional_position IS NULL;

-- Step 4: SECURITY DEFINER Helper Functions for Authority & Scopes
-- Narrowly scoped with SET search_path = public to avoid RLS recursion

-- 4.1 Resolve current user's effective institutional position
CREATE OR REPLACE FUNCTION public.get_current_user_position()
RETURNS public.institutional_position
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    p.institutional_position,
    CASE 
      WHEN p.role = 'mudeer' THEN 'nazim_aala'::public.institutional_position
      WHEN p.role = 'teacher' THEN 'teacher'::public.institutional_position
      WHEN p.role = 'counter' THEN 'counter'::public.institutional_position
      ELSE 'parent'::public.institutional_position
    END
  )
  FROM public.profiles p
  WHERE p.id = auth.uid() AND p.is_active = true;
$$;

-- 4.2 Resolve current user's assigned domain
CREATE OR REPLACE FUNCTION public.get_current_user_domain()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(p.assigned_domain, '')
  FROM public.profiles p
  WHERE p.id = auth.uid() AND p.is_active = true;
$$;

-- 4.3 High-level Institutional Oversight (Muhtamim & Nazim-e-Aala)
-- Grants broad read/inspection access across institutional dashboards & reports.
CREATE OR REPLACE FUNCTION public.can_oversee_institution()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.is_active = true
      AND (
        p.institutional_position IN ('muhtamim', 'nazim_aala')
        OR (p.role = 'mudeer' AND p.institutional_position IS NULL)
      )
  );
$$;

-- 4.4 Chief Operational Authority (Nazim-e-Aala only)
-- Can manage institutional operations across all departments and delegate authority.
CREATE OR REPLACE FUNCTION public.can_manage_operational_institution()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.is_active = true
      AND (
        p.institutional_position = 'nazim_aala'
        OR (p.role = 'mudeer' AND p.institutional_position IS NULL)
      )
  );
$$;

-- 4.5 Academic Domain Management Authority
-- Allowed for:
--   1. Nazim-e-Aala (Chief operational authority)
--   2. Departmental Nazim whose assigned_domain is 'academic'
-- Explicitly DENIED for Muhtamim (oversight only, no routine operational CRUD)
CREATE OR REPLACE FUNCTION public.can_manage_academic_domain()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.is_active = true
      AND (
        -- Chief operational authority
        p.institutional_position = 'nazim_aala'
        OR (p.role = 'mudeer' AND p.institutional_position IS NULL)
        -- Departmental manager scoped to academic domain
        OR (p.institutional_position = 'departmental_nazim' AND p.assigned_domain = 'academic')
      )
      -- Explicit guard: Muhtamim cannot execute operational writes
      AND COALESCE(p.institutional_position, 'parent') != 'muhtamim'
  );
$$;

-- 4.6 Academic Data Read Access
-- Can read academic records:
--   1. Muhtamim & Nazim-e-Aala (via can_oversee_institution)
--   2. Academic Departmental Nazim (via can_manage_academic_domain)
CREATE OR REPLACE FUNCTION public.can_read_academic_data()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.can_oversee_institution() OR public.can_manage_academic_domain();
$$;

-- Step 5: Anti-Self-Elevation Policy on public.profiles
-- Normal authenticated users can update basic profile info, but CANNOT alter
-- their own role, institutional_position, assigned_domain, or active status.
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Mudeer can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_read_authority" ON public.profiles;

CREATE POLICY "profiles_read_authority"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id
    OR public.can_oversee_institution()
  );

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    AND institutional_position IS NOT DISTINCT FROM (SELECT p.institutional_position FROM public.profiles p WHERE p.id = auth.uid())
    AND assigned_domain IS NOT DISTINCT FROM (SELECT p.assigned_domain FROM public.profiles p WHERE p.id = auth.uid())
    AND is_active = (SELECT p.is_active FROM public.profiles p WHERE p.id = auth.uid())
  );

-- Only Chief Operational Authority (Nazim-e-Aala) or unmigrated legacy Mudeer can manage other profiles/positions
DROP POLICY IF EXISTS "Mudeer can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_manage_mudeer" ON public.profiles;
DROP POLICY IF EXISTS "profiles_manage_authority" ON public.profiles;

CREATE POLICY "profiles_manage_authority"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (public.can_manage_operational_institution())
  WITH CHECK (public.can_manage_operational_institution());

-- Step 6: Update RLS Policies on Phase 3 Academic Foundation Tables
-- Tables: students, guardians, student_guardians, teachers, classes, subjects, class_subjects, enrollments
-- Drops all legacy Phase 3 and transitional policy names to prevent duplicate permissive grants.

-- 6.1 STUDENTS
DROP POLICY IF EXISTS "Students select policy" ON public.students;
DROP POLICY IF EXISTS "Students insert policy" ON public.students;
DROP POLICY IF EXISTS "Students update policy" ON public.students;
DROP POLICY IF EXISTS "Students delete policy" ON public.students;
DROP POLICY IF EXISTS "students_read_mudeer" ON public.students;
DROP POLICY IF EXISTS "students_write_mudeer" ON public.students;
DROP POLICY IF EXISTS "students_read_authority" ON public.students;
DROP POLICY IF EXISTS "students_write_authority" ON public.students;

CREATE POLICY "students_read_authority"
  ON public.students
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (public.get_current_user_role() = 'teacher' AND id IN (SELECT public.get_teacher_student_ids()))
    OR (public.get_current_user_role() = 'parent' AND id IN (SELECT public.get_parent_student_ids()))
  );

CREATE POLICY "students_write_authority"
  ON public.students
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.2 GUARDIANS
DROP POLICY IF EXISTS "Guardians select policy" ON public.guardians;
DROP POLICY IF EXISTS "Guardians insert policy" ON public.guardians;
DROP POLICY IF EXISTS "Guardians update policy" ON public.guardians;
DROP POLICY IF EXISTS "Guardians delete policy" ON public.guardians;
DROP POLICY IF EXISTS "guardians_read_mudeer" ON public.guardians;
DROP POLICY IF EXISTS "guardians_write_mudeer" ON public.guardians;
DROP POLICY IF EXISTS "guardians_read_authority" ON public.guardians;
DROP POLICY IF EXISTS "guardians_write_authority" ON public.guardians;

CREATE POLICY "guardians_read_authority"
  ON public.guardians
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (public.get_current_user_role() = 'parent' AND profile_id = auth.uid())
    OR (
      public.get_current_user_role() = 'teacher'
      AND id IN (
        SELECT sg.guardian_id
        FROM public.student_guardians sg
        WHERE sg.student_id IN (SELECT public.get_teacher_student_ids())
      )
    )
  );

CREATE POLICY "guardians_write_authority"
  ON public.guardians
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.3 STUDENT_GUARDIANS
DROP POLICY IF EXISTS "Student guardians select policy" ON public.student_guardians;
DROP POLICY IF EXISTS "Student guardians insert policy" ON public.student_guardians;
DROP POLICY IF EXISTS "Student guardians update policy" ON public.student_guardians;
DROP POLICY IF EXISTS "Student guardians delete policy" ON public.student_guardians;
DROP POLICY IF EXISTS "sg_read_mudeer" ON public.student_guardians;
DROP POLICY IF EXISTS "sg_write_mudeer" ON public.student_guardians;
DROP POLICY IF EXISTS "sg_read_authority" ON public.student_guardians;
DROP POLICY IF EXISTS "sg_write_authority" ON public.student_guardians;

CREATE POLICY "sg_read_authority"
  ON public.student_guardians
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (
      public.get_current_user_role() = 'parent'
      AND guardian_id IN (SELECT id FROM public.guardians WHERE profile_id = auth.uid())
    )
    OR (
      public.get_current_user_role() = 'teacher'
      AND student_id IN (SELECT public.get_teacher_student_ids())
    )
  );

CREATE POLICY "sg_write_authority"
  ON public.student_guardians
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.4 TEACHERS
DROP POLICY IF EXISTS "Teachers select policy" ON public.teachers;
DROP POLICY IF EXISTS "Teachers insert policy" ON public.teachers;
DROP POLICY IF EXISTS "Teachers update policy" ON public.teachers;
DROP POLICY IF EXISTS "Teachers delete policy" ON public.teachers;
DROP POLICY IF EXISTS "teachers_read_mudeer" ON public.teachers;
DROP POLICY IF EXISTS "teachers_write_mudeer" ON public.teachers;
DROP POLICY IF EXISTS "teachers_read_authority" ON public.teachers;
DROP POLICY IF EXISTS "teachers_write_authority" ON public.teachers;

CREATE POLICY "teachers_read_authority"
  ON public.teachers
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (public.get_current_user_role() = 'teacher' AND profile_id = auth.uid())
  );

CREATE POLICY "teachers_write_authority"
  ON public.teachers
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.5 CLASSES
DROP POLICY IF EXISTS "Classes select policy" ON public.classes;
DROP POLICY IF EXISTS "Classes insert policy" ON public.classes;
DROP POLICY IF EXISTS "Classes update policy" ON public.classes;
DROP POLICY IF EXISTS "Classes delete policy" ON public.classes;
DROP POLICY IF EXISTS "classes_read_mudeer" ON public.classes;
DROP POLICY IF EXISTS "classes_write_mudeer" ON public.classes;
DROP POLICY IF EXISTS "classes_read_authority" ON public.classes;
DROP POLICY IF EXISTS "classes_write_authority" ON public.classes;

CREATE POLICY "classes_read_authority"
  ON public.classes
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (public.get_current_user_role() = 'teacher' AND id IN (SELECT public.get_teacher_class_ids()))
    OR (public.get_current_user_role() = 'parent' AND id IN (SELECT public.get_parent_class_ids()))
  );

CREATE POLICY "classes_write_authority"
  ON public.classes
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.6 SUBJECTS
DROP POLICY IF EXISTS "Subjects select policy" ON public.subjects;
DROP POLICY IF EXISTS "Subjects insert policy" ON public.subjects;
DROP POLICY IF EXISTS "Subjects update policy" ON public.subjects;
DROP POLICY IF EXISTS "Subjects delete policy" ON public.subjects;
DROP POLICY IF EXISTS "subjects_read_mudeer" ON public.subjects;
DROP POLICY IF EXISTS "subjects_write_mudeer" ON public.subjects;
DROP POLICY IF EXISTS "subjects_read_authority" ON public.subjects;
DROP POLICY IF EXISTS "subjects_write_authority" ON public.subjects;

CREATE POLICY "subjects_read_authority"
  ON public.subjects
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (
      public.get_current_user_role() = 'teacher'
      AND id IN (
        SELECT cs.subject_id
        FROM public.class_subjects cs
        WHERE cs.class_id IN (SELECT public.get_teacher_class_ids())
      )
    )
    OR (
      public.get_current_user_role() = 'parent'
      AND id IN (
        SELECT cs.subject_id
        FROM public.class_subjects cs
        WHERE cs.class_id IN (SELECT public.get_parent_class_ids())
      )
    )
  );

CREATE POLICY "subjects_write_authority"
  ON public.subjects
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.7 CLASS_SUBJECTS
DROP POLICY IF EXISTS "Class subjects select policy" ON public.class_subjects;
DROP POLICY IF EXISTS "Class subjects insert policy" ON public.class_subjects;
DROP POLICY IF EXISTS "Class subjects update policy" ON public.class_subjects;
DROP POLICY IF EXISTS "Class subjects delete policy" ON public.class_subjects;
DROP POLICY IF EXISTS "cs_read_mudeer" ON public.class_subjects;
DROP POLICY IF EXISTS "cs_write_mudeer" ON public.class_subjects;
DROP POLICY IF EXISTS "cs_read_authority" ON public.class_subjects;
DROP POLICY IF EXISTS "cs_write_authority" ON public.class_subjects;

CREATE POLICY "cs_read_authority"
  ON public.class_subjects
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (public.get_current_user_role() = 'teacher' AND class_id IN (SELECT public.get_teacher_class_ids()))
    OR (public.get_current_user_role() = 'parent' AND class_id IN (SELECT public.get_parent_class_ids()))
  );

CREATE POLICY "cs_write_authority"
  ON public.class_subjects
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- 6.8 ENROLLMENTS
DROP POLICY IF EXISTS "Enrollments select policy" ON public.enrollments;
DROP POLICY IF EXISTS "Enrollments insert policy" ON public.enrollments;
DROP POLICY IF EXISTS "Enrollments update policy" ON public.enrollments;
DROP POLICY IF EXISTS "Enrollments delete policy" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_read_mudeer" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_write_mudeer" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_read_authority" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_write_authority" ON public.enrollments;

CREATE POLICY "enrollments_read_authority"
  ON public.enrollments
  FOR SELECT
  TO authenticated
  USING (
    public.can_read_academic_data()
    OR public.get_current_user_role() = 'counter'
    OR (public.get_current_user_role() = 'teacher' AND class_id IN (SELECT public.get_teacher_class_ids()))
    OR (public.get_current_user_role() = 'parent' AND student_id IN (SELECT public.get_parent_student_ids()))
  );

CREATE POLICY "enrollments_write_authority"
  ON public.enrollments
  FOR ALL
  TO authenticated
  USING (public.can_manage_academic_domain())
  WITH CHECK (public.can_manage_academic_domain());

-- Step 7: Update default signup trigger to ensure new profiles start as 'parent'
-- with NULL institutional_position and NULL assigned_domain
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_full_name text;
  v_name_urdu text;
BEGIN
  v_full_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );
  v_name_urdu := COALESCE(
    new.raw_user_meta_data->>'name_urdu',
    v_full_name
  );

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    name_urdu,
    role,
    institutional_position,
    assigned_domain,
    designation_english,
    designation_urdu,
    department_english,
    department_urdu,
    is_active
  ) VALUES (
    new.id,
    new.email,
    v_full_name,
    v_name_urdu,
    'parent'::public.mms_role,
    'parent'::public.institutional_position,
    NULL,
    'Parent / Guardian',
    'سرپرست طالب علم',
    'Parents Portal',
    'اولیاء کرام پورٹل',
    true
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;
