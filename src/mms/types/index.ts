export type MmsRole = 'mudeer' | 'teacher' | 'counter' | 'parent';

export interface SupabaseProfile {
  id: string;
  email: string;
  full_name: string;
  name_urdu?: string | null;
  role: MmsRole;
  designation_english?: string | null;
  designation_urdu?: string | null;
  department_english?: string | null;
  department_urdu?: string | null;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MmsUser {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  email: string;
  role: MmsRole;
  designationUrdu: string;
  designationEnglish: string;
  departmentUrdu?: string;
  departmentEnglish?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

export interface MmsNavItem {
  id: string;
  labelUrdu: string;
  labelEnglish: string;
  iconName: string;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'success';
}

export interface MmsStudent {
  id: string;
  rollNumber: string;
  nameUrdu: string;
  nameEnglish: string;
  fatherNameUrdu: string;
  fatherNameEnglish: string;
  department: 'dars_nizami' | 'hifz' | 'asri';
  departmentNameUrdu: string;
  departmentNameEnglish: string;
  classGrade: string;
  section?: string;
  hostelResident: boolean;
  status: 'active' | 'leave' | 'suspended';
  attendanceRate: number;
  monthlyFee: number;
  feeStatus: 'paid' | 'pending' | 'overdue';
}

export interface MmsTeacher {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  designationUrdu: string;
  designationEnglish: string;
  classesCount: number;
  studentsCount: number;
  attendanceRate: number;
  phone: string;
}

export interface MmsFeeRecord {
  id: string;
  receiptNumber: string;
  studentNameUrdu: string;
  studentNameEnglish: string;
  rollNumber: string;
  classGrade: string;
  month: string;
  amount: number;
  type: 'tuition' | 'hostel' | 'mess' | 'admission';
  status: 'paid' | 'pending';
  date: string;
  collectedBy: string;
}

export interface MmsDonationRecord {
  id: string;
  receiptNumber: string;
  donorNameUrdu: string;
  donorNameEnglish: string;
  category: 'zakat' | 'sadaqah' | 'general' | 'building';
  amount: number;
  paymentMode: 'cash' | 'bank_transfer' | 'cheque';
  date: string;
  city: string;
}

export interface MmsAttendanceSummary {
  present: number;
  absent: number;
  onLeave: number;
  total: number;
  percentage: number;
}

// ============================================================================
// Phase 3: People + Academic Foundation Database Models (Supabase Entities)
// ============================================================================

export type StudentStatus = 'active' | 'inactive' | 'graduated' | 'suspended' | 'withdrawn' | 'transferred';
export type StudentGender = 'male' | 'female';

export interface DbStudent {
  id: string;
  admission_number: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  date_of_birth: string;
  gender: StudentGender;
  phone?: string | null;
  address?: string | null;
  admission_date: string;
  status: StudentStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbGuardian {
  id: string;
  profile_id?: string | null;
  full_name: string;
  relationship: string;
  phone: string;
  alternate_phone?: string | null;
  email?: string | null;
  address?: string | null;
  occupation?: string | null;
  is_primary: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbStudentGuardian {
  id: string;
  student_id: string;
  guardian_id: string;
  relationship: string;
  is_primary: boolean;
  can_pickup: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type TeacherStatus = 'active' | 'inactive' | 'on_leave' | 'terminated' | 'resigned';

export interface DbTeacher {
  id: string;
  profile_id?: string | null;
  employee_number: string;
  full_name: string;
  phone?: string | null;
  email?: string | null;
  qualification?: string | null;
  specialization?: string | null;
  joining_date: string;
  status: TeacherStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type ClassStatus = 'active' | 'inactive' | 'archived';

export interface DbClass {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  academic_year: string;
  section: string;
  teacher_id?: string | null;
  capacity: number;
  status: ClassStatus;
  created_at: string;
  updated_at: string;
}

export type SubjectCategory = 'quran' | 'dars_nizami' | 'contemporary' | 'general';
export type SubjectStatus = 'active' | 'inactive' | 'archived';

export interface DbSubject {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  category: SubjectCategory;
  status: SubjectStatus;
  created_at: string;
  updated_at: string;
}

export interface DbClassSubject {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id?: string | null;
  created_at: string;
  updated_at: string;
}

export type EnrollmentStatus = 'enrolled' | 'completed' | 'dropped' | 'suspended' | 'promoted';

export interface DbEnrollment {
  id: string;
  student_id: string;
  class_id: string;
  academic_year: string;
  enrollment_date: string;
  status: EnrollmentStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

// Enriched UI types for Joined Relationships
export interface StudentWithDetails extends DbStudent {
  guardians?: (DbStudentGuardian & { guardian: DbGuardian })[];
  activeEnrollment?: DbEnrollment & { class: DbClass };
  enrollments?: (DbEnrollment & { class: DbClass })[];
}

export interface GuardianWithStudents extends DbGuardian {
  students?: (DbStudentGuardian & { student: DbStudent })[];
}

export interface TeacherWithDetails extends DbTeacher {
  classes?: DbClass[];
  assignedSubjects?: (DbClassSubject & { class: DbClass; subject: DbSubject })[];
}

export interface ClassWithDetails extends DbClass {
  teacher?: DbTeacher | null;
  enrolledStudents?: (DbEnrollment & { student: DbStudent })[];
  assignedSubjects?: (DbClassSubject & { subject: DbSubject; teacher?: DbTeacher | null })[];
}

export interface ClassSubjectWithDetails extends DbClassSubject {
  subject: DbSubject;
  teacher?: DbTeacher | null;
}

export type TeacherWithAssignments = TeacherWithDetails;

export interface EnrollmentWithDetails extends DbEnrollment {
  student?: DbStudent;
  class?: DbClass;
}
