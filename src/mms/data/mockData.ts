import { MmsUser, MmsRole, MmsNavItem } from '../types';

export const DEMO_CREDENTIALS = [
  {
    role: 'mudeer' as MmsRole,
    email: 'mudeer@demo.local',
    password: 'Demo@123',
    nameUrdu: 'مولانا محمد عبد الرحمٰن',
    nameEnglish: 'Maulana Muhammad Abdul Rehman',
    designationUrdu: 'مہتمم و ناظمِ اعلیٰ',
    designationEnglish: 'Director & Muhtamim',
    departmentUrdu: 'مرکزی انتظامیہ',
    departmentEnglish: 'Central Administration',
    redirectRoute: 'mms_dashboard',
    descriptionUrdu: 'مکمل انتظامی اور مالیاتی اختیارات کے ساتھ تمام شعبہ جات کا ڈیش بورڈ',
    descriptionEnglish: 'Full institutional administrative, financial and operational oversight',
  },
  {
    role: 'teacher' as MmsRole,
    email: 'teacher@demo.local',
    password: 'Demo@123',
    nameUrdu: 'مفتی قاری شبیر احمد',
    nameEnglish: 'Mufti Qari Shabbir Ahmad',
    designationUrdu: 'استاذِ حدیث و نگراں شعبہ حفظ',
    designationEnglish: 'Hadith Lecturer & Hifz Supervisor',
    departmentUrdu: 'درسِ نظامی و شعبہ حفظ',
    departmentEnglish: 'Dars-e-Nizami & Hifz Department',
    redirectRoute: 'mms_teacher',
    descriptionUrdu: 'کلاس شیڈول، حاضری اندراج، حفظ کارکردگی اور نتائج',
    descriptionEnglish: 'Class timetable, student attendance, Hifz daily progress, lessons',
  },
  {
    role: 'counter' as MmsRole,
    email: 'counter@demo.local',
    password: 'Demo@123',
    nameUrdu: 'حافظ وقاص محمود',
    nameEnglish: 'Hafiz Waqas Mahmood',
    designationUrdu: 'اکاؤنٹس کلرک و فیس انچارج',
    designationEnglish: 'Accounts Clerk & Cashier',
    departmentUrdu: 'شعبہ مالیات و فیس کاؤنٹر',
    departmentEnglish: 'Accounts & Donation Counter',
    redirectRoute: 'mms_counter',
    descriptionUrdu: 'فیس وصولی، عطیات، زکوٰۃ، رسیدات اور یومیہ کیش سمری',
    descriptionEnglish: 'Tuition fees, general donations, Zakat, Sadaqah, and instant receipts',
  },
  {
    role: 'parent' as MmsRole,
    email: 'parent@demo.local',
    password: 'Demo@123',
    nameUrdu: 'چوہدری طارق عزیز',
    nameEnglish: 'Chaudhry Tariq Aziz',
    designationUrdu: 'سرپرست طالب علم (محمد عبد اللہ و زینب فاطمہ)',
    designationEnglish: 'Parent of M. Abdullah & Zainab Fatima',
    departmentUrdu: 'اولیاء کرام پورٹل',
    departmentEnglish: 'Parents Portal',
    redirectRoute: 'mms_parent',
    descriptionUrdu: 'بچوں کی تعلیمی کارکردگی، حاضری، حفظ ریکارڈ اور فیس اسٹیٹس',
    descriptionEnglish: 'Children attendance, daily sabbaq, exam results, and fee statements',
  },
];

