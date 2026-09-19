import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Receipt,
  Building2,
  AlertTriangle,
  PlusCircle,
  Download,
  Filter,
  Search,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MmsStatCard } from '../components/MmsStatCard';
import { MmsModal } from '../components/MmsModal';
import { MUDEER_DASHBOARD_DATA } from '../data/mockData';

interface MmsMudeerDashboardProps {
  onNavigateMms: (route: string) => void;
}

export const MmsMudeerDashboard: React.FC<MmsMudeerDashboardProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'inventory'>('overview');
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const kpis = MUDEER_DASHBOARD_DATA.kpis;

  const handleOpenActionModal = (actionName: string) => {
    setModalAction(actionName);
    setQuickModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('مہتمم / ناظمِ اعلیٰ ڈیش بورڈ', 'Director & Muhtamim Dashboard')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {t('مرکزی انتظامیہ', 'Central Admin')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'جامعۃ العلوم الاسلامیہ کے تمام شعبہ جات، حاضری، مالیات، اور دار الاقامہ کا مجموعی جائزہ۔',
              'Institutional overview across all departments, attendance, financials, and hostel.'
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleOpenActionModal(t('نئے داخلہ کی منظوری', 'Approve New Admission'))}
            className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>{t('نیا داخلہ / ایڈمشن', 'New Admission')}</span>
          </button>

          <button
            onClick={() => handleOpenActionModal(t('ماہانہ مالیاتی رپورٹ ڈاؤنلوڈ', 'Download Monthly Report'))}
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors border border-stone-200 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>{t('ایکسپورٹ رپورٹ', 'Export Report')}</span>
          </button>
        </div>
      </div>

      {/* 8 Mandatory KPI Cards for Mudeer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Students */}
        <MmsStatCard
          labelUrdu="کل زیرِ تعلیم طلباء"
          labelEnglish="Total Students"
          value={kpis.totalStudents.value}
          subUrdu={kpis.totalStudents.subUrdu}
          subEnglish={kpis.totalStudents.subEnglish}
          trend={kpis.totalStudents.trend}
          trendType="positive"
          icon={Users}
          accentColor="emerald"
          onClick={() => onNavigateMms('mms_students')}
        />

        {/* 2. Total Teachers */}
        <MmsStatCard
          labelUrdu="کل اساتذہ و عملہ"
          labelEnglish="Total Teachers & Staff"
          value={kpis.totalTeachers.value}
          subUrdu={kpis.totalTeachers.subUrdu}
          subEnglish={kpis.totalTeachers.subEnglish}
          trend={kpis.totalTeachers.trend}
          trendType="neutral"
          icon={GraduationCap}
          accentColor="sky"
          onClick={() => onNavigateMms('mms_teachers')}
        />

        {/* 3. Today's Attendance */}
        <MmsStatCard
          labelUrdu="آج کی حاضری تناسب"
          labelEnglish="Today's Attendance"
          value={kpis.todayAttendance.value}
          subUrdu={kpis.todayAttendance.subUrdu}
          subEnglish={kpis.todayAttendance.subEnglish}
          trend={kpis.todayAttendance.trend}
          trendType="positive"
          icon={CalendarCheck}
          accentColor="emerald"
          onClick={() => onNavigateMms('mms_attendance')}
        />

        {/* 4. Pending Fees */}
        <MmsStatCard
          labelUrdu="باقیات و واجبات فیس"
          labelEnglish="Pending Fees"
          value={kpis.pendingFees.value}
          subUrdu={kpis.pendingFees.subUrdu}
          subEnglish={kpis.pendingFees.subEnglish}
          trend={kpis.pendingFees.trend}
          trendType="warning"
          icon={CreditCard}
          accentColor="rose"
          onClick={() => onNavigateMms('mms_fees')}
        />

        {/* 5. Monthly Collection */}
        <MmsStatCard
          labelUrdu="ماہانہ مجموعی وصولی"
          labelEnglish="Monthly Collection"
          value={kpis.monthlyCollection.value}
          subUrdu={kpis.monthlyCollection.subUrdu}
          subEnglish={kpis.monthlyCollection.subEnglish}
          trend={kpis.monthlyCollection.trend}
          trendType="positive"
          icon={TrendingUp}
          accentColor="amber"
          onClick={() => onNavigateMms('mms_donations')}
        />

        {/* 6. Monthly Expenses */}
        <MmsStatCard
          labelUrdu="ماہانہ کل اخراجات"
          labelEnglish="Monthly Expenses"
          value={kpis.monthlyExpenses.value}
          subUrdu={kpis.monthlyExpenses.subUrdu}
          subEnglish={kpis.monthlyExpenses.subEnglish}
          trend={kpis.monthlyExpenses.trend}
          trendType="neutral"
          icon={Receipt}
          accentColor="stone"
          onClick={() => onNavigateMms('mms_expenses')}
        />

        {/* 7. Hostel Occupancy */}
        <MmsStatCard
          labelUrdu="دار الاقامہ (ہاسٹل) گنجائش"
          labelEnglish="Hostel Occupancy"
          value={kpis.hostelOccupancy.value}
          subUrdu={kpis.hostelOccupancy.subUrdu}
          subEnglish={kpis.hostelOccupancy.subEnglish}
          trend={kpis.hostelOccupancy.trend}
          trendType="warning"
          icon={Building2}
          accentColor="amber"
          onClick={() => onNavigateMms('mms_hostel')}
        />

        {/* 8. Low Inventory */}
        <MmsStatCard
          labelUrdu="کم انوینٹری الرٹس"
          labelEnglish="Low Inventory Alert"
          value={kpis.lowInventory.value}
          subUrdu={kpis.lowInventory.subUrdu}
          subEnglish={kpis.lowInventory.subEnglish}
          trend={kpis.lowInventory.trend}
          trendType="negative"
          icon={AlertTriangle}
          accentColor="rose"
          onClick={() => onNavigateMms('mms_inventory')}
        />
      </div>

      {/* Main Section with Tabs */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xs overflow-hidden">
        {/* Tab Headers & Filter */}
        <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {t('شعبہ جات تقسیم', 'Department Distribution')}
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'inventory'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {t('راشن و مطعم الرٹس (4)', 'Low Stock Alerts (4)')}
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'departments'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {t('واجبات فیس الرٹ', 'Fee Due Alerts')}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('ریکارڈ تلاش کریں...', 'Search records...')}
              className="ps-8 pe-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 w-48 sm:w-60"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute start-2.5 top-2.5" />
          </div>
        </div>

        {/* Tab 1: Department Distribution */}
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-stone-900 font-h2">
                  {t('طلباء کی شعبہ وار تقسیم', 'Student Distribution Across Departments')}
                </h3>
                {MUDEER_DASHBOARD_DATA.departmentDistribution.map((dept, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-stone-700">
                        {t(dept.nameUrdu, dept.nameEnglish)}
                      </span>
                      <span className="font-bold text-emerald-900 font-mono">
                        {dept.count} {t('طلباء', 'students')} ({dept.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-800 rounded-full transition-all duration-500"
                        style={{ width: `${dept.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Status Cards */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t('انتظامی و مالیاتی خلاصہ', 'Operational Highlights')}
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'اساتذہ کی حاضری ۱۰۰٪ رہی، تمام ۱۵ درجات میں باقاعدہ تدریس جاری ہے۔',
                        'Faculty attendance at 100%; regular lectures held across all 15 class levels.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'دار الاقامہ میں کل ۳۱۲ بستر زیرِ استعمال ہیں، ۳۸ بستر مزید گنجائش دستیاب ہے۔',
                        'Hostel has 312 occupied beds, 38 beds currently vacant and available.'
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      {t(
                        'مطعم کے لیے آٹا اور کوکنگ آئل کا ذخیرہ کم سطح پر ہے، فوری منظوری کی ضرورت ہے۔',
                        'Wheat flour and cooking oil in kitchen mess are at reorder threshold.'
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inventory Alerts */}
        {activeTab === 'inventory' && (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 text-start">{t('شے کا نام', 'Item Name')}</th>
                  <th className="py-3 px-4 text-start">{t('موجودہ اسٹاک', 'Current Stock')}</th>
                  <th className="py-3 px-4 text-start">{t('کم از کم حد', 'Threshold')}</th>
                  <th className="py-3 px-4 text-start">{t('کیفیت', 'Status')}</th>
                  <th className="py-3 px-4 text-end">{t('اقدام', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {MUDEER_DASHBOARD_DATA.inventoryAlerts.map((item, i) => (
                  <tr key={i} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-semibold text-stone-800">
                      {t(item.itemUrdu, item.itemEnglish)}
                    </td>
                    <td className="py-3 px-4 font-mono text-rose-700 font-bold">{item.stock}</td>
                    <td className="py-3 px-4 font-mono text-stone-500">{item.minStock}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        {item.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button
                        onClick={() => handleOpenActionModal(t(`خریداری منظوری: ${item.itemUrdu}`, `Approve PO: ${item.itemEnglish}`))}
                        className="px-2.5 py-1 rounded bg-emerald-800 text-white text-[11px] font-semibold hover:bg-emerald-900"
                      >
                        {t('خریداری آرڈر منظور کریں', 'Approve PO')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Recent Fee Alerts */}
        {activeTab === 'departments' && (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 text-start">{t('طالب علم', 'Student')}</th>
                  <th className="py-3 px-4 text-start">{t('رول نمبر', 'Roll No')}</th>
                  <th className="py-3 px-4 text-start">{t('کلاس / درجہ', 'Class')}</th>
                  <th className="py-3 px-4 text-start">{t('واجب الادا رقم', 'Amount')}</th>
                  <th className="py-3 px-4 text-start">{t('اسٹیٹس', 'Status')}</th>
                  <th className="py-3 px-4 text-end">{t('اقدام', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {MUDEER_DASHBOARD_DATA.recentFeeAlerts.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-bold text-stone-800">{row.student}</td>
                    <td className="py-3 px-4 font-mono text-stone-500">{row.roll}</td>
                    <td className="py-3 px-4 text-stone-700">{row.class}</td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-700">{row.amount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button
                        onClick={() => handleOpenActionModal(t(`نوٹس ارسال: ${row.student}`, `Send Reminder: ${row.student}`))}
                        className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                      >
                        {t('یاد دہانی بھیجیں', 'Send Reminder')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action Modal (Simulated Mock Action) */}
      <MmsModal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
        title={modalAction}
        subtitle={t('ڈیمو ماڈل: کارروائی کا علامتی اندراج', 'Demo modal: Simulated system action')}
      >
        <div className="space-y-4 text-xs">
          <p className="text-stone-600">
            {t(
              'یہ ایک ڈیمو کارروائی ہے جو فیز ۱ میں فارم ڈسپلے اور سسٹم کے بہاؤ کو ظاہر کرتی ہے۔ فیز ۲ میں یہ براہ راست ڈیٹابیس میں محفوظ ہو گی۔',
              'This is a simulated demo action demonstrating Phase 1 UI flow. In Phase 2, this will commit directly to the backend database.'
            )}
          </p>
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
            <span className="font-bold text-emerald-900">{t('منتخب کارروائی:', 'Selected Action:')} </span>
            <span className="text-stone-800 font-semibold">{modalAction}</span>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={() => setQuickModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-semibold hover:bg-emerald-900"
            >
              {t('ٹھیک ہے (مکمل)', 'Acknowledge')}
            </button>
          </div>
        </div>
      </MmsModal>
    </div>
  );
};
