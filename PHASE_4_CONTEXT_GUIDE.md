# Jamia Tul Uloom Al-Islamia — Madaris Management System (MMS)
## Phase 4 Kickoff Context & Handoff Guide

This document serves as the complete architectural, database, security, and functional reference for starting **Phase 4** of the Jamia Tul Uloom Al-Islamia Madaris Management System in a fresh session.

---

### 1. Project Overview & Core Constraints

* **Institution:** Jamia Tul Uloom Al-Islamia (جامعۃ العلوم الاسلامیہ), Sector F-2, Mirpur, Azad Jammu & Kashmir, Pakistan.
* **Technology Stack:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React icons, Supabase (PostgreSQL 15+, Supabase Auth, Row Level Security).
* **Isolation Rule:**
  * **Public Website (Phase 1):** Lives under `src/components/`, `src/App.tsx`, etc. **MUST NOT** be modified, redesigned, or broken.
  * **MMS Portal (Phase 2 & 3):** Strictly contained within `src/mms/`.
  * **Database Migrations:** SQL files stored chronologically under `supabase/`.
* **Dual-Mode Persistence (Supabase + Local Demo Store):**
  * When Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are present, the system communicates with PostgreSQL using RLS.
  * When running without credentials (offline / preview demo mode), data falls back smoothly to a pre-seeded, reactive local store in `localStorage` (`jamia_mms_phase3_store`).
  * Both modes enforce the same validation, uniqueness rules, and role permissions.

---

### 2. Completed Phases Summary

#### Phase 1: Institutional Public Website (COMPLETED & LOCKED)
* Bilingual Urdu/English responsive portal for Jamia Tul Uloom Al-Islamia.
* Views: About, Admissions, Dars-e-Nizami, Hifz-ul-Quran, Contemporary Education, Faculty, Photo Gallery, Verification Badge, Announcements, and Contact form.

#### Phase 2: MMS Auth & Role Foundation (COMPLETED & LOCKED)
* **Profiles & Authentication:**
  * Supabase Auth integrated with `public.profiles` (`id` references `auth.users.id`).
  * Dedicated PostgreSQL ENUM: `mms_role` with four distinct roles:
    1. `mudeer` (مہتمم / Principal / Administrator) — Full administrative oversight.
    2. `teacher` (استاذ / Teacher) — Scoped to assigned classes and students.
    3. `parent` (سرپرست / Guardian) — Scoped strictly to linked children.
    4. `counter` (دفترِ داخلہ و استقبالیہ / Registration & Admissions Desk) — Read-only verification.
  * Trigger `on_auth_user_created` guarantees new signups default to `parent` (preventing self-assignment of privileged roles).
* **UI Shell:** `MmsNavbar`, `MmsAuthModal`, role badge, and role switcher for demo testing.

#### Phase 3: People + Academic Foundation (COMPLETED, AUDITED & READY)
* **8 PostgreSQL Tables (`supabase/phase3_people_academic_foundation.sql`):**
  1. `students` — Identity, admission number (`UNIQUE`), full name, father name, DOB, gender, status, admission date.
  2. `guardians` — Full name, relationship, phone, CNIC, email, address, linked `profile_id`.
  3. `student_guardians` — Junction table with composite `UNIQUE (student_id, guardian_id)`, primary guardian flag, pickup authorization.
  4. `teachers` — Profile link (`profile_id` `UNIQUE`), employee number (`UNIQUE`), name, phone, qualification, specialization, status.
  5. `classes` — Name, code, academic year, section, capacity, status, assigned class teacher (`teacher_id`), composite `UNIQUE (code, academic_year, section)`.
  6. `subjects` — Name, code (`UNIQUE`), category (`darse_nizami`, `hifz_tajweed`, `contemporary`, `general`), status.
  7. `class_subjects` — Junction table with composite `UNIQUE (class_id, subject_id)`, assigned subject teacher (`teacher_id`).
  8. `enrollments` — Student enrollment records with status (`enrolled`, `completed`, `dropped`, `suspended`, `promoted`), partial unique index preventing duplicate active enrollments per student/year.
* **Row Level Security (RLS) & Definer Functions:**
  * Enabled on all 8 tables.
  * `SECURITY DEFINER` functions in `public` schema avoid RLS infinite recursion:
    * `get_current_user_role()`
    * `get_current_teacher_id()`
    * `get_teacher_class_ids()`
    * `get_teacher_student_ids()`
    * `get_parent_student_ids()`
    * `get_parent_class_ids()`
  * Mudeer has full `ALL` permissions with `CHECK`.
  * Teachers see only assigned classes, enrolled students in those classes, and relevant guardians.
  * Parents see only linked children and their enrollment info.
  * Counter has read-only access for student/guardian/enrollment verification.
  * Anonymous access is blocked (`TO authenticated`).
