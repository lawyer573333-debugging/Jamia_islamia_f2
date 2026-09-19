-- ============================================================================
-- Jamia Tul Uloom Al-Islamia — Madaris Management System (MMS)
-- PHASE 3: People + Academic Foundation (Database Schema, Tables & RLS)
-- ============================================================================
-- Execute this script in the Supabase SQL Editor:
-- Project Dashboard -> SQL Editor -> New query -> Paste & Run
--
-- PREREQUISITES:
-- Phase 2 (supabase/phase2_foundation.sql) MUST have been executed first.
-- It establishes the 'mms_role' ENUM, the 'profiles' table, and role helpers.
-- ============================================================================

-- Ensure pgcrypto is available for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. STUDENTS TABLE
-- ============================================================================
-- Core student identity, demographic details, and institutional status
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admission_number TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    middle_name TEXT,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
    phone TEXT,
    address TEXT,
    admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'suspended', 'withdrawn', 'transferred')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_students_admission_number ON public.students(admission_number);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);
CREATE INDEX IF NOT EXISTS idx_students_last_name ON public.students(last_name);

-- ============================================================================
-- 2. GUARDIANS TABLE
-- ============================================================================
-- Guardian / Parent profiles. profile_id links to Supabase Auth profiles
-- when the parent registers an account for the Parent Portal.
CREATE TABLE IF NOT EXISTS public.guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    alternate_phone TEXT,
    email TEXT,
    address TEXT,
    occupation TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_guardians_profile_id ON public.guardians(profile_id);
CREATE INDEX IF NOT EXISTS idx_guardians_phone ON public.guardians(phone);
CREATE INDEX IF NOT EXISTS idx_guardians_email ON public.guardians(email);

-- ============================================================================
-- 3. STUDENT_GUARDIANS (Many-to-Many Linking Table)
-- ============================================================================
-- Links students to their legal guardians with custody / pickup attributes
CREATE TABLE IF NOT EXISTS public.student_guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    guardian_id UUID NOT NULL REFERENCES public.guardians(id) ON DELETE CASCADE,
    relationship TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    can_pickup BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_student_guardian UNIQUE (student_id, guardian_id)
);

CREATE INDEX IF NOT EXISTS idx_student_guardians_student_id ON public.student_guardians(student_id);
CREATE INDEX IF NOT EXISTS idx_student_guardians_guardian_id ON public.student_guardians(guardian_id);

-- ============================================================================
-- 4. TEACHERS TABLE
-- ============================================================================
-- Institutional faculty records linked directly 1:1 with an authenticated profile
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    employee_number TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    qualification TEXT,
    specialization TEXT,
    joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated', 'resigned')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_teachers_profile_id ON public.teachers(profile_id);
CREATE INDEX IF NOT EXISTS idx_teachers_employee_number ON public.teachers(employee_number);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON public.teachers(status);

-- ============================================================================
-- 5. CLASSES TABLE
-- ============================================================================
-- Academic classrooms (e.g., Hifz Class A, Dars-e-Nizami Ula, Grade 7)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    academic_year TEXT NOT NULL,
    section TEXT NOT NULL DEFAULT 'A',
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    capacity INTEGER NOT NULL DEFAULT 40 CHECK (capacity > 0),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_classes_code_year_section UNIQUE (code, academic_year, section)
);

CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON public.classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_academic_year ON public.classes(academic_year);
CREATE INDEX IF NOT EXISTS idx_classes_status ON public.classes(status);

