import React from 'react';
import { ShieldCheck, Target, Eye, BookOpen, Layers, Users, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/siteContent';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface AboutViewProps {
  onNavigate: (viewId: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Page Title & Breadcrumb */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('تعارفِ جامعہ', 'About')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('جامعۃ العلوم الاسلامیہ کا تعارف و پس منظر', 'About Jamia Tul Uloom Al-Islamia')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'سیکٹر ایف-2، میرپور آزاد کشمیر میں قرآن و سنت کے احیاء اور دینی و عصری علوم کی تدریس کا ایک موقر ادارہ۔',
            'An esteemed institution in Sector F-2, Mirpur AJK, dedicated to sacred scholarship, character building, and formal education.'
          )}
        </p>
      </div>

      {/* 2. Main Introduction & Campus Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('جامعہ کا تعارف', 'Institutional Overview')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            {t('نئی نسل کے لیے علمِ نافع اور فکری تربیت کا گہوارہ', 'A Sanctuary of Beneficial Knowledge & Intellectual Nurturing')}
          </h2>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {t(siteContent.aboutUrdu, siteContent.aboutEnglish)}
          </p>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            {t(
              'جامعہ کے قیام کا بنیادی مقصد ایسے رجالِ کار پیدا کرنا ہے جو اپنے باطن کو تقویٰ، اخلاص اور عملِ صالح سے آراستہ کریں اور اپنے ظاہر کو جدید دور کے مسائل و تقاضوں سے واقف رکھیں۔ اسی مقصد کے لیے حفظِ قرآن اور درسِ نظامی کے قدیم روایتی نظام کے شانہ بشانہ باقاعدہ اسکول و کالج (ششم تا ایف اے) اور کمپیوٹر لیب کا نظام قائم کیا گیا ہے۔',
              'The paramount objective of the Jamia is to graduate individuals who harmonize inner piety and sincere devotion with keen awareness of modern social and academic realities. To achieve this synthesis, traditional Dars-e-Nizami and Quran memorization are coupled with standard schooling up to Intermediate (FA) and IT training.'
            )}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-md">
            <ImagePlaceholder
              category="campus"
              suggestedPath="public/images/campus/hero.jpg"
              recommendedResolution="1200x800 px"
              title={t('جامعہ کی بیرونی عمارت کا منظر', 'Jamia Campus Façade')}
              heightClass="h-72"
              actualSrc="/images/campus/hero.jpg"
            />
          </div>
        </div>
      </div>

      {/* 3. History & Founding Background Notice (Rule: DO NOT INVENT HISTORICAL FACTS) */}
      <div className="rounded-xl bg-amber-50/80 border-2 border-amber-300 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500 text-stone-950 font-bold">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-950">
              {t('تاریخ و پس منظر (زیرِ تصدیق باضابطہ اندراج)', 'Institutional History & Origins (Pending Verification)')}
            </h3>
            <span className="text-xs text-amber-800">
              {t('انتظامیہ کے مصدقہ ریکارڈ کے مطابق شمولیت', 'To be populated from certified Jamia archives')}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-amber-950 leading-relaxed bg-white/70 p-4 rounded-lg border border-amber-200">
          "{t(siteContent.historyNoticeUrdu, siteContent.historyNoticeEnglish)}"
        </p>

        <div className="text-xs text-amber-900/90 pt-1 flex flex-wrap items-center gap-2">
          <span className="font-semibold">{t('شعبہ دستاویزات و تاریخ:', 'Historical Archive Directorate:')}</span>
          <span>
            {t(
              'جامعہ کے قیام کا سال، بانیان، تاریخی سنگِ میل، ابتدائی اساتذہ اور اعزازات کی تفصیلی فہرست متعلقہ انتظامیہ سے موصول ہوتے ہی اس صفحے پر شامل کی جائے گی۔',
              'Founding year, founding figures, historic milestones, and early faculty rosters will be documented upon administrative release.'
            )}
          </span>
        </div>
      </div>

      {/* 4. Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              {t('جامعہ کا مشن (Mission)', 'Our Mission')}
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {t(siteContent.missionUrdu, siteContent.missionEnglish)}
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              {t('جامعہ کا وژن (Vision)', 'Our Vision')}
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {t(siteContent.visionUrdu, siteContent.visionEnglish)}
            </p>
          </div>
        </div>
      </div>

      {/* 5. Educational Objectives (تعلیمی مقاصد) */}
      <div className="bg-stone-100 rounded-xl p-6 sm:p-8 border border-stone-200 space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('تعلیمی و تربیتی اہداف', 'Core Objectives')}
          </span>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">
            {t('جامعۃ العلوم الاسلامیہ کے بنیادی تعلیمی مقاصد', 'Foundational Educational Goals')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              titleUrdu: 'حفظِ قرآن مع تجوید',
              titleEnglish: 'Quran Memorization & Tajweed',
              descUrdu: 'قرآن مجید کو تجوید کے ساتھ حفظ کروانا اور طلبہ کو اخلاقِ قرآنی کا پیکر بنانا۔',
              descEnglish: 'Nurture Huffaz of the Quran grounded in correct phonetics and living Quranic morality.',
            },
            {
              titleUrdu: 'جامع درسِ نظامی کی تدریس',
              titleEnglish: 'Rigorous Classical Islamic Studies',
              descUrdu: 'قرآن، حدیث، فقہ اور عربی ادب کے روایتی علوم میں مکمل بصیرت فراہم کرنا۔',
              descEnglish: 'Impart advanced scholarship across Exegesis, Prophetic Hadith, Jurisprudence, and Arabic.',
            },
            {
              titleUrdu: 'عصری و جدید تعلیم کا فروغ',
              titleEnglish: 'Formal Schooling & Intermediate',
              descUrdu: 'چھٹی سے ایف اے تک جدید تعلیمی مضامین کی تدریس تاکہ طلبہ ہر میدان میں سرخرو ہوں۔',
              descEnglish: 'Facilitate standard school and intermediate learning so students succeed in civic pursuits.',
            },
            {
              titleUrdu: 'کمپیوٹر و انفارمیشن ٹیکنالوجی',
              titleEnglish: 'Digital Literacy & Computer Skills',
              descUrdu: 'طلبہ کو دورِ حاضر کے انفارمیشن ٹیکنالوجی کے مفید آلات کے مثبت استعمال کی تربیت دینا۔',
              descEnglish: 'Equip learners with practical office software, bilingual typing, and constructive digital literacy.',
            },
            {
              titleUrdu: 'اخلاقی و فکری تربیت',
              titleEnglish: 'Spiritual Mentorship & Ethics',
              descUrdu: 'طلبہ کے دلوں میں خشیتِ الٰہی، محبتِ رسول ﷺ اور خدمتِ خلق کا جذبہ بیدار کرنا۔',
              descEnglish: 'Instill God-consciousness, devotion to the Sunnah, and compassion for community welfare.',
            },
            {
              titleUrdu: 'دعوت و ابلاغ کی مہارتیں',
              titleEnglish: 'Public Speaking & Discourse',
              descUrdu: 'بزمِ خطابت اور مقالہ نگاری کے ذریعے طلبہ میں تحریر و تقریر کی اعلیٰ صلاحیتیں پیدا کرنا۔',
              descEnglish: 'Sharpen student oratory, academic composition, and effective bilingual communication.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-stone-200 shadow-2xs">
              <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{t(item.titleUrdu, item.titleEnglish)}</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t(item.descUrdu, item.descEnglish)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Administrative Structure Teaser */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-stone-900">
            {t('جامعہ کی انتظامیہ اور تدریسی اساتذہ', 'Administration & Teaching Faculty')}
          </h3>
          <p className="text-sm text-stone-600 max-w-2xl">
            {t(
              'جامعہ کے اکابرین، مہتمم صاحب، ناظمِ اعلیٰ اور تدریسی شعبہ جات کے نگران حضرات کے کوائف دیکھیے۔',
              'Explore profiles of the Jamia leadership, Muhtamim, Nazim-e-Aala, and academic heads.'
            )}
          </p>
        </div>

        <button
          onClick={() => onNavigate('faculty')}
          className="px-6 py-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm shrink-0 flex items-center gap-2 transition-colors"
        >
          <span>{t('انتظامیہ ڈائریکٹری', 'View Faculty Directory')}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
