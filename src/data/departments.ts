import { Department } from '../types';

export const departmentsData: Department[] = [
  {
    id: 'hifz_quran',
    slug: 'hifz-quran',
    title: {
      ur: 'شعبہ تحفیظ القرآن الکریم',
      en: 'Department of Tahfeez-ul-Quran',
    },
    category: 'quran',
    shortDescription: {
      ur: 'تجوید و ترتیل کے بنیادی قواعد کے ساتھ قرآن کریم کو حفظ کرنے کا باقاعدہ اور منظم شعبہ۔',
      en: 'Structured Quran memorization with proper Tajweed articulation and daily revision modules.',
    },
    fullDescription: {
      ur: 'شعبہ تحفیظ القرآن جامعۃ العلوم الاسلامیہ میرپور کا ایک بنیادی شعبہ ہے جہاں نو عمر طلبہ کو حسنِ قراءت، مخارج کی درستی اور حفظِ قرآن کی شب و روز تربیت دی جاتی ہے۔ اس شعبے میں طلبہ کی حفظ کے ساتھ اخلاقی نشوونما پر بھی خصوصی توجہ دی جاتی ہے۔',
      en: 'The Department of Tahfeez-ul-Quran is a foundational wing of Jamia Tul Uloom Al-Islamia, Mirpur. Young learners are guided step-by-step through accurate Tajweed phonetics, daily memorization quotas, and rigorous revision protocols under qualified Huffaz.',
    },
    objectives: {
      ur: [
        'قرآن مجید کو مکمل صحتِ الفاظ اور تجوید کے ساتھ حفظ کروانا',
        'طلبہ میں اخلاقِ فاضلہ اور سنتِ نبوی کے مطابق زندگی گزارنے کا شوق پیدا کرنا',
        'یاد کیے گئے اسباق کے مستقل دہرائی (دور) کا پختہ نظام قائم رکھنا',
      ],
      en: [
        'Facilitate complete memorization of the Holy Quran with phonetically precise Tajweed rules',
        'Instill Islamic character, discipline, and daily Sunnah adherence',
        'Maintain a rigorous revision framework to ensure lifelong retention',
      ],
    },
    duration: {
      ur: 'طلبہ کی استعداد کے مطابق عموماً ۲ تا ۳ سال (تصدیق طلب)',
      en: 'Typically 2 to 3 years depending on student aptitude (Subject to official confirmation)',
    },
    eligibility: {
      ur: 'ناظرہ قرآن مکمل ہونا اور بنیادی انٹرویو (تفصیلات انتظامیہ سے تصدیق طلب ہیں)',
      en: 'Proficiency in reading Nazira Quran and preliminary assessment (Verify with administration)',
    },
    curriculumStatus: 'placeholder',
    curriculumNotes: {
      ur: 'نصاب اور یومیہ اسباق کی مصدقہ ترتیب جامعہ انتظامیہ کی توثیق کے بعد اپلوڈ کی جائے گی۔',
      en: 'Official syllabus and daily memorization schedules will be uploaded following administrative verification.',
    },
    placeholderImage: {
      id: 'img_hifz',
      category: 'departments',
      suggestedPath: 'public/images/departments/hifz.jpg',
      title: { ur: 'شعبہ تحفیظ القرآن کی تصویری جھلک', en: 'Tahfeez-ul-Quran Department Preview' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
    status: 'verified',
  },
  {
    id: 'maktab',
    slug: 'maktab',
    title: {
      ur: 'شعبہ مکتب (ابتدائی دینی تعلیم)',
      en: 'Maktab Department (Foundational Studies)',
    },
    category: 'quran',
    shortDescription: {
      ur: 'ابتدائی طلبہ کے لیے ناظرہ قرآن، بنیادی عقائد، مسنون دعائیں اور دینی آداب سکھانے کا شعبہ۔',
      en: 'Early-stage education covering Nazira Quran reading, basic Islamic beliefs, daily supplications, and manners.',
    },
    fullDescription: {
      ur: 'شعبہ مکتب میں ابتدائی درجات کے بچوں کو قاعدہ یسرنا القرآن، ناظرہ قرآن پاک، نماز، طہارت کے بنیادی مسائل، کلمے، اور مسنون دعائیں سکھائی جاتی ہیں تاکہ بچے کم عمری ہی سے دینی بنیادوں پر استوار ہوں۔',
      en: 'The Maktab Department provides young children with essential primers in Arabic phonetics, fluent Nazira Quran reading, fundamental jurisprudence regarding prayer and ablution, and daily Islamic ethics.',
    },
    objectives: {
      ur: [
        'قرآن مجید کو روانی اور درستی کے ساتھ پڑھنے کی صلاحیت پیدا کرنا',
        'بنیادی ایمانیات، نماز اور ضروری دعاؤں کی مشق کروانا',
        'بچوں کو اسلامی ماحول اور پاکیزہ طرزِ زندگی سے مانوس کرنا',
      ],
      en: [
        'Develop fluent and accurate recitation of the Quran',
        'Teach essential creed, practical performance of Salah, and daily Duas',
        'Familiarize young minds with positive Islamic manners and hygiene',
      ],
    },
    duration: {
      ur: '۱ سے ۲ سال (تصدیق طلب)',
      en: '1 to 2 years (Subject to verification)',
    },
    eligibility: {
      ur: 'ابتدائی عمر کے تمام بچے (تفصیلات انتظامیہ سے تصدیق طلب ہیں)',
      en: 'Primary age applicants (Verify exact age brackets with administration)',
    },
    curriculumStatus: 'placeholder',
    curriculumNotes: {
      ur: 'مستند نصابی کتب کی فہرست انتظامیہ سے موصول ہوتے ہی فراہم کی جائے گی۔',
      en: 'Official textbook list and grade divisions will be updated upon receipt from administration.',
    },
    placeholderImage: {
      id: 'img_maktab',
      category: 'departments',
      suggestedPath: 'public/images/departments/maktab.jpg',
      title: { ur: 'شعبہ مکتب کی کلاس', en: 'Maktab Department Classroom' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
    status: 'verified',
  },
  {
    id: 'dars_e_nizami',
    slug: 'dars-e-nizami',
    title: {
      ur: 'شعبہ درسِ نظامی (عالم و فاضل کورس)',
      en: 'Department of Dars-e-Nizami (Alimiyyah)',
    },
    category: 'deeni',
    shortDescription: {
      ur: 'اعدادیہ تا دورۂ حدیث شریف، قرآن، حدیث، فقہ، اصولِ فقہ، عربی ادب اور منطق پر مشتمل جامع نصاب۔',
      en: 'Comprehensive classical Islamic scholarship traversing Quranic exegesis, Hadith sciences, Fiqh, Arabic literature, and logic.',
    },
    fullDescription: {
      ur: 'درسِ نظامی برصغیر کا تاریخی اور مستند اسلامی تعلیمی نصاب ہے۔ جامعۃ العلوم الاسلامیہ میرپور میں یہ نصاب مکمل تسلسل کے ساتھ اعدادیہ سے شروع ہو کر آخری سال دورۂ حدیث شریف تک محیط ہے۔ اس نصاب کا مقصد طلبہ میں اسلامی علوم کی گہری فہم اور اجتہادی و تحقیقی صلاحیت پیدا کرنا ہے۔',
      en: 'Dars-e-Nizami is the premier traditional curriculum of Islamic scholarship in South Asia. At Jamia Tul Uloom Al-Islamia, Mirpur, this progression spans from introductory preparatory classes (Idadiya) up to the ultimate Master-level year of Dawrah-e-Hadith, building grounded Islamic jurisprudence and contextual insight.',
    },
    objectives: {
      ur: [
        'قرآن، حدیث، فقہ اور عربی زبان و ادب میں گہری مہارت پیدا کرنا',
        'جدید دور میں اسلامی تعلیمات کی صحیح ترجمانی کرنے والے متقی علماء تیار کرنا',
        'دینی و فقہی مسائل کے حل کے لیے فکری اور تحقیقی صلاحیتیں پروان چڑھانا',
      ],
      en: [
        'Cultivate advanced proficiency in Quranic Tafseer, Hadith methodology, Fiqh, and Classical Arabic',
        'Graduate conscientious scholars equipped to guide society with wisdom',
        'Nurture balanced critical thinking and research methodologies grounded in orthodoxy',
      ],
    },
    duration: {
      ur: 'مکمل نصاب تقریباً ۸ سال (اعدادیہ تا دورۂ حدیث)',
      en: 'Approx. 8 years (From Idadiya through Dawrah-e-Hadith)',
    },
    eligibility: {
      ur: 'حفظِ قرآن یا مڈل/میٹرک کے بعد داخلہ امتحانی معیار کے مطابق (تفصیلات انتظامیہ سے تصدیق طلب ہیں)',
      en: 'Completion of Quran memorization or middle/matric education, subject to entrance test (Verify with administration)',
    },
    curriculumStatus: 'placeholder',
    curriculumNotes: {
      ur: 'کتب اور سالانہ مضامین کی تفصیلی فہرست وفاق / جامعہ کی تصدیق کے بعد شامل کی جائے گی۔',
      en: 'Detailed textbooks and subject outlines will be incorporated upon formal verification.',
    },
    levels: [
      {
        levelNumber: 0,
        nameUrdu: 'اعدادیہ / متوسطہ',
        nameEnglish: 'Idadiya / Mutawassita (Preparatory)',
        descriptionUrdu: 'ابتدائی عربی گرامر، صرف، نحو اور بنیادی اسلامی تعلیمات کا سال۔',
        descriptionEnglish: 'Introductory Arabic syntax, morphology, and foundational religious primers.',
      },
      {
        levelNumber: 1,
        nameUrdu: 'سالِ اول (اولیٰ)',
        nameEnglish: 'Year 1 (Oola)',
        descriptionUrdu: 'عربی گرائمر کی پختگی، ابتدائی فقہ اور آسان عربی ادب۔',
        descriptionEnglish: 'Foundations of Arabic grammar, introductory Hanafi jurisprudence, and elementary literature.',
      },
      {
        levelNumber: 2,
        nameUrdu: 'سالِ دوم (ثانیہ)',
        nameEnglish: 'Year 2 (Saniya)',
        descriptionUrdu: 'فقہ، نحو اور عربی زبان میں مہارت کی ثانوی سطح۔',
        descriptionEnglish: 'Intermediate jurisprudence, advanced syntax, and introductory logic.',
      },
      {
        levelNumber: 3,
        nameUrdu: 'سالِ سوم (ثالثہ)',
        nameEnglish: 'Year 3 (Salisa)',
        descriptionUrdu: 'اصولِ فقہ، منطق اور تفصیلی فقہی مسائل کا مطالعہ۔',
        descriptionEnglish: 'Principles of jurisprudence (Usul-ul-Fiqh), classical logic, and intermediate Arabic rhetoric.',
      },
      {
        levelNumber: 4,
        nameUrdu: 'سالِ چہارم (رابعہ)',
        nameEnglish: 'Year 4 (Rabia)',
        descriptionUrdu: 'بلاغت، تفسیر کے ابتدائی اصول اور فقہ کی اہم متون۔',
        descriptionEnglish: 'Arabic rhetoric (Balaghah), introductory Quranic exegesis, and major Fiqh treaties.',
      },
      {
        levelNumber: 5,
        nameUrdu: 'سالِ پنجم (خامسہ)',
        nameEnglish: 'Year 5 (Khamisa)',
        descriptionUrdu: 'اصولِ تفسیر، عقائد اور اعلیٰ سطحی عربی کتب۔',
        descriptionEnglish: 'Theology (Aqaid), principles of Tafseer, and higher philosophical discourse.',
      },
      {
        levelNumber: 6,
        nameUrdu: 'سالِ ششم (سادسہ)',
        nameEnglish: 'Year 6 (Sadisa)',
        descriptionUrdu: 'حدیثِ نبوی کی ابتدائی کتب (مشکوٰۃ المصابیح) اور اصولِ حدیث۔',
        descriptionEnglish: 'Hadith collections such as Mishkat-ul-Masabih and Hadith sciences (Usul-ul-Hadith).',
      },
      {
        levelNumber: 7,
        nameUrdu: 'سالِ ہفتم (سابعہ / موقوف علیہ)',
        nameEnglish: 'Year 7 (Sabia / Mauquf Alayh)',
        descriptionUrdu: 'دورۂ حدیث شریف کی تیاری اور تفصیلی تفسیری و فقہی مباحث۔',
        descriptionEnglish: 'Advanced exegesis and jurisprudential preparation immediately preceding the final Hadith year.',
      },
      {
        levelNumber: 8,
        nameUrdu: 'دورۂ حدیث شریف (العالمیہ)',
        nameEnglish: 'Dawrah-e-Hadith (Final Alimiyyah Year)',
        descriptionUrdu: 'صحاحِ ستہ (صحیح بخاری، صحیح مسلم، سنن ابی داؤد، سنن ترمذی، سنن نسائی، سنن ابن ماجہ، طحاوی و مؤطا) کی مکمل تدریس۔',
        descriptionEnglish: 'Intensive line-by-line study of the primary Sihah Sitta Hadith compendiums culminating in scholarly Sanad.',
      },
    ],
    placeholderImage: {
      id: 'img_dars',
      category: 'departments',
      suggestedPath: 'public/images/departments/dars-e-nizami.jpg',
      title: { ur: 'شعبہ درسِ نظامی کا منظر', en: 'Dars-e-Nizami Lecture Hall' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
    status: 'verified',
  },
  {
    id: 'dawrah_hadith',
    slug: 'dawrah-hadith',
    title: {
      ur: 'دورۂ حدیث شریف (تکمیلِ فضیلت)',
      en: 'Dawrah-e-Hadith (Culminating Year)',
    },
    category: 'deeni',
    shortDescription: {
      ur: 'درسِ نظامی کا حتمی اور معزز سال جس میں کتبِ احادیث (صحیح بخاری و دیگر کتبِ صحاح) کی تدریس کی جاتی ہے۔',
      en: 'The crowning final year dedicated exclusively to the study of the prophetic Hadith collections and sanad conferral.',
    },
    fullDescription: {
      ur: 'دورۂ حدیث شریف اسلامی تعلیمات کے درسِ نظامی نصاب کا سب سے اہم اور باوقار ترین مرحلہ ہے۔ اس سال میں طلبہ کو کبار اساتذہ کرام کے زیرِ سایہ احادیثِ مبارکہ کے متون، اسانید، تراجم الابواب اور فقہی استنباطات کا باریک بینی سے مطالعہ کرایا جاتا ہے، جس کی تکمیل پر سندِ فراغت (شہادۃ العالمیہ) عطا کی جاتی ہے۔',
      en: 'Dawrah-e-Hadith is the crowning academic milestone of traditional Islamic schooling. Students engage in rigorous, exhaustive examination of the prophetic traditions under seasoned Hadith scholars, analyzing transmission chains, narrators, and juristic deductions leading to the Alimiyyah degree.',
    },
    objectives: {
      ur: [
        'احادیثِ رسول ﷺ کے متون اور اسانید کی مستند تفہیم حاصل کرنا',
        'محدثین کرام کے منہج اور فقہی تطبیق کی باریکیاں سمجھنا',
        'امت کے علمی تسلسل کو برقرار رکھنے کے لیے مسند اسناد حاصل کرنا',
      ],
      en: [
        'Master the prophetic texts and narrator authentication methods',
        'Comprehend the methodologies of premier Hadith masters and jurists',
        'Attain classical chain of transmission (Isnad) for educational stewardship',
      ],
    },
    duration: {
      ur: '۱ تعلیمی سال (مستقل مطالعہ و دورہ)',
      en: '1 intensive academic year',
    },
    eligibility: {
      ur: 'سالِ سابعہ (موقوف علیہ) کی کامیابی (تفصیلات انتظامیہ سے تصدیق طلب ہیں)',
      en: 'Successful clearance of Year 7 / Sabia exams (Verify with administration)',
    },
    curriculumStatus: 'placeholder',
    curriculumNotes: {
      ur: 'کتبِ ستہ کے اسباق اور اساتذہ کی باضابطہ تقسیم انتظامیہ کی تصدیق کے بعد فراہم کی جائے گی۔',
      en: 'Lecture allocations and Hadith professor details will be published upon administrative verification.',
    },
    placeholderImage: {
      id: 'img_dawrah',
      category: 'departments',
      suggestedPath: 'public/images/departments/dawrah-hadith.jpg',
      title: { ur: 'دورۂ حدیث شریف کی تدریس', en: 'Dawrah-e-Hadith Assembly' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: true,
      status: 'placeholder',
    },
    status: 'verified',
  },
  {
    id: 'asri_education',
    slug: 'contemporary-education',
    title: {
      ur: 'شعبہ عصری تعلیم (چھٹی تا ایف اے)',
      en: 'Department of Contemporary Education (Class 6 - FA)',
    },
    category: 'asri',
    shortDescription: {
      ur: 'دینی علوم کے ساتھ اسکول و کالج کی باقاعدہ تعلیم تاکہ طلبہ عصری مضامین میں بھی مسابقت کے قابل ہوں۔',
      en: 'Regular school and intermediate level formal education enabling students to excel in standard academic curricula.',
    },
    fullDescription: {
      ur: 'جامعۃ العلوم الاسلامیہ میرپور کا ایک منفرد امتیاز یہ ہے کہ یہاں دینی تعلیم کے ساتھ ساتھ چھٹی جماعت سے لے کر انٹرمیڈیٹ (ایف اے) تک جدید عصری نصاب کا بھی اہتمام کیا جاتا ہے۔ طلبہ کو انگریزی، ریاضی، سائنس، مطالعہ پاکستان اور جنرل مضامین پڑھائے جاتے ہیں تاکہ وہ معاشرے کے کارآمد شہری بن سکیں۔',
      en: 'A defining hallmark of Jamia Tul Uloom Al-Islamia, Mirpur, is its integrated model combining religious scholarship with standard schooling from Grade 6 up to the Intermediate (FA) level. Students study English, Mathematics, General Sciences, and humanities to prepare for wider civic engagement.',
    },
    objectives: {
      ur: [
        'طلبہ کو دینی علوم کے ساتھ ساتھ عصری تعلیمی اسناد کے حصول کے قابل بنانا',
        'انگریزی زبان اور سائنسی شعور کو فروغ دینا',
        'دینی و دنیوی تعلیم کا متوازن امتزاج پیش کرنا',
      ],
      en: [
        'Enable students to acquire recognized formal academic credentials alongside Islamic studies',
        'Foster English proficiency and modern scientific literacy',
        'Provide an intellectually balanced integration of sacred and secular learning',
      ],
    },
    duration: {
      ur: 'درجاتِ اسکول و کالج کے مطابق سالانہ بنیاد پر (تفصیلات تصدیق طلب)',
      en: 'Standard annual schooling schedule from Middle to Intermediate (Verify details)',
    },
    eligibility: {
      ur: 'متعلقہ کلاس کے تعلیمی ریکارڈ کے مطابق (انتظامیہ سے تصدیق طلب ہے)',
      en: 'Prior grade completion records (Subject to Jamia administrative criteria)',
    },
    curriculumStatus: 'placeholder',
    curriculumNotes: {
      ur: 'امتحانی بورڈ الحاق اور نصابی تفصیلات جامعہ انتظامیہ کی منظوری کے بعد شائع کی جائیں گی۔',
      en: 'Board affiliation and exact syllabus outlines will be published following official administrative approval.',
    },
    placeholderImage: {
      id: 'img_asri',
      category: 'departments',
      suggestedPath: 'public/departments/contemporary.jpg',
      title: { ur: 'عصری تعلیم کا کلاس روم', en: 'Contemporary Education Class' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: false,
      hasRealImage: true,
      realImageUrl: '/departments/contemporary.jpg',
      status: 'verified',
    },
    status: 'verified',
  },
  {
    id: 'computer_lab',
    slug: 'computer-education',
    title: {
      ur: 'شعبہ بنیادی کمپیوٹر تعلیم',
      en: 'Department of Foundational Computer Education',
    },
    category: 'skills',
    shortDescription: {
      ur: 'انفارمیشن ٹیکنالوجی کے دور میں طلبہ کو بنیادی کمپیوٹر آپریٹنگ، ٹائپنگ اور آفس ایپلی کیشنز کی تربیت۔',
      en: 'Essential computer literacy, Urdu/English keyboard proficiency, and office productivity applications.',
    },
    fullDescription: {
      ur: 'جدید دور میں انفارمیشن ٹیکنالوجی کی اہمیت کے پیشِ نظر جامعہ میں طلبہ کے لیے بنیادی کمپیوٹر ایجوکیشن کا اہتمام کیا گیا ہے، جس میں بنیادی آپریٹنگ سسٹم، ورڈ پروسیسنگ، ان پیج (اردو ٹائپنگ) اور معلوماتی ٹیکنالوجی کے اخلاقی استعمال کی تربیت دی جاتی ہے۔',
      en: 'In light of modern digital requirements, the Jamia operates a computer training department teaching foundational computer operation, bilingual Urdu/English document creation, basic spreadsheets, and ethical technology awareness.',
    },
    objectives: {
      ur: [
        'طلبہ کو جدید دور کے مطابق ڈیجیٹل خواندگی فراہم کرنا',
        'اردو و عربی ٹائپنگ اور دفتری سافٹ ویئر پر مہارت پیدا کرنا',
        'دعوتی اور علمی کاموں میں کمپیوٹر کو مثبت انداز میں استعمال کرنے کا شعور دینا',
      ],
      en: [
        'Impart fundamental digital literacy aligned with modern standards',
        'Build practical typing, word processing, and digital research competence',
        'Guide students in leveraging computing tools constructively for intellectual pursuits',
      ],
    },
    duration: {
      ur: 'مخصوص کورسز (تفصیلات تصدیق طلب)',
      en: 'Designated module durations (Verify with administration)',
    },
    eligibility: {
      ur: 'جامعہ کے زیرِ تعلیم طلبہ (انتظامیہ سے تصدیق طلب)',
      en: 'Enrolled students of the Jamia (Verify with administration)',
    },
    curriculumStatus: 'placeholder',
    curriculumNotes: {
      ur: 'کمپیوٹر لیب کے شیڈول اور کورس آؤٹ لائن کا مصدقہ متن بعد میں شامل کیا جائے گا۔',
      en: 'Computer lab schedules and exact course modules will be updated after verification.',
    },
    placeholderImage: {
      id: 'img_computer',
      category: 'departments',
      suggestedPath: 'public/departments/computer-lab.jpg',
      title: { ur: 'کمپیوٹر لیب کی تصویری جھلک', en: 'Computer Lab Facility' },
      recommendedResolution: '1200x800 px',
      aspectRatio: '16:9',
      isPlaceholder: false,
      hasRealImage: true,
      realImageUrl: '/departments/computer-lab.jpg',
      status: 'verified',
    },
    status: 'verified',
  },
];
