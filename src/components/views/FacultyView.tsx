import React from 'react';
import { GraduationCap, Users, ShieldAlert, Award, BookOpen, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { facultyData } from '../../data/faculty';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface FacultyViewProps {
  onNavigate: (viewId: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const leadership = facultyData.filter((f) => f.role === 'leadership');
  const departmentHeads = facultyData.filter((f) => f.role === 'head_of_department');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('اساتذہ و انتظامیہ', 'Faculty & Leadership')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('جامعۃ العلوم الاسلامیہ کی انتظامیہ و اساتذہ', 'Institutional Leadership & Faculty Directory')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'جامعہ کے سرپرست، مہتمم، ناظمِ اعلیٰ اور مختلف تعلیمی شعبہ جات کے نگران اساتذہ کرام کی باضابطہ فہرست۔',
            'Directory of the administrative leadership, Muhtamim, Nazim-e-Aala, and departmental faculty.'
          )}
        </p>
      </div>

      {/* 2. Strict Verification Disclaimer Banner */}
      <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs sm:text-sm text-amber-950 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('انتظامی و تدریسی اساتذہ کی تصدیق کا نوٹس:', 'Faculty Data Verification Notice:')}</span>
        </div>
        <p className="leading-relaxed">
          {t(
            'جامعہ کے مہتمم اور ناظمِ اعلیٰ کے نام عوامی و دستیاب ذرائع کے مطابق درج کیے گئے ہیں۔ اساتذہ کرام کے تفصیلی سوانحی کوائف، اسناد اور دیگر شعبہ جات کے مدرسین کی مکمل فہرست جامعہ کی انتظامیہ سے توثیق کے بعد اپڈیٹ کی جائے گی۔ (PUBLICLY LISTED — VERIFY BEFORE OFFICIAL PUBLICATION)',
            'The names of the Muhtamim and Nazim-e-Aala reflect publicly available listings. Full biographies, scholarly authorizations (Asanid), and additional teaching rosters are maintained as placeholders pending certified administrative publication. (PUBLICLY LISTED — VERIFY BEFORE OFFICIAL PUBLICATION)'
          )}
        </p>
      </div>

      {/* 3. Leadership Section (Muhtamim & Nazim-e-Aala) */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('مرکزی قیادت', 'Executive Leadership')}
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1">
            {t('جامعہ کے اکابرین و انتظامی سرپرستان', 'Rectorate & Principal Administration')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadership.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="bg-stone-900 p-2">
                  <ImagePlaceholder
                    category="leadership"
                    placeholder={leader.placeholderImage}
                    heightClass="h-64 sm:h-72"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {t(leader.designation.ur, leader.designation.en)}
                    </span>
                    <VerificationBadge status={leader.status} note={leader.sourceNote} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {t(leader.name.ur, leader.name.en)}
                  </h3>

                  <p className="text-xs text-emerald-800 font-semibold">
                    {t(leader.department.ur, leader.department.en)}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {t(leader.biography.ur, leader.biography.en)}
                  </p>

                  <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <strong>{t('تعلیمی اہلیت:', 'Qualifications:')}</strong>{' '}
                    <span>{t(leader.qualifications.ur, leader.qualifications.en)}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>{t('جامعۃ العلوم الاسلامیہ میرپور', 'Jamia Tul Uloom, Mirpur')}</span>
                <span className="font-mono text-[11px] text-amber-700">
                  {leader.sourceNote}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Department Heads / Faculty Placeholders */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            {t('شعبہ جاتی اساتذہ', 'Departmental Deans & Instructors')}
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-1">
            {t('تدریسی نگران حضرات (خانہ پُری برائے باضابطہ اندراج)', 'Academic Incharges (Structured Placeholders)')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departmentHeads.map((hod) => (
            <div
              key={hod.id}
              className="bg-stone-50 rounded-xl border border-dashed border-stone-300 p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <ImagePlaceholder
                  category="faculty"
                  placeholder={hod.placeholderImage}
                  heightClass="h-44"
                />

                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-stone-600">
                    {t(hod.designation.ur, hod.designation.en)}
                  </span>
                  <VerificationBadge status={hod.status} showIconOnly />
                </div>

                <h4 className="text-base font-bold text-stone-800">
                  {t(hod.name.ur, hod.name.en)}
                </h4>

                <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                  {t(hod.biography.ur, hod.biography.en)}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-200 text-[11px] text-stone-400 font-mono">
                {hod.sourceNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
