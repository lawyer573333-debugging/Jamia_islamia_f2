import { AdmissionInformation, AdmissionProgram } from '../types';

export const admissionsData: AdmissionInformation = {
  // Set to true when an active admission cycle is officially ongoing
  isAdmissionsOpen: true,
  currentAcademicYear: '1446-1447ھ / 2025-2026ء',
  admissionCycleUrdu: 'سالانہ داخلہ جات برائے تعلیمی سال',
  admissionCycleEnglish: 'Annual Admissions Cycle',

  noticeUrdu: 'جامعۃ العلوم الاسلامیہ میرپور میں نئے تعلیمی سال کے لیے تحفیظ القرآن، مکتب، درسِ نظامی اور عصری تعلیم کے مختلف شعبہ جات میں داخلوں کا آغاز۔ خواہشمند سرپرست و طلبہ دفتری اوقات میں رابطہ فرما سکتے ہیں۔',
  noticeEnglish: 'Admissions open for the upcoming academic year across Tahfeez-ul-Quran, Maktab, Dars-e-Nizami, and formal schooling. Interested guardians and candidates are invited to visit or call during office hours.',

  requirementsUrdu: [
    'امیدوار کا بنیادی اخلاقی کردار اور تعلیم کا سچا ذوق',
    'متعلقہ درجے کے لیے مقررہ عمر اور پیشگی تعلیمی معیار (تصدیق طلب)',
    'تحریری ٹیسٹ / انٹرویو میں کامیابی (PLACEHOLDER_ADMISSION_REQUIREMENTS)',
    'والد یا سرپرست کی طرف سے جامعہ کے تمام قواعد و ضوابط کی تحریری پابندی',
  ],
  requirementsEnglish: [
    'Good moral standing and genuine dedication to religious/academic study',
    'Age and previous educational prerequisites appropriate to the applied level (Verify with Jamia)',
    'Qualifying in the standard diagnostic entry test / interview (PLACEHOLDER_ADMISSION_REQUIREMENTS)',
    'Written undertaking by parent/guardian to abide by institutional discipline',
  ],

  documentsUrdu: [
    'طالب علم کا قومی شناختی کارڈ یا ب فارم (B-Form) کی کاپی',
    'والد یا سرپرست کے شناختی کارڈ کی کاپی',
    'سابقہ تعلیمی ادارے کا رزلٹ کارڈ / کریکٹر سرٹیفکیٹ (جہاں لاگو ہو)',
    'حالیہ پاسپورٹ سائز تصاویر (تعداد تصدیق طلب: PLACEHOLDER_REQUIRED_DOCUMENTS)',
    'جامعہ کا مکمل پُر شدہ باضابطہ داخلہ فارم',
  ],
  documentsEnglish: [
    'Attested copy of Student NADRA B-Form or CNIC',
    'Attested copy of Father / Guardian CNIC',
    'Prior school/madrasa character certificate and clearance transcript (where applicable)',
    'Recent passport-sized photographs (Quantity pending confirmation: PLACEHOLDER_REQUIRED_DOCUMENTS)',
    'Duly filled official Jamia admission application form',
  ],

  stepsUrdu: [
    {
      step: 1,
      title: 'معلومات و داخلہ فارم کا حصول',
      description: 'جامعہ کے دفتر سے داخلہ فارم حاصل کریں یا ویب سائٹ سے ڈاؤن لوڈ کریں۔',
    },
    {
      step: 2,
      title: 'دستاویزات کی فراہمی اور فارم جمع کروانا',
      description: 'تمام مطلوبہ کاغذات اور تصاویر کے ہمراہ داخلہ فارم دفتری اوقات میں جمع کروائیں۔',
    },
    {
      step: 3,
      title: 'انٹرویو اور تحریری جائزہ',
      description: 'مقررہ تاریخ کو طالب علم اپنے سرپرست کے ہمراہ تشخیصی ٹیسٹ / انٹرویو کے لیے تشریف لائے۔',
    },
    {
      step: 4,
      title: 'حتمی منظوری اور تدریسی آغاز',
      description: 'کامیاب طلبہ کی فہرست کی منظوری کے بعد اسباق اور اقامت (جہاں لاگو ہو) کا آغاز۔',
    },
  ],
  stepsEnglish: [
    {
      step: 1,
      title: 'Obtain Prospectus & Application',
      description: 'Collect the official admission form directly from the admission office or download online.',
    },
    {
      step: 2,
      title: 'Submit Documentation',
      description: 'Deliver the completed application package with all required attestations during administrative hours.',
    },
    {
      step: 3,
      title: 'Evaluation & Interview',
      description: 'Candidate accompanies guardian on the designated assessment date for evaluation.',
    },
    {
      step: 4,
      title: 'Final Acceptance & Orientation',
      description: 'Issuance of roll number, departmental allotment, and commencement of regular academic classes.',
    },
  ],

  importantDates: [
    {
      eventTitle: {
        ur: 'داخلہ فارم کا اجراء',
        en: 'Application Forms Issuance',
      },
      date: {
        ur: 'PLACEHOLDER_ADMISSION_DATES (شوال المکرم / مارچ تا اپریل - تصدیق طلب)',
        en: 'PLACEHOLDER_ADMISSION_DATES (Shawwal / March-April - Verify with Jamia)',
      },
      status: 'placeholder',
    },
    {
      eventTitle: {
        ur: 'فارم جمع کروانے کی آخری تاریخ',
        en: 'Last Date for Submission',
      },
      date: {
        ur: 'PLACEHOLDER_ADMISSION_DATES (انتظامیہ کے اعلان کے مطابق)',
        en: 'PLACEHOLDER_ADMISSION_DATES (As designated by administration)',
      },
      status: 'placeholder',
    },
    {
      eventTitle: {
        ur: 'انٹرویو و داخلہ ٹیسٹ',
        en: 'Assessment & Interviews',
      },
      date: {
        ur: 'PLACEHOLDER_ADMISSION_DATES (تاریخ کا اعلان دفتر سے ہوگا)',
        en: 'PLACEHOLDER_ADMISSION_DATES (Scheduled by office)',
      },
      status: 'placeholder',
    },
    {
      eventTitle: {
        ur: 'باقاعدہ تدریس کا آغاز (افتتاحِ اسباق)',
        en: 'Commencement of Regular Classes',
      },
      date: {
        ur: 'PLACEHOLDER_ADMISSION_DATES (شوال المکرم کے اختتام پر)',
        en: 'PLACEHOLDER_ADMISSION_DATES (Post-Shawwal academic opening)',
      },
      status: 'placeholder',
    },
  ],

  contactForAdmission: {
    phone: '0306-5042031',
    incharge: {
      ur: 'دفترِ تعلیمات و داخلہ جات، جامعۃ العلوم الاسلامیہ میرپور',
      en: 'Admissions & Academic Directorate, Jamia Tul Uloom Al-Islamia, Mirpur',
    },
    timing: {
      ur: 'صبح ۸:۰۰ بجے تا دوپہر ۱:۰۰ بجے، اور بعد نمازِ عصر تا مغرب',
      en: '8:00 AM to 1:00 PM, and Asr to Maghrib',
    },
  },

  status: 'unverified',
};

