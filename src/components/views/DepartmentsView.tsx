import React, { useState } from 'react';
import { BookOpen, GraduationCap, Layers, Laptop, CheckCircle2, Clock, Calendar, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { departmentsData } from '../../data/departments';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface DepartmentsViewProps {
  onNavigate: (viewId: string) => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const filteredDepartments = selectedCategory === 'all'
    ? departmentsData
    : departmentsData.filter((d) => d.category === selectedCategory);

  const categories = [
    { id: 'all', ur: 'تمام شعبہ جات', en: 'All Departments' },
    { id: 'quran', ur: 'قرآنی علوم و مکتب', en: 'Quranic Sciences' },
    { id: 'deeni', ur: 'درسِ نظامی و حدیث', en: 'Dars-e-Nizami' },
    { id: 'asri', ur: 'عصری اسکول تعلیم', en: 'Contemporary' },
    { id: 'skills', ur: 'کمپیوٹر و فنی مہارت', en: 'IT & Skills' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* 1. Header & Title */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('تعلیمی شعبہ جات', 'Departments')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('جامعۃ العلوم الاسلامیہ کے تعلیمی شعبہ جات', 'Academic Departments Directory')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'حفظِ قرآن، مکتب، درسِ نظامی (اعدادیہ تا دورۂ حدیث شریف)، عصری اسکولنگ (چھٹی تا ایف اے) اور کمپیوٹر ایجوکیشن کا منظم نظام۔',
            'Explore the distinct academic tracks spanning classical Islamic jurisprudence, Quran memorization, secondary/college schooling, and digital skills.'
          )}
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {t(cat.ur, cat.en)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Notice regarding Curriculum Verification */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          {t(
            'نوٹ: شعبہ جات کے تفصیلی نصابی کتب کی فہرست، امتحانی بورڈ الحاق اور یومیہ اسباق کی مصدقہ ترتیب جامعہ انتظامیہ کی جانب سے باضابطہ توثیق کے بعد شامل کی جائے گی۔',
            'Notice: Detailed textbook syllabi, examination board affiliations, and daily classroom routines will be published following official administrative verification.'
          )}
        </p>
      </div>

      {/* 3. Departments Grid / Detailed Cards */}
      <div className="space-y-8">
        {filteredDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Image Placeholder (4 cols on lg) */}
              <div className="lg:col-span-4 bg-stone-900">
                <ImagePlaceholder
                  category="departments"
                  placeholder={dept.placeholderImage}
                  heightClass="h-56 lg:h-full"
                />
              </div>

              {/* Right Content Details (8 cols on lg) */}
              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {dept.category === 'quran'
                        ? t('شعبۂ قرآنی علوم', 'Quranic Sciences')
                        : dept.category === 'deeni'
                        ? t('شعبۂ درسِ نظامی', 'Dars-e-Nizami')
                        : dept.category === 'asri'
                        ? t('شعبۂ عصری تعلیم', 'Contemporary Education')
                        : t('شعبۂ کمپیوٹر و ہنر', 'IT & Computer Lab')}
                    </span>
                    <VerificationBadge status={dept.curriculumStatus} />
                  </div>

                  <h3 className="text-2xl font-bold text-stone-900">
                    {t(dept.title.ur, dept.title.en)}
                  </h3>

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {t(dept.fullDescription.ur, dept.fullDescription.en)}
                  </p>

                  {/* Objectives List */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                      {t('بنیادی مقاصد و اہداف:', 'Key Departmental Objectives:')}
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600">
                      {(language === 'ur' ? dept.objectives.ur : dept.objectives.en).map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metadata Chips: Duration & Eligibility */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                      <span className="text-stone-500 font-semibold block mb-1">
                        {t('مدتِ کورس:', 'Course Duration:')}
                      </span>
                      <span className="text-stone-800 font-medium">
                        {t(dept.duration.ur, dept.duration.en)}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                      <span className="text-stone-500 font-semibold block mb-1">
                        {t('اہلیت و شرائطِ داخلہ:', 'Eligibility Criteria:')}
                      </span>
                      <span className="text-stone-800 font-medium">
                        {t(dept.eligibility.ur, dept.eligibility.en)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 italic">
                    {t(dept.curriculumNotes.ur, dept.curriculumNotes.en)}
                  </span>

                  <div className="flex items-center gap-2">
                    {dept.id === 'dars_e_nizami' && (
                      <button
                        onClick={() => onNavigate('dars_nizami')}
                        className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{t('درسِ نظامی کے درجات دیکھیے', 'View 8-Year Levels')}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {dept.id === 'hifz_quran' && (
                      <button
                        onClick={() => onNavigate('quran')}
                        className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{t('حفظ و مکتب تفصیلات', 'Hifz Program Details')}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {dept.id === 'asri_education' && (
                      <button
                        onClick={() => onNavigate('contemporary')}
                        className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{t('عصری و اسکول تعلیم تفصیلات', 'Schooling Overview')}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('admissions')}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                    >
                      {t('داخلہ رہنمائی', 'Admissions Inquiries')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