-- ============================================================================
-- 6. SUBJECTS TABLE
-- ============================================================================
-- Curriculum subject catalog (Quranic, Dars-e-Nizami, and Contemporary)
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'dars_nizami' CHECK (category IN ('quran', 'dars_nizami', 'contemporary', 'general')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_subjects_code ON public.subjects(code);
CREATE INDEX IF NOT EXISTS idx_subjects_category ON public.subjects(category);
CREATE INDEX IF NOT EXISTS idx_subjects_status ON public.subjects(status);

-- ============================================================================
-- 7. CLASS_SUBJECTS TABLE
-- ============================================================================
-- Maps subjects taught in each class, optionally assigning a specific subject teacher
CREATE TABLE IF NOT EXISTS public.class_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_class_subject UNIQUE (class_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_class_subjects_class_id ON public.class_subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_class_subjects_subject_id ON public.class_subjects(subject_id);
CREATE INDEX IF NOT EXISTS idx_class_subjects_teacher_id ON public.class_subjects(teacher_id);

-- ============================================================================
-- 8. ENROLLMENTS TABLE
-- ============================================================================
-- Academic enrollments mapping students to classes per academic year
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    academic_year TEXT NOT NULL,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped', 'suspended', 'promoted')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class_id ON public.enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_academic_year ON public.enrollments(academic_year);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);

-- Institutional rule: Prevent inappropriate duplicate active enrollments
-- A student cannot be actively 'enrolled' in multiple classes within the same academic year
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_student_enrollment
    ON public.enrollments (student_id, academic_year)
    WHERE status = 'enrolled';

-- ============================================================================
-- 9. AUTOMATED UPDATED_AT TRIGGERS FOR ALL PHASE 3 TABLES
-- ============================================================================
-- Reuses handle_updated_at() defined in Phase 2
DROP TRIGGER IF EXISTS set_students_updated_at ON public.students;
CREATE TRIGGER set_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_guardians_updated_at ON public.guardians;
CREATE TRIGGER set_guardians_updated_at
    BEFORE UPDATE ON public.guardians
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_student_guardians_updated_at ON public.student_guardians;
CREATE TRIGGER set_student_guardians_updated_at
    BEFORE UPDATE ON public.student_guardians
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_teachers_updated_at ON public.teachers;
CREATE TRIGGER set_teachers_updated_at
    BEFORE UPDATE ON public.teachers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_classes_updated_at ON public.classes;
CREATE TRIGGER set_classes_updated_at
    BEFORE UPDATE ON public.classes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_subjects_updated_at ON public.subjects;
CREATE TRIGGER set_subjects_updated_at
    BEFORE UPDATE ON public.subjects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_class_subjects_updated_at ON public.class_subjects;
CREATE TRIGGER set_class_subjects_updated_at
    BEFORE UPDATE ON public.class_subjects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_enrollments_updated_at ON public.enrollments;
CREATE TRIGGER set_enrollments_updated_at
    BEFORE UPDATE ON public.enrollments
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 10. SECURITY DEFINER HELPER FUNCTIONS (Anti-Recursion RLS Engine)
-- ============================================================================
-- PostgreSQL RLS policies can cause infinite recursion if Table A's policy
-- queries Table B whose policy queries Table A.
-- By executing relationship queries inside SECURITY DEFINER helper functions
-- with fixed search_path = public, policies run in constant time without recursion.

-- Helper 1: Get teacher ID corresponding to the authenticated user's profile
CREATE OR REPLACE FUNCTION public.get_current_teacher_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT id FROM public.teachers WHERE profile_id = auth.uid() LIMIT 1;
$$;

-- Helper 2: Get all class IDs assigned to the calling teacher
-- (both as primary class teacher or as subject teacher)
CREATE OR REPLACE FUNCTION public.get_teacher_class_ids()
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT c.id FROM public.classes c
    WHERE c.teacher_id = (SELECT id FROM public.teachers WHERE profile_id = auth.uid())
    UNION
    SELECT cs.class_id FROM public.class_subjects cs
    WHERE cs.teacher_id = (SELECT id FROM public.teachers WHERE profile_id = auth.uid());
$$;

-- Helper 3: Get all student IDs enrolled in classes assigned to the calling teacher
CREATE OR REPLACE FUNCTION public.get_teacher_student_ids()
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT DISTINCT e.student_id
    FROM public.enrollments e
    WHERE e.class_id IN (SELECT public.get_teacher_class_ids());
$$;

-- Helper 4: Get student IDs linked to the calling parent via guardians & student_guardians
CREATE OR REPLACE FUNCTION public.get_parent_student_ids()
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT DISTINCT sg.student_id
    FROM public.student_guardians sg
    JOIN public.guardians g ON g.id = sg.guardian_id
    WHERE g.profile_id = auth.uid();
$$;

-- Helper 5: Get class IDs where the calling parent's children are actively enrolled
CREATE OR REPLACE FUNCTION public.get_parent_class_ids()
RETURNS SETOF UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT DISTINCT e.class_id
    FROM public.enrollments e
    WHERE e.student_id IN (SELECT public.get_parent_student_ids())
      AND e.status = 'enrolled';
$$;

-- ============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all 8 Phase 3 tables
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 11.1. STUDENTS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Students select policy" ON public.students;
DROP POLICY IF EXISTS "Students insert policy" ON public.students;
DROP POLICY IF EXISTS "Students update policy" ON public.students;
DROP POLICY IF EXISTS "Students delete policy" ON public.students;

-- Read: Mudeer (all), Counter (all), Teacher (their students), Parent (their children)
CREATE POLICY "Students select policy"
    ON public.students
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() = 'mudeer'
        OR public.get_current_user_role() = 'counter'
        OR (public.get_current_user_role() = 'teacher' AND id IN (SELECT public.get_teacher_student_ids()))
        OR (public.get_current_user_role() = 'parent' AND id IN (SELECT public.get_parent_student_ids()))
    );

-- Insert/Update/Delete: Mudeer only (Strict administrative control)
CREATE POLICY "Students insert policy"
    ON public.students
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Students update policy"
    ON public.students
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Students delete policy"
    ON public.students
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.2. GUARDIANS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Guardians select policy" ON public.guardians;
DROP POLICY IF EXISTS "Guardians insert policy" ON public.guardians;
DROP POLICY IF EXISTS "Guardians update policy" ON public.guardians;
DROP POLICY IF EXISTS "Guardians delete policy" ON public.guardians;

-- Read: Mudeer (all), Counter (all for fee/contact verification),
--       Parent (their own record linked to profile_id),
--       Teacher (guardians of students enrolled in teacher's classes for emergency contact)
CREATE POLICY "Guardians select policy"
    ON public.guardians
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() = 'mudeer'
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

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Guardians insert policy"
    ON public.guardians
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Guardians update policy"
    ON public.guardians
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Guardians delete policy"
    ON public.guardians
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.3. STUDENT_GUARDIANS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Student guardians select policy" ON public.student_guardians;
DROP POLICY IF EXISTS "Student guardians insert policy" ON public.student_guardians;
DROP POLICY IF EXISTS "Student guardians update policy" ON public.student_guardians;
DROP POLICY IF EXISTS "Student guardians delete policy" ON public.student_guardians;

-- Read: Mudeer (all), Counter (all),
--       Parent (linkages for their own guardian profile),
--       Teacher (linkages for their enrolled students)
CREATE POLICY "Student guardians select policy"
    ON public.student_guardians
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() = 'mudeer'
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

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Student guardians insert policy"
    ON public.student_guardians
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Student guardians update policy"
    ON public.student_guardians
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Student guardians delete policy"
    ON public.student_guardians
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.4. TEACHERS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Teachers select policy" ON public.teachers;
DROP POLICY IF EXISTS "Teachers insert policy" ON public.teachers;
DROP POLICY IF EXISTS "Teachers update policy" ON public.teachers;
DROP POLICY IF EXISTS "Teachers delete policy" ON public.teachers;

-- Read: Mudeer (all), Counter (all for billing & class assignment visibility),
--       Teacher (view own teacher profile)
CREATE POLICY "Teachers select policy"
    ON public.teachers
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() = 'mudeer'
        OR public.get_current_user_role() = 'counter'
        OR (public.get_current_user_role() = 'teacher' AND profile_id = auth.uid())
    );

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Teachers insert policy"
    ON public.teachers
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Teachers update policy"
    ON public.teachers
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Teachers delete policy"
    ON public.teachers
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.5. CLASSES POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Classes select policy" ON public.classes;
DROP POLICY IF EXISTS "Classes insert policy" ON public.classes;
DROP POLICY IF EXISTS "Classes update policy" ON public.classes;
DROP POLICY IF EXISTS "Classes delete policy" ON public.classes;

-- Read: Mudeer (all), Counter (all for fee receipt/enrollment tracking),
--       Teacher (classes assigned to them),
--       Parent (classes where their children are currently enrolled)
CREATE POLICY "Classes select policy"
    ON public.classes
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() = 'mudeer'
        OR public.get_current_user_role() = 'counter'
        OR (public.get_current_user_role() = 'teacher' AND id IN (SELECT public.get_teacher_class_ids()))
        OR (public.get_current_user_role() = 'parent' AND id IN (SELECT public.get_parent_class_ids()))
    );

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Classes insert policy"
    ON public.classes
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Classes update policy"
    ON public.classes
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Classes delete policy"
    ON public.classes
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.6. SUBJECTS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Subjects select policy" ON public.subjects;
DROP POLICY IF EXISTS "Subjects insert policy" ON public.subjects;
DROP POLICY IF EXISTS "Subjects update policy" ON public.subjects;
DROP POLICY IF EXISTS "Subjects delete policy" ON public.subjects;

