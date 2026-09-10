import { FacultyMember } from '../types';

export const facultyData: FacultyMember[] = [
  {
    id: 'lead_muhtamim',
    name: {
      ur: 'مولانا زید بوستان صاحب',
      en: 'Maulana Zaid Bostan',
    },
    designation: {
      ur: 'مہتمم (سرپرستِ اعلیٰ)',
      en: 'Muhtamim (Principal / Rector)',
    },
    role: 'leadership',
    department: {
      ur: 'مرکزی انتظامیہ',
      en: 'Central Administration',
    },
    biography: {
      ur: 'مولانا زید بوستان صاحب جامعۃ العلوم الاسلامیہ میرپور کے مہتمم کی حیثیت سے خدمات سرانجام دے رہے ہیں۔ (تفصیلی سوانح حیات اور تدریسی خدمات کا مصدقہ احوال جامعہ انتظامیہ کی توثیق کے بعد یہاں شامل کیا جائے گا)۔',
      en: 'Maulana Zaid Bostan serves as the Muhtamim (Rector) of Jamia Tul Uloom Al-Islamia, Mirpur. A comprehensive verified profile will be published following official administrative confirmation.',
    },
    qualifications: {
      ur: 'فاضل درسِ نظامی و اسلامی اسکالر (تفصیلات تصدیق طلب)',
      en: 'Traditional Alimiyyah Graduate & Islamic Scholar (Subject to official confirmation)',
    },
    verified: false,
    status: 'unverified',
    placeholderImage: {
      id: 'img_muhtamim',
      category: 'leadership',
      suggestedPath: 'public/images/leadership/muhtamim.jpg',
      title: { ur: 'تصویر مہتمم صاحب', en: 'Muhtamim Portrait' },
      recommendedResolution: '800x1000 px',
      aspectRatio: '4:5',
      isPlaceholder: true,
      status: 'placeholder',
    },
    sourceNote: 'PUBLICLY LISTED — VERIFY BEFORE OFFICIAL PUBLICATION',
  },
  {
    id: 'lead_nazim',
    name: {
      ur: 'مولانا قاری عابد حسین بٹ صاحب',
      en: 'Maulana Qari Abid Hussain Butt',
    },
    designation: {
      ur: 'ناظمِ اعلیٰ',
      en: 'Nazim-e-Aala (Director General / Administrator)',
    },
    role: 'leadership',
    department: {
      ur: 'شعبۂ نظامت و تعلیمات',
      en: 'Directorate of Academic & Administrative Affairs',
    },
    biography: {
      ur: 'مولانا قاری عابد حسین بٹ صاحب جامعہ کے ناظمِ اعلیٰ کے طور پر انتظامی، تعلیمی اور تنظیمی امور کی نگرانی فرماتے ہیں۔ (باضابطہ کوائف انتظامیہ سے تصدیق طلب ہیں)۔',
      en: 'Maulana Qari Abid Hussain Butt oversees operational, academic, and administrative functions as Nazim-e-Aala. Detailed verified credentials will be updated upon administrative clearance.',
    },
    qualifications: {
      ur: 'قاری و عالمِ دین (تفصیلات تصدیق طلب)',
      en: 'Qari & Islamic Scholar (Subject to official confirmation)',
    },
    verified: false,
    status: 'unverified',
    placeholderImage: {
      id: 'img_nazim',
      category: 'leadership',
      suggestedPath: 'public/images/leadership/nazim.jpg',
      title: { ur: 'تصویر ناظمِ اعلیٰ صاحب', en: 'Nazim-e-Aala Portrait' },
      recommendedResolution: '800x1000 px',
      aspectRatio: '4:5',
      isPlaceholder: true,
      status: 'placeholder',
    },
    sourceNote: 'PUBLICLY LISTED — VERIFY BEFORE OFFICIAL PUBLICATION',
  },
  {
    id: 'hod_hifz_placeholder',
    name: {
      ur: 'PLACEHOLDER_HOD_HIFZ',
      en: 'Head of Quran Tahfeez (To be confirmed)',
    },
    designation: {
      ur: 'نگران شعبہ تحفیظ القرآن',
      en: 'Head of Department (Tahfeez-ul-Quran)',
    },
    role: 'head_of_department',
    department: {
      ur: 'شعبہ تحفیظ القرآن الکریم',
      en: 'Tahfeez-ul-Quran Department',
    },
    biography: {
      ur: 'شعبہ حفظ کے سربراہ اور اساتذہ کے مستند نام جامعہ کے تعلیمی ریکارڈ کے مطابق جلد شامل کیے جائیں گے۔',
      en: 'The confirmed name, credentials, and bio of the Quran Memorization Department Head will be updated from institutional records.',
    },
    qualifications: {
      ur: 'PLACEHOLDER_QUALIFICATIONS',
      en: 'Pending official submission',
    },
    verified: false,
    status: 'placeholder',
    placeholderImage: {
      id: 'img_hod_hifz',
      category: 'faculty',
      suggestedPath: 'public/images/faculty/hod-hifz.jpg',
      title: { ur: 'نگران شعبہ حفظ', en: 'Head of Hifz Portrait' },
      recommendedResolution: '800x1000 px',
      aspectRatio: '4:5',
      isPlaceholder: true,
      status: 'placeholder',
    },
    sourceNote: 'PLACEHOLDER — TO BE PROVIDED BY JAMIA ADMINISTRATION',
  },
  {
    id: 'hod_dars_placeholder',
    name: {
      ur: 'PLACEHOLDER_SHAIKH_UL_HADITH',
      en: 'Shaikh-ul-Hadith / Head of Dars-e-Nizami',
    },
    designation: {
      ur: 'شیخ الحدیث / صدر مدرس',
      en: 'Shaikh-ul-Hadith / Senior Academic Dean',
    },
    role: 'head_of_department',
    department: {
      ur: 'شعبہ درسِ نظامی و دورۂ حدیث',
      en: 'Department of Dars-e-Nizami & Hadith Sciences',
    },
    biography: {
      ur: 'دورۂ حدیث شریف اور درسِ نظامی کے کبار اساتذہ کی فہرست جامعہ انتظامیہ کی منظوری کے بعد شائع کی جائے گی۔',
      en: 'Senior Hadith lecturers and Dars-e-Nizami faculty profiles will be populated following administrative verification.',
    },
    qualifications: {
      ur: 'PLACEHOLDER_QUALIFICATIONS',
      en: 'Pending official submission',
    },
    verified: false,
    status: 'placeholder',
    placeholderImage: {
      id: 'img_hod_dars',
      category: 'faculty',
      suggestedPath: 'public/images/faculty/hod-dars.jpg',
      title: { ur: 'صدر مدرس تصویر', en: 'Dean Portrait' },
      recommendedResolution: '800x1000 px',
      aspectRatio: '4:5',
      isPlaceholder: true,
      status: 'placeholder',
    },
    sourceNote: 'PLACEHOLDER — TO BE PROVIDED BY JAMIA ADMINISTRATION',
  },
  {
    id: 'hod_asri_placeholder',
    name: {
      ur: 'PLACEHOLDER_INCHARGE_ASRI',
      en: 'Incharge Contemporary Studies',
    },
    designation: {
      ur: 'انچارج شعبہ عصری و اسکول تعلیم',
      en: 'Incharge Formal School Education',
    },
    role: 'head_of_department',
    department: {
      ur: 'شعبہ عصری تعلیم و کمپیوٹر',
      en: 'Contemporary Education & IT Department',
    },
    biography: {
      ur: 'چھٹی تا ایف اے اور کمپیوٹر لیب کے انچارج اور اساتذہ کی تفصیلات باضابطہ تصدیق کے بعد فراہم کی جائیں گی۔',
      en: 'Incharge and teaching faculty details for formal schooling (Class 6 - FA) will be added upon administrative verification.',
    },
    qualifications: {
      ur: 'PLACEHOLDER_QUALIFICATIONS',
      en: 'Pending official submission',
    },
    verified: false,
    status: 'placeholder',
    placeholderImage: {
      id: 'img_incharge_asri',
      category: 'faculty',
      suggestedPath: 'public/images/faculty/incharge-asri.jpg',
      title: { ur: 'انچارج عصری تعلیم', en: 'Incharge Contemporary Studies' },
      recommendedResolution: '800x1000 px',
      aspectRatio: '4:5',
      isPlaceholder: true,
      status: 'placeholder',
    },
    sourceNote: 'PLACEHOLDER — TO BE PROVIDED BY JAMIA ADMINISTRATION',
  },
];
