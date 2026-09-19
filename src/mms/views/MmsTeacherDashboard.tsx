import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  CalendarCheck,
  CheckCircle2,
  BookmarkCheck,
  Award,
  Plus,
  Search,
  Check,
  ChevronRight,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MmsStatCard } from '../components/MmsStatCard';
import { MmsModal } from '../components/MmsModal';
import { TEACHER_DASHBOARD_DATA } from '../data/mockData';

interface MmsTeacherDashboardProps {
  onNavigateMms: (route: string) => void;
}

export const MmsTeacherDashboard: React.FC<MmsTeacherDashboardProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const kpis = TEACHER_DASHBOARD_DATA.kpis;

  const [activeTab, setActiveTab] = useState<'schedule' | 'hifz' | 'attendance'>('schedule');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [sabbaqModalOpen, setSabbaqModalOpen] = useState(false);
  const [markedToday, setMarkedToday] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('استاذ پورٹل ڈیش بورڈ', 'Teacher & Faculty Dashboard')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300">
              {t('درسِ نظامی و شعبہ حفظ', 'Dars-e-Nizami & Hifz')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'مفتی قاری شبیر احمد — روزانہ تدریس، حاضری مارکنگ اور طلباء کی حفظ کارکردگی کا انتظام۔',
              'Mufti Qari Shabbir Ahmad — Daily lectures, attendance logging, and student Hifz progress tracking.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAttendanceModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <CalendarCheck className="w-4 h-4 text-amber-300" />
            <span>{t('آج کی حاضری لگائیں', 'Mark Attendance')}</span>
          </button>

          <button
            onClick={() => setSabbaqModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{t('سبق / منزل درج کریں', 'Record Sabbaq')}</span>
          </button>
        </div>
      </div>

      {/* 5 Required KPI Cards for Teacher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. My Classes */}
        <MmsStatCard
          labelUrdu={kpis.myClasses.labelUrdu}
          labelEnglish={kpis.myClasses.labelEnglish}
          value={kpis.myClasses.value}
          subUrdu={kpis.myClasses.subUrdu}
          subEnglish={kpis.myClasses.subEnglish}
          icon={BookOpen}
          accentColor="emerald"
          onClick={() => onNavigateMms('mms_teacher_classes')}
        />

        {/* 2. Today's Classes */}
        <MmsStatCard
          labelUrdu={kpis.todayClasses.labelUrdu}
          labelEnglish={kpis.todayClasses.labelEnglish}
          value={kpis.todayClasses.value}
          subUrdu={kpis.todayClasses.subUrdu}
          subEnglish={kpis.todayClasses.subEnglish}
          icon={Clock}
          accentColor="sky"
        />

        {/* 3. Students */}
        <MmsStatCard
          labelUrdu={kpis.students.labelUrdu}
          labelEnglish={kpis.students.labelEnglish}
          value={kpis.students.value}
          subUrdu={kpis.students.subUrdu}
          subEnglish={kpis.students.subEnglish}
          icon={Users}
          accentColor="stone"
        />

        {/* 4. Today's Attendance */}
        <MmsStatCard
          labelUrdu={kpis.todayAttendance.labelUrdu}
          labelEnglish={kpis.todayAttendance.labelEnglish}
          value={kpis.todayAttendance.value}
          subUrdu={kpis.todayAttendance.subUrdu}
          subEnglish={kpis.todayAttendance.subEnglish}
          trend={markedToday ? 'مکمل درج' : '۳ غیر حاضر'}
          trendType={markedToday ? 'positive' : 'warning'}
          icon={CalendarCheck}
          accentColor="amber"
          onClick={() => setAttendanceModalOpen(true)}
        />

        {/* 5. Pending Tasks */}
        <MmsStatCard
          labelUrdu={kpis.pendingTasks.labelUrdu}
          labelEnglish={kpis.pendingTasks.labelEnglish}
          value={kpis.pendingTasks.value}
          subUrdu={kpis.pendingTasks.subUrdu}
          subEnglish={kpis.pendingTasks.subEnglish}
          trend="فوری توجہ"
          trendType="warning"
          icon={CheckCircle2}
          accentColor="rose"
        />
      </div>

      {/* Tabs Section */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'schedule'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {t('آج کے پیریڈز و اوقات', "Today's Timetable")}
            </button>
            <button
              onClick={() => setActiveTab('hifz')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'hifz'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {t('حفظ و سبقی پیش رفت', 'Hifz Progress Register')}
            </button>
          </div>

          <span className="text-xs text-stone-500 font-medium">
            {t('ہفتہ، ستمبر ۲۰۲۶ء', 'Saturday, September 2026')}
          </span>
        </div>

        {/* Timetable Tab */}
        {activeTab === 'schedule' && (
          <div className="divide-y divide-stone-100">
            {TEACHER_DASHBOARD_DATA.timetable.map((row, i) => (
              <div
                key={i}
                className="p-4 sm:px-6 hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-700">پیریڈ</span>
                    <span className="text-sm font-bold font-mono">{i + 1}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-stone-900 font-h2">
                      {t(row.classUrdu, row.classEnglish)}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                      <span className="inline-flex items-center gap-1 font-mono text-emerald-900">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {row.time}
                      </span>
                      <span>•</span>
                      <span>{row.hall}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'مکمل'
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.status === 'جاری ہے'
                        ? 'bg-amber-100 text-amber-900 animate-pulse font-bold'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {row.status}
                  </span>
                  <button
                    onClick={() => setAttendanceModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-100"
                  >
                    {t('حاضری شیٹ', 'Attendance')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hifz Tab */}
        {activeTab === 'hifz' && (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 text-start">{t('طالب علم', 'Student')}</th>
                  <th className="py-3 px-4 text-start">{t('رول نمبر', 'Roll No')}</th>
                  <th className="py-3 px-4 text-start">{t('آج کا سبق', 'Today Sabbaq')}</th>
                  <th className="py-3 px-4 text-start">{t('سبقی (دہرائی)', 'Sabqi')}</th>
                  <th className="py-3 px-4 text-start">{t('منزل', 'Manzil')}</th>
                  <th className="py-3 px-4 text-start">{t('معیار', 'Rating')}</th>
                  <th className="py-3 px-4 text-end">{t('اقدام', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {TEACHER_DASHBOARD_DATA.hifzUpdates.map((item, i) => (
                  <tr key={i} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-bold text-stone-800">{item.student}</td>
                    <td className="py-3 px-4 font-mono text-stone-500">{item.roll}</td>
                    <td className="py-3 px-4 text-emerald-900 font-semibold">{item.sabbaq}</td>
                    <td className="py-3 px-4 text-stone-700">{item.sabqi}</td>
                    <td className="py-3 px-4 text-stone-700">{item.manzil}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {item.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button
                        onClick={() => {
                          setSelectedStudent(item.student);
                          setSabbaqModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-800 text-white text-[11px] font-semibold hover:bg-emerald-900"
                      >
                        {t('سبق ریکارڈ کریں', 'Update')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Attendance Modal */}
      <MmsModal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        title={t('کلاس حاضری اندراج (مارکنگ)', 'Mark Class Attendance')}
        subtitle={t('درس نظامی ثالثہ / شعبہ حفظ حلقہ ۴', 'Nizami Salisa / Hifz Halqa 4')}
      >
        <div className="space-y-4 text-xs">
          <p className="text-stone-600">
            {t(
              'تمام طلباء کی حاضر و غیر حاضر حیثیت کی تصدیق کریں اور محفوظ بٹن دبائیں۔ (یہ فیز ۱ کا ڈیمو ماڈل ہے)',
              'Verify student attendance status and click save. (Phase 1 UI mock).'
            )}
          </p>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <span className="font-semibold text-emerald-950">
              {t('کل طلباء: ۲۸ | حاضر: ۲۷ | غیر حاضر: ۱', 'Total: 28 | Present: 27 | Absent: 1')}
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
              96.4%
            </span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => {
                setMarkedToday(true);
                setAttendanceModalOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-900"
            >
              {t('حاضری محفوظ کریں (Save)', 'Save Attendance')}
            </button>
          </div>
        </div>
      </MmsModal>

      {/* Sabbaq Modal */}
      <MmsModal
        isOpen={sabbaqModalOpen}
        onClose={() => setSabbaqModalOpen(false)}
        title={t('حفظ و سبق سننا و اندراج', 'Record Hifz Progress')}
        subtitle={selectedStudent ? `${t('طالب علم:', 'Student:')} ${selectedStudent}` : t('روزانہ ڈائری', 'Daily Log')}
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {t('آج سنایا گیا سبق (Sabbaq):', "Today's Sabbaq:")}
            </label>
            <input
              type="text"
              defaultValue="پارہ ۱۴، صفحہ ۷، رکوع ۳"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {t('سبقی و منزل دہرائی:', 'Sabqi & Manzil Revision:')}
            </label>
            <input
              type="text"
              defaultValue="پارہ ۱۳ مکمل پختہ سن لیا"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setSabbaqModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-900"
            >
              {t('ریکارڈ محفوظ کریں', 'Save Progress')}
            </button>
          </div>
        </div>
      </MmsModal>
    </div>
  );
};
