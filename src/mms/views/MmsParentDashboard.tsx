import React, { useState } from 'react';
import {
  Users,
  CalendarCheck2,
  Award,
  BookmarkCheck,
  CreditCard,
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MmsStatCard } from '../components/MmsStatCard';
import { PARENT_DASHBOARD_DATA } from '../data/mockData';

interface MmsParentDashboardProps {
  onNavigateMms: (route: string) => void;
}

export const MmsParentDashboard: React.FC<MmsParentDashboardProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const children = PARENT_DASHBOARD_DATA.children;
  const announcements = PARENT_DASHBOARD_DATA.announcements;

  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const activeChild = children[selectedChildIndex] || children[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('سرپرست و والدین پورٹل', 'Parents & Guardian Portal')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 border border-purple-300">
              {t('اولیاء کرام پورٹل', 'Parent Desk')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'چوہدری طارق عزیز — اپنے بچوں کی تعلیمی پیش رفت، حفظ، حاضری، نتائج اور فیس کی تفصیلات ملاحظہ فرمائیں۔',
              'Chaudhry Tariq Aziz — Monitor your enrolled children’s academic progress, Hifz milestones, attendance, results, and fees.'
            )}
          </p>
        </div>

        {/* Child Switcher Tabs */}
        <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-500 ps-2 hidden sm:inline">
            {t('بچے کا انتخاب:', 'Select Child:')}
          </span>
          {children.map((child, idx) => {
            const isSelected = selectedChildIndex === idx;
            return (
              <button
                key={child.id}
                onClick={() => setSelectedChildIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {t(child.nameUrdu, child.nameEnglish)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Child Info Badge */}
      <div className="p-4 rounded-xl bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center">
            {activeChild.nameEnglish.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-h2">
                {t(activeChild.nameUrdu, activeChild.nameEnglish)}
              </h2>
              <span className="text-[11px] font-mono text-amber-300 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-800">
                {activeChild.rollNumber}
              </span>
            </div>
            <p className="text-xs text-emerald-200">
              {t(activeChild.departmentUrdu, activeChild.departmentEnglish)} • {activeChild.classGrade}
            </p>
          </div>
        </div>

        <div className="text-end text-xs text-emerald-200/90">
          <span className="text-stone-300">{t('نگراں استاذ:', 'Teacher / In-charge:')} </span>
          <span className="font-semibold text-white">
            {t(activeChild.teacherUrdu, activeChild.teacherEnglish)}
          </span>
        </div>
      </div>

      {/* 6 Required KPI Cards for Parent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. My Children */}
        <MmsStatCard
          labelUrdu="زیرِ تعلیم بچے"
          labelEnglish="My Children"
          value={String(children.length)}
          subUrdu="جامعہ میں زیرِ تعلیم"
          subEnglish="Enrolled at Jamia"
          icon={Users}
          accentColor="sky"
          onClick={() => onNavigateMms('mms_parent_children')}
        />

        {/* 2. Attendance */}
        <MmsStatCard
          labelUrdu="ماہانہ حاضری"
          labelEnglish="Attendance"
          value={activeChild.attendanceRate}
          subUrdu={activeChild.lastAbsent}
          subEnglish="No recent absence"
          trend="شاندار"
          trendType="positive"
          icon={CalendarCheck2}
          accentColor="emerald"
          onClick={() => onNavigateMms('mms_parent_attendance')}
        />

        {/* 3. Latest Result */}
        <MmsStatCard
          labelUrdu="تازہ ترین نتیجہ"
          labelEnglish="Latest Result"
          value="96%"
          subUrdu={activeChild.latestResult}
          subEnglish="Grade A+ Mumtaz"
          trend="ممتاز پوزیشن"
          trendType="positive"
          icon={Award}
          accentColor="amber"
          onClick={() => onNavigateMms('mms_parent_exams')}
        />

        {/* 4. Hifz Progress */}
        <MmsStatCard
          labelUrdu="حفظِ قرآن تکمیل"
          labelEnglish="Hifz Progress"
          value={`${activeChild.hifzProgress.completedParas} / ${activeChild.hifzProgress.totalParas}`}
          subUrdu={activeChild.hifzProgress.currentPara}
          subEnglish="Current Lesson"
          icon={BookmarkCheck}
          accentColor="emerald"
          onClick={() => onNavigateMms('mms_parent_hifz')}
        />

        {/* 5. Fee Status */}
        <MmsStatCard
          labelUrdu="فیس کیفیت"
          labelEnglish="Fee Status"
          value={activeChild.feeStatus.amount}
          subUrdu={activeChild.feeStatus.status}
          subEnglish="September Paid"
          trend="کلیئر (Clear)"
          trendType="positive"
          icon={CreditCard}
          accentColor="stone"
          onClick={() => onNavigateMms('mms_parent_fees')}
        />

        {/* 6. Announcements */}
        <MmsStatCard
          labelUrdu="اہم اعلانات"
          labelEnglish="Announcements"
          value={String(announcements.length)}
          subUrdu="پی ٹی ایم اور ڈیٹ شیٹ"
          subEnglish="PTM & Date Sheet"
          icon={Bell}
          accentColor="rose"
          onClick={() => onNavigateMms('mms_parent_announcements')}
        />
      </div>

      {/* Academic & Hifz Detailed Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Daily Hifz / Lesson Diary */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-800" />
              <h3 className="text-base font-bold text-stone-900 font-h2">
                {t('روزانہ سبق و تعلیمی ڈائری', 'Daily Academic & Hifz Progress Diary')}
              </h3>
            </div>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {t('آج کا جائزہ', 'Today’s Log')}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 font-medium block">
                {t('آج سنایا گیا نیا سبق (Daily Sabbaq):', "Today's New Lesson:")}
              </span>
              <span className="text-stone-900 font-bold text-sm mt-0.5 block font-h2">
                {activeChild.hifzProgress.todaySabbaq}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 font-medium block">
                  {t('سبقی دہرائی (Sabqi):', 'Revision (Sabqi):')}
                </span>
                <span className="text-stone-800 font-semibold mt-0.5 block">
                  {activeChild.hifzProgress.todaySabqi}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 font-medium block">
                  {t('منزل دہرائی (Manzil):', 'Manzil Revision:')}
                </span>
                <span className="text-stone-800 font-semibold mt-0.5 block">
                  {activeChild.hifzProgress.todayManzil}
                </span>
              </div>
            </div>

            {/* Teacher's Remarks */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t('استاذ محترم کے تاثرات و ریمارکس:', 'Teacher’s Feedback & Remarks:')}</span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                "{activeChild.hifzProgress.statusRemarks}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Fee Status & Madrasa Announcements */}
        <div className="lg:col-span-5 space-y-6">
          {/* Paid Fee Receipt Badge */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 font-h2 flex items-center justify-between">
              <span>{t('فیس واؤچر و کیفیت', 'Fee Payment Status')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {activeChild.feeStatus.status}
              </span>
            </h3>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">{t('ماہ:', 'Month:')}</span>
                <span className="font-semibold text-stone-800">{activeChild.feeStatus.currentMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t('رقم:', 'Amount Paid:')}</span>
                <span className="font-bold text-emerald-900 font-mono">{activeChild.feeStatus.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t('رسید نمبر:', 'Receipt No:')}</span>
                <span className="font-mono text-stone-700">{activeChild.feeStatus.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t('تاریخ ادائیگی:', 'Paid Date:')}</span>
                <span className="text-stone-700">{activeChild.feeStatus.paidOn}</span>
              </div>
            </div>
          </div>

          {/* Announcements for Parents */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 font-h2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>{t('نوٹس بورڈ برائے اولیاء کرام', 'Parent Notices')}</span>
            </h3>

            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <h4 className="font-bold text-stone-900 font-h2">{t(a.titleUrdu, a.titleEnglish)}</h4>
                  <p className="text-[11px] text-amber-800 font-medium">{a.date}</p>
                  <p className="text-stone-600 text-xs leading-relaxed">{t(a.summaryUrdu, a.summaryEnglish)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
