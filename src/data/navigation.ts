export interface NavItem {
  id: string;
  labelUrdu: string;
  labelEnglish: string;
  href: string;
  isImportant?: boolean;
}

export const navigationItems: NavItem[] = [
  { id: 'home', labelUrdu: 'ہوم', labelEnglish: 'Home', href: '/' },
  { id: 'about', labelUrdu: 'تعارف', labelEnglish: 'About', href: '/about' },
  { id: 'departments', labelUrdu: 'شعبہ جات', labelEnglish: 'Departments', href: '/departments' },
  { id: 'dars_nizami', labelUrdu: 'درسِ نظامی', labelEnglish: 'Dars-e-Nizami', href: '/dars-e-nizami' },
  { id: 'quran', labelUrdu: 'حفظ و مکتب', labelEnglish: 'Hifz & Quran', href: '/quran-education' },
  { id: 'contemporary', labelUrdu: 'عصری تعلیم', labelEnglish: 'Contemporary', href: '/contemporary-education' },
  { id: 'admissions', labelUrdu: 'داخلہ جات', labelEnglish: 'Admissions', href: '/admissions', isImportant: true },
  { id: 'faculty', labelUrdu: 'اساتذہ و انتظامیہ', labelEnglish: 'Faculty', href: '/faculty' },
  { id: 'announcements', labelUrdu: 'اعلانات', labelEnglish: 'Announcements', href: '/announcements' },
  { id: 'events', labelUrdu: 'سرگرمیاں', labelEnglish: 'Activities', href: '/events' },
  { id: 'gallery', labelUrdu: 'گیلری', labelEnglish: 'Gallery', href: '/gallery' },
  { id: 'media', labelUrdu: 'میڈیا', labelEnglish: 'Media', href: '/media' },
  { id: 'documents', labelUrdu: 'دستاویزات', labelEnglish: 'Documents', href: '/documents' },
  { id: 'donations', labelUrdu: 'عطیات', labelEnglish: 'Donations', href: '/donations' },
  { id: 'contact', labelUrdu: 'رابطہ', labelEnglish: 'Contact', href: '/contact' },
];

export const topBarContent = {
  phone: '0306-5042031',
  phoneVerified: true,
  timingUrdu: 'اوقاتِ کار: صبح ۸:۰۰ تا شام ۵:۰۰',
  timingEnglish: 'Hours: 8:00 AM – 5:00 PM',
  admissionsNoticeUrdu: 'تعلیمی سال کے داخلہ جات سے متعلق معلومات کے لیے رابطہ فرمائیں',
  admissionsNoticeEnglish: 'Inquire today for academic session admissions',
};
