import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  DbStudent,
  DbGuardian,
  DbStudentGuardian,
  DbTeacher,
  DbClass,
  DbSubject,
  DbClassSubject,
  DbEnrollment,
  StudentWithDetails,
  GuardianWithStudents,
  TeacherWithDetails,
  ClassWithDetails,
  EnrollmentWithDetails,
  StudentStatus,
  StudentGender,
  TeacherStatus,
  ClassStatus,
  SubjectCategory,
  SubjectStatus,
  EnrollmentStatus,
} from '../types';

// Storage key for persistent demo mode data
const STORAGE_KEY = 'jamia_mms_phase3_store';

// ============================================================================
// Realistic Seed Data for Jamia Tul Uloom Al-Islamia, Mirpur AJK
// ============================================================================

const SEED_TEACHERS: DbTeacher[] = [
  {
    id: 't-01',
    profile_id: '22222222-2222-2222-2222-222222222222', // Linked to demo teacher
    employee_number: 'T-1001',
    full_name: 'مولانا مفتی قاری شبیر احمد',
    phone: '0300-9876543',
    email: 'teacher@jamia.edu.pk',
    qualification: 'شہادت العالمیہ (وفاق المدارس) + ایم اے اسلامیات',
    specialization: 'حدیث شریف و تجوید و قرات',
    joining_date: '2020-08-15',
    status: 'active',
    notes: 'استاذِ حدیث و نگران شعبہ حفظ القرآن',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 't-02',
    profile_id: null,
    employee_number: 'T-1002',
    full_name: 'قاری محمد عثمان میرپوری',
    phone: '0312-3456789',
    email: 'usman.qari@jamia.edu.pk',
    qualification: 'حفظ القرآن، سبعہ و عشرہ قراءات',
    specialization: 'تجوید و حفظ القرآن',
    joining_date: '2021-02-01',
    status: 'active',
    notes: 'استاذ شعبہ تحفیظ القرآن',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 't-03',
    profile_id: null,
    employee_number: 'T-1003',
    full_name: 'مفتی حافظ طارق محمود',
    phone: '0345-5678901',
    email: 'tariq.mehmood@jamia.edu.pk',
    qualification: 'تخصص فی الفقہ والافتاء',
    specialization: 'فقہ حنفی و علم النحو و الصرف',
    joining_date: '2019-09-10',
    status: 'active',
    notes: 'استاذ فقہ و نحو درسِ نظامی',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 't-04',
    profile_id: null,
    employee_number: 'T-1004',
    full_name: 'سر محمد رضوان کیانی',
    phone: '0333-8765432',
    email: 'rizwan.school@jamia.edu.pk',
    qualification: 'ایم ایس سی ریاضی، بی ایڈ',
    specialization: 'عصری ریاضی و سائنس',
    joining_date: '2022-04-01',
    status: 'active',
    notes: 'انچارج عصری ہائی اسکول سیکشن',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const SEED_CLASSES: DbClass[] = [
  {
    id: 'c-01',
    name: 'درسِ نظامی — سال اول (اولیٰ)',
    code: 'DN-01',
    description: 'شعبہ درسِ نظامی کا ابتدائی سال: صرف، نحو، فقہ اور عربی ادب',
    academic_year: '1446-1447ھ / 2024-2025',
    section: 'A',
    teacher_id: 't-01', // Maulana Shabbir Ahmad
    capacity: 35,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'c-02',
    name: 'درسِ نظامی — سال دوم (ثانیہ)',
    code: 'DN-02',
    description: 'درسِ نظامی سال دوم: قدوری، نحو میر، اصول فقہ و عربی بلاغت',
    academic_year: '1446-1447ھ / 2024-2025',
    section: 'A',
    teacher_id: 't-03', // Mufti Tariq Mehmood
    capacity: 35,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'c-03',
    name: 'شعبہ حفظ القرآن — حلقہ ۱',
    code: 'HIFZ-01',
    description: 'حفظِ کلام اللہ مع تجوید و ترتیل — بنیادی حلقہ',
    academic_year: '1446-1447ھ / 2024-2025',
    section: 'A',
    teacher_id: 't-01', // Maulana Shabbir Ahmad
    capacity: 25,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'c-04',
    name: 'شعبہ حفظ القرآن — حلقہ ۲',
    code: 'HIFZ-02',
    description: 'حفظِ کلام اللہ مع روانگی و دہرائی — پیش رفتہ حلقہ',
    academic_year: '1446-1447ھ / 2024-2025',
    section: 'B',
    teacher_id: 't-02', // Qari Usman
    capacity: 25,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'c-05',
    name: 'عصری اسکول — میٹرک نہم (9th)',
    code: 'ASR-09',
    description: 'آزاد کشمیر بورڈ سائنس گروپ: ریاضی، فزکس، کیمسٹری، انگلش',
    academic_year: '1446-1447ھ / 2024-2025',
    section: 'A',
    teacher_id: 't-04', // Sir Rizwan
    capacity: 40,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'c-06',
    name: 'عصری اسکول — میٹرک دہم (10th)',
    code: 'ASR-10',
    description: 'آزاد کشمیر بورڈ سائنس گروپ فائنل کلاس',
    academic_year: '1446-1447ھ / 2024-2025',
    section: 'A',
    teacher_id: 't-04', // Sir Rizwan
    capacity: 40,
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const SEED_SUBJECTS: DbSubject[] = [
  {
    id: 'sub-01',
    code: 'QUR-101',
    name: 'حفظِ قرآن کریم مع حسنِ ترتیل',
    description: 'روزانہ کا نیا سبق، سبقی اور منزل کی دہرائی',
    category: 'quran',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-02',
    code: 'TAJ-102',
    name: 'قواعد التجوید و مخارج الحروف',
    description: 'قواعد التجوید، صفاتِ لازمہ و عارضہ اور مشق',
    category: 'quran',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-03',
    code: 'NAH-201',
    name: 'علم النحو (شرح مائۃ عامل و تسہیل النحو)',
    description: 'عربی گرائمر کے ترکیبی و اعرابی قواعد',
    category: 'dars_nizami',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-04',
    code: 'SAR-202',
    name: 'علم الصرف (علم الصیغہ و ابواب الصرف)',
    description: 'عربی صیغوں کی گردانیں اور تعلیلات',
    category: 'dars_nizami',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-05',
    code: 'FIQ-203',
    name: 'الفقہ الاسلامی (نور الایضاح و قدوری)',
    description: 'طہارت، نماز، روزہ، زکوٰۃ و معاملات کے مسائل',
    category: 'dars_nizami',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-06',
    code: 'MAT-301',
    name: 'ریاضی (Mathematics)',
    description: 'الجبر، جیومیٹری اور حساب کتاب',
    category: 'contemporary',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-07',
    code: 'ENG-302',
    name: 'انگریزی زبان (English Language)',
    description: 'گرامر، کمپوزیشن اور ریڈنگ',
    category: 'contemporary',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'sub-08',
    code: 'URD-303',
    name: 'اردو ادب و انشا پردازی',
    description: 'نثر، نظم اور تحریری صلاحیتیں',
    category: 'general',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const SEED_CLASS_SUBJECTS: DbClassSubject[] = [
  {
    id: 'cs-01',
    class_id: 'c-01', // DN-01
    subject_id: 'sub-03', // NAH-201
    teacher_id: 't-03', // Mufti Tariq Mehmood
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-02',
    class_id: 'c-01', // DN-01
    subject_id: 'sub-04', // SAR-202
    teacher_id: 't-03', // Mufti Tariq Mehmood
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-03',
    class_id: 'c-01', // DN-01
    subject_id: 'sub-05', // FIQ-203
    teacher_id: 't-01', // Maulana Shabbir Ahmad
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-04',
    class_id: 'c-03', // HIFZ-01
    subject_id: 'sub-01', // QUR-101
    teacher_id: 't-01', // Maulana Shabbir Ahmad
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-05',
    class_id: 'c-03', // HIFZ-01
    subject_id: 'sub-02', // TAJ-102
    teacher_id: 't-01', // Maulana Shabbir Ahmad
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-06',
    class_id: 'c-04', // HIFZ-02
    subject_id: 'sub-01', // QUR-101
    teacher_id: 't-02', // Qari Usman
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-07',
    class_id: 'c-05', // ASR-09
    subject_id: 'sub-06', // MAT-301
    teacher_id: 't-04', // Sir Rizwan
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cs-08',
    class_id: 'c-05', // ASR-09
    subject_id: 'sub-07', // ENG-302
    teacher_id: 't-04', // Sir Rizwan
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const SEED_GUARDIANS: DbGuardian[] = [
  {
    id: 'g-01',
    profile_id: '44444444-4444-4444-4444-444444444444', // Linked to demo parent
    full_name: 'چوہدری طارق عزیز',
    relationship: 'والد (Father)',
    phone: '0300-5551234',
    alternate_phone: '05827-442211',
    email: 'parent@jamia.edu.pk',
    address: 'مکان نمبر ۱۲، اسٹریٹ ۴، سیکٹر ایف-۲، میرپور آزاد کشمیر',
    occupation: 'تاجر / کاروباری شخصیت',
    is_primary: true,
    notes: 'طالب علم محمد عبد اللہ اور زینب فاطمہ کے والد گرامی',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'g-02',
    profile_id: null,
    full_name: 'حاجی بشیر احمد قریشی',
    relationship: 'والد (Father)',
    phone: '0345-7890123',
    alternate_phone: null,
    email: 'bashir.qureshi@gmail.com',
    address: 'سیکٹر سی-۱، بالمقابل گرینڈ مسجد، میرپور آزاد کشمیر',
    occupation: 'سرکاری ملازم (ریٹائرڈ)',
    is_primary: true,
    notes: 'طالب علم محمد انس قریشی کے سرپرست',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'g-03',
    profile_id: null,
    full_name: 'ڈاکٹر مشتاق احمد میرپوری',
    relationship: 'والد (Father)',
    phone: '0312-9988776',
    alternate_phone: '05827-445566',
    email: 'dr.mushtaq@hospital.pk',
    address: 'مین روڈ کُلیال، میرپور آزاد کشمیر',
    occupation: 'میڈیکل اسپیشلسٹ',
    is_primary: true,
    notes: 'طالب علم عبد الرحمٰن کے والد',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'g-04',
    profile_id: null,
    full_name: 'صوفی محمد نواز',
    relationship: 'چچا / قانونی سرپرست',
    phone: '0333-4455667',
    alternate_phone: null,
    email: 'nawaz.guardian@yahoo.com',
    address: 'سیکٹر ڈی-۴، میرپور آزاد کشمیر',
    occupation: 'ٹھیکیدار',
    is_primary: true,
    notes: 'طالب علم حمزہ طارق کے چچا',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const SEED_STUDENTS: DbStudent[] = [
  {
    id: 's-01',
    admission_number: 'ADM-2024-001',
    first_name: 'محمد عبد اللہ',
    middle_name: '',
    last_name: 'عزیز',
    date_of_birth: '2008-05-12',
    gender: 'male',
    phone: '0300-5551234',
    address: 'سیکٹر ایف-۲، میرپور آزاد کشمیر',
    admission_date: '2024-08-01',
    status: 'active',
    notes: 'باصلاحیت طالب علم، درسِ نظامی سال اول',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 's-02',
    admission_number: 'ADM-2024-002',
    first_name: 'زینب',
    middle_name: '',
    last_name: 'فاطمہ',
    date_of_birth: '2011-08-20',
    gender: 'female',
    phone: '0300-5551234',
    address: 'سیکٹر ایف-۲، میرپور آزاد کشمیر',
    admission_date: '2024-08-01',
    status: 'active',
    notes: 'شعبہ تحفیظ القرآن، ذہین اور باقاعدہ طالبہ',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 's-03',
    admission_number: 'ADM-2024-003',
    first_name: 'محمد انس',
    middle_name: '',
    last_name: 'قریشی',
    date_of_birth: '2007-02-14',
    gender: 'male',
    phone: '0345-7890123',
    address: 'سیکٹر سی-۱، میرپور آزاد کشمیر',
    admission_date: '2024-08-05',
    status: 'active',
    notes: 'درسِ نظامی اولیٰ — رہائشی طالب علم (دار الاقامہ)',
    created_at: '2024-08-05T00:00:00Z',
    updated_at: '2024-08-05T00:00:00Z',
  },
  {
    id: 's-04',
    admission_number: 'ADM-2024-004',
    first_name: 'عبد الرحمٰن',
    middle_name: '',
    last_name: 'مشتاق',
    date_of_birth: '2006-11-03',
    gender: 'male',
    phone: '0312-9988776',
    address: 'کُلیال، میرپور آزاد کشمیر',
    admission_date: '2023-08-10',
    status: 'active',
    notes: 'درسِ نظامی سال دوم (ثانیہ)',
    created_at: '2023-08-10T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 's-05',
    admission_number: 'ADM-2024-005',
    first_name: 'حمزہ',
    middle_name: '',
    last_name: 'طارق',
    date_of_birth: '2010-04-18',
    gender: 'male',
    phone: '0333-4455667',
    address: 'سیکٹر ڈی-۴، میرپور آزاد کشمیر',
    admission_date: '2024-08-15',
    status: 'active',
    notes: 'حفظ حلقہ ۲',
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-08-15T00:00:00Z',
  },
  {
    id: 's-06',
    admission_number: 'ADM-2024-006',
    first_name: 'بلاول',
    middle_name: '',
    last_name: 'حسین',
    date_of_birth: '2006-09-25',
    gender: 'male',
    phone: '0301-2233445',
    address: 'افضل پور روڈ، میرپور آزاد کشمیر',
    admission_date: '2024-08-12',
    status: 'active',
    notes: 'میٹرک دہم سائنس گروپ',
    created_at: '2024-08-12T00:00:00Z',
    updated_at: '2024-08-12T00:00:00Z',
  },
];

const SEED_STUDENT_GUARDIANS: DbStudentGuardian[] = [
  {
    id: 'sg-01',
    student_id: 's-01', // Muhammad Abdullah
    guardian_id: 'g-01', // Chaudhry Tariq Aziz
    relationship: 'والد (Father)',
    is_primary: true,
    can_pickup: true,
    notes: 'مرکزی رابطہ کار سرپرست',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 'sg-02',
    student_id: 's-02', // Zainab Fatima
    guardian_id: 'g-01', // Chaudhry Tariq Aziz
    relationship: 'والد (Father)',
    is_primary: true,
    can_pickup: true,
    notes: 'مرکزی رابطہ کار سرپرست',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 'sg-03',
    student_id: 's-03', // Muhammad Anas Qureshi
    guardian_id: 'g-02', // Haji Bashir Ahmad
    relationship: 'والد (Father)',
    is_primary: true,
    can_pickup: true,
    notes: 'سرپرست رابطہ کار',
    created_at: '2024-08-05T00:00:00Z',
    updated_at: '2024-08-05T00:00:00Z',
  },
  {
    id: 'sg-04',
    student_id: 's-04', // Abdur Rahman
    guardian_id: 'g-03', // Dr. Mushtaq
    relationship: 'والد (Father)',
    is_primary: true,
    can_pickup: true,
    notes: 'سرپرست رابطہ کار',
    created_at: '2024-08-10T00:00:00Z',
    updated_at: '2024-08-10T00:00:00Z',
  },
  {
    id: 'sg-05',
    student_id: 's-05', // Hamza Tariq
    guardian_id: 'g-04', // Sufi Nawaz
    relationship: 'چچا / قانونی سرپرست',
    is_primary: true,
    can_pickup: true,
    notes: 'سرپرست رابطہ کار',
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-08-15T00:00:00Z',
  },
];

const SEED_ENROLLMENTS: DbEnrollment[] = [
  {
    id: 'enr-01',
    student_id: 's-01', // Muhammad Abdullah
    class_id: 'c-01', // DN-01
    academic_year: '1446-1447ھ / 2024-2025',
    enrollment_date: '2024-08-01',
    status: 'enrolled',
    notes: 'داخلہ باقاعدہ منظور شدہ',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 'enr-02',
    student_id: 's-02', // Zainab Fatima
    class_id: 'c-03', // HIFZ-01
    academic_year: '1446-1447ھ / 2024-2025',
    enrollment_date: '2024-08-01',
    status: 'enrolled',
    notes: 'حفظ حلقہ ۱ میں فعال اندراج',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 'enr-03',
    student_id: 's-03', // Muhammad Anas Qureshi
    class_id: 'c-01', // DN-01
    academic_year: '1446-1447ھ / 2024-2025',
    enrollment_date: '2024-08-05',
    status: 'enrolled',
    notes: 'درسِ نظامی اولیٰ فعال',
    created_at: '2024-08-05T00:00:00Z',
    updated_at: '2024-08-05T00:00:00Z',
  },
  {
    id: 'enr-04',
    student_id: 's-04', // Abdur Rahman
    class_id: 'c-02', // DN-02
    academic_year: '1446-1447ھ / 2024-2025',
    enrollment_date: '2024-08-01',
    status: 'enrolled',
    notes: 'ثانیہ میں پروموٹڈ اندراج',
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2024-08-01T00:00:00Z',
  },
  {
    id: 'enr-05',
    student_id: 's-05', // Hamza Tariq
    class_id: 'c-04', // HIFZ-02
    academic_year: '1446-1447ھ / 2024-2025',
    enrollment_date: '2024-08-15',
    status: 'enrolled',
    notes: 'حفظ حلقہ ۲',
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-08-15T00:00:00Z',
  },
  {
    id: 'enr-06',
    student_id: 's-06', // Bilawal Hussain
    class_id: 'c-06', // ASR-10
    academic_year: '1446-1447ھ / 2024-2025',
    enrollment_date: '2024-08-12',
    status: 'enrolled',
    notes: 'میٹرک دہم سائنس',
    created_at: '2024-08-12T00:00:00Z',
    updated_at: '2024-08-12T00:00:00Z',
  },
];

// Helper to manage persistent state in demo mode
interface Phase3Store {
  students: DbStudent[];
  guardians: DbGuardian[];
  student_guardians: DbStudentGuardian[];
  teachers: DbTeacher[];
  classes: DbClass[];
  subjects: DbSubject[];
  class_subjects: DbClassSubject[];
  enrollments: DbEnrollment[];
}

function loadLocalStore(): Phase3Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        students: parsed.students || SEED_STUDENTS,
        guardians: parsed.guardians || SEED_GUARDIANS,
        student_guardians: parsed.student_guardians || SEED_STUDENT_GUARDIANS,
        teachers: parsed.teachers || SEED_TEACHERS,
        classes: parsed.classes || SEED_CLASSES,
        subjects: parsed.subjects || SEED_SUBJECTS,
        class_subjects: parsed.class_subjects || SEED_CLASS_SUBJECTS,
        enrollments: parsed.enrollments || SEED_ENROLLMENTS,
      };
    }
  } catch (e) {
    console.error('Error loading local phase3 store:', e);
  }

  const initial: Phase3Store = {
    students: SEED_STUDENTS,
    guardians: SEED_GUARDIANS,
    student_guardians: SEED_STUDENT_GUARDIANS,
    teachers: SEED_TEACHERS,
    classes: SEED_CLASSES,
    subjects: SEED_SUBJECTS,
    class_subjects: SEED_CLASS_SUBJECTS,
    enrollments: SEED_ENROLLMENTS,
  };
  saveLocalStore(initial);
  return initial;
}

function saveLocalStore(store: Phase3Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Error saving local phase3 store:', e);
  }
}

// Generate simple UUID
function generateId(): string {
  return 'id-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
}

// Phase 4 Institutional Authority Check:
// Authority to modify people and academic foundation records:
// Allowed:
//   - Nazim-e-Aala (Chief operational authority)
//   - Departmental Nazim with domain = 'academic'
//   - Legacy 'mudeer' (resolving to Nazim-e-Aala)
// Explicitly BLOCKED:
//   - Muhtamim (Oversight and inspection only, no routine operational CRUD)
//   - Teacher, Counter, Parent
export function checkAcademicAuthorityPermission(): { allowed: boolean; error?: string } {
  try {
    const raw = localStorage.getItem('jamia_demo_auth_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      const position = parsed?.user?.institutionalPosition || (parsed?.user?.role === 'mudeer' ? 'nazim_aala' : parsed?.user?.role);
      const domain = parsed?.user?.assignedDomain;

      // 1. Muhtamim inspection restriction: oversight only, no routine operational CRUD
      if (position === 'muhtamim') {
        return {
          allowed: false,
          error: 'مہتممِ جامعہ کا منصب ادارہ جاتی معائنہ اور نگرانی کا ہے۔ معمول کے دفتری اندراجات ناظمِ اعلیٰ یا ناظمِ تعلیمات کے دائرہ اختیار میں آتے ہیں۔ (Muhtamim has oversight and inspection authority only. Routine operational changes are managed by Nazim-e-Aala or Academic Head.)',
        };
      }

      // 2. Departmental Nazim must be scoped to academic domain
      if (position === 'departmental_nazim') {
        if (domain && domain !== 'academic' && domain !== 'all') {
          return {
            allowed: false,
            error: 'آپ کا منصب اس شعبے (تعلیمات) کے ریکارڈز میں ردوبدل کا مجاز نہیں ہے۔ (Unauthorized: Departmental manager not scoped to academic domain)',
          };
        }
        return { allowed: true };
      }

      // 3. Chief Operational Authority / Legacy Mudeer
      if (position === 'nazim_aala' || parsed?.user?.role === 'mudeer') {
        return { allowed: true };
      }

      // 4. Other roles blocked from managing academic master records
      return {
        allowed: false,
        error: 'آپ کے اکاؤنٹ کو تعلیمی و ادارہ جاتی ماسٹر ریکارڈز تبدیل یا حذف کرنے کے اختیارات حاصل نہیں ہیں۔ (Unauthorized to modify academic records)',
      };
    }
  } catch {
    // ignore
  }
  return { allowed: true };
}

// Backward-compatible bridge used across existing Phase 3 service methods
function checkMudeerPermission(): { allowed: boolean; error?: string } {
  return checkAcademicAuthorityPermission();
}

// ============================================================================
// Service Export
// ============================================================================

export const phase3Service = {
  // 1. Dashboard Counts
  async getDashboardCounts(): Promise<{
    students: number;
    guardians: number;
    teachers: number;
    classes: number;
    subjects: number;
    activeEnrollments: number;
  }> {
    if (isSupabaseConfigured) {
      try {
        const [
          { count: studentsCount },
          { count: guardiansCount },
          { count: teachersCount },
          { count: classesCount },
          { count: subjectsCount },
          { count: activeEnrollmentsCount },
        ] = await Promise.all([
          supabase.from('students').select('*', { count: 'exact', head: true }),
          supabase.from('guardians').select('*', { count: 'exact', head: true }),
          supabase.from('teachers').select('*', { count: 'exact', head: true }),
          supabase.from('classes').select('*', { count: 'exact', head: true }),
          supabase.from('subjects').select('*', { count: 'exact', head: true }),
          supabase.from('enrollments').select('*', { count: 'exact', head: true }).eq('status', 'enrolled'),
        ]);

        if (
          studentsCount !== null &&
          guardiansCount !== null &&
          teachersCount !== null &&
          classesCount !== null &&
          subjectsCount !== null
        ) {
          return {
            students: studentsCount || 0,
            guardians: guardiansCount || 0,
            teachers: teachersCount || 0,
            classes: classesCount || 0,
            subjects: subjectsCount || 0,
            activeEnrollments: activeEnrollmentsCount || 0,
          };
        }
      } catch (err) {
        console.warn('Falling back to local counts:', err);
      }
    }

    const store = loadLocalStore();
    return {
      students: store.students.length,
      guardians: store.guardians.length,
      teachers: store.teachers.length,
      classes: store.classes.length,
      subjects: store.subjects.length,
      activeEnrollments: store.enrollments.filter((e) => e.status === 'enrolled').length,
    };
  },

  // --------------------------------------------------------------------------
  // 2. Students Operations
  // --------------------------------------------------------------------------
  async getStudents(filters?: {
    search?: string;
    status?: string;
    gender?: string;
  }): Promise<StudentWithDetails[]> {
    let list: StudentWithDetails[] = [];

    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('students').select('*').order('created_at', { ascending: false });
        if (filters?.status && filters.status !== 'all') {
          query = query.eq('status', filters.status);
        }
        if (filters?.gender && filters.gender !== 'all') {
          query = query.eq('gender', filters.gender);
        }
        const { data, error } = await query;
        if (!error && data) {
          list = data as StudentWithDetails[];
        }
      } catch (err) {
        console.warn('Supabase student fetch error, using local:', err);
      }
    }

    if (list.length === 0) {
      const store = loadLocalStore();
      list = [...store.students];
      if (filters?.status && filters.status !== 'all') {
        list = list.filter((s) => s.status === filters.status);
      }
      if (filters?.gender && filters.gender !== 'all') {
        list = list.filter((s) => s.gender === filters.gender);
      }
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.admission_number.toLowerCase().includes(q) ||
          s.first_name.toLowerCase().includes(q) ||
          s.last_name.toLowerCase().includes(q) ||
          (s.phone && s.phone.includes(q))
      );
    }

    // Attach active enrollment and guardians
    const store = loadLocalStore();
    return list.map((student) => {
      const studentGuardians = store.student_guardians.filter((sg) => sg.student_id === student.id);
      const enrichedGuardians = studentGuardians.map((sg) => {
        const guardian = store.guardians.find((g) => g.id === sg.guardian_id) || {
          id: sg.guardian_id,
          full_name: 'نامعلوم سرپرست',
          relationship: sg.relationship,
          phone: '',
          is_primary: sg.is_primary,
          created_at: '',
          updated_at: '',
        };
        return { ...sg, guardian };
      });

      const studentEnrollments = store.enrollments
        .filter((e) => e.student_id === student.id)
        .map((e) => {
          const cls = store.classes.find((c) => c.id === e.class_id) || {
            id: e.class_id,
            name: 'نامعلوم کلاس',
            code: '',
            academic_year: e.academic_year,
            section: '',
            capacity: 0,
            status: 'active' as ClassStatus,
            created_at: '',
            updated_at: '',
          };
          return { ...e, class: cls };
        });

      const activeEnrollment = studentEnrollments.find((e) => e.status === 'enrolled');

      return {
        ...student,
        guardians: enrichedGuardians,
        activeEnrollment,
        enrollments: studentEnrollments,
      };
    });
  },

  async getStudentById(id: string): Promise<StudentWithDetails | null> {
    const students = await this.getStudents();
    return students.find((s) => s.id === id) || null;
  },

  async createStudent(studentData: Omit<DbStudent, 'id' | 'created_at' | 'updated_at'>): Promise<{
    success: boolean;
    student?: DbStudent;
    error?: string;
  }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    // Validation
    if (!studentData.admission_number?.trim()) {
      return { success: false, error: 'داخلہ نمبر درج کرنا لازمی ہے۔ (Admission number is required)' };
    }
    if (!studentData.first_name?.trim()) {
      return { success: false, error: 'طالب علم کا نام درج کرنا لازمی ہے۔ (Student name is required)' };
    }
    if (!studentData.date_of_birth) {
      return { success: false, error: 'تاریخِ پیدائش منتخب کرنا لازمی ہے۔ (Date of birth is required)' };
    }
    if (!studentData.admission_date) {
      return { success: false, error: 'تاریخِ داخلہ لازمی ہے۔ (Admission date is required)' };
    }

    const store = loadLocalStore();
    // Unique admission number check
    const existing = store.students.find(
      (s) => s.admission_number.trim().toLowerCase() === studentData.admission_number.trim().toLowerCase()
    );
    if (existing) {
      return {
        success: false,
        error: `داخلہ نمبر "${studentData.admission_number}" پہلے سے موجود ہے۔ براہ کرم منفرد نمبر درج فرمائیں۔ (Admission number must be unique)`,
      };
    }

    const newStudent: DbStudent = {
      ...studentData,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('students').insert(studentData).select().single();
        if (error) {
          if (error.code === '23505') {
            return { success: false, error: 'یہ داخلہ نمبر پہلے سے سسٹم میں موجود ہے۔ (Duplicate admission number)' };
          }
          return { success: false, error: error.message };
        }
        if (data) {
          newStudent.id = data.id;
        }
      } catch (err: unknown) {
        console.warn('Supabase insert failed, maintaining in local storage:', err);
      }
    }

    store.students.unshift(newStudent);
    saveLocalStore(store);
    return { success: true, student: newStudent };
  },

  async updateStudent(
    id: string,
    studentData: Partial<Omit<DbStudent, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<{ success: boolean; student?: DbStudent; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.students.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, error: 'طالب علم کا ریکارڈ نہیں ملا۔ (Student not found)' };
    }

    if (studentData.admission_number) {
      const duplicate = store.students.find(
        (s) =>
          s.id !== id &&
          s.admission_number.trim().toLowerCase() === studentData.admission_number?.trim().toLowerCase()
      );
      if (duplicate) {
        return {
          success: false,
          error: `داخلہ نمبر "${studentData.admission_number}" پہلے سے دوسرے طالب علم کے پاس ہے۔`,
        };
      }
    }

    const updated: DbStudent = {
      ...store.students[index],
      ...studentData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('students').update(studentData).eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err: unknown) {
        console.warn('Supabase update failed, maintaining local:', err);
      }
    }

    store.students[index] = updated;
    saveLocalStore(store);
    return { success: true, student: updated };
  },

  async deleteStudent(id: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('students').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e: unknown) {
        console.warn('Supabase delete student error:', e);
      }
    }

    const store = loadLocalStore();
    store.students = store.students.filter((s) => s.id !== id);
    store.student_guardians = store.student_guardians.filter((sg) => sg.student_id !== id);
    store.enrollments = store.enrollments.filter((e) => e.student_id !== id);
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // 3. Guardians Operations
  // --------------------------------------------------------------------------
  async getGuardians(
    filter?: string | { search?: string }
  ): Promise<GuardianWithStudents[]> {
    const search = typeof filter === 'string' ? filter : filter?.search;
    const store = loadLocalStore();
    let list = [...store.guardians];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('guardians').select('*').order('full_name');
        if (!error && data && data.length > 0) {
          list = data as DbGuardian[];
        }
      } catch (err) {
        console.warn('Supabase guardians query error:', err);
      }
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.full_name.toLowerCase().includes(q) ||
          g.phone.includes(q) ||
          (g.email && g.email.toLowerCase().includes(q))
      );
    }

    return list.map((guardian) => {
      const links = store.student_guardians.filter((sg) => sg.guardian_id === guardian.id);
      const studentLinks = links.map((sg) => {
        const student = store.students.find((s) => s.id === sg.student_id) || {
          id: sg.student_id,
          admission_number: 'N/A',
          first_name: 'طالب علم',
          last_name: '',
          date_of_birth: '',
          gender: 'male' as StudentGender,
          admission_date: '',
          status: 'active' as StudentStatus,
          created_at: '',
          updated_at: '',
        };
        return { ...sg, student };
      });
      return { ...guardian, students: studentLinks };
    });
  },

  async createGuardian(guardianData: Omit<DbGuardian, 'id' | 'created_at' | 'updated_at'>): Promise<{
    success: boolean;
    guardian?: DbGuardian;
    error?: string;
  }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (!guardianData.full_name?.trim()) {
      return { success: false, error: 'سرپرست کا نام درج کرنا لازمی ہے۔ (Guardian name is required)' };
    }
    if (!guardianData.phone?.trim()) {
      return { success: false, error: 'موبائل نمبر لازمی ہے۔ (Phone number is required)' };
    }

    const store = loadLocalStore();
    const newGuardian: DbGuardian = {
      ...guardianData,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('guardians').insert(guardianData).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newGuardian.id = data.id;
      } catch (err) {
        console.warn('Supabase guardian insert error:', err);
      }
    }

    store.guardians.unshift(newGuardian);
    saveLocalStore(store);
    return { success: true, guardian: newGuardian };
  },

  async updateGuardian(
    id: string,
    guardianData: Partial<Omit<DbGuardian, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<{ success: boolean; guardian?: DbGuardian; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.guardians.findIndex((g) => g.id === id);
    if (index === -1) {
      return { success: false, error: 'سرپرست کا ریکارڈ نہیں ملا۔ (Guardian not found)' };
    }

    const updated: DbGuardian = {
      ...store.guardians[index],
      ...guardianData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('guardians').update(guardianData).eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (err) {
        console.warn('Supabase guardian update error:', err);
      }
    }

    store.guardians[index] = updated;
    saveLocalStore(store);
    return { success: true, guardian: updated };
  },

  async deleteGuardian(id: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('guardians').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase guardian delete error:', e);
      }
    }

    const store = loadLocalStore();
    store.guardians = store.guardians.filter((g) => g.id !== id);
    store.student_guardians = store.student_guardians.filter((sg) => sg.guardian_id !== id);
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // Link / Unlink Student & Guardian
  // --------------------------------------------------------------------------
  async linkStudentGuardian(payload: {
    student_id: string;
    guardian_id: string;
    relationship: string;
    is_primary: boolean;
    can_pickup: boolean;
    notes?: string;
  }): Promise<{ success: boolean; link?: DbStudentGuardian; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    // Prevent duplicate relationship
    const existing = store.student_guardians.find(
      (sg) => sg.student_id === payload.student_id && sg.guardian_id === payload.guardian_id
    );
    if (existing) {
      return {
        success: false,
        error: 'یہ سرپرست پہلے ہی اس طالب علم سے منسلک ہیں۔ (This guardian is already linked to this student)',
      };
    }

    // If is_primary, remove is_primary from other guardians of this student
    if (payload.is_primary) {
      store.student_guardians.forEach((sg) => {
        if (sg.student_id === payload.student_id) {
          sg.is_primary = false;
        }
      });
    }

    const newLink: DbStudentGuardian = {
      id: generateId(),
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('student_guardians').insert(payload).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newLink.id = data.id;
      } catch (e) {
        console.warn('Supabase link student guardian error:', e);
      }
    }

    store.student_guardians.push(newLink);
    saveLocalStore(store);
    return { success: true, link: newLink };
  },

  async unlinkStudentGuardian(linkId: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('student_guardians').delete().eq('id', linkId);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase unlink error:', e);
      }
    }

    const store = loadLocalStore();
    store.student_guardians = store.student_guardians.filter((sg) => sg.id !== linkId);
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // 4. Teachers Operations
  // --------------------------------------------------------------------------
  async getTeachers(
    filter?: string | { search?: string; status?: string }
  ): Promise<TeacherWithDetails[]> {
    const search = typeof filter === 'string' ? filter : filter?.search;
    const statusFilter = typeof filter === 'object' ? filter?.status : undefined;
    const store = loadLocalStore();
    let list = [...store.teachers];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('teachers').select('*').order('employee_number');
        if (!error && data && data.length > 0) {
          list = data as DbTeacher[];
        }
      } catch (err) {
        console.warn('Supabase teachers error:', err);
      }
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.full_name.toLowerCase().includes(q) ||
          t.employee_number.toLowerCase().includes(q) ||
          (t.specialization && t.specialization.toLowerCase().includes(q))
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      list = list.filter((t) => t.status === statusFilter);
    }

    return list.map((teacher) => {
      const assignedClasses = store.classes.filter((c) => c.teacher_id === teacher.id);
      const assignedSubjects = store.class_subjects
        .filter((cs) => cs.teacher_id === teacher.id)
        .map((cs) => {
          const cls = store.classes.find((c) => c.id === cs.class_id) || {
            id: cs.class_id,
            name: 'نامعلوم کلاس',
            code: '',
            academic_year: '',
            section: '',
            capacity: 0,
            status: 'active' as ClassStatus,
            created_at: '',
            updated_at: '',
          };
          const sub = store.subjects.find((s) => s.id === cs.subject_id) || {
            id: cs.subject_id,
            name: 'نامعلوم مضمون',
            code: '',
            category: 'general' as SubjectCategory,
            status: 'active' as SubjectStatus,
            created_at: '',
            updated_at: '',
          };
          return { ...cs, class: cls, subject: sub };
        });

      return {
        ...teacher,
        classes: assignedClasses,
        assignedSubjects,
      };
    });
  },

  async createTeacher(teacherData: Omit<DbTeacher, 'id' | 'created_at' | 'updated_at'>): Promise<{
    success: boolean;
    teacher?: DbTeacher;
    error?: string;
  }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (!teacherData.employee_number?.trim()) {
      return { success: false, error: 'استاذ کا ایمپلائی نمبر لازمی ہے۔ (Employee number is required)' };
    }
    if (!teacherData.full_name?.trim()) {
      return { success: false, error: 'استاذ کا نام درج کرنا لازمی ہے۔ (Teacher name is required)' };
    }

    const store = loadLocalStore();
    // Unique employee number check
    const existing = store.teachers.find(
      (t) => t.employee_number.trim().toLowerCase() === teacherData.employee_number.trim().toLowerCase()
    );
    if (existing) {
      return {
        success: false,
        error: `ایمپلائی نمبر "${teacherData.employee_number}" پہلے سے درج ہے۔ (Employee number must be unique)`,
      };
    }

    const newTeacher: DbTeacher = {
      ...teacherData,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('teachers').insert(teacherData).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newTeacher.id = data.id;
      } catch (e) {
        console.warn('Supabase teacher insert error:', e);
      }
    }

    store.teachers.unshift(newTeacher);
    saveLocalStore(store);
    return { success: true, teacher: newTeacher };
  },

  async updateTeacher(
    id: string,
    teacherData: Partial<Omit<DbTeacher, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<{ success: boolean; teacher?: DbTeacher; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.teachers.findIndex((t) => t.id === id);
    if (index === -1) {
      return { success: false, error: 'استاذ کا ریکارڈ نہیں ملا۔ (Teacher not found)' };
    }

    if (teacherData.employee_number) {
      const duplicate = store.teachers.find(
        (t) =>
          t.id !== id &&
          t.employee_number.trim().toLowerCase() === teacherData.employee_number?.trim().toLowerCase()
      );
      if (duplicate) {
        return {
          success: false,
          error: `ایمپلائی نمبر "${teacherData.employee_number}" کسی دوسرے استاذ کو تفویض شدہ ہے۔`,
        };
      }
    }

    const updated: DbTeacher = {
      ...store.teachers[index],
      ...teacherData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('teachers').update(teacherData).eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase teacher update error:', e);
      }
    }

    store.teachers[index] = updated;
    saveLocalStore(store);
    return { success: true, teacher: updated };
  },

  async deleteTeacher(id: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('teachers').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase teacher delete error:', e);
      }
    }

    const store = loadLocalStore();
    store.teachers = store.teachers.filter((t) => t.id !== id);
    // Unassign as class teacher
    store.classes.forEach((c) => {
      if (c.teacher_id === id) c.teacher_id = null;
    });
    // Unassign in class_subjects
    store.class_subjects.forEach((cs) => {
      if (cs.teacher_id === id) cs.teacher_id = null;
    });
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // 5. Classes Operations
  // --------------------------------------------------------------------------
  async getClasses(
    filter?: string | { search?: string; academic_year?: string; status?: string }
  ): Promise<ClassWithDetails[]> {
    const search = typeof filter === 'string' ? filter : filter?.search;
    const yearFilter = typeof filter === 'object' ? filter?.academic_year : undefined;
    const statusFilter = typeof filter === 'object' ? filter?.status : undefined;
    const store = loadLocalStore();
    let list = [...store.classes];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('classes').select('*').order('code');
        if (!error && data && data.length > 0) {
          list = data as DbClass[];
        }
      } catch (err) {
        console.warn('Supabase classes fetch error:', err);
      }
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.section.toLowerCase().includes(q)
      );
    }

    if (yearFilter && yearFilter !== 'all') {
      list = list.filter((c) => c.academic_year === yearFilter);
    }
    if (statusFilter && statusFilter !== 'all') {
      list = list.filter((c) => c.status === statusFilter);
    }

    return list.map((cls) => {
      const teacher = store.teachers.find((t) => t.id === cls.teacher_id) || null;
      const enrolled = store.enrollments
        .filter((e) => e.class_id === cls.id && e.status === 'enrolled')
        .map((e) => {
          const student = store.students.find((s) => s.id === e.student_id) || {
            id: e.student_id,
            admission_number: 'N/A',
            first_name: 'طالب علم',
            last_name: '',
            date_of_birth: '',
            gender: 'male' as StudentGender,
            admission_date: '',
            status: 'active' as StudentStatus,
            created_at: '',
            updated_at: '',
          };
          return { ...e, student };
        });

      const subjects = store.class_subjects
        .filter((cs) => cs.class_id === cls.id)
        .map((cs) => {
          const subject = store.subjects.find((s) => s.id === cs.subject_id) || {
            id: cs.subject_id,
            name: 'نامعلوم مضمون',
            code: '',
            category: 'general' as SubjectCategory,
            status: 'active' as SubjectStatus,
            created_at: '',
            updated_at: '',
          };
          const subTeacher = store.teachers.find((t) => t.id === cs.teacher_id) || null;
          return { ...cs, subject, teacher: subTeacher };
        });

      return {
        ...cls,
        teacher,
        enrolledStudents: enrolled,
        assignedSubjects: subjects,
      };
    });
  },

  async getClassById(id: string): Promise<ClassWithDetails | null> {
    const classes = await this.getClasses();
    return classes.find((c) => c.id === id) || null;
  },

  async createClass(classData: Omit<DbClass, 'id' | 'created_at' | 'updated_at'>): Promise<{
    success: boolean;
    classItem?: DbClass;
    error?: string;
  }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (!classData.name?.trim()) {
      return { success: false, error: 'کلاس کا نام لازمی ہے۔ (Class name is required)' };
    }
    if (!classData.code?.trim()) {
      return { success: false, error: 'کلاس کا کوڈ لازمی ہے۔ (Class code is required)' };
    }
    if (!classData.academic_year?.trim()) {
      return { success: false, error: 'تعلیمی سال لازمی ہے۔ (Academic year is required)' };
    }
    if (!classData.section?.trim()) {
      return { success: false, error: 'سیکشن درج کرنا لازمی ہے۔ (Section is required)' };
    }

    const store = loadLocalStore();
    // Unique check (code, academic_year, section)
    const existing = store.classes.find(
      (c) =>
        c.code.trim().toLowerCase() === classData.code.trim().toLowerCase() &&
        c.academic_year.trim().toLowerCase() === classData.academic_year.trim().toLowerCase() &&
        c.section.trim().toLowerCase() === classData.section.trim().toLowerCase()
    );
    if (existing) {
      return {
        success: false,
        error: `کلاس کوڈ "${classData.code}" سیکشن "${classData.section}" تعلیمی سال "${classData.academic_year}" میں پہلے سے موجود ہے۔`,
      };
    }

    const newClass: DbClass = {
      ...classData,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('classes').insert(classData).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newClass.id = data.id;
      } catch (e) {
        console.warn('Supabase class insert error:', e);
      }
    }

    store.classes.unshift(newClass);
    saveLocalStore(store);
    return { success: true, classItem: newClass };
  },

  async updateClass(
    id: string,
    classData: Partial<Omit<DbClass, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<{ success: boolean; classItem?: DbClass; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.classes.findIndex((c) => c.id === id);
    if (index === -1) {
      return { success: false, error: 'کلاس کا ریکارڈ نہیں ملا۔ (Class not found)' };
    }

    const current = store.classes[index];
    const code = classData.code || current.code;
    const year = classData.academic_year || current.academic_year;
    const sec = classData.section || current.section;

    const duplicate = store.classes.find(
      (c) =>
        c.id !== id &&
        c.code.trim().toLowerCase() === code.trim().toLowerCase() &&
        c.academic_year.trim().toLowerCase() === year.trim().toLowerCase() &&
        c.section.trim().toLowerCase() === sec.trim().toLowerCase()
    );
    if (duplicate) {
      return {
        success: false,
        error: `یہ کلاس (${code} - ${sec}) اسی تعلیمی سال میں پہلے سے موجود ہے۔`,
      };
    }

    const updated: DbClass = {
      ...current,
      ...classData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('classes').update(classData).eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase class update error:', e);
      }
    }

    store.classes[index] = updated;
    saveLocalStore(store);
    return { success: true, classItem: updated };
  },

  async deleteClass(id: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    // Check if enrolled students exist
    const activeStudents = store.enrollments.filter((e) => e.class_id === id && e.status === 'enrolled');
    if (activeStudents.length > 0) {
      return {
        success: false,
        error: `اس کلاس میں ${activeStudents.length} طلباء زیرِ تعلیم ہیں۔ براہ کرم حذف کرنے کی بجائے کلاس کو غیر فعال (Inactive/Archived) فرمائیں۔`,
      };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('classes').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase class delete error:', e);
      }
    }

    store.classes = store.classes.filter((c) => c.id !== id);
    store.class_subjects = store.class_subjects.filter((cs) => cs.class_id !== id);
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // 6. Subjects Operations
  // --------------------------------------------------------------------------
  async getSubjects(
    filter?: string | { search?: string; category?: string; status?: string }
  ): Promise<(DbSubject & { assignedClassesCount: number })[]> {
    const search = typeof filter === 'string' ? filter : filter?.search;
    const categoryFilter = typeof filter === 'object' ? filter?.category : undefined;
    const statusFilter = typeof filter === 'object' ? filter?.status : undefined;
    const store = loadLocalStore();
    let list = [...store.subjects];

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('subjects').select('*').order('code');
        if (!error && data && data.length > 0) {
          list = data as DbSubject[];
        }
      } catch (err) {
        console.warn('Supabase subjects error:', err);
      }
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
    }

    if (categoryFilter && categoryFilter !== 'all') {
      list = list.filter((s) => s.category === categoryFilter);
    }
    if (statusFilter && statusFilter !== 'all') {
      list = list.filter((s) => s.status === statusFilter);
    }

    return list.map((sub) => {
      const count = store.class_subjects.filter((cs) => cs.subject_id === sub.id).length;
      return { ...sub, assignedClassesCount: count };
    });
  },

  async createSubject(subjectData: Omit<DbSubject, 'id' | 'created_at' | 'updated_at'>): Promise<{
    success: boolean;
    subject?: DbSubject;
    error?: string;
  }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (!subjectData.name?.trim()) {
      return { success: false, error: 'مضمون کا نام لازمی ہے۔ (Subject name is required)' };
    }
    if (!subjectData.code?.trim()) {
      return { success: false, error: 'مضمون کا کوڈ لازمی ہے۔ (Subject code is required)' };
    }

    const store = loadLocalStore();
    const existing = store.subjects.find(
      (s) => s.code.trim().toLowerCase() === subjectData.code.trim().toLowerCase()
    );
    if (existing) {
      return {
        success: false,
        error: `مضمون کوڈ "${subjectData.code}" پہلے سے موجود ہے۔ (Subject code must be unique)`,
      };
    }

    const newSub: DbSubject = {
      ...subjectData,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('subjects').insert(subjectData).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newSub.id = data.id;
      } catch (e) {
        console.warn('Supabase subject insert error:', e);
      }
    }

    store.subjects.unshift(newSub);
    saveLocalStore(store);
    return { success: true, subject: newSub };
  },

  async updateSubject(
    id: string,
    subjectData: Partial<Omit<DbSubject, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<{ success: boolean; subject?: DbSubject; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.subjects.findIndex((s) => s.id === id);
    if (index === -1) {
      return { success: false, error: 'مضمون کا ریکارڈ نہیں ملا۔ (Subject not found)' };
    }

    if (subjectData.code) {
      const duplicate = store.subjects.find(
        (s) => s.id !== id && s.code.trim().toLowerCase() === subjectData.code?.trim().toLowerCase()
      );
      if (duplicate) {
        return { success: false, error: `مضمون کوڈ "${subjectData.code}" پہلے سے تفویض شدہ ہے۔` };
      }
    }

    const updated: DbSubject = {
      ...store.subjects[index],
      ...subjectData,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('subjects').update(subjectData).eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase subject update error:', e);
      }
    }

    store.subjects[index] = updated;
    saveLocalStore(store);
    return { success: true, subject: updated };
  },

  async deleteSubject(id: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('subjects').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase subject delete error:', e);
      }
    }

    const store = loadLocalStore();
    store.subjects = store.subjects.filter((s) => s.id !== id);
    store.class_subjects = store.class_subjects.filter((cs) => cs.subject_id !== id);
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // 7. Class Subjects Operations
  // --------------------------------------------------------------------------
  async getClassSubjects(classId: string): Promise<
    (DbClassSubject & { subject: DbSubject; teacher?: DbTeacher | null })[]
  > {
    const store = loadLocalStore();
    let list = store.class_subjects.filter((cs) => cs.class_id === classId);

    return list.map((cs) => {
      const subject = store.subjects.find((s) => s.id === cs.subject_id) || {
        id: cs.subject_id,
        name: 'نامعلوم مضمون',
        code: '',
        category: 'general' as SubjectCategory,
        status: 'active' as SubjectStatus,
        created_at: '',
        updated_at: '',
      };
      const teacher = store.teachers.find((t) => t.id === cs.teacher_id) || null;
      return { ...cs, subject, teacher };
    });
  },

  async assignSubjectToClass(payload: {
    class_id: string;
    subject_id: string;
    teacher_id?: string | null;
  }): Promise<{ success: boolean; classSubject?: DbClassSubject; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const existing = store.class_subjects.find(
      (cs) => cs.class_id === payload.class_id && cs.subject_id === payload.subject_id
    );
    if (existing) {
      return {
        success: false,
        error: 'یہ مضمون پہلے ہی اس کلاس کو تفویض کیا جا چکا ہے۔ (Subject already assigned to this class)',
      };
    }

    const newCs: DbClassSubject = {
      id: generateId(),
      class_id: payload.class_id,
      subject_id: payload.subject_id,
      teacher_id: payload.teacher_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('class_subjects').insert(payload).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newCs.id = data.id;
      } catch (e) {
        console.warn('Supabase class subject insert error:', e);
      }
    }

    store.class_subjects.push(newCs);
    saveLocalStore(store);
    return { success: true, classSubject: newCs };
  },

  async removeClassSubject(classSubjectId: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('class_subjects').delete().eq('id', classSubjectId);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase remove class subject error:', e);
      }
    }

    const store = loadLocalStore();
    store.class_subjects = store.class_subjects.filter((cs) => cs.id !== classSubjectId);
    saveLocalStore(store);
    return { success: true };
  },

  // --------------------------------------------------------------------------
  // 8. Enrollments Operations
  // --------------------------------------------------------------------------
  async getEnrollments(filters?: {
    studentId?: string;
    student_id?: string;
    classId?: string;
    class_id?: string;
    status?: string;
  }): Promise<EnrollmentWithDetails[]> {
    const sId = filters?.studentId || filters?.student_id;
    const cId = filters?.classId || filters?.class_id;
    const store = loadLocalStore();
    let list = [...store.enrollments];

    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('enrollments').select('*').order('enrollment_date', { ascending: false });
        if (sId) query = query.eq('student_id', sId);
        if (cId) query = query.eq('class_id', cId);
        if (filters?.status && filters.status !== 'all') query = query.eq('status', filters.status);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          list = data as DbEnrollment[];
        }
      } catch (err) {
        console.warn('Supabase enrollments error:', err);
      }
    }

    if (sId) {
      list = list.filter((e) => e.student_id === sId);
    }
    if (cId) {
      list = list.filter((e) => e.class_id === cId);
    }
    if (filters?.status && filters.status !== 'all') {
      list = list.filter((e) => e.status === filters.status);
    }

    return list.map((enr) => {
      const student = store.students.find((s) => s.id === enr.student_id);
      const cls = store.classes.find((c) => c.id === enr.class_id);
      return {
        ...enr,
        student,
        class: cls,
      };
    });
  },

  async createEnrollment(payload: {
    student_id: string;
    class_id: string;
    academic_year: string;
    enrollment_date: string;
    status?: EnrollmentStatus;
    notes?: string;
  }): Promise<{ success: boolean; enrollment?: DbEnrollment; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (!payload.student_id) return { success: false, error: 'طالب علم کا انتخاب لازمی ہے۔' };
    if (!payload.class_id) return { success: false, error: 'کلاس کا انتخاب لازمی ہے۔' };
    if (!payload.academic_year?.trim()) return { success: false, error: 'تعلیمی سال لازمی ہے۔' };
    if (!payload.enrollment_date) return { success: false, error: 'تاریخِ داخلہ لازمی ہے۔' };

    const status = payload.status || 'enrolled';
    const store = loadLocalStore();

    // Critical Validation Rule: Prevent inappropriate duplicate active enrollment
    // "Prevent invalid duplicate active enrollment"
    if (status === 'enrolled') {
      const duplicateActive = store.enrollments.find(
        (e) =>
          e.student_id === payload.student_id &&
          e.status === 'enrolled' &&
          e.academic_year.trim().toLowerCase() === payload.academic_year.trim().toLowerCase()
      );
      if (duplicateActive) {
        const cls = store.classes.find((c) => c.id === duplicateActive.class_id);
        return {
          success: false,
          error: `یہ طالب علم تعلیمی سال "${payload.academic_year}" میں پہلے ہی کلاس "${cls?.name || 'کلاس'}" میں فعال طور پر داخل (Enrolled) ہیں۔ پہلے سابقہ داخلہ کا اسٹیٹس تبدیل فرمائیں۔ (Duplicate active enrollment prevented)`,
        };
      }
    }

    const newEnr: DbEnrollment = {
      id: generateId(),
      student_id: payload.student_id,
      class_id: payload.class_id,
      academic_year: payload.academic_year,
      enrollment_date: payload.enrollment_date,
      status,
      notes: payload.notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('enrollments').insert(payload).select().single();
        if (error) return { success: false, error: error.message };
        if (data) newEnr.id = data.id;
      } catch (e) {
        console.warn('Supabase enrollment insert error:', e);
      }
    }

    store.enrollments.unshift(newEnr);
    saveLocalStore(store);
    return { success: true, enrollment: newEnr };
  },

  async updateEnrollmentStatus(
    id: string,
    status: EnrollmentStatus,
    notes?: string
  ): Promise<{ success: boolean; enrollment?: DbEnrollment; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.enrollments.findIndex((e) => e.id === id);
    if (index === -1) {
      return { success: false, error: 'اندراج کا ریکارڈ نہیں ملا۔ (Enrollment record not found)' };
    }

    const current = store.enrollments[index];

    // If changing to 'enrolled', enforce uniqueness of active enrollment
    if (status === 'enrolled' && current.status !== 'enrolled') {
      const duplicateActive = store.enrollments.find(
        (e) =>
          e.id !== id &&
          e.student_id === current.student_id &&
          e.status === 'enrolled' &&
          e.academic_year.trim().toLowerCase() === current.academic_year.trim().toLowerCase()
      );
      if (duplicateActive) {
        return {
          success: false,
          error: `طالب علم کا اسی تعلیمی سال میں ایک اور فعال داخلہ پہلے سے موجود ہے۔`,
        };
      }
    }

    const updated: DbEnrollment = {
      ...current,
      status,
      notes: notes !== undefined ? notes : current.notes,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('enrollments')
          .update({ status, notes: updated.notes })
          .eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase enrollment status update error:', e);
      }
    }

    store.enrollments[index] = updated;
    saveLocalStore(store);
    return { success: true, enrollment: updated };
  },

  async updateEnrollment(
    id: string,
    payload: Partial<DbEnrollment>
  ): Promise<{ success: boolean; enrollment?: DbEnrollment; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    const store = loadLocalStore();
    const index = store.enrollments.findIndex((e) => e.id === id);
    if (index === -1) {
      return { success: false, error: 'اندراج نہیں ملا۔' };
    }
    const updated = { ...store.enrollments[index], ...payload, updated_at: new Date().toISOString() };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('enrollments').update(payload).eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase updateEnrollment error:', e);
      }
    }

    store.enrollments[index] = updated;
    saveLocalStore(store);
    return { success: true, enrollment: updated };
  },

  async deleteEnrollment(id: string): Promise<{ success: boolean; error?: string }> {
    const authCheck = checkMudeerPermission();
    if (!authCheck.allowed) {
      return { success: false, error: authCheck.error };
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('enrollments').delete().eq('id', id);
        if (error) return { success: false, error: error.message };
      } catch (e) {
        console.warn('Supabase deleteEnrollment error:', e);
      }
    }

    const store = loadLocalStore();
    store.enrollments = store.enrollments.filter((e) => e.id !== id);
    saveLocalStore(store);
    return { success: true };
  },

  async getStudentGuardians(): Promise<DbStudentGuardian[]> {
    const store = loadLocalStore();
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('student_guardians').select('*');
        if (!error && data && data.length > 0) {
          return data as DbStudentGuardian[];
        }
      } catch (e) {
        console.warn('Supabase getStudentGuardians error:', e);
      }
    }
    return store.student_guardians;
  },

  // --------------------------------------------------------------------------
  // Role-Specific Scoped Queries
  // --------------------------------------------------------------------------

  // TEACHER: My Classes, students in my classes, relevant subjects
  async getTeacherScopedData(userEmail: string, userProfileId?: string): Promise<{
    teacher: DbTeacher | null;
    classes: ClassWithDetails[];
    totalStudents: number;
    subjects: { class: DbClass; subject: DbSubject }[];
  }> {
    const store = loadLocalStore();
    // Find teacher matching profile_id or email or name
    let teacher = store.teachers.find(
      (t) =>
        (userProfileId && t.profile_id === userProfileId) ||
        (t.email && t.email.toLowerCase() === userEmail.toLowerCase())
    );

    // Fallback: If demo teacher, match T-1001
    if (!teacher && (userEmail.includes('teacher') || userProfileId === '22222222-2222-2222-2222-222222222222')) {
      teacher = store.teachers[0]; // Maulana Mufti Shabbir Ahmad
    }

    if (!teacher) {
      return { teacher: null, classes: [], totalStudents: 0, subjects: [] };
    }

    // Classes where teacher is primary class teacher
    const directClassIds = store.classes.filter((c) => c.teacher_id === teacher?.id).map((c) => c.id);
    // Classes where teacher is subject teacher
    const subjectClassIds = store.class_subjects.filter((cs) => cs.teacher_id === teacher?.id).map((cs) => cs.class_id);
    const assignedClassIds = Array.from(new Set([...directClassIds, ...subjectClassIds]));

    const allClasses = await this.getClasses();
    const myClasses = allClasses.filter((c) => assignedClassIds.includes(c.id));

    // Unique students enrolled in these classes
    const studentIds = new Set<string>();
    myClasses.forEach((cls) => {
      cls.enrolledStudents?.forEach((enr) => studentIds.add(enr.student.id));
    });

    // Subjects taught by this teacher
    const teacherSubjects: { class: DbClass; subject: DbSubject }[] = [];
    store.class_subjects
      .filter((cs) => cs.teacher_id === teacher?.id)
      .forEach((cs) => {
        const cls = store.classes.find((c) => c.id === cs.class_id);
        const sub = store.subjects.find((s) => s.id === cs.subject_id);
        if (cls && sub) {
          teacherSubjects.push({ class: cls, subject: sub });
        }
      });

    return {
      teacher,
      classes: myClasses,
      totalStudents: studentIds.size,
      subjects: teacherSubjects,
    };
  },

  // PARENT: Only children connected through student_guardians
  async getParentScopedChildren(userEmail: string, userProfileId?: string): Promise<{
    guardian: DbGuardian | null;
    children: StudentWithDetails[];
  }> {
    const store = loadLocalStore();
    // Find guardian by profile_id or email
    let guardian = store.guardians.find(
      (g) =>
        (userProfileId && g.profile_id === userProfileId) ||
        (g.email && g.email.toLowerCase() === userEmail.toLowerCase())
    );

    // Fallback for demo parent: Chaudhry Tariq Aziz
    if (!guardian && (userEmail.includes('parent') || userProfileId === '44444444-4444-4444-4444-444444444444')) {
      guardian = store.guardians[0]; // Chaudhry Tariq Aziz
    }

    if (!guardian) {
      return { guardian: null, children: [] };
    }

    // Strictly find students connected via student_guardians
    const linkedStudentIds = store.student_guardians
      .filter((sg) => sg.guardian_id === guardian?.id)
      .map((sg) => sg.student_id);

    const allStudents = await this.getStudents();
    const myChildren = allStudents.filter((s) => linkedStudentIds.includes(s.id));

    return {
      guardian,
      children: myChildren,
    };
  },

  // COUNTER: Read-only student search & basic guardian contact & enrollment details
  async getCounterStudentSearch(query: string): Promise<StudentWithDetails[]> {
    return this.getStudents({ search: query });
  },
};
