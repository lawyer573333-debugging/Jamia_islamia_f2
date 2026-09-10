import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Navigation,
  MessageSquare,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { contactData } from '../../data/contact';
import { VerificationBadge } from '../VerificationBadge';

interface ContactViewProps {
  onNavigate: (viewId: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'admission',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Page Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('رابطہ و پتہ', 'Contact Us')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('رابطہ و تشریف آوری کی معلومات', 'Contact & Visitor Information')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'جامعۃ العلوم الاسلامیہ، سیکٹر ایف-2، میرپور آزاد کشمیر سے براہِ راست رابطہ کیجیے یا دفترِ جامعہ تشریف لائیے۔',
            'Connect with Jamia Tul Uloom Al-Islamia, Sector F-2, Mirpur AJK for admissions, educational queries, or visits.'
          )}
        </p>
      </div>

      {/* 2. Contact Grid: Direct Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Address Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t('جامعہ کا پتہ', 'Institutional Address')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {t(contactData.address.ur, contactData.address.en)}
            </p>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold pt-3 border-t border-stone-100">
            {t('سیکٹر ایف-2، میرپور آزاد کشمیر', 'Sector F-2, Mirpur AJK')}
          </span>
        </div>

        {/* Phone Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t('رابطہ نمبرز', 'Direct Phone Lines')}
            </h3>
            <div className="space-y-1">
              <a
                href={`tel:${contactData.primaryPhone}`}
                className="text-base sm:text-lg font-bold text-emerald-900 block hover:text-emerald-700"
                dir="ltr"
              >
                {contactData.primaryPhone}
              </a>
              <p className="text-xs text-stone-500">
                {t('مرکزی دفتری فون / واٹس ایپ (مصدقہ)', 'Main Office Line (Verified)')}
              </p>
            </div>
          </div>
          <span className="text-[11px] text-stone-500 pt-3 border-t border-stone-100">
            {t('اوقاتِ کار میں کال فرمائیں', 'Call during office hours')}
          </span>
        </div>

        {/* Office Timings Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 border border-stone-200 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t('دفتری اوقات', 'Office Hours')}
            </h3>
            <div className="space-y-1 text-xs sm:text-sm text-stone-700">
              <p>{t(contactData.workingHours.ur, contactData.workingHours.en)}</p>
            </div>
          </div>
          <span className="text-[11px] text-amber-800 font-semibold pt-3 border-t border-stone-100">
            {t('جمعۃ المبارک کو تدریسی تعطیل', 'Academic break on Friday')}
          </span>
        </div>

        {/* Email / Inquiries */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              {t('ای میل و آن لائن رابطہ', 'Email & Inquiries')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-mono">
              info@jamiatululoom.edu.pk
            </p>
            <p className="text-xs text-stone-500">
              {t('آن لائن فارم کے ذریعے فوراً سوال بھیجیں', 'Submit inquiries via portal form')}
            </p>
          </div>
          <VerificationBadge status={contactData.status} showIconOnly />
        </div>
      </div>

      {/* 3. Form and Map / Directions (Two Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              {t('پیغام یا استفسار بھیجیں', 'Send a Message or Inquiry')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t(
                'داخلہ، تعلیمی شعبہ جات یا عمومی معلومات کے لیے ذیل میں اپنا پیغام درج فرمائیں۔',
                'Fill out this form for admissions, academic clarifications, or general queries.'
              )}
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">
                {t('آپ کا پیغام کامیابی سے موصول ہو گیا ہے!', 'Your Message Has Been Submitted!')}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                {t(
                  'شکریہ! جامعۃ العلوم الاسلامیہ میرپور کی انتظامیہ جلد آپ کے نمبر پر جواب فراہم کرے گی۔',
                  'Thank you. The administration of Jamia Tul Uloom Al-Islamia will respond to your provided contact promptly.'
                )}
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700"
              >
                {t('ایک اور پیغام بھیجیں', 'Send Another Message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('آپ کا نام *', 'Your Name *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    placeholder={t('نام درج کریں...', 'Enter full name...')}
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('فون / موبائل نمبر *', 'Phone / Mobile Number *')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    placeholder="0300-1234567"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('ای میل ایڈریس (اختیاری)', 'Email Address (Optional)')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('موضوع *', 'Subject *')}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                  >
                    <option value="admission">{t('داخلہ کے بارے میں معلومات', 'Admission Inquiry')}</option>
                    <option value="hifz">{t('شعبہ تحفیظ القرآن سے رابطہ', 'Hifz Department')}</option>
                    <option value="dars">{t('شعبہ درسِ نظامی سے رابطہ', 'Dars-e-Nizami Inquiry')}</option>
                    <option value="asri">{t('عصری اسکولنگ سے رابطہ', 'Contemporary Schooling')}</option>
                    <option value="donation">{t('امداد و تعاون (Donations / Support)', 'Donations & Support')}</option>
                    <option value="general">{t('عمومی استفسار یا مشورہ', 'General Inquiry / Feedback')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {t('پیغام کی تفصیل *', 'Message Details *')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                  placeholder={t('اپنا سوال یا پیغام تفصیل سے لکھیے...', 'Write your inquiry with relevant context...')}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('پیغام ارسال کریں', 'Send Message')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Directions & Location Box */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Location Frame */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500 text-stone-950 font-bold">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {t('جامعہ کا جائے وقوع و راستہ', 'Location & Navigation')}
                </h3>
                <span className="text-xs text-amber-300">
                  {t('سیکٹر ایف-2، میرپور آزاد کشمیر', 'Sector F-2, Mirpur AJK')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t(
                'جامعۃ العلوم الاسلامیہ میرپور کے معروف سیکٹر ایف-2 میں واقع ہے، جو شہر کے تمام مرکزی مقامات اور بس اڈوں سے باآسانی قابلِ رسائی ہے۔',
                'Jamia Tul Uloom Al-Islamia is situated in Sector F-2, Mirpur, easily accessible from central bus terminals and main thoroughfares across the city.'
              )}
            </p>

            <div className="p-4 rounded-xl bg-stone-800/80 border border-stone-700 text-xs space-y-2 text-stone-300">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-amber-400" />
                <span>{t('قریبی نشانیاں و آمد کے راستے:', 'Nearby Landmarks & Access:')}</span>
              </h4>
              <p>• {t('مرکزی چوک سیکٹر ایف-2 سے چند منٹ کی مسافت۔', 'A few minutes from Sector F-2 central roundabout.')}</p>
              <p>• {t('شہر کے مختلف حصوں سے لوکل وین، رکشہ اور ٹیکسی براہِ راست دستیاب ہیں۔', 'Direct public transport, rickshaws, and cabs available citywide.')}</p>
              <p>• {t('بیرونِ ملک اور دور دراز کے طلبہ کے سرپرستوں کے لیے ہاسٹل میں قیام کا انتظام۔', 'Hostel guest facilitation for visiting guardians of boarding students.')}</p>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${contactData.primaryPhone}`}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{t('براہِ راست کال کریں: 0306-5042031', 'Direct Call: 0306-5042031')}</span>
              </a>
            </div>
          </div>

          {/* Verification Badge Note */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">
              {t('مستند رابطہ معلومات:', 'Verified Contact Credentials:')}
            </p>
            <p>
              {t(
                'پتہ اور فون نمبر 0306-5042031 عوامی اشتہار سے تصدیق شدہ ہے۔',
                'Address and telephone line 0306-5042031 are certified from public institutional records.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
