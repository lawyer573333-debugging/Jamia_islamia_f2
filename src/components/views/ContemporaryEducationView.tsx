import React from 'react';
import { Layers, Laptop, BookOpen, CheckCircle, Info, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { departmentsData } from '../../data/departments';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface ContemporaryEducationViewProps {
  onNavigate: (viewId: string) => void;
}

export const ContemporaryEducationView: React.FC<ContemporaryEducationViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const asriDept = departmentsData.find((d) => d.id === 'asri_education');
  const compDept = departmentsData.find((d) => d.id === 'computer_lab');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Page Header */}
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
          <span className="text-emerald-800 font-semibold">{t('عصری و کمپیوٹر تعلیم', 'Contemporary Education')}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
              {t('شعبۂ عصری تعلیم و کمپیوٹر سائنس', 'Department of Contemporary Schooling & IT')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
              {t(
                'دینی علوم کے ساتھ اسکول و کالج (چھٹی تا ایف اے) کی باضابطہ تدریس اور جدید کمپیوٹر تعلیم کا مربوط نظام۔',
                'Harmonizing sacred Islamic scholarship with formal school education from Class 6 to FA and modern computer literacy.'
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate('admissions')}
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t('عصری تعلیم میں داخلہ', 'Inquire for Schooling')}</span>
          </button>
        </div>
      </div>

      {/* 2. Preliminary Data Banner */}
      <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs sm:text-sm text-amber-950 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('عصری تعلیمی معلومات کی تصدیق کا اعلامیہ:', 'Contemporary Academic Verification Notice:')}</span>
        </div>
        <p className="leading-relaxed">
          {t(
            'عوامی اشتہارات کے مطابق جامعۃ العلوم الاسلامیہ میرپور میں چھٹی جماعت سے لے کر ایف اے تک کی عصری تعلیم اور بنیادی کمپیوٹر تعلیم کی سہولت دستیاب ہے۔ امتحانی بورڈ الحاق (BISE Mirpur یا دیگر)، مخصوص کتابیں، اور داخلہ امتحان کی فیس وغیرہ جامعہ انتظامیہ کی جانب سے باضابطہ تصدیق کے بعد شائع کی جائیں گی۔ (VERIFY_OFFICIAL_ACADEMIC_INFORMATION)',
            'Public listings confirm that Jamia Tul Uloom Al-Islamia provides formal education from Grade 6 to FA alongside foundational computer education. Exact education board affiliations (such as BISE Mirpur), specific textbook lists, and fee structures will be published following official administrative release. (VERIFY_OFFICIAL_ACADEMIC_INFORMATION)'
          )}
        </p>
      </div>

      {/* 3. Synergy Section: Deeni & Asri Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('جامعہ کا امتیازی وژن', 'Distinctive Institutional Philosophy')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            {t('دینی روح اور جدید علوم کا باوقار امتزاج', 'Equipping Students with Sacred Values and Modern Academic Strength')}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {t(
              'جامعۃ العلوم الاسلامیہ میرپور کا بنیادی مقصد یہ ہے کہ طالب علم ایک طرف قرآن، حدیث اور اسلامی فقہ میں گہری بصیرت رکھے اور دوسری طرف انگریزی، ریاضی، سائنس اور انفارمیشن ٹیکنالوجی سے مکمل ہم آہنگ ہو۔ اس توازن سے ایسا تعلیم یافتہ طبقہ وجود میں آتا ہے جو معاشرے کے کسی بھی شعبے میں خدمت کے قابل ہو۔',
              'The core mandate of Jamia Tul Uloom Al-Islamia is that students develop deep grounding in the Quran, Hadith, and Islamic jurisprudence while simultaneously mastering English, Mathematics, Sciences, and IT skills. This duality equips young graduates to serve society constructively.'
            )}
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {t(
              'طلبہ کا تعلیمی شیڈول اس طرح ترتیب دیا جاتا ہے کہ دینی درجات اور عصری اسکولنگ دونوں کے اسباق بغیر کسی رکاوٹ کے منظم انداز میں جاری رہ سکیں۔',
              'Academic timetables are thoughtfully balanced so that religious study periods and standard school periods proceed in systematic harmony without conflicting.'
            )}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-md">
            <ImagePlaceholder
              category="departments"
              suggestedPath="public/departments/contemporary.jpg"
              recommendedResolution="1200x800 px"
              title={t('شعبۂ عصری تعلیم - اسکول کلاس روم', 'Contemporary Classroom')}
              heightClass="h-64 sm:h-72"
              actualSrc="/departments/contemporary.jpg"
            />
          </div>
        </div>
      </div>

      {/* 4. Grade Levels: Class 6 to Intermediate (FA) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('عصری درجات', 'Schooling Tiers')}
          </span>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">
            {t('ششم تا انٹرمیڈیٹ (ایف اے) درجات کی تدریس', 'Formal Grade 6 through Intermediate (FA)')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {t('مڈل اسکول درجات', 'Middle School')}
            </span>
            <h4 className="text-lg font-bold text-stone-900 mt-3 mb-2">
              {t('جماعت ششم، ہفتم و ہشتم (Class 6 - 8)', 'Grades 6, 7 & 8')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t(
                'انگریزی، ریاضی، جنرل سائنس، اردو اور مطالعہ پاکستان کی بنیادی تدریس تاکہ حفظ یا اعدادیہ کے طلبہ کا عصری تعلیمی تسلسل نہ ٹوٹے۔',
                'Foundational instruction in English, Mathematics, General Sciences, and Social Studies ensuring religious students maintain academic progression.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {t('میٹرک درجات', 'Secondary School (Matric)')}
            </span>
            <h4 className="text-lg font-bold text-stone-900 mt-3 mb-2">
              {t('جماعت نہم و دہم (Class 9 - 10)', 'Grades 9 & 10 (Matriculation)')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t(
                'بورڈ کے معیار کے مطابق مضامین کی تیاری تاکہ طلبہ سرکاری طور پر تسلیم شدہ میٹرک کی سند حاصل کر سکیں۔',
                'Curricular preparation aligned with secondary board frameworks to qualify students for accredited matriculation credentials.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {t('انٹرمیڈیٹ', 'Higher Secondary (FA)')}
            </span>
            <h4 className="text-lg font-bold text-stone-900 mt-3 mb-2">
              {t('سالِ اول و دوم ایف اے (Intermediate FA)', 'Class 11 & 12 (FA Arts/Humanities)')}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t(
                'عربی، اسلامیات، انگریزی اور دیگر اختیاری مضامین کے ساتھ انٹرمیڈیٹ کی تیاری جو اعلیٰ تعلیم کے راستے کھولتی ہے۔',
                'Intermediate level humanities coursework providing recognized qualifications for higher education pathways.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Computer Education Lab Section */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-10 border border-stone-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-700">
              <Laptop className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('شعبۂ انفارمیشن ٹیکنالوجی', 'Information Technology Department')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              {t('بنیادی کمپیوٹر تعلیم و پریکٹیکل لیب', 'Foundational Computer Literacy & Practical Lab')}
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              {t(
                'جامعۃ العلوم الاسلامیہ میرپور طلبہ کو دورِ حاضر کی ڈیجیٹل خواندگی سے آراستہ کرنے کے لیے کمپیوٹر کی بنیادی تربیت فراہم کرتا ہے۔ اس میں کمپیوٹر آپریٹنگ، اردو و انگلش ٹائپنگ (ان پیج اور ایم ایس ورڈ)، اور معلوماتی ٹولز کا مثبت اور اخلاقی استعمال شامل ہے۔',
                'Jamia Tul Uloom Al-Islamia equips students with essential digital literacy. The curriculum spans basic operating system use, bilingual Urdu/English document formatting (InPage and MS Office), and ethical digital research methodologies.'
              )}
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('بنیادی کمپیوٹر آپریٹنگ سسٹم اور ہارڈویئر کی تفہیم', 'Foundational OS navigation and hardware components')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('اردو ان پیج اور ایم ایس آفس پر معیاری ٹائپنگ کی مشق', 'InPage Urdu and Microsoft Office typing proficiency')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('دینی و تعلیمی مقاصد کے لیے ڈیجیٹل ذرائع کا مثبت استعمال', 'Constructive use of digital resources for scholarly research')}</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <ImagePlaceholder
              category="departments"
              suggestedPath="public/departments/computer-lab.jpg"
              recommendedResolution="1200x800 px"
              title={t('کمپیوٹر لیب کی جھلک', 'Computer Lab Infrastructure')}
              heightClass="h-60"
              actualSrc="/departments/computer-lab.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