-- Read: Mudeer (all), Counter (all),
--       Teacher (subjects taught in their assigned classes or active catalog),
--       Parent (subjects taught in their children's classes)
CREATE POLICY "Subjects select policy"
    ON public.subjects
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() IN ('mudeer', 'counter')
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

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Subjects insert policy"
    ON public.subjects
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Subjects update policy"
    ON public.subjects
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Subjects delete policy"
    ON public.subjects
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.7. CLASS_SUBJECTS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Class subjects select policy" ON public.class_subjects;
DROP POLICY IF EXISTS "Class subjects insert policy" ON public.class_subjects;
DROP POLICY IF EXISTS "Class subjects update policy" ON public.class_subjects;
DROP POLICY IF EXISTS "Class subjects delete policy" ON public.class_subjects;

-- Read: Mudeer (all), Counter (all),
--       Teacher (subjects in classes assigned to teacher),
--       Parent (subjects in classes their children are enrolled in)
CREATE POLICY "Class subjects select policy"
    ON public.class_subjects
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() IN ('mudeer', 'counter')
        OR (public.get_current_user_role() = 'teacher' AND class_id IN (SELECT public.get_teacher_class_ids()))
        OR (public.get_current_user_role() = 'parent' AND class_id IN (SELECT public.get_parent_class_ids()))
    );

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Class subjects insert policy"
    ON public.class_subjects
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Class subjects update policy"
    ON public.class_subjects
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Class subjects delete policy"
    ON public.class_subjects
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');