// Navigation items per role as strictly requested in prompt
export const ROLE_NAVIGATION: Record<MmsRole, MmsNavItem[]> = {
  mudeer: [
    { id: 'mms_dashboard', labelUrdu: 'ڈیش بورڈ', labelEnglish: 'Dashboard', iconName: 'LayoutDashboard' },
    { id: 'mms_students', labelUrdu: 'طلباء ریکارڈ', labelEnglish: 'Students', iconName: 'Users', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_guardians', labelUrdu: 'اولیاء کرام / سرپرست', labelEnglish: 'Guardians', iconName: 'Users', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_teachers', labelUrdu: 'اساتذہ کرام', labelEnglish: 'Teachers', iconName: 'GraduationCap', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_classes', labelUrdu: 'کلاسز و درجات', labelEnglish: 'Classes', iconName: 'BookOpen', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_subjects', labelUrdu: 'مضامین و نصاب', labelEnglish: 'Subjects', iconName: 'BookOpen', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_class_subjects', labelUrdu: 'کلاس مضامین تفویض', labelEnglish: 'Class Subjects', iconName: 'BookmarkCheck', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_enrollments', labelUrdu: 'داخلے و اندراج', labelEnglish: 'Enrollments', iconName: 'FileSpreadsheet', badge: 'فیز ۳', badgeType: 'info' },
    { id: 'mms_attendance', labelUrdu: 'حاضری ریکارڈ', labelEnglish: 'Attendance (Future)', iconName: 'CalendarCheck2' },
    { id: 'mms_exams', labelUrdu: 'امتحانات و نتائج', labelEnglish: 'Exams & Results (Future)', iconName: 'Award' },
    { id: 'mms_fees', labelUrdu: 'فیس و واجبات', labelEnglish: 'Fees (Future)', iconName: 'CreditCard' },
    { id: 'mms_donations', labelUrdu: 'عطیات و زکوٰۃ', labelEnglish: 'Donations (Future)', iconName: 'HeartHandshake' },
    { id: 'mms_settings', labelUrdu: 'سسٹم سیٹنگز', labelEnglish: 'Settings', iconName: 'Settings' },
  ],
  teacher: [
    { id: 'mms_teacher', labelUrdu: 'استاذ ڈیش بورڈ', labelEnglish: 'Teacher Dashboard', iconName: 'LayoutDashboard' },
    { id: 'mms_teacher_classes', labelUrdu: 'میری کلاسز و طلباء', labelEnglish: 'My Classes & Students', iconName: 'BookOpen', badge: 'فیز ۳', badgeType: 'info' },
  ],
  counter: [
    { id: 'mms_counter', labelUrdu: 'کاؤنٹر سرچ ڈیش بورڈ', labelEnglish: 'Student Directory & Search', iconName: 'LayoutDashboard', badge: 'فیز ۳', badgeType: 'info' },
  ],
  parent: [
    { id: 'mms_parent', labelUrdu: 'اولیاء پورٹل', labelEnglish: 'Parents Portal', iconName: 'LayoutDashboard' },
    { id: 'mms_parent_children', labelUrdu: 'میرے زیرِ سرپرستی بچے', labelEnglish: 'My Children', iconName: 'Users', badge: 'فیز ۳', badgeType: 'info' },
  ],
};

