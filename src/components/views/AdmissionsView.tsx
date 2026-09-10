import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  FileCheck,
  CheckCircle2,
  Clock,
  Phone,
  Download,
  AlertCircle,
  HelpCircle,
  Send,
  Building,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { admissionsData, admissionPrograms } from '../../data/admissions';
import { VerificationBadge } from '../VerificationBadge';

interface AdmissionsViewProps {
  onNavigate: (viewId: string) => void;
}

export const AdmissionsView: React.FC<AdmissionsViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    guardianName: '',
    phone: '',
    program: 'hifz',
    city: 'Mirpur',
    notes: '',
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Page Header & Admissions Open Banner */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('داخلہ جات', 'Admissions')}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-xs">
                {admissionsData.isAdmissionsOpen
                  ? t('سالانہ داخلہ جات جاری ہیں', 'Admissions Open')
                  : t('داخلہ جات بند ہیں', 'Admissions Closed')}
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {admissionsData.currentAcademicYear}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
              {t(admissionsData.admissionCycleUrdu, admissionsData.admissionCycleEnglish)}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
              {t(admissionsData.noticeUrdu, admissionsData.noticeEnglish)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('documents')}
              className="px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t('داخلہ فارم ڈاؤنلوڈ', 'Download Application Form')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Preliminary Data Verification Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'نوٹ برائے سرپرست حضرات: داخلے کی حتمی آخری تاریخ، داخلہ ٹیسٹ کا مخصوص نصاب اور فیس کی تفصیلات جامعہ کے شعبۂ داخلہ کے باضابطہ نوٹیفکیشن سے مشروط ہیں۔ درست معلومات کے لیے براہِ کرم جامعہ کے دفتری فون 0306-5042031 پر رابطہ فرمائیں۔ (PLACEHOLDER_ADMISSION_REQUIREMENTS)',
            'Notice for Guardians: Final submission deadlines, admission test syllabi, and official dues are subject to formal notification from the Jamia Admissions Office. Please confirm via direct phone line 0306-5042031. (PLACEHOLDER_ADMISSION_REQUIREMENTS)'
          )}
        </p>
      </div>

      {/* 3. Available Programs Grid */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('تعلیمی پروگرامز', 'Programs Offered')}
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1">
            {t('وہ شعبہ جات جن میں داخلہ دیا جاتا ہے', 'Academic Programs with Open Intake')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">
                  {t(prog.programTitle.ur, prog.programTitle.en)}
                </h3>
                <div className="space-y-1.5 text-xs text-stone-600">
                  <p>
                    <strong className="text-stone-700">{t('عمر کی حد:', 'Age Limit:')}</strong>{' '}
                    {t(prog.ageLimit.ur, prog.ageLimit.en)}
                  </p>
                  <p>
                    <strong className="text-stone-700">{t('پیشگی شرط:', 'Prerequisite:')}</strong>{' '}
                    {t(prog.prerequisite.ur, prog.prerequisite.en)}
                  </p>
                  <p>
                    <strong className="text-stone-700">{t('مدتِ تعلیم:', 'Duration:')}</strong>{' '}
                    {t(prog.sessionDuration.ur, prog.sessionDuration.en)}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {t(prog.seats.ur, prog.seats.en)}
                </span>
                <VerificationBadge status={prog.status} showIconOnly />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Step-by-Step Admission Process */}
      <div className="bg-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('طریقۂ کار', 'Application Flow')}
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1">
            {t('جامعہ میں داخلے کے ۴ آسان مراحل', '4-Step Admission Procedure')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(language === 'ur' ? admissionsData.stepsUrdu : admissionsData.stepsEnglish).map((st) => (
            <div key={st.step} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 text-sm font-bold flex items-center justify-center mb-3">
                {st.step}
              </div>
              <h4 className="text-sm font-bold text-stone-900 mb-1.5">{st.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{st.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Requirements & Required Documents (Two Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Requirements */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-stone-900">
              {t('عمومی شرائطِ داخلہ (Eligibility Rules)', 'Admission Eligibility Rules')}
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {(language === 'ur' ? admissionsData.requirementsUrdu : admissionsData.requirementsEnglish).map(
              (req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  <span>{req}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <FileCheck className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">
              {t('لازمی دستاویزات (Required Documents)', 'Mandatory Documents Package')}
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
            {(language === 'ur' ? admissionsData.documentsUrdu : admissionsData.documentsEnglish).map(
              (doc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  <span>{doc}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* 6. Important Dates Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-800" />
            <h3 className="text-lg font-bold text-stone-900">
              {t('داخلہ کیلنڈر و اہم تاریخیں', 'Important Admission Dates')}
            </h3>
          </div>
          <VerificationBadge status="placeholder" note={t('تاریخیں تصدیق طلب ہیں', 'Dates pending verification')} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-start">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
              <tr>
                <th className="p-4 font-semibold text-start">{t('مرحلہ / واقعہ', 'Admission Milestone')}</th>
                <th className="p-4 font-semibold text-start">{t('تاریخ و وقت (زیرِ توثیق)', 'Date & Schedule')}</th>
                <th className="p-4 font-semibold text-start">{t('حیثیت', 'Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {admissionsData.importantDates.map((d, idx) => (
                <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-4 font-medium">{t(d.eventTitle.ur, d.eventTitle.en)}</td>
                  <td className="p-4 text-stone-600">{t(d.date.ur, d.date.en)}</td>
                  <td className="p-4">
                    <VerificationBadge status={d.status} showIconOnly />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Admission Office Inquiries & Contact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Office Card */}
        <div className="lg:col-span-5 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-900 space-y-4">
          <span className="text-xs uppercase text-amber-400 font-bold tracking-wider">
            {t('شعبۂ داخلہ رابطہ', 'Admissions Office')}
          </span>
          <h3 className="text-xl font-bold text-white">
            {t(admissionsData.contactForAdmission.incharge.ur, admissionsData.contactForAdmission.incharge.en)}
          </h3>

          <div className="space-y-3 pt-2 text-xs sm:text-sm text-emerald-100">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs text-emerald-300">{t('براہِ راست فون / واٹس ایپ:', 'Direct Phone Line:')}</p>
                <a
                  href={`tel:${admissionsData.contactForAdmission.phone}`}
                  className="text-base font-bold text-white hover:text-amber-300"
                  dir="ltr"
                >
                  {admissionsData.contactForAdmission.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-emerald-300">{t('دفتری اوقات برائے داخلہ معلومات:', 'Office Hours for Inquiries:')}</p>
                <p>{t(admissionsData.contactForAdmission.timing.ur, admissionsData.contactForAdmission.timing.en)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-emerald-300">{t('مقام:', 'Location:')}</p>
                <p>{t('دفترِ تعلیمات، جامعۃ العلوم الاسلامیہ، سیکٹر ایف-2 میرپور آزاد کشمیر', 'Academic Office, Sector F-2, Mirpur AJK')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              {t('آن لائن داخلہ استفسار (Inquiry Form)', 'Online Admission Inquiry Form')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t(
                'کسی بھی شعبے میں داخلے کے متعلق معلومات کے لیے نیچے دیا گیا فارم پُر فرمائیں۔ جامعہ کا دفتری عملہ جلد رابطہ کرے گا۔',
                'Submit your query regarding any academic track. The administration will provide guidance.'
              )}
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-900">
                {t('آپ کا استفسار موصول ہو گیا ہے', 'Your Inquiry Has Been Received')}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800">
                {t(
                  'شکریہ! جامعۃ العلوم الاسلامیہ کا شعبۂ داخلہ آپ کے فراہم کردہ فون نمبر پر جلد رابطہ قائم کرے گا۔',
                  'Thank you. The admissions desk will contact you at your provided telephone number shortly.'
                )}
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="mt-3 px-4 py-1.5 rounded-md bg-emerald-800 text-white text-xs font-semibold"
              >
                {t('نیا استفسار بھیجیں', 'Submit Another Inquiry')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('طالب علم کا نام *', "Candidate's Full Name *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    placeholder={t('مثلاً: محمد احمد', 'e.g. Muhammad Ahmad')}
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('والد / سرپرست کا نام *', "Father / Guardian's Name *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                    placeholder={t('مثلاً: عبد الرحمٰن', 'e.g. Abdul Rehman')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('فون / واٹس ایپ نمبر *', 'Phone / WhatsApp Number *')}
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
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    {t('مطلوبہ تعلیمی شعبہ *', 'Desired Department *')}
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                  >
                    <option value="hifz">{t('شعبہ تحفیظ القرآن الکریم', 'Tahfeez-ul-Quran')}</option>
                    <option value="maktab">{t('شعبہ مکتب (ابتدائی ناظرہ)', 'Maktab & Nazira')}</option>
                    <option value="dars">{t('درسِ نظامی (عالم کورس)', 'Dars-e-Nizami (Alim Course)')}</option>
                    <option value="dawrah">{t('دورۂ حدیث شریف', 'Dawrah-e-Hadith')}</option>
                    <option value="asri">{t('عصری اسکول تعلیم (ششم تا ایف اے)', 'Formal Schooling (6th - FA)')}</option>
                    <option value="computer">{t('بنیادی کمپیوٹر کورس', 'Computer Education')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {t('کوئی اضافی سوال یا نوٹ (اختیاری)', 'Additional Note / Question (Optional)')}
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
                  placeholder={t('مثلاً ہاسٹل کی سہولت، سابقہ تعلیمی کیفیت وغیرہ...', 'e.g. hostel query, previous qualification...')}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('استفسار جمع کروائیں', 'Submit Inquiry to Jamia')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
