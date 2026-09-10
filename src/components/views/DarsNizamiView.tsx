import React from 'react';
import { GraduationCap, BookOpen, Layers, Award, CheckCircle, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { departmentsData } from '../../data/departments';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface DarsNizamiViewProps {
  onNavigate: (viewId: string) => void;
}

export const DarsNizamiView: React.FC<DarsNizamiViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const darsDept = departmentsData.find((d) => d.id === 'dars_e_nizami');
  const levels = darsDept?.levels || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Header and Breadcrumb */}
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
          <span className="text-emerald-800 font-semibold">{t('درسِ نظامی', 'Dars-e-Nizami')}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
              {t('شعبۂ درسِ نظامی (عالمیہ نصاب)', 'Department of Dars-e-Nizami (Alimiyyah)')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
              {t(
                'اعدادیہ سے دورۂ حدیث شریف تک ۸ سالہ منظم نصابِ علمِ دین، فقہ، حدیث، تفسیر اور عربی ادب۔',
                'Comprehensive 8-year classical curriculum in Islamic Jurisprudence, Prophetic Hadith, Quranic Exegesis, and Classical Arabic.'
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate('admissions')}
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t('درسِ نظامی میں داخلہ', 'Apply for Dars-e-Nizami')}</span>
          </button>
        </div>
      </div>

      {/* 2. Verification Warning Banner (Strict Data Integrity Rule) */}
      <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs sm:text-sm text-amber-950 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('نصابی و امتحانی تصدیق کا نوٹس:', 'Curriculum & Academic Verification Notice:')}</span>
        </div>
        <p className="leading-relaxed">
          {t(
            'جامعۃ العلوم الاسلامیہ میرپور کے درسِ نظامی کے ہر درجے کی مخصوص نصابی کتب، اسباق کی تقسیم، تدریسی کلاکس اور وفاق المدارس یا الحاق شدہ تعلیمی بورڈ سے متعلقہ تفصیلات انتظامیہ کی باضابطہ تصدیق کے بعد اپڈیٹ کی جائیں گی۔ یہاں درج درجات عام روایتی ترتیب کے مطابق تعلیمی خاکہ پیش کرتے ہیں۔ (PLACEHOLDER — VERIFY WITH JAMIA)',
            'The specific textbook lists, subject allocations, lecture hours, and Board affiliations for each year of Dars-e-Nizami will be published following official administrative clearance. The levels listed below outline the standard traditional academic progression. (PLACEHOLDER — VERIFY WITH JAMIA)'
          )}
        </p>
      </div>

      {/* 3. Overview Grid & Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-2xl font-bold text-stone-900">
            {t('درسِ نظامی کیا ہے اور اس کی اہمیت', 'What is Dars-e-Nizami & Its Educational Role?')}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {t(
              'درسِ نظامی برصغیر پاک و ہند کا وہ مستند اور کلاسک نصاب ہے جس نے صدیوں تک امتِ مسلمہ کو جید فقہاء، محدثین، مفسرین اور مربیین فراہم کیے۔ یہ نصاب زبان و ادب کی باریکیوں سے شروع ہو کر علومِ عقلیہ (منطق، فلسفہ) اور علومِ نقلیہ (تفسیر، حدیث، فقہ) کی بلندیوں تک پہنچاتا ہے۔',
              'Dars-e-Nizami is the premier classical syllabus of Islamic scholarship in the subcontinent that has historically produced esteemed jurists, Hadith masters, and spiritual guides. It advances progressively from linguistic grammar and rhetoric to rational sciences (logic) and sacred texts (Tafseer, Hadith, and Fiqh).'
            )}
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {t(
              'جامعۃ العلوم الاسلامیہ میرپور میں اس نصاب کے ساتھ ساتھ طلبہ کے لیے چھٹی سے ایف اے تک کے عصری اسکول مضامین اور کمپیوٹر لیب کا بھی اہتمام کیا جاتا ہے تاکہ فارغ التحصیل علماء دینی استحضار کے ساتھ جدید حالات سے بھی پوری طرح باخبر ہوں۔',
              'At Jamia Tul Uloom Al-Islamia, Mirpur, this traditional discipline is uniquely harmonized with formal schooling from Class 6 to Intermediate (FA) and IT literacy, preparing scholars grounded in tradition yet cognizant of modern society.'
            )}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-md">
            <ImagePlaceholder
              category="departments"
              suggestedPath="public/images/departments/dars-e-nizami.jpg"
              recommendedResolution="1200x800 px"
              title={t('شعبہ درسِ نظامی - تدریسی درسگاہ', 'Dars-e-Nizami Lecture Assembly')}
              heightClass="h-64 sm:h-72"
            />
          </div>
        </div>
      </div>

      {/* 4. Structured Levels Timeline / Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('تعلیمی درجات', 'Academic Hierarchy')}
          </span>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">
            {t('اعدادیہ سے دورۂ حدیث شریف تک درجات کا تفصیلی خاکہ', 'Progressive Levels from Preparatory to Dawrah-e-Hadith')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((lvl) => {
            const isFinal = lvl.levelNumber === 8;
            return (
              <div
                key={lvl.levelNumber}
                className={`rounded-xl p-6 border transition-all flex flex-col justify-between ${
                  isFinal
                    ? 'bg-emerald-950 text-white border-amber-400 shadow-lg ring-2 ring-amber-400/30'
                    : 'bg-white text-stone-900 border-stone-200 shadow-xs hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isFinal
                          ? 'bg-amber-400 text-stone-950'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {lvl.levelNumber === 0
                        ? t('ابتدائی سال', 'Preparatory Stage')
                        : isFinal
                        ? t('حتمی سال (سندِ فضیلت)', 'Final Degree Year')
                        : `${t('مرحلہ نمبر', 'Stage #')} ${lvl.levelNumber}`}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      {isFinal ? 'M.A. Equiv.' : `Level ${lvl.levelNumber}`}
                    </span>
                  </div>

                  <h4 className={`text-lg font-bold mb-2 ${isFinal ? 'text-amber-300' : 'text-stone-900'}`}>
                    {language === 'ur' ? lvl.nameUrdu : lvl.nameEnglish}
                  </h4>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isFinal ? 'text-emerald-100/90' : 'text-stone-600'
                    }`}
                  >
                    {language === 'ur' ? lvl.descriptionUrdu : lvl.descriptionEnglish}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t text-[11px] flex items-center justify-between ${
                    isFinal ? 'border-emerald-800 text-emerald-300' : 'border-stone-100 text-stone-400'
                  }`}
                >
                  <span>{t('نصابی تفصیلات: تصدیق طلب', 'Syllabus: Verify with Jamia')}</span>
                  <VerificationBadge status="placeholder" showIconOnly />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Dawrah-e-Hadith Culmination Section */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-6 sm:p-10 border border-amber-500/40 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <span className="text-xs uppercase text-amber-300 font-bold tracking-wider">
              {t('انتہائی مرحلہ', 'Culminating Milestone')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {t('دورۂ حدیث شریف (تکمیلِ فضیلت و سندِ فراغت)', 'Dawrah-e-Hadith (Alimiyyah Degree)')}
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
          {t(
            'درسِ نظامی کا سب سے متبرک اور اہم تعلیمی سال دورۂ حدیث شریف ہے، جس میں کبار اساتذہ و شیوخ الحدیث صحاحِ ستہ (صحیح البخاری، صحیح مسلم، جامع الترمذی، سنن ابی داؤد، سنن النسائی، سنن ابن ماجہ) کے متون اور اسانید کی تدریس فرماتے ہیں۔ طالب علم کو باضابطہ سندِ فراغت اور دستارِ فضیلت عطا کی جاتی ہے۔',
            'The crowning achievement of Dars-e-Nizami is Dawrah-e-Hadith. Under senior Hadith scholars, students critically study the texts and transmission chains of the six canonical Hadith collections, culminating in the formal Sanad of scholarly authorization and convocation turban investiture.'
          )}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('admissions')}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-colors"
          >
            {t('داخلے کے تقاضے اور معلومات', 'Inquire for Admission')}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-sm border border-emerald-700 transition-colors"
          >
            {t('شعبۂ تعلیمات سے رابطہ', 'Contact Academic Desk')}
          </button>
        </div>
      </div>
    </div>
  );
};