// Rich Mudeer Mock Data
export const MUDEER_DASHBOARD_DATA = {
  kpis: {
    totalStudents: { value: '840', subUrdu: 'مرد طلباء 590 | طالبات 250', subEnglish: '590 Boys | 250 Girls', trend: '+4.2%' },
    totalTeachers: { value: '42', subUrdu: '32 مقیم | 10 جزوقتی', subEnglish: '32 Resident | 10 Visiting', trend: '100% فعال' },
    todayAttendance: { value: '96.4%', subUrdu: '810 حاضر | 30 غیر حاضر', subEnglish: '810 Present | 30 Absent', trend: '+1.1%' },
    pendingFees: { value: 'PKR 245,000', subUrdu: 'کل واجب الادا 48 طلباء', subEnglish: '48 Students Pending', trend: '-8.5%' },
    monthlyCollection: { value: 'PKR 1,420,000', subUrdu: 'فیس و عطیات بماہ ستمبر', subEnglish: 'Fees & Donations (Sept)', trend: '+12%' },
    monthlyExpenses: { value: 'PKR 985,000', subUrdu: 'تنخواہیں، مطعم، بجلی و بلز', subEnglish: 'Salaries, Mess, Utilities', trend: 'بجٹ کے اندر' },
    hostelOccupancy: { value: '89%', subUrdu: '312 / 350 بستر آباد', subEnglish: '312 / 350 Beds Occupied', trend: '38 خالی' },
    lowInventory: { value: '4 اشیاء', subUrdu: 'راشن مطعم، گیس، رجسٹرز', subEnglish: 'Ration, Gas, Exam Paper', trend: 'فوری توجہ درکار' },
  },
  departmentDistribution: [
    { nameUrdu: 'درسِ نظامی (سال اول تا دورۂ حدیث)', nameEnglish: 'Dars-e-Nizami (8-Year Course)', count: 320, percentage: 38 },
    { nameUrdu: 'شعبہ حفظ و تجوید القرآن', nameEnglish: 'Hifz-ul-Quran & Tajweed', count: 280, percentage: 33 },
    { nameUrdu: 'عصری ہائی اسکول (ششم تا دہم)', nameEnglish: 'Contemporary School (6th - 10th)', count: 180, percentage: 22 },
    { nameUrdu: 'شعبہ طالبات و دیگر کورسز', nameEnglish: 'Female Wing & Short Courses', count: 60, percentage: 7 },
  ],
  recentFeeAlerts: [
    { id: '1', student: 'محمد انس قریشی', roll: 'D-104', class: 'ثالثہ (درس نظامی)', amount: 'Rs. 4,500', status: 'واجب الادا' },
    { id: '2', student: 'عبد اللہ رضوان', roll: 'H-052', class: 'حفظ حلقہ ۴', amount: 'Rs. 3,000', status: 'واجب الادا' },
    { id: '3', student: 'حماد بشیر', roll: 'A-210', class: 'کلاس نہم (عصری)', amount: 'Rs. 5,000', status: 'تاخیر' },
  ],
  inventoryAlerts: [
    { itemUrdu: 'آٹا سپیشل گندم', itemEnglish: 'Wheat Flour', stock: '2 بوری باقی', minStock: '10 بوری', level: 'نازک' },
    { itemUrdu: 'کوکنگ آئل (کنستر)', itemEnglish: 'Cooking Oil', stock: '3 ٹن باقی', minStock: '8 ٹن', level: 'کم' },
    { itemUrdu: 'امتحانی جوابی کاپیاں', itemEnglish: 'Exam Answer Sheets', stock: '120 کاپیاں', minStock: '500 کاپیاں', level: 'نازک' },
    { itemUrdu: 'ایل پی جی سلنڈر', itemEnglish: 'LPG Commercial Cylinders', stock: '1 بھرا ہوا', minStock: '4 سلنڈر', level: 'کم' },
  ]
};

// Teacher Mock Data
export const TEACHER_DASHBOARD_DATA = {
  kpis: {
    myClasses: { value: '3', labelUrdu: 'مفوضہ کلاسز', labelEnglish: 'Assigned Classes', subUrdu: 'درس نظامی، حفظ، اسلامیات', subEnglish: 'Nizami, Hifz, Islamiat' },
    todayClasses: { value: '4', labelUrdu: 'آج کے پیریڈز', labelEnglish: "Today's Periods", subUrdu: '2 مکمل، 2 باقی', subEnglish: '2 Completed, 2 Remaining' },
    students: { value: '88', labelUrdu: 'زیرِ نگرانی طلباء', labelEnglish: 'Total Supervised Students', subUrdu: 'حفظ: 28 | نظامی: 60', subEnglish: 'Hifz: 28 | Nizami: 60' },
    todayAttendance: { value: '85 / 88', labelUrdu: 'آج کی حاضری', labelEnglish: "Today's Attendance", subUrdu: '96.5% حاضری', subEnglish: '96.5% Present' },
    pendingTasks: { value: '2', labelUrdu: 'باقی امور', labelEnglish: 'Pending Tasks', subUrdu: 'ماہانہ حفظ رپورٹ، ٹیسٹ نمبرات', subEnglish: 'Hifz Monthly Report, Test Scores' },
  },
  timetable: [
    { period: 'پیریڈ ۱', time: '08:00 AM - 09:15 AM', classUrdu: 'درس نظامی ثالثہ - اصول الفقہ', classEnglish: 'Nizami Salisa - Usul al-Fiqh', hall: 'کمرہ ۱۲ (مرکزی ہال)', status: 'مکمل' },
    { period: 'پیریڈ ۲', time: '09:30 AM - 11:00 AM', classUrdu: 'شعبہ حفظ - سبق سننا (حلقہ ۳)', classEnglish: 'Hifz Halqa 3 - Sabbaq Hearing', hall: 'مسجد ہال جنوبی', status: 'مکمل' },
    { period: 'پیریڈ ۳', time: '11:15 AM - 12:30 PM', classUrdu: 'درس نظامی رابعہ - مشکوۃ شریف', classEnglish: 'Nizami Rabia - Mishkat Sharif', hall: 'کمرہ ۱۴', status: 'جاری ہے' },
    { period: 'پیریڈ ۴', time: '02:30 PM - 03:45 PM', classUrdu: 'عصری اسکول نہم - مطالعہ قرآن و عربی', classEnglish: 'School Class 9 - Quranic Arabic', hall: 'کمرہ ۸', status: 'آئندہ' },
  ],
  hifzUpdates: [
    { student: 'محمد طلحہ', roll: 'H-301', sabbaq: 'پارہ ۱۴، صفحہ ۶', sabqi: 'پارہ ۱ تا ۱۳ دہرائی', manzil: 'پارہ ۴', rating: 'ممتاز' },
    { student: 'عبد اللہ بن مسعود', roll: 'H-304', sabbaq: 'پارہ ۹، صفحہ ۱۲', sabqi: 'پارہ ۸ پختہ', manzil: 'پارہ ۲', rating: 'بہتر' },
    { student: 'عمیر احمد', roll: 'H-312', sabbaq: 'پارہ ۲۲، صفحہ ۳', sabqi: 'پارہ ۲۱ دہرائی', manzil: 'پارہ ۱۰', rating: 'شاندار' },
  ]
};

