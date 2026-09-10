import React from 'react';
import { BookOpen, CheckCircle, Info, GraduationCap, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { departmentsData } from '../../data/departments';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface QuranEducationViewProps {
  onNavigate: (viewId: string) => void;
}

export const QuranEducationView: React.FC<QuranEducationViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const hifzDept = departmentsData.find((d) => d.id === 'hifz_quran');
  const maktabDept = departmentsData.find((d) => d.id === 'maktab');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('departments')} className="hover:text-emerald-800">
            {t('شعبہ جات', 'Departments')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('قرآنی علوم و حفظ', 'Quran & Hifz')}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
              {t('شعبۂ تحفیظ القرآن و مکتب', 'Department of Quran Memorization & Maktab')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
              {t(
                'حفظِ کلامِ الٰہی مع تجوید و حسنِ قراءت، ناظرہ قرآن کریم اور بچوں کے لیے ابتدائی اسلامی اخلاق کی تربیت۔',
                'Nurturing young hearts in memorizing the Book of Allah with precise phonetics, Tajweed mastery, and foundational Islamic manners.'
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate('admissions')}
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t('شعبہ حفظ میں داخلہ', 'Apply for Hifz Program')}</span>
          </button>
        </div>
      </div>

      {/* 2. Preliminary Information Warning */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          {t(
            'نوٹ: شعبہ حفظ و مکتب کے یومیہ تعلیمی اوقات، سالانہ تعطیلات، ہاسٹل کی سہولیات اور فیس سٹرکچر سے متعلق تمام مصدقہ تفصیلات جامعہ انتظامیہ کی توثیق کے بعد اپلوڈ کی جائیں گی۔ (PLACEHOLDER — VERIFY WITH JAMIA)',
            'Notice: Daily class schedules, revision cycles, hostel arrangements, and fee structures are subject to official verification from the Jamia administration. (PLACEHOLDER — VERIFY WITH JAMIA)'
          )}
        </p>
      </div>

      {/* 3. The Two Primary Wings: Hifz & Maktab */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wing A: Tahfeez-ul-Quran */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <ImagePlaceholder
              category="departments"
              suggestedPath="public/images/departments/hifz.jpg"
              recommendedResolution="1200x800 px"
              title={t('شعبہ تحفیظ القرآن الکریم', 'Tahfeez-ul-Quran Department')}
              heightClass="h-56"
            />
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t('حفظِ قرآن', 'Quran Memorization')}
                </span>
                <VerificationBadge status="verified" />
              </div>

              <h3 className="text-2xl font-bold text-stone-900">
                {t(hifzDept?.title.ur || 'شعبہ تحفیظ القرآن الکریم', hifzDept?.title.en || 'Tahfeez-ul-Quran')}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed">
                {t(hifzDept?.fullDescription.ur || '', hifzDept?.fullDescription.en || '')}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase text-emerald-800 tracking-wider mb-2">
                  {t('نمایاں خصوصیات:', 'Key Features:')}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('تجوید و مخارج الحروف کی سخت نگرانی اور انفرادی اصلاح', 'Strict phonetic supervision of Tajweed articulation')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('سبق، سبقی اور منزل (دور) کا پختہ یومیہ نظام', 'Threefold daily review: new lesson, recent lessons, and cumulative revision')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('طلبہ کے لیے نماز باجماعت اور سنتِ نبوی کے مطابق تربیتی ماحول', 'Congregational prayer and character mentoring according to Sunnah')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {t('مدت: تقریباً ۲ تا ۳ سال', 'Duration: Approx 2-3 Years')}
            </span>
            <button
              onClick={() => onNavigate('admissions')}
              className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
            >
              {t('داخلہ شرائط', 'Admissions')}
            </button>
          </div>
        </div>

        {/* Wing B: Maktab & Nazira */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <ImagePlaceholder
              category="departments"
              suggestedPath="public/images/departments/maktab.jpg"
              recommendedResolution="1200x800 px"
              title={t('شعبہ مکتب و ابتدائی دینی تعلیم', 'Maktab & Foundational Islamic Education')}
              heightClass="h-56"
            />
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  {t('مکتب و ناظرہ', 'Maktab & Nazira')}
                </span>
                <VerificationBadge status="verified" />
              </div>

              <h3 className="text-2xl font-bold text-stone-900">
                {t(maktabDept?.title.ur || 'شعبہ مکتب', maktabDept?.title.en || 'Maktab Department')}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed">
                {t(maktabDept?.fullDescription.ur || '', maktabDept?.fullDescription.en || '')}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase text-emerald-800 tracking-wider mb-2">
                  {t('مکتب میں سکھائے جانے والے امور:', 'Taught Subjects in Maktab:')}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('نورانی / یسرنا القرآن قاعدہ اور ناظرہ قرآن کی مشق', 'Noorani primer and fluent recitation of Nazira Quran')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('مسنون دعائیں، چھ کلمے، نماز کا طریقہ اور طہارت کے بنیادی مسائل', 'Daily supplications, six kalimahs, Salah practicals, and hygiene')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('والدین اور اساتذہ کا ادب اور بنیادی اسلامی اخلاقیات', 'Respect for parents, teachers, and foundational social ethics')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {t('ابتدائی عمر کے بچوں کے لیے', 'For Primary Age Children')}
            </span>
            <button
              onClick={() => onNavigate('admissions')}
              className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
            >
              {t('داخلہ شرائط', 'Admissions')}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Tajweed & Phonetics Emphasis */}
      <div className="bg-stone-100 rounded-2xl p-6 sm:p-10 border border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
            <h4 className="text-lg font-bold text-stone-900 mb-2">
              {t('صحتِ مخارج (Makharij)', 'Phonetic Articulation')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t(
                'حلق، زبان اور ہونٹوں سے ہر عربی حرف کی صحیح جگہ سے ادائیگی سکھائی جاتی ہے تاکہ قرآن کے معانی میں کوئی تغیر واقع نہ ہو۔',
                'Careful tuition ensuring each Arabic phoneme originates from its precise anatomical articulation point.'
              )}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
            <h4 className="text-lg font-bold text-stone-900 mb-2">
              {t('قواعدِ تجوید (Tajweed Rules)', 'Rules of Tajweed')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t(
                'اخفاء، ادغام، اظہار، اقلاب، مد اور غنہ کے تمام قواعد کی نظریاتی اور عملی مشق۔',
                'Comprehensive theoretical and practical drills covering Idgham, Ikhfa, Izhar, Iqlab, and prolongation.'
              )}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
            <h4 className="text-lg font-bold text-stone-900 mb-2">
              {t('حسنِ قراءت و ترتیل', 'Melodic Recitation')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t(
                'احادیثِ مبارکہ کی روشنی میں قرآن پاک کو خوبصورت اور خشوع والی آواز میں ترتیل کے ساتھ پڑھنے کی ترغیب۔',
                'Instilling reverent recitation according to the prophetic injunction to beautify the Quran with humble voices.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
