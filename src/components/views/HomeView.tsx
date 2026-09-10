import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Bell,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Heart,
  Phone,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  Laptop,
  Building,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/siteContent';
import { departmentsData } from '../../data/departments';
import { announcementsData } from '../../data/announcements';
import { eventsData } from '../../data/events';
import { galleryData } from '../../data/gallery';
import { admissionsData } from '../../data/admissions';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface HomeViewProps {
  onNavigate: (viewId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-emerald-950 text-white overflow-hidden border-b-4 border-amber-500">
        {/* Subtle background arabesque geometry */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d4af37 1.5px, transparent 1.5px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left text column (8 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Bismillah Header */}
              <div className="inline-block py-1 px-4 rounded-full bg-emerald-900/80 border border-amber-400/30 text-amber-300 font-nastaliq text-base sm:text-lg shadow-sm">
                {siteContent.bismillahUrdu}
              </div>

              <div className="space-y-3">
                <span className="inline-block text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  {t('جامعۃ العلوم الاسلامیہ، سیکٹر ایف-2، میرپور آزاد کشمیر', 'Jamia Tul Uloom Al-Islamia, Sector F-2, Mirpur AJK')}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-arabic-heading">
                  {t(siteContent.heroHeadingUrdu, siteContent.heroHeadingEnglish)}
                </h2>
                <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                  {t(siteContent.heroSubheadingUrdu, siteContent.heroSubheadingEnglish)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base transition-all shadow-md flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>{t('داخلہ کی معلومات', 'Admissions Details')}</span>
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base transition-colors border border-emerald-700/80 flex items-center gap-2"
                >
                  <span>{t('جامعہ کا تعارف', 'About the Jamia')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Verified Features Quick Badges */}
              <div className="pt-4 border-t border-emerald-900/80 flex flex-wrap items-center gap-3 text-xs text-emerald-200">
                <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {t('شعبہ تحفیظ القرآن', 'Quran Memorization')}
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {t('درسِ نظامی (دورۂ حدیث تک)', 'Dars-e-Nizami')}
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {t('عصری تعلیم (ششم تا ایف اے)', 'Formal Schooling (6th - FA)')}
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {t('بنیادی کمپیوٹر سائنس', 'Computer Education')}
                </span>
              </div>
            </div>

            {/* Right column: Campus Hero Image Placeholder (5 cols on lg) */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900/60 p-2 sm:p-3 rounded-2xl border border-amber-400/30 shadow-2xl backdrop-blur-xs">
                <ImagePlaceholder
                  category="campus"
                  suggestedPath="public/images/campus/hero.jpg"
                  recommendedResolution="1920x1080 px (Landscape)"
                  title={t('جامعۃ العلوم الاسلامیہ - مرکزی کیمپس و بلڈنگ', 'Main Campus Façade & Mosque')}
                  heightClass="h-72 sm:h-80"
                />
                <div className="p-3 bg-stone-950/80 rounded-xl mt-2 border border-stone-800 text-center">
                  <span className="text-xs text-amber-300 font-medium">
                    {t(siteContent.heroPlaceholderNoticeUrdu, siteContent.heroPlaceholderNoticeEnglish)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADMISSIONS CALLOUT STRIP */}
      {admissionsData.isAdmissionsOpen && (
        <div className="max-w-7xl mx-auto px-4 -mt-8 sm:-mt-12 relative z-20">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl p-4 sm:p-6 text-stone-950 shadow-xl border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block text-xs uppercase font-bold tracking-wider bg-stone-950 text-amber-300 px-2 py-0.5 rounded">
                  {t('داخلہ جاری ہے', 'Admissions Open')}
                </span>
                <h3 className="text-lg sm:text-xl font-bold mt-1">
                  {t(admissionsData.admissionCycleUrdu, admissionsData.admissionCycleEnglish)} ({admissionsData.currentAcademicYear})
                </h3>
                <p className="text-xs sm:text-sm text-stone-800 line-clamp-1">
                  {t(admissionsData.noticeUrdu, admissionsData.noticeEnglish)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('admissions')}
                className="px-5 py-2.5 rounded-lg bg-stone-950 hover:bg-stone-900 text-amber-300 font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{t('طریقہ کار و فارم', 'Admissions Guide')}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FOUR CORE EDUCATIONAL PILLARS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('تعلیمی بنیادیں', 'Core Foundation')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            {t('دینی اصالت اور عصری تقاضوں کا باوقار سنگم', 'Sacred Tradition & Modern Academic Competence')}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mb-4 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  {pillar.id === 'quran' && <BookOpen className="w-6 h-6" />}
                  {pillar.id === 'dars_nizami' && <GraduationCap className="w-6 h-6" />}
                  {pillar.id === 'asri_taleem' && <Layers className="w-6 h-6" />}
                  {pillar.id === 'computer_skills' && <Laptop className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {t(pillar.titleUrdu, pillar.titleEnglish)}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t(pillar.descUrdu, pillar.descEnglish)}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-amber-600 transition-colors">
                <span>{t('مزید تفصیلات', 'Learn More')}</span>
                <ArrowIcon className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BRIEF INSTITUTIONAL INTRODUCTION */}
      <section className="bg-stone-100 py-12 sm:py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
                {t('جامعہ کا تعارف', 'Institutional Overview')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                {t('قرآن و سنت کی روشنی میں نئی نسل کی تعلیم و تربیت', 'Nurturing Future Scholars & Citizens in Light of Quran & Sunnah')}
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {t(siteContent.aboutUrdu, siteContent.aboutEnglish)}
              </p>

              {/* Status Note Regarding History / Verified Facts */}
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{t(siteContent.historyNoticeUrdu, siteContent.historyNoticeEnglish)}</p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-xs"
                >
                  <span>{t('جامعہ کا تفصیلی تعارف پڑھیے', 'Read Complete About Page')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('faculty')}
                  className="px-4 py-2.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm border border-stone-300 transition-colors"
                >
                  {t('اساتذہ و انتظامیہ', 'Faculty Directory')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-md">
                <ImagePlaceholder
                  category="campus"
                  suggestedPath="public/images/campus/exterior.jpg"
                  recommendedResolution="1200x800 px"
                  title={t('جامعہ بلڈنگ منظر', 'Jamia Campus Exterior')}
                  heightClass="h-64 sm:h-72"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATIONAL DEPARTMENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
              {t('شعبہ جات', 'Academic Departments')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {t('مستند اسلامی و عصری تعلیمی شعبے', 'Established Academic Wings')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('departments')}
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>{t('تمام شعبہ جات دیکھیں', 'View All Departments')}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentsData.slice(0, 6).map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <ImagePlaceholder
                  category="departments"
                  placeholder={dept.placeholderImage}
                  heightClass="h-44"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {dept.category === 'quran'
                        ? t('قرآنی علوم', 'Quranic Sciences')
                        : dept.category === 'deeni'
                        ? t('درسِ نظامی', 'Dars-e-Nizami')
                        : dept.category === 'asri'
                        ? t('عصری تعلیم', 'Contemporary')
                        : t('کمپیوٹر و ہنر', 'IT & Skills')}
                    </span>
                    <VerificationBadge status={dept.curriculumStatus} showIconOnly />
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {t(dept.title.ur, dept.title.en)}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {t(dept.shortDescription.ur, dept.shortDescription.en)}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    if (dept.id === 'dars_e_nizami' || dept.id === 'dawrah_hadith') {
                      onNavigate('dars_nizami');
                    } else if (dept.id === 'hifz_quran' || dept.id === 'maktab') {
                      onNavigate('quran');
                    } else if (dept.id === 'asri_education' || dept.id === 'computer_lab') {
                      onNavigate('contemporary');
                    } else {
                      onNavigate('departments');
                    }
                  }}
                  className="w-full py-2 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-stone-200"
                >
                  <span>{t('نصاب و تفصیلات', 'Curriculum & Details')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. LEADERSHIP / MUHTAMIM MESSAGE */}
      <section className="bg-emerald-950 text-white py-14 border-y border-emerald-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Portrait placeholder column */}
            <div className="lg:col-span-4">
              <div className="bg-stone-900/80 p-3 rounded-2xl border border-amber-400/40 shadow-xl">
                <ImagePlaceholder
                  category="leadership"
                  suggestedPath="public/images/leadership/muhtamim.jpg"
                  recommendedResolution="800x1000 px"
                  title={t('مولانا زید بوستان صاحب (حفظہ اللہ)', 'Maulana Zaid Bostan (Muhtamim)')}
                  heightClass="h-72"
                />
                <div className="mt-3 text-center">
                  <h4 className="text-base font-bold text-amber-300">
                    {siteContent.muhtamimMessageUrdu.speaker}
                  </h4>
                  <p className="text-xs text-emerald-200">
                    {siteContent.muhtamimMessageUrdu.role}
                  </p>
                  <div className="mt-2">
                    <VerificationBadge
                      status={siteContent.muhtamimMessageUrdu.status}
                      note={t('عوامی اندراج — تصدیق طلب', 'Publicly Listed — Pending Verification')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Message column */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {t('پیغامِ سرپرست و مہتمم', 'Message from Leadership')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {t('علمِ دین کی اشاعت اور نوجوان نسل کی فکری رہنمائی', 'Spreading Sacred Knowledge & Guarding Future Generations')}
              </h2>

              <blockquote className="p-6 rounded-xl bg-emerald-900/60 border-s-4 border-amber-400 text-sm sm:text-base leading-relaxed text-emerald-100 italic">
                "{t(siteContent.muhtamimMessageUrdu.quoteUrdu, siteContent.muhtamimMessageUrdu.quoteEnglish)}"
              </blockquote>

              <p className="text-xs text-emerald-300/80">
                {t(siteContent.muhtamimMessageUrdu.placeholderTextUrdu, siteContent.muhtamimMessageUrdu.placeholderTextEnglish)}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('faculty')}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
                >
                  <span>{t('انتظامیہ و اساتذہ کی فہرست', 'View Leadership & Faculty')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST ANNOUNCEMENTS & RECENT ACTIVITIES */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Announcements Card */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-800">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 font-arabic-heading">
                      {t('تازہ ترین اعلانات', 'Latest Announcements')}
                    </h3>
                    <span className="text-[11px] text-stone-500">
                      {t('امتحانات، داخلہ اور تعطیلات کے نوٹس', 'Notices regarding exams, admissions & breaks')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('announcements')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>{t('تمام اعلانات', 'All')}</span>
                  <ArrowIcon className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {announcementsData.slice(0, 3).map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => onNavigate('announcements')}
                    className="p-3 rounded-lg bg-stone-50 hover:bg-emerald-50/50 border border-stone-200 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {t(ann.categoryLabel.ur, ann.categoryLabel.en)}
                      </span>
                      <span className="text-[11px] text-stone-400">{ann.date}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-emerald-900 transition-colors">
                      {t(ann.title.ur, ann.title.en)}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                      {t(ann.summary.ur, ann.summary.en)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 text-end">
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
              >
                <span>{t('مکمل اعلانات آرکائیو', 'View Announcements Archive')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Activities Card */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 font-arabic-heading">
                      {t('جامعہ کی سرگرمیاں و تقریبات', 'Recent Activities & Events')}
                    </h3>
                    <span className="text-[11px] text-stone-500">
                      {t('ختمِ بخاری، مسابقات اور تربیتی سیمینارز', 'Convocation, competitions & seminars')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('events')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <span>{t('تمام سرگرمیاں', 'All')}</span>
                  <ArrowIcon className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {eventsData.slice(0, 3).map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => onNavigate('events')}
                    className="p-3 rounded-lg bg-stone-50 hover:bg-emerald-50/50 border border-stone-200 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        {t(evt.categoryLabel.ur, evt.categoryLabel.en)}
                      </span>
                      <span className="text-[11px] text-stone-400">{evt.date}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-emerald-900 transition-colors">
                      {t(evt.title.ur, evt.title.en)}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                      {t(evt.description.ur, evt.description.en)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 text-end">
              <button
                onClick={() => onNavigate('events')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
              >
                <span>{t('تقریبات کا مکمل شیڈول', 'View Events Schedule')}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
              {t('تصویری جھلکیاں', 'Photo Gallery')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {t('کیمپس اور تعلیمی ماحول', 'Campus & Learning Environment')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
          >
            <span>{t('مکمل گیلری دیکھیں', 'Explore Full Gallery')}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('gallery')}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <ImagePlaceholder
                category="gallery"
                title={t(item.title.ur, item.title.en)}
                suggestedPath={item.suggestedFilePath}
                recommendedResolution="1200x800 px"
                heightClass="h-48"
              />
              <div className="p-4">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {t(item.categoryLabel.ur, item.categoryLabel.en)}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-stone-800 mt-2 group-hover:text-emerald-900 transition-colors">
                  {t(item.title.ur, item.title.en)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. DONATION & SUPPORT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white p-6 sm:p-10 border-2 border-amber-500/40 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-semibold border border-amber-400/20">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('صدقۂ جاریہ اور دینی تعاون', 'Sadaqah Jariyah & Support')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-arabic-heading">
                {t('دینی علوم کی ترویج اور مستحق طلبہ کی کفالت میں حصہ لیجیے', 'Support Sacred Scholarship & Deserving Student Welfare')}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {t(siteContent.donationStatementUrdu, siteContent.donationStatementEnglish)}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-center">
              <button
                onClick={() => onNavigate('donations')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-md text-center"
              >
                {t('تعاون کے شعبہ جات دیکھیے', 'View Support Causes')}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white font-medium text-sm transition-colors border border-emerald-700 text-center"
              >
                {t('جامعہ کے دفتر سے رابطہ', 'Contact Office Directly')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
