# Jamia Tul Uloom Al-Islamia — Madaris Management System (MMS)
## Comprehensive Project Context & Master Execution Blueprint (`context.md`)

*Last Updated: September 2026 (Phase 4 Pre-Migration Checkpoint)*

---

## 1. Project Identity & Architecture

* **Institution:** Jamia Tul Uloom Al-Islamia (جامعۃ العلوم الاسلامیہ), Sector F-2, Mirpur, Azad Jammu & Kashmir, Pakistan.
* **Application Scope:** 
  1. **Public Institutional Website:** Public face of the Jamia (Bilingual Urdu/English, Admissions, Academics, Faculty, Gallery, Contact, Donations).
  2. **Madaris Management System (MMS) Portal:** Authenticated management system for institutional administration, faculty, students, guardians, and academic departments.
* **Technology Stack:**
  * **Frontend:** React 19 / Vite 6 / TypeScript 5.8 / Tailwind CSS 4 / Lucide React icons.
  * **Database & Auth:** Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security, `SECURITY DEFINER` functions).
  * **Styling & Localization:** Custom bilingual RTL (Urdu) and LTR (English) typography with zero layout flickering.
* **Core Architectural Boundaries:**
  * **Public Website Isolation:** Lives under `src/components/`, `src/components/views/`, and `src/App.tsx`. Strictly separated from the MMS portal.
  * **MMS Portal Scope:** Strictly contained inside `src/mms/` (`src/mms/views/`, `src/mms/components/`, `src/mms/context/`, `src/mms/services/`).
  * **Database Migrations:** Clean, versioned, idempotent SQL scripts stored in `supabase/`.
  * **Dual-Mode Operation:** 
    * **Live Mode:** When `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are configured in `.env.local`, the application talks directly to Supabase with real PostgreSQL RLS.
    * **Demo Fallback Mode:** When unconfigured, it gracefully falls back to local in-memory/localStorage stores for offline exploration without crashing.

---

## 2. Phase-by-Phase Progress & Current Status

### Phase 1: Institutional Public Website — **[COMPLETED & FROZEN]**
* Fully bilingual institutional web presence.
* Complete informational views: Home, About, Departments, Dars-e-Nizami, Quran Education (Hifz/Nazra), Contemporary Schooling, Admissions, Faculty Directory, Announcements, Events, Photo & Video Gallery, Institutional Documents, Contact & Bank Account Details for Donations.
* Preserved without regression across all subsequent phases.

### Phase 2: Supabase Auth & Foundational Role System — **[COMPLETED & LIVE IN SUPABASE]**
* File: `supabase/phase2_foundation.sql` (Executed & Verified in live database).
* `public.profiles` table linked 1:1 with `auth.users(id)`.
* Base enum `public.mms_role`: `'mudeer'`, `'teacher'`, `'counter'`, `'parent'`.
* `handle_new_user()` trigger on `auth.users` ensuring public signups default strictly to `parent`.
* Initial RLS policies on `public.profiles`.

### Phase 3: People & Academic Foundation — **[COMPLETED IN CODE & LIVE IN SUPABASE]**
* File: `supabase/phase3_people_academic_foundation.sql` (Executed & Verified in live database).
* **8 Relational Tables:**
  1. `public.students` — Core student records, admission numbers, status, demographics.
  2. `public.guardians` — Parent/guardian details, CNIC, contact numbers, profile linkage.
  3. `public.student_guardians` — Many-to-many relationship with primary flags and pickup permissions.
  4. `public.teachers` — Faculty records linked to auth profiles, employee IDs, qualifications.
  5. `public.classes` — Academic classes, sections, academic years, class teachers.
  6. `public.subjects` — Course catalog, subject codes, categories (Quranic, Dars-e-Nizami, Modern).
  7. `public.class_subjects` — Timetable schedule linking classes, subjects, and assigned teachers.
  8. `public.enrollments` — Student enrollment per academic year with partial unique active index.
* **RLS & Security Definer Functions:**
  * `get_current_teacher_id()`
  * `get_teacher_class_ids()`
  * `get_teacher_student_ids()`
  * `get_parent_student_ids()`
  * `get_parent_class_ids()`
* **Frontend:** Complete Phase 3 management views (`MmsStudentsView`, `MmsGuardiansView`, `MmsTeachersView`, `MmsClassesView`, `MmsSubjectsView`, `MmsClassSubjectsView`, `MmsEnrollmentsView`) and `phase3DataService.ts`.

### Phase 4: Institutional Authority Model — **[CODE COMPLETE & AUDITED / PENDING LIVE DB EXECUTION]**
* File: `supabase/phase4_institutional_authority.sql` (Audited, Safe & Idempotent; pending manual execution in live Supabase).
* **Core Philosophy:** Madrasa governance de-escalation:
  * **Muhtamim (مہتمم / Rector):** Institutional inspection, audit, oversight, broad read-only visibility. **Strictly blocked from operational CRUD mutations.**
  * **Nazim-e-Aala (ناظمِ اعلیٰ / Chief Executive):** Central operational administrator with institution-wide write authority.
  * **Departmental Nazim (ناظمِ شعبہ / Manager):** Operational authority strictly scoped to an assigned domain (e.g. `'academic'`).
  * **Teacher (استاذ):** Scoped to assigned classes and students.
  * **Counter (کاؤنٹر کلرک):** Restricted verification/read access.
  * **Parent (سرپرست):** Scoped strictly to linked children.
  * **Worker (کارکن):** Operational support.
* **Database Layer:**
  * `institutional_position` enum.
  * Profile columns: `institutional_position`, `assigned_domain`.
  * RLS helper functions: `can_oversee_institution()`, `can_manage_operational_institution()`, `can_manage_academic_domain()`, `can_read_academic_data()`.
  * Anti-self-elevation policy `profiles_update_own` preventing users from mutating their own role, position, or domain.
  * Comprehensive replacement of Phase 3 policies on the 8 academic tables to enforce the Phase 4 authority rules.
* **Frontend Layer:**
  * Fully adapted `MmsAuthContext.tsx`, `phase3DataService.ts`, navigation, topbar, dashboards, and all 7 Phase 3 views.
  * Inspection mode badges displayed for Muhtamim and out-of-scope Departmental Nazims.

---

## 3. Current State & Immediate Discrepancy

### The Finding:
During manual verification, querying `public.profiles` in the live Supabase SQL Editor revealed:
* `id`, `email`, `role`, `designation_english`, `designation_urdu`, `is_active` **DO exist**.
* `institutional_position` and `assigned_domain` **DO NOT exist yet**.
* All 8 Phase 3 tables and Phase 3 helper functions **DO exist and are healthy**.

### Root Cause:
The frontend code was fully updated and verified for Phase 4, and the migration script `supabase/phase4_institutional_authority.sql` was authored and reviewed, but **it has not yet been executed in the live Supabase project**.

### Safety Verdict:
A complete safety audit of `supabase/phase4_institutional_authority.sql` confirmed:
* **All prerequisites are met in Supabase.**
* **The migration is 100% idempotent and non-destructive.**
* **It is certified SAFE TO EXECUTE.**

---

## 4. What Needs To Be Done (Immediate Next Actions)

### Step 1: Execute Migration in Live Supabase
Run the contents of `supabase/phase4_institutional_authority.sql` in the **Supabase Dashboard -> SQL Editor**.

### Step 2: Post-Migration Database Health Verification
Run a verification query in Supabase to confirm:
1. `institutional_position` and `assigned_domain` columns exist on `public.profiles`.
2. Functions `can_oversee_institution`, `can_manage_operational_institution`, `can_manage_academic_domain`, and `can_read_academic_data` exist and are `SECURITY DEFINER`.
3. New RLS policies (`students_write_authority`, etc.) are active on all 8 tables.

### Step 3: Elevate Test Accounts in Supabase
Because public signup permanently locks new accounts to `parent` (to prevent unauthorized self-elevation), test accounts for each institutional position must be designated via SQL in Supabase:
* Create or sign up accounts (e.g. `muhtamim@jamia.edu.pk`, `nazimaala@jamia.edu.pk`, `academics@jamia.edu.pk`, `teacher@jamia.edu.pk`, `counter@jamia.edu.pk`).
* Execute SQL updates to set their respective `institutional_position`, `role`, and `assigned_domain`.

### Step 4: End-to-End Live UI Verification
Log in with each account type in the live browser preview and verify:
* **Muhtamim:** Full read visibility, inspection badges visible, mutation buttons disabled.
* **Nazim-e-Aala:** Full operational CRUD across students, teachers, classes, subjects, enrollments.
* **Departmental Nazim (Academic):** Can manage academic records; non-academic areas locked.
* **Teacher:** Can see only assigned classes and students.
* **Parent:** Can see only linked children.

---

## 5. Master Roadmap & Execution Plan (Subsequent Phases)

Once Phase 4 is verified on live Supabase, development will proceed strictly according to the institutional roadmap:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 1: Institutional Public Website                 [COMPLETED]     │
│  Phase 2: Supabase Auth & Role Foundation              [COMPLETED]     │
│  Phase 3: People & Academic Foundation                 [COMPLETED]     │
│  Phase 4: Institutional Authority & Governance Model   [CURRENT STEP]  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│  Phase 5: Daily Attendance & Leave Management (Students & Faculty)     │
│  Phase 6: Quran & Hifz Progress Tracker (Sabaq, Sabqi, Manzil)         │
│  Phase 7: Examination, Grading, Sanad & Term Evaluation                │
│  Phase 8: Fee Management, Financial Receipts & Accounting Ledgers      │
│  Phase 9: Boarding, Hostel & Kitchen / Mess Management                 │
│  Phase 10: Institutional Central Reporting, Analytics & Public Sanad   │
└────────────────────────────────────────────────────────────────────────┘
```

