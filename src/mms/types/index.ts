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