// Counter Mock Data
export const COUNTER_DASHBOARD_DATA = {
  kpis: {
    todayFees: { value: 'PKR 68,500', labelUrdu: 'آج کی فیس وصولی', labelEnglish: "Today's Fee Collection", count: '14 طلباء' },
    todayDonations: { value: 'PKR 120,000', labelUrdu: 'آج کے عمومی عطیات', labelEnglish: "Today's General Donations", count: '6 مخیر حضرات' },
    todayZakat: { value: 'PKR 250,000', labelUrdu: 'آج کی زکوٰۃ وصولی', labelEnglish: "Today's Zakat Fund", count: '2 عطیات' },
    todayReceipts: { value: '22', labelUrdu: 'جاری کردہ رسیدات', labelEnglish: "Today's Receipts Issued", count: 'کیش و بینک' },
    pendingFeeRecords: { value: '34', labelUrdu: 'زیر التواء فیس چالان', labelEnglish: 'Pending Fee Challans', count: 'واجب الوصول' },
  },
  recentReceipts: [
    { receiptNo: 'RCP-2026-0891', name: 'محمد حمزہ طارق (والد: طارق عزیز)', type: 'ماہانہ فیس (درس نظامی)', amount: 'Rs. 4,500', mode: 'کیش', time: '11:45 AM' },
    { receiptNo: 'RCP-2026-0890', name: 'حاجی محمد یونس (میرپور سیکٹر ایف-۱)', type: 'زکوٰۃ فنڈ برائے طلباء', amount: 'Rs. 150,000', mode: 'آن لائن ٹرانسفر', time: '10:30 AM' },
    { receiptNo: 'RCP-2026-0889', name: 'ملک انور ساجد (لندن / اوورسیز فنڈ)', type: 'عمومی امداد جامعہ عمارت', amount: 'Rs. 80,000', mode: 'بینک ڈرافٹ', time: '09:50 AM' },
    { receiptNo: 'RCP-2026-0888', name: 'عبد الرحمن فاروق (والد: فاروق احمد)', type: 'ہاسٹل و طعام فیس', amount: 'Rs. 8,000', mode: 'کیش', time: '09:15 AM' },
    { receiptNo: 'RCP-2026-0887', name: 'سید قاسم علی شاہ', type: 'صدقہ و خیرات مطعم', amount: 'Rs. 15,000', mode: 'کیش', time: '08:40 AM' },
  ]
};