### Planned Scope for Future Phases:

* **Phase 5: Daily Attendance & Roster System**
  * Student daily attendance (Present, Absent, Sick, Leave, Late).
  * Faculty daily biometric/manual sign-in logs.
  * Monthly attendance roll-up for academic compliance.
* **Phase 6: Quran & Hifz Progress Tracking**
  * Daily tracking: Sabaq (new memorization), Sabqi (recent revisions), Manzil (distant revisions).
  * Mistake counts (Ghalatiyan) and flow ratings (Attkiyan).
  * Monthly juz targets and completion status.
* **Phase 7: Examinations & Grading**
  * Exam terms (First Term, Mid Term, Final Annual Wafaq Examination).
  * Marks entry, grading scale (Mumtaz, Jayyid Jiddan, Jayyid, Maqbool, Rasib).
  * Report card generation and Sanad (Degree/Certificate) records.
* **Phase 8: Fees, Accounting & Financial Ledgers**
  * Student monthly dues, tuition vouchers, admission fees, and concessions.
  * Fee collection counter receipting (Cash, Bank Transfer, Slip #).
  * Donor management and Madaris general accounts ledger.
* **Phase 9: Hostel & Mess Management**
  * Room allocation and hostel building inventory.
  * Meal attendance, mess inventory, and medical/emergency incident logs.
* **Phase 10: Central Audit & Institutional Reporting**
  * Consolidated reporting for the Office of the Muhtamim.
  * Wafaq-ul-Madaris compliance exports.
  * Public credential verification portal.

---

## 6. Strict Development Principles

1. **No Scope Creep:** Only build the current phase. Do not introduce speculative schemas or mock tables for future phases.
2. **Database-First Security:** RLS is the single source of truth. The UI reflects permissions for user ergonomics, but PostgreSQL RLS strictly enforces access.
3. **Zero Breaking Changes:** Never break the Phase 1 public website or previous phase data contracts.
4. **Transparent Verification:** Always verify against live PostgreSQL before assuming code and database state are in sync.