* **Frontend Services & Components (`src/mms/`):**
  * `types.ts` — TypeScript interfaces for all 8 entities, enums, and expanded detail types.
  * `services/phase3DataService.ts` — Dual-mode service layer with input validation, duplicate guards, and defense-in-depth permission checks (`checkMudeerPermission`).
  * `views/MmsDashboard.tsx` — Mudeer academic foundation dashboard with real-time statistics.
  * `views/MmsStudentsView.tsx` — Student list, search, filter, Add/Edit/View modals, and guardian management.
  * `views/MmsGuardiansView.tsx` — Guardian registry, linked students, and contact directory.
  * `views/MmsTeachersView.tsx` — Teacher roster, assigned classes, and curriculum specializations.
  * `views/MmsClassesView.tsx` — Class catalog, teacher assignment, subject allocation, and student roster.
  * `views/MmsSubjectsView.tsx` — Curriculum catalog with Dars-e-Nizami and Hifz classifications.
  * `views/MmsEnrollmentsView.tsx` — Academic enrollment workflow with duplicate enrollment prevention.
  * Role dashboards: `MmsTeacherDashboard.tsx`, `MmsParentDashboard.tsx`, `MmsCounterDashboard.tsx`.

---

### 3. Key Files Structure Reference

```text
/
├── supabase/
│   ├── phase2_foundation.sql               # Profiles, roles, triggers, auth RLS
│   └── phase3_people_academic_foundation.sql # 8 core academic tables + RLS + helper functions
├── src/
│   ├── components/                         # Phase 1: Public Website (Do not touch)
│   ├── context/                            # Language context (Urdu/English)
│   └── mms/                                # Madaris Management System
│       ├── components/                     # Reusable MMS UI (Modal, StatCard, etc.)
│       ├── context/
│       │   └── MmsAuthContext.tsx          # Auth state, profiles, and demo role switching
│       ├── data/
│       │   └── mockData.ts                 # Initial demo accounts & statistics
│       ├── lib/
│       │   └── supabase.ts                 # Supabase client initializer
│       ├── services/
│       │   └── phase3DataService.ts        # Phase 3 data access layer (Supabase + LocalStore)
│       ├── types.ts                        # Core data models and types
│       ├── views/                          # Role views & Phase 3 modules
│       └── MmsApp.tsx                      # MMS route dispatcher and role guards
```

---

### 4. Phase 4 Implementation Rules & Guidelines

1. **Build Upon, Do Not Rewrite:**
   * Foreign keys in Phase 4 tables (e.g. attendance, exams, fees) MUST reference existing tables (`students.id`, `classes.id`, `teachers.id`, `subjects.id`, `enrollments.id`).
   * Do not drop or alter existing columns without explicit necessity.
2. **Database & RLS Standard:**
   * Store new migration in `supabase/phase4_<module_name>.sql`.
   * Enable RLS on all newly created tables.
   * Reuse existing `SECURITY DEFINER` functions (`get_current_user_role()`, `get_teacher_class_ids()`, etc.) for consistency and recursion safety.
3. **Dual-Mode Service Layer Pattern:**
   * In data services, implement both Supabase queries and a fallback local store mechanism so the app continues functioning seamlessly in AI Studio preview demo mode.
   * Include defense-in-depth checks (`checkMudeerPermission` or role checks) in services.
4. **Bilingual & Institutional Tone:**
   * Maintain authentic madrasa terminology (e.g., ناظمِ تعلیمات, حاضر / غائب / رخصت, ششماہی / سالانہ امتحانات, شعبہ حفظ / درس نظامی).
   * Ensure error messages and confirmation modals provide clear Urdu alongside English.

---

### 5. Ready-to-Copy Prompt for New Chat

Copy and paste the text in the box below as your **first message in the new Phase 4 chat**:

```markdown
You are continuing development on the Jamia Tul Uloom Al-Islamia Madaris Management System (MMS).

PROJECT CONTEXT & STATUS:
- Phase 1 (Public Website) is 100% complete and must remain intact.
- Phase 2 (Supabase Auth, profiles, mms_role ENUM: mudeer, teacher, parent, counter) is 100% complete.
- Phase 3 (People + Academic Foundation: students, guardians, student_guardians, teachers, classes, subjects, class_subjects, enrollments) is 100% complete, fully tested, and security-audited.
- All MMS code is strictly isolated in `src/mms/`.
- The database uses Supabase (PostgreSQL) with RLS + helper functions in `supabase/phase3_people_academic_foundation.sql`, backed by a fallback local store for preview testing in `src/mms/services/phase3DataService.ts`.
- Full project architecture details are documented in `PHASE_4_CONTEXT_GUIDE.md`.

CORE MANDATES:
1. Do not rewrite, break, or modify Phase 1, Phase 2, or Phase 3 code unnecessarily.
2. Do not touch the public website under `src/components/`.
3. Use existing tables (`students`, `teachers`, `classes`, `subjects`, `enrollments`, `profiles`) as foreign keys for Phase 4.
4. Maintain bilingual Urdu/English terminology appropriate for Pakistani Madaris.
5. Provide Supabase SQL migrations under `supabase/` with strict RLS policies.
6. Support both Supabase and demo mode in the service layer.

PHASE 4 SCOPE:
[ENTER YOUR CHOSEN PHASE 4 MODULE HERE, e.g.:
Option A: Student & Teacher Attendance (حاضری نظام - Daily attendance, leave requests, monthly registers)
Option B: Examinations & Results (امتحانات و تعلیمی رپورٹ کارڈ - Shishmaha/Salana exams, grading, marks entry, student report cards)
Option C: Fee & Contribution Management (فیس و کفالت فنڈ - Fee vouchers, payments, concessions, student ledger)]

Please review the existing codebase context and wait for my specific instruction on the exact Phase 4 features to implement.
```