export const admissionPrograms: AdmissionProgram[] = [
  {
    id: 'prog_hifz',
    departmentId: 'hifz_quran',
    programTitle: {
      ur: 'شعبہ حفظِ قرآن کریم مع تجوید',
      en: 'Tahfeez-ul-Quran with Tajweed',
    },
    ageLimit: {
      ur: 'عموماً ۸ تا ۱۳ سال (تصدیق طلب)',
      en: 'Approx. 8 to 13 years (Subject to confirmation)',
    },
    prerequisite: {
      ur: 'ناظرہ قرآن کریم کا مطالعہ مکمل ہونا',
      en: 'Fluent Nazira reading of the Quran',
    },
    sessionDuration: {
      ur: '۲ تا ۳ سال',
      en: '2 to 3 years',
    },
    seats: {
      ur: 'محدود نشستیں (PLACEHOLDER)',
      en: 'Limited capacity',
    },
    status: 'unverified',
  },
  {
    id: 'prog_maktab',
    departmentId: 'maktab',
    programTitle: {
      ur: 'مکتب بنیادی دینی تعلیم و ناظرہ',
      en: 'Foundational Maktab & Nazira Quran',
    },
    ageLimit: {
      ur: '۵ سال یا زائد',
      en: '5 years and above',
    },
    prerequisite: {
      ur: 'کوئی پیشگی شرط نہیں',
      en: 'No prior prerequisites',
    },
    sessionDuration: {
      ur: '۱ سے ۲ سال',
      en: '1 to 2 years',
    },
    seats: {
      ur: 'کھلی نشستیں',
      en: 'Open capacity',
    },
    status: 'unverified',
  },
  {
    id: 'prog_idadiya',
    departmentId: 'dars_e_nizami',
    programTitle: {
      ur: 'درسِ نظامی درجات (اعدادیہ تا دورۂ حدیث)',
      en: 'Dars-e-Nizami (Idadiya to Dawrah-e-Hadith)',
    },
    ageLimit: {
      ur: 'حفظ یا مڈل / میٹرک کے بعد',
      en: 'Post-Hifz or Middle / Matriculation',
    },
    prerequisite: {
      ur: 'سابقہ درجے کی کامیابی یا داخلہ ٹیسٹ',
      en: 'Prior stage transcript or assessment evaluation',
    },
    sessionDuration: {
      ur: 'سالانہ تعلیمی سیشن (۸ سالہ نصاب)',
      en: 'Annual academic progression (8-Year program)',
    },
    seats: {
      ur: 'میرٹ پر داخلہ',
      en: 'Merit-based admission',
    },
    status: 'unverified',
  },
  {
    id: 'prog_asri',
    departmentId: 'asri_education',
    programTitle: {
      ur: 'عصری تعلیم (ششم تا ایف اے)',
      en: 'Contemporary Schooling (Class 6 - FA)',
    },
    ageLimit: {
      ur: 'متعلقہ کلاس کی مقررہ عمر کے مطابق',
      en: 'Standard age matrix per school class',
    },
    prerequisite: {
      ur: 'پچھلی کلاس کا اسکول رزلٹ کارڈ',
      en: 'Official transcript of preceding grade',
    },
    sessionDuration: {
      ur: 'سالانہ تعلیمی نظام',
      en: 'Standard school calendar year',
    },
    seats: {
      ur: 'محدود نشستیں',
      en: 'Limited intake',
    },
    status: 'unverified',
  },
];