-- ----------------------------------------------------------------------------
-- 11.8. ENROLLMENTS POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Enrollments select policy" ON public.enrollments;
DROP POLICY IF EXISTS "Enrollments insert policy" ON public.enrollments;
DROP POLICY IF EXISTS "Enrollments update policy" ON public.enrollments;
DROP POLICY IF EXISTS "Enrollments delete policy" ON public.enrollments;

-- Read: Mudeer (all), Counter (all for fee and student tracking),
--       Teacher (enrollments in classes assigned to teacher),
--       Parent (enrollments for their linked children)
CREATE POLICY "Enrollments select policy"
    ON public.enrollments
    FOR SELECT
    TO authenticated
    USING (
        public.get_current_user_role() = 'mudeer'
        OR public.get_current_user_role() = 'counter'
        OR (public.get_current_user_role() = 'teacher' AND class_id IN (SELECT public.get_teacher_class_ids()))
        OR (public.get_current_user_role() = 'parent' AND student_id IN (SELECT public.get_parent_student_ids()))
    );

-- Insert/Update/Delete: Mudeer only
CREATE POLICY "Enrollments insert policy"
    ON public.enrollments
    FOR INSERT
    TO authenticated
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Enrollments update policy"
    ON public.enrollments
    FOR UPDATE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer')
    WITH CHECK (public.get_current_user_role() = 'mudeer');

CREATE POLICY "Enrollments delete policy"
    ON public.enrollments
    FOR DELETE
    TO authenticated
    USING (public.get_current_user_role() = 'mudeer');
