import { DocumentItem } from '../types';

export const documentsData: DocumentItem[] = [
  {
    id: 'doc_admission_form',
    title: {
      ur: 'جامعۃ العلوم الاسلامیہ - باضابطہ داخلہ فارم (پی ڈی ایف)',
      en: 'Official Admission Application Form (PDF)',
    },
    category: 'admission',
    categoryLabel: { ur: 'داخلہ فارم', en: 'Admission Form' },
    fileFormat: 'PDF',
    fileSize: 'PLACEHOLDER_FILE_SIZE (مثلاً 500 KB)',
    filePath: 'public/documents/admission-form.pdf',
    status: 'placeholder',
    available: false,
  },
  {
    id: 'doc_prospectus',
    title: {
      ur: 'جامعہ کا تعارفی کتابچہ و پراسپیکٹس (زیرِ تیاری)',
      en: 'Institutional Prospectus & Information Brochure (In Preparation)',
    },
    category: 'prospectus',
    categoryLabel: { ur: 'پراسپیکٹس', en: 'Prospectus' },
    fileFormat: 'PDF',
    fileSize: 'PLACEHOLDER_FILE_SIZE (مثلاً 2.5 MB)',
    filePath: 'public/documents/prospectus.pdf',
    status: 'placeholder',
    available: false,
  },
  {
    id: 'doc_academic_calendar',
    title: {
      ur: 'سالانہ تعلیمی و امتحانی کیلنڈر (۱۴۴۶-۱۴۴۷ھ)',
      en: 'Annual Academic & Examination Calendar (1446-1447 AH)',
    },
    category: 'academic',
    categoryLabel: { ur: 'تعلیمی کیلنڈر', en: 'Calendar' },
    fileFormat: 'PDF',
    fileSize: 'PLACEHOLDER_FILE_SIZE',
    filePath: 'public/documents/academic-calendar.pdf',
    status: 'placeholder',
    available: false,
  },
  {
    id: 'doc_dars_curriculum',
    title: {
      ur: 'نصاب نامہ درسِ نظامی و نصابی فہرست (زیرِ توثیق)',
      en: 'Dars-e-Nizami Syllabi & Textbooks Guide (Pending Verification)',
    },
    category: 'academic',
    categoryLabel: { ur: 'نصاب نامہ', en: 'Curriculum' },
    fileFormat: 'PDF',
    fileSize: 'PLACEHOLDER_FILE_SIZE',
    filePath: 'public/documents/dars-nizami-curriculum.pdf',
    status: 'placeholder',
    available: false,
  },
  {
    id: 'doc_rules_handbook',
    title: {
      ur: 'ضوابطِ جامعہ و دار الاقامہ (ہاسٹل رولز کتابچہ)',
      en: 'Student Code of Conduct & Hostel Regulations Booklet',
    },
    category: 'notice',
    categoryLabel: { ur: 'قواعد و ضوابط', en: 'Rules' },
    fileFormat: 'PDF',
    fileSize: 'PLACEHOLDER_FILE_SIZE',
    filePath: 'public/documents/hostel-and-campus-rules.pdf',
    status: 'placeholder',
    available: false,
  },
];
