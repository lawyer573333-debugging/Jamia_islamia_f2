import { Announcement } from '../types';

export const announcementsData: Announcement[] = [
  {
    id: 'ann_admission_open_sample',
    title: {
      ur: 'نئے تعلیمی سال کے داخلہ جات کا باضابطہ آغاز (نمونہ اعلان)',
      en: 'Commencement of Admissions for the Upcoming Academic Year (Demo Announcement)',
    },
    date: '۲۰۲۵ / ۱۴۴۶ھ',
    category: 'admission',
    categoryLabel: {
      ur: 'داخلہ',
      en: 'Admission',
    },
    summary: {
      ur: 'حفظِ قرآن، مکتب، درسِ نظامی اور عصری تعلیم کے تمام درجات میں داخلے کا فارم جامعہ کے دفتر سے دستیاب ہے۔',
      en: 'Admission registration packages are now open for collection for Hifz, Maktab, Dars-e-Nizami, and formal schooling.',
    },
    fullText: {
      ur: 'جامعۃ العلوم الاسلامیہ میرپور میں تعلیمی سال کے لیے تمام درجات کے داخلہ فارم جمع کروانے کی تاریخوں کا اعلان کیا جا رہا ہے۔ خواہش مند سرپرست مقررہ ایام کے اندر دستاویزات کے ہمراہ دفتر تشریف لائیں۔ (یہ تعلیمی نمونہ اعلان ہے؛ اصل تاریخیں جامعہ انتظامیہ کے اعلامیے کے بعد اپڈیٹ ہوں گی)۔',
      en: 'Jamia Tul Uloom Al-Islamia announces the schedule for submission of admissions for all departments. Parents and prospective candidates are requested to visit the central office with required documentation. (Note: This is a sample demo announcement; authentic dates will follow administrative notice).',
    },
    isImportant: true,
    isDemo: true,
    status: 'placeholder',
    documentUrl: '#',
  },
  {
    id: 'ann_exam_schedule_sample',
    title: {
      ur: 'سالانہ امتحانات کا شیڈول اور ہدایات (نمونہ اعلان)',
      en: 'Annual Examination Schedule & Candidate Guidelines (Demo Announcement)',
    },
    date: '۲۰۲۵ / ۱۴۴۶ھ',
    category: 'exams',
    categoryLabel: {
      ur: 'امتحانات',
      en: 'Exams',
    },
    summary: {
      ur: 'تمام تعلیمی درجات کے سالانہ امتحانات کی تاریخیں اور رول نمبر سلپ جاری کرنے کی تفصیلات۔',
      en: 'Timetable details and roll number distribution protocols for upcoming annual examinations.',
    },
    fullText: {
      ur: 'طلبہ اور والدین کو مطلع کیا جاتا ہے کہ سالانہ امتحانات کے انعقاد کے سلسلے میں رول نمبر سلپس دفترِ تعلیمات سے جاری کی جا رہی ہیں۔ تمام طلبہ مقررہ تاریخوں پر حاضری کو یقینی بنائیں۔ (نمونہ اعلان برائے ویب سائٹ ڈیزائن)۔',
      en: 'Students are notified that examination passes are prepared for issuance by the Academic Department. Candidates must verify their seat allotments prior to commencement. (Demo announcement for frontend validation).',
    },
    isImportant: false,
    isDemo: true,
    status: 'placeholder',
    documentUrl: '#',
  },
  {
    id: 'ann_ramadan_break_sample',
    title: {
      ur: 'ماہِ مبارک رمضان اور عید الفطر کی تعطیلات کا شیڈول (نمونہ اعلان)',
      en: 'Ramadan and Eid-ul-Fitr Recess Schedule (Demo Announcement)',
    },
    date: '۲۰۲۵ / ۱۴۴۶ھ',
    category: 'holidays',
    categoryLabel: {
      ur: 'تعطیلات',
      en: 'Holidays',
    },
    summary: {
      ur: 'جامعہ کے تدریسی شعبہ جات میں ماہِ صیام اور عید کی تعطیلات سے متعلق باضابطہ سرکلر۔',
      en: 'Institutional circular detailing the academic recess during the blessed month of Ramadan and Eid festivities.',
    },
    fullText: {
      ur: 'رمضان المبارک اور عید الفطر کے موقع پر جامعہ کے تدریسی درجات کے لیے سالانہ تعطیلات کا نوٹیفکیشن۔ جامعہ کا دفتری عملہ مخصوص دفتری اوقات میں خدمات انجام دیتا رہے گا۔ (نمونہ نوٹس برائے ڈیمو)۔',
      en: 'Administrative notification regarding the holiday schedule observed across all student cohorts. Routine inquiries will be answered according to special office hours. (Demo notice).',
    },
    isImportant: false,
    isDemo: true,
    status: 'placeholder',
  },
  {
    id: 'ann_khatm_bukhari_sample',
    title: {
      ur: 'دورۂ حدیث شریف کی تقریبِ ختمِ بخاری (نمونہ اعلان)',
      en: 'Khatm-e-Bukhari Sharif Commemorative Gathering (Demo Announcement)',
    },
    date: '۲۰۲۵ / ۱۴۴۶ھ',
    category: 'events',
    categoryLabel: {
      ur: 'پروگرام',
      en: 'Program',
    },
    summary: {
      ur: 'سالانہ دورۂ حدیث کے فضلاء کے اعزاز میں تقریبِ تکمیلِ صحیح بخاری شریف اور تقسیمِ اسناد۔',
      en: 'Concluding ceremony of Sahih al-Bukhari celebrating Dawrah-e-Hadith graduates and credential conferral.',
    },
    fullText: {
      ur: 'جامعہ میں دورۂ حدیث شریف کے آخری سبق اور تکمیلِ صحیح بخاری شریف کی مبارک نشست کے انعقاد کا اعلان۔ اس بابرکت تقریب میں کبار علماء کرام کی شرکت متوقع ہے۔ (نمونہ نوٹس برائے ڈیمو)۔',
      en: 'Notification regarding the final lecture of Sahih al-Bukhari celebrating the completion of classical study. Prominent religious scholars will deliver closing admonitions. (Demo notice).',
    },
    isImportant: true,
    isDemo: true,
    status: 'placeholder',
  },
];
