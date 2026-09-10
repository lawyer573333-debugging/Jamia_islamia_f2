import { GalleryItem } from '../types';

export const galleryCategories = [
  { id: 'all', labelUrdu: 'تمام تصاویر', labelEnglish: 'All Photos' },
  { id: 'campus', labelUrdu: 'جامعہ کیمپس', labelEnglish: 'Campus & Mosque' },
  { id: 'students', labelUrdu: 'طلبہ کرام', labelEnglish: 'Students' },
  { id: 'classrooms', labelUrdu: 'کلاس رومز و درسگاہیں', labelEnglish: 'Classrooms' },
  { id: 'quran', labelUrdu: 'حفظِ قرآن حلقات', labelEnglish: 'Quran Study Circles' },
  { id: 'events', labelUrdu: 'تقریبات و اجتماعات', labelEnglish: 'Events & Programs' },
  { id: 'faculty', labelUrdu: 'اساتذہ و اکابرین', labelEnglish: 'Faculty & Scholars' },
];

export const galleryData: GalleryItem[] = [
  {
    id: 'gal_campus_ext',
    title: {
      ur: 'جامعہ کی بیرونی عمارت اور مین گیٹ (تصویر زیرِ انتظار)',
      en: 'Main Campus Façade & Entrance (Photo Pending)',
    },
    category: 'campus',
    categoryLabel: { ur: 'جامعہ کیمپس', en: 'Campus' },
    caption: {
      ur: 'سیکٹر ایف-2، میرپور آزاد کشمیر میں واقع جامعۃ العلوم الاسلامیہ کا بیرونی منظر۔',
      en: 'Exterior view of Jamia Tul Uloom Al-Islamia, Sector F-2, Mirpur AJK.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/campus/exterior.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_mosque_hall',
    title: {
      ur: 'مرکزی نماز گاہ و ہال (تصویر زیرِ انتظار)',
      en: 'Central Prayer Hall (Photo Pending)',
    },
    category: 'campus',
    categoryLabel: { ur: 'جامعہ کیمپس', en: 'Campus' },
    caption: {
      ur: 'باجماعت نماز اور دینی بیانات کا کشادہ اور پرسکون ہال۔',
      en: 'Spacious congregational prayer hall and lecture space.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/campus/prayer-hall.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_hifz_circle',
    title: {
      ur: 'شعبہ حفظ کے طلبہ کا حلقۂ تلاوت (تصویر زیرِ انتظار)',
      en: 'Tahfeez-ul-Quran Student Recitation Circle (Photo Pending)',
    },
    category: 'quran',
    categoryLabel: { ur: 'حفظِ قرآن', en: 'Quran' },
    caption: {
      ur: 'طلبہ قاری صاحب کے سامنے قرآن پاک یاد کر رہے ہیں۔',
      en: 'Students memorizing the Holy Quran in early morning review circles.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/students/hifz-circle.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_dars_class',
    title: {
      ur: 'درسِ نظامی کا سبق (تصویر زیرِ انتظار)',
      en: 'Dars-e-Nizami Classical Seminar (Photo Pending)',
    },
    category: 'classrooms',
    categoryLabel: { ur: 'کلاس رومز', en: 'Classrooms' },
    caption: {
      ur: 'فقہ اور اصولِ فقہ کی تدریس کے دوران اساتذہ و طلبہ کی فکری گفتگو۔',
      en: 'Interactive scholarly dialogue during traditional Fiqh lectures.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/classrooms/dars-class.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_asri_class',
    title: {
      ur: 'عصری تعلیم اسکول کلاس روم (تصویر زیرِ انتظار)',
      en: 'Contemporary Schooling Classroom (Photo Pending)',
    },
    category: 'classrooms',
    categoryLabel: { ur: 'کلاس رومز', en: 'Classrooms' },
    caption: {
      ur: 'ششم تا ایف اے کے طلبہ کے لیے عصری مضامین کی تدریس۔',
      en: 'Regular school curriculum instruction for middle through intermediate students.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/classrooms/asri-class.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_computer_lab',
    title: {
      ur: 'کمپیوٹر لیب میں پریکٹیکل سیشن (تصویر زیرِ انتظار)',
      en: 'Computer Lab Hands-on Session (Photo Pending)',
    },
    category: 'classrooms',
    categoryLabel: { ur: 'کلاس رومز', en: 'Classrooms' },
    caption: {
      ur: 'طلبہ کمپیوٹر کے بنیادی سافٹ ویئر اور ٹائپنگ کی مشق کرتے ہوئے۔',
      en: 'Students practicing typing and software productivity under instructor guidance.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/classrooms/computer-lab.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_khatm_event',
    title: {
      ur: 'سالانہ تقریبِ تکمیلِ بخاری شریف (تصویر زیرِ انتظار)',
      en: 'Bukhari Sharif Completion Gathering (Photo Pending)',
    },
    category: 'events',
    categoryLabel: { ur: 'تقریبات', en: 'Events' },
    caption: {
      ur: 'سالانہ دورۂ حدیث کے طلبہ اور علماء کرام کا اجتماع۔',
      en: 'Gathering of senior scholars and graduating scholars during Bukhari graduation.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/events/bukhari-gathering.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_student_assembly',
    title: {
      ur: 'طلبہ کی صبح کی دعا اور بزم (تصویر زیرِ انتظار)',
      en: 'Morning Assembly & Student Supplication (Photo Pending)',
    },
    category: 'students',
    categoryLabel: { ur: 'طلبہ کرام', en: 'Students' },
    caption: {
      ur: 'روزانہ صبح کی اسمبلی میں طلبہ تلاوت، نعت اور دعا میں شریک۔',
      en: 'Morning assembly recitation and collective student supplication.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/students/assembly.jpg',
    status: 'placeholder',
  },
  {
    id: 'gal_faculty_meeting',
    title: {
      ur: 'اساتذہ کرام کا مشاورتی اجلاس (تصویر زیرِ انتظار)',
      en: 'Academic Faculty Advisory Meeting (Photo Pending)',
    },
    category: 'faculty',
    categoryLabel: { ur: 'اساتذہ', en: 'Faculty' },
    caption: {
      ur: 'تعلیمی سال کے آغاز پر تدریسی امور اور امتحانات کا جائزہ اجلاس۔',
      en: 'Academic review council meeting discussing student progress and exam schedules.',
    },
    dateAdded: '۲۰۲۵',
    suggestedFilePath: 'public/images/gallery/faculty/academic-council.jpg',
    status: 'placeholder',
  },
];
