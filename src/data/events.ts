import { EventItem } from '../types';

export const eventsData: EventItem[] = [
  {
    id: 'evt_khatm_bukhari_demo',
    title: {
      ur: 'سالانہ تقریبِ ختمِ بخاری و دستارِ فضیلت (نمونہ تقریب)',
      en: 'Annual Khatm-e-Bukhari & Turban Conferral Convocation (Demo Event)',
    },
    date: '۱۴۴۶ھ / متوقع سالانہ تقریب',
    location: {
      ur: 'جامع مسجد و ہال، جامعۃ العلوم الاسلامیہ میرپور',
      en: 'Main Jamia Mosque Hall, Jamia Tul Uloom Al-Islamia, Mirpur',
    },
    description: {
      ur: 'دورۂ حدیث شریف کے طلبہ کے لیے صحیح بخاری کے آخری سبق کی تدریس اور فارغ التحصیل علماء کی دستار بندی کی مبارک تقریب۔ (نمونہ تقریب برائے ویب ڈیزائن)',
      en: 'Ceremonial completion of Sahih al-Bukhari for final year Alim graduates and traditional robe/turban investiture. (Demo event for web presentation)',
    },
    category: 'khatm_bukhari',
    categoryLabel: {
      ur: 'ختمِ بخاری',
      en: 'Khatm-e-Bukhari',
    },
    isVerifiedEvent: true,
    status: 'verified',
    placeholderImage: {
      id: 'img_event_bukhari',
      category: 'events',
      suggestedPath: 'public/events/bukhari-khatm.jpg',
      title: { ur: 'تقریب ختم بخاری', en: 'Khatm-e-Bukhari Assembly' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: false,
      hasRealImage: true,
      realImageUrl: '/events/bukhari-khatm.jpg',
      status: 'verified',
    },
  },
  {
    id: 'evt_quran_competition_demo',
    title: {
      ur: 'سالانہ مسابقۂ حسنِ قراءت و حفظِ قرآن (نمونہ تقریب)',
      en: 'Annual Quran Memorization & Tajweed Recitation Competition (Demo Event)',
    },
    date: '۱۴۴۶ھ / سیشن سرگرمی',
    location: {
      ur: 'شعبہ تحفیظ القرآن، جامعۃ العلوم الاسلامیہ',
      en: 'Tahfeez-ul-Quran Auditorium, Jamia Tul Uloom Al-Islamia',
    },
    description: {
      ur: 'طلبہ میں حسنِ قراءت اور مخارج کی درستی کے فروغ کے لیے جامعہ کی سطح پر منعقدہ سالانہ قرآنی مقابلہ۔',
      en: 'Institutional competition encouraging youth in phonetic Tajweed precision and expressive Quranic recitation.',
    },
    category: 'competition',
    categoryLabel: {
      ur: 'مسابقہ',
      en: 'Competition',
    },
    isVerifiedEvent: false,
    status: 'placeholder',
    placeholderImage: {
      id: 'img_event_quran',
      category: 'events',
      suggestedPath: 'public/images/gallery/events/quran-competition.jpg',
      title: { ur: 'مسابقہ حسنِ قراءت', en: 'Quran Competition' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
  },
  {
    id: 'evt_tarbiyati_seminar_demo',
    title: {
      ur: 'طلبہ کے لیے اخلاقی و تربیتی نشست (نمونہ پروگرام)',
      en: 'Student Ethics & Spiritual Guidance Seminar (Demo Program)',
    },
    date: '۱۴۴۶ھ / ماہانہ سلسلہ',
    location: {
      ur: 'مرکزی درسگاہ، جامعۃ العلوم الاسلامیہ میرپور',
      en: 'Central Lecture Hall, Jamia Tul Uloom Al-Islamia, Mirpur',
    },
    description: {
      ur: 'طلبہ کی فکری تربیت، آدابِ زندگی اور سنتِ نبوی کے عملی نفاذ کے حوالے سے اساتذہ کرام کے خصوصی نصائح۔',
      en: 'Spiritual enrichment and life ethics lecture fostering humility, community duty, and pious character.',
    },
    category: 'seminar',
    categoryLabel: {
      ur: 'تربیتی نشست',
      en: 'Seminar',
    },
    isVerifiedEvent: false,
    status: 'placeholder',
    placeholderImage: {
      id: 'img_event_seminar',
      category: 'events',
      suggestedPath: 'public/images/gallery/events/seminar.jpg',
      title: { ur: 'تربیتی نشست', en: 'Spiritual Seminar' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
  },
  {
    id: 'evt_student_speech_demo',
    title: {
      ur: 'ہفتہ وار بزمِ خطابت و تقاریرِ طلبہ (نمونہ سرگرمی)',
      en: 'Weekly Student Oratory & Debate Circle (Demo Activity)',
    },
    date: 'ہفتہ وار پروگرام',
    location: {
      ur: 'شعبۂ تقریر و خطابت ہال',
      en: 'Oratory Society Hall',
    },
    description: {
      ur: 'طلبہ میں دعوت و ابلاغ کی صلاحیتیں نکھارنے کے لیے اردو و عربی زبان میں ہفتہ وار تقریری مقابلہ۔',
      en: 'Extracurricular public speaking forum enabling students to hone discourse, rhetoric, and da\'wah presentations in Urdu and Arabic.',
    },
    category: 'student_activity',
    categoryLabel: {
      ur: 'طلبہ سرگرمی',
      en: 'Student Activity',
    },
    isVerifiedEvent: false,
    status: 'placeholder',
    placeholderImage: {
      id: 'img_event_speech',
      category: 'events',
      suggestedPath: 'public/images/gallery/events/oratory.jpg',
      title: { ur: 'بزمِ خطابت', en: 'Oratory Assembly' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
  },
];