// Parent Mock Data
export const PARENT_DASHBOARD_DATA = {
  children: [
    {
      id: 'child-1',
      nameUrdu: 'محمد عبد اللہ',
      nameEnglish: 'Muhammad Abdullah',
      rollNumber: 'H-204',
      departmentUrdu: 'شعبہ حفظ و تجوید القرآن',
      departmentEnglish: 'Hifz-ul-Quran Department',
      classGrade: 'حلقہ حفظ نمبر ۴',
      teacherUrdu: 'قاری شبیر احمد',
      teacherEnglish: 'Qari Shabbir Ahmad',
      attendanceRate: '98.5%',
      lastAbsent: 'کوئی غیر حاضری نہیں (اس ماہ)',
      latestResult: 'شعبان ٹیسٹ: ممتاز (96%)',
      hifzProgress: {
        completedParas: 18,
        totalParas: 30,
        currentPara: 'پارہ ۱۹ (وقال الذین)',
        todaySabbaq: 'صفحہ ۴، رکوع ۲ (بہترین روانی)',
        todaySabqi: 'پارہ ۱۸ کا مکمل اعادہ',
        todayManzil: 'پارہ ۶ نصف',
        statusRemarks: 'ماشاء اللہ محنت جاری ہے، تلفظ اور تجوید کے قواعد عمدہ ہیں۔'
      },
      feeStatus: {
        status: 'ادا شدہ (Paid)',
        currentMonth: 'ستمبر 2026',
        amount: 'Rs. 3,500',
        receiptNumber: 'RCP-2026-0812',
        paidOn: '04 ستمبر 2026'
      }
    },
    {
      id: 'child-2',
      nameUrdu: 'زینب فاطمہ',
      nameEnglish: 'Zainab Fatima',
      rollNumber: 'S-712',
      departmentUrdu: 'عصری گرلز ہائی اسکول و دینیات',
      departmentEnglish: 'Contemporary Girls School & Deeniyat',
      classGrade: 'کلاس ہفتم (Grade 7)',
      teacherUrdu: 'معلمہ سمیرا بتول صاحبہ',
      teacherEnglish: 'Ms. Samira Batool',
      attendanceRate: '96.0%',
      lastAbsent: '12 ستمبر (بوجہ بیماری درخواست منظور)',
      latestResult: 'سہ ماہی امتحان: اول پوزیشن (93.4%)',
      hifzProgress: {
        completedParas: 3,
        totalParas: 3,
        currentPara: 'پارہ ۳۰ و ترجمہ قرآن منتخب سورتیں',
        todaySabbaq: 'سورۃ النبأ مکمل مع ترجمہ',
        todaySabqi: 'سورۃ الانفطار تا سورۃ البلد',
        todayManzil: 'دعائیں و مسنون اذکار',
        statusRemarks: 'کلاس میں توجہ اور اسلامی اخلاق قابلِ تحسین ہیں۔'
      },
      feeStatus: {
        status: 'ادا شدہ (Paid)',
        currentMonth: 'ستمبر 2026',
        amount: 'Rs. 4,000',
        receiptNumber: 'RCP-2026-0813',
        paidOn: '04 ستمبر 2026'
      }
    }
  ],
  announcements: [
    {
      id: 'p-1',
      titleUrdu: 'ماہانہ سرپرست و اساتذہ میٹنگ (PTM)',
      titleEnglish: 'Monthly Parent-Teacher Meeting (PTM)',
      date: '28 ستمبر 2026، بروز اتوار صبح 10:00 بجے',
      summaryUrdu: 'تمام محترم سرپرست حضرات سے درخواست ہے کہ ششماہی امتحانات سے قبل تشریف لا کر اساتذہ سے بچوں کی تعلیمی کیفیت دریافت فرمائیں۔',
      summaryEnglish: 'All respected parents are requested to attend the pre-exam progress review session with respective class in-charges.'
    },
    {
      id: 'p-2',
      titleUrdu: 'امتحاناتِ ششماہی کا ڈیٹ شیٹ جاری',
      titleEnglish: 'Mid-Term Examination Datesheet Released',
      date: '15 اکتوبر تا 25 اکتوبر 2026',
      summaryUrdu: 'ششماہی امتحانات کا باقاعدہ شیڈول نوٹس بورڈ اور دستاویزات سیکشن میں ڈاؤنلوڈ کے لیے دستیاب ہے۔',
      summaryEnglish: 'The mid-term examination timetable is now officially published and available for download.'
    }
  ]
};
