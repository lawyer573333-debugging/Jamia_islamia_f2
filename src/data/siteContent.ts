import { LocalizedString, ContentStatus } from '../types';

export const siteContent = {
  nameUrdu: 'جامعۃ العلوم الاسلامیہ',
  nameEnglish: 'Jamia Tul Uloom Al-Islamia',
  arabicTitle: 'جامعة العلوم الإسلامية ميربور آزاد كشمير',

  locationUrdu: 'سیکٹر ایف-2، میرپور، آزاد جموں و کشمیر، پاکستان',
  locationEnglish: 'Sector F-2, Mirpur, Azad Jammu & Kashmir, Pakistan',

  // VERIFY WITH JAMIA ADMINISTRATION BEFORE PUBLICATION
  taglineUrdu: 'دینی علوم کی ترویج اور عصری تعلیم کا باوقار سنگم',
  taglineEnglish: 'Promoting Sacred Islamic Knowledge Alongside Contemporary Academic Excellence',

  bismillahUrdu: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  bismillahEnglish: 'In the name of Allah, the Most Gracious, the Most Merciful',

  // Hero Section
  heroHeadingUrdu: 'جامعۃ العلوم الاسلامیہ میرپور میں خوش آمدید',
  heroHeadingEnglish: 'Welcome to Jamia Tul Uloom Al-Islamia, Mirpur AJK',

  heroSubheadingUrdu: 'قرآن و سنت کی روشنی میں اخلاقی، دینی اور فکری تربیت کا مرکز، جہاں درسِ نظامی اور حفظِ قرآن کے ساتھ ساتھ عصری و کمپیوٹر تعلیم کی سہولت میسر ہے۔',
  heroSubheadingEnglish: 'A dedicated center of Islamic scholarship and moral training rooted in the Quran and Sunnah, offering Dars-e-Nizami, Hifz-ul-Quran, and modern formal education.',

  heroPlaceholderNoticeUrdu: 'کیمپس کی باضابطہ اور مستند تصاویر جامعہ انتظامیہ سے موصول ہوتے ہی یہاں اپلوڈ کر دی جائیں گی۔',
  heroPlaceholderNoticeEnglish: 'Official campus photography will be uploaded here once supplied by the Jamia administration.',

  // About Section
  aboutUrdu: 'جامعۃ العلوم الاسلامیہ میرپور (آزاد کشمیر) کا ایک ممتاز دینی و تعلیمی ادارہ ہے جو نئی نسل کو اسلامی تعلیمات کے ساتھ ساتھ جدید دور کے تقاضوں سے ہم آہنگ بنانے کے لیے کوشاں ہے۔ جامعہ میں حفظِ قرآن کریم، مکتب، مکمل درسِ نظامی (دورۂ حدیث تک)، اعدادیہ، متوسطہ، اور چھٹی جماعت سے لے کر ایف اے تک عصری تعلیم کے علاوہ بنیادی کمپیوٹر تعلیم کا باقاعدہ اہتمام کیا جاتا ہے۔',
  aboutEnglish: 'Jamia Tul Uloom Al-Islamia is an esteemed Islamic educational institution located in Sector F-2, Mirpur, Azad Jammu & Kashmir. The Jamia is dedicated to nurturing future generations with authentic Islamic scholarship combined with contemporary learning. Its departments range from Quran memorization and Maktab to the full Dars-e-Nizami curriculum culminating in Dawrah-e-Hadith, alongside formal school education from Class 6 to FA and foundational computer training.',

  // History / Background Notice (Do not invent historical facts)
  historyNoticeUrdu: 'جامعہ کی باضابطہ تاریخ، قیام کا سال اور تفصیلی پس منظر جامعہ انتظامیہ کی باقاعدہ تصدیق کے بعد یہاں شامل کیا جائے گا۔ فی الوقت یہ سیکشن اشاعت کے لیے زیرِ تصدیق ہے۔',
  historyNoticeEnglish: 'The authentic founding history, establishment timeline, and detailed background of the Jamia will be published here following formal verification from the Jamia administration. This section is currently in development.',

  // Mission & Vision
  missionUrdu: 'قرآن و سنت کی مخلصانہ تعلیمات کو عام کرنا، باصلاحیت اور متقی علماء و حفاظ تیار کرنا جو امتِ مسلمہ کی دینی رہنمائی کے ساتھ ساتھ معاصر چیلنجز کا سامنا کرنے کی مکمل فکری و علمی صلاحیت رکھتے ہوں۔',
  missionEnglish: 'To disseminate authentic Islamic knowledge from the Quran and Sunnah, producing knowledgeable, righteous scholars and Huffaz who are equipped to guide the community and address contemporary intellectual demands.',

  visionUrdu: 'ایک ایسا باوقار تعلیمی ادارہ بننا جو اسلامی روایات کا امین ہو اور جدید عصری علوم سے لیس ہو کر سماجی و روحانی اصلاح میں کلیدی کردار ادا کرے۔',
  visionEnglish: 'To serve as a prestigious Islamic educational center safeguarding Islamic intellectual heritage while empowering students with formal modern education for societal and spiritual betterment.',

  // Core Educational Pillars
  pillars: [
    {
      id: 'quran',
      titleUrdu: 'قرآنی علوم و حفظ',
      titleEnglish: 'Quranic Sciences & Hifz',
      descUrdu: 'تجوید و قراءت کے ساتھ حفظِ قرآن اور ابتدائی مکتب کی معیاری تعلیم۔',
      descEnglish: 'Standardized Quran memorization with proper Tajweed and foundational Maktab education.',
    },
    {
      id: 'dars_nizami',
      titleUrdu: 'درسِ نظامی (عالم کورس)',
      titleEnglish: 'Traditional Dars-e-Nizami',
      descUrdu: 'اعدادیہ سے دورۂ حدیث شریف تک مستند نصاب اور جید اساتذہ کی زیرِ نگرانی تدریس۔',
      descEnglish: 'Comprehensive classical curriculum from preparatory stages through Dawrah-e-Hadith.',
    },
    {
      id: 'asri_taleem',
      titleUrdu: 'عصری و رسمی تعلیم',
      titleEnglish: 'Contemporary Schooling',
      descUrdu: 'ششم سے ایف اے تک جدید تعلیمی مضامین کی تدریس تاکہ طلبہ دونوں میدانوں میں سرخرو ہوں۔',
      descEnglish: 'Formal academic education from grade 6 through intermediate (FA) alongside religious studies.',
    },
    {
      id: 'computer_skills',
      titleUrdu: 'کمپیوٹر و فنی مہارت',
      titleEnglish: 'Computer Literacy',
      descUrdu: 'جدید دور کے تقاضوں کے مطابق بنیادی کمپیوٹر سائنس اور انفارمیشن ٹیکنالوجی کی تربیت۔',
      descEnglish: 'Essential computer literacy and information technology awareness adapted for students.',
    },
  ],

  // Leadership Message
  muhtamimMessageUrdu: {
    heading: 'پیغامِ مہتمم',
    speaker: 'مولانا زید بوستان صاحب (حفظہ اللہ)',
    role: 'مہتمم جامعۃ العلوم الاسلامیہ',
    status: 'unverified' as ContentStatus,
    verificationNote: 'PUBLICLY LISTED — VERIFY BEFORE OFFICIAL PUBLICATION',
    quoteUrdu: 'علم دین حاصل کرنا ہر مسلمان کے لیے سعادت کا باعث ہے، اور دینی علوم کے ساتھ عصری تقاضوں کا شعور نئی نسل کی فکری ضرورت ہے۔ جامعۃ العلوم الاسلامیہ میرپور میں طلبہ کی اخلاقی، روحانی اور علمی تربیت کو اولین ترجیح دی جاتی ہے۔',
    quoteEnglish: 'Seeking sacred Islamic knowledge is an honor for every believer, and pairing it with contemporary academic awareness meets the critical needs of our upcoming generation. At Jamia Tul Uloom Al-Islamia, student character building and academic rigour remain our utmost priority.',
    placeholderTextUrdu: 'مہتمم صاحب کا تفصیلی اور باضابطہ مکتوب انتظامیہ کی منظوری کے بعد یہاں درج کیا جائے گا۔',
    placeholderTextEnglish: 'The detailed official message from the Muhtamim will be published here upon administrative verification.',
  },

  // Donation Placeholder Notice
  donationStatementUrdu: 'جامعہ کے مستند عطیات، تعمیراتی فنڈ اور بینک اکاؤنٹ کی تفصیلات انتظامیہ کی باقاعدہ تصدیق کے بعد یہاں شامل کی جائیں گی۔ برائے مہربانی فی الوقت براہِ راست جامعہ کے دفتر سے رابطہ فرمائیں۔',
  donationStatementEnglish: 'Authentic donation channels, construction fund details, and verified bank account information will be updated here following administrative clearance. Please contact the Jamia administration office directly for legitimate inquiries.',

  // Status Meta
  dataStatus: 'preliminary_development_version',
  lastUpdated: '2026',
};
