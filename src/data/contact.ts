import { ContactInformation, DonationInformation } from '../types';

export const contactData: ContactInformation = {
  institutionName: {
    ur: 'جامعۃ العلوم الاسلامیہ',
    en: 'Jamia Tul Uloom Al-Islamia',
  },
  address: {
    ur: 'سیکٹر ایف-2، میرپور، آزاد جموں و کشمیر، پاکستان',
    en: 'Sector F-2, Mirpur, Azad Jammu & Kashmir, Pakistan',
  },
  city: {
    ur: 'میرپور',
    en: 'Mirpur',
  },
  state: {
    ur: 'آزاد جموں و کشمیر',
    en: 'Azad Jammu & Kashmir',
  },
  country: {
    ur: 'پاکستان',
    en: 'Pakistan',
  },
  postalCode: '10250',
  primaryPhone: '0306-5042031',
  phoneVerified: true,
  emailPlaceholder: 'PLACEHOLDER_OFFICIAL_EMAIL',
  emailStatus: 'placeholder',
  workingHours: {
    ur: 'ہفتہ تا جمعرات: صبح ۸:۰۰ بجے تا شام ۵:۰۰ بجے (جمعۃ المبارک تدریسی چھٹی)',
    en: 'Saturday to Thursday: 8:00 AM – 5:00 PM (Friday Academic Holiday)',
  },
  googleMapsCoordinates: {
    lat: 33.1484,
    lng: 73.7519,
    query: 'Sector F-2, Mirpur, Azad Kashmir',
  },
  socialLinks: {
    facebook: {
      url: 'PLACEHOLDER_OFFICIAL_FACEBOOK',
      status: 'placeholder',
    },
    youtube: {
      url: 'PLACEHOLDER_OFFICIAL_YOUTUBE',
      status: 'placeholder',
    },
    whatsapp: {
      url: 'PLACEHOLDER_OFFICIAL_WHATSAPP',
      status: 'placeholder',
    },
  },
  status: 'unverified',
};

export const donationData: DonationInformation = {
  headline: {
    ur: 'جامعہ کے ساتھ تعاون اور دینی خدمات میں حصہ داری',
    en: 'Support the Jamia & Share in Sacred Educational Endeavors',
  },
  description: {
    ur: 'دینی مدارس اور اسلامی تعلیمی مراکز امتِ مسلمہ کے مخلصانہ تعاون، صدقاتِ جاریہ اور زکوٰۃ و عطیات کے ذریعے قائم رہتے ہیں، جہاں نادار اور مستحق طلبہ کی کفالت کی جاتی ہے۔',
    en: 'Islamic institutions flourish through the sincere contributions, Sadaqah Jariyah, and support of the Muslim community, sustaining deserving students in their pursuit of sacred and contemporary learning.',
  },
  verificationNotice: {
    ur: 'جامعہ کے مستند عطیات، تعمیراتی فنڈ، بینک اکاؤنٹ نمبرز، آسان پیسہ اور جاز کیش کی تمام تفصیلات جامعہ انتظامیہ کی باقاعدہ تصدیق کے بعد یہاں شائع کی جائیں گی۔ مالی تعاون کے لیے فی الوقت براہِ راست جامعہ کے دفتر سے رابطہ فرمائیں۔',
    en: 'Official donation channels, construction fund details, bank account numbers, Easypaisa, and JazzCash records will be published here following formal verification from the Jamia administration. Please contact the Jamia administration office directly for legitimate financial contributions.',
  },
  causes: [
    {
      id: 'kifalat_tulba',
      title: {
        ur: 'کفالتِ طلبہ (طعام، قیام و کتب)',
        en: 'Student Sponsorship (Boarding, Meals & Books)',
      },
      description: {
        ur: 'حفظِ قرآن اور درسِ نظامی کے مستحق اور نادار طلبہ کے تعلیمی و رہائشی اخراجات میں کفالت۔',
        en: 'Supporting deserving Quran memorizers and Alim students with meals, boarding, and textbooks.',
      },
    },
    {
      id: 'construction_fund',
      title: {
        ur: 'تعمیراتی و توسیعی فنڈ',
        en: 'Campus Infrastructure & Development Fund',
      },
      description: {
        ur: 'کلاس رومز، لائبریری، کمپیوٹر لیب اور جامعہ کی عمارت کی توسیع کے لیے صدقۂ جاریہ۔',
        en: 'Ongoing charity (Sadaqah Jariyah) toward classroom development, library facilities, and computer lab.',
      },
    },
    {
      id: 'zakat_sadaqat',
      title: {
        ur: 'شعبۂ زکوٰۃ و صدقات',
        en: 'Zakat & General Sadaqah Fund',
      },
      description: {
        ur: 'مستحقِ زکوٰۃ طلبہ کی ضروریات اور شرعی ضوابط کے تحت زکوٰۃ کا صحیح مصرف۔',
        en: 'Transparent distribution of Zakat strictly for eligible students according to Islamic jurisprudence.',
      },
    },
  ],
  bankDetailsNotice: {
    ur: 'PLACEHOLDER_OFFICIAL_DONATION_INFORMATION (بینک اکاؤنٹ اور آن لائن فنڈز کی تفصیلات انتظامیہ کی جانب سے فراہم کیے جانے پر شامل ہوں گی)',
    en: 'PLACEHOLDER_OFFICIAL_DONATION_INFORMATION (Official bank account and online transaction details will be added once provided by the administration)',
  },
  status: 'placeholder',
};
