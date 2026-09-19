import React, { useState } from 'react';
import {
  CreditCard,
  HandCoins,
  Coins,
  Receipt,
  FileCheck2,
  PlusCircle,
  Search,
  Printer,
  Download,
  CheckCircle,
  Filter,
  DollarSign,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { MmsStatCard } from '../components/MmsStatCard';
import { MmsModal } from '../components/MmsModal';
import { COUNTER_DASHBOARD_DATA } from '../data/mockData';

interface MmsCounterDashboardProps {
  onNavigateMms: (route: string) => void;
}

export const MmsCounterDashboard: React.FC<MmsCounterDashboardProps> = ({ onNavigateMms }) => {
  const { t } = useLanguage();
  const kpis = COUNTER_DASHBOARD_DATA.kpis;

  const [receipts, setReceipts] = useState(COUNTER_DASHBOARD_DATA.recentReceipts);
  const [newReceiptModalOpen, setNewReceiptModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Form state for new mock receipt
  const [formName, setFormName] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formType, setFormType] = useState('ماہانہ فیس');
  const [formMode, setFormMode] = useState('کیش');

  const filteredReceipts = receipts.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.receiptNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleCreateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formAmount) return;

    const newEntry = {
      receiptNo: `RCP-2026-0${892 + receipts.length}`,
      name: formName,
      type: formType,
      amount: `Rs. ${formAmount}`,
      mode: formMode,
      time: 'ابھی جاری شدہ (Just now)',
    };

    setReceipts([newEntry, ...receipts]);
    setNewReceiptModalOpen(false);
    setSelectedReceipt(newEntry);
    setPrintModalOpen(true);

    // Reset
    setFormName('');
    setFormAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-h2">
              {t('کاؤنٹر و فیس ڈیش بورڈ', 'Counter & Accounts Dashboard')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              {t('شعبہ مالیات و فیس کاؤنٹر', 'Finance & Cashier Desk')}
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            {t(
              'حافظ وقاص محمود — فیس وصولی، عمومی عطیات، زکوٰۃ و صدقات، اور رسیدات کا فوری اجراء۔',
              'Hafiz Waqas Mahmood — Student fee processing, general donations, Zakat collections, and instant vouchers.'
            )}
          </p>
        </div>

        <button
          onClick={() => setNewReceiptModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>{t('نئی رسید جاری کریں (+)', 'Issue New Receipt (+)')}</span>
        </button>
      </div>

      {/* 5 Required KPI Cards for Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Today's Fee Collection */}
        <MmsStatCard
          labelUrdu={kpis.todayFees.labelUrdu}
          labelEnglish={kpis.todayFees.labelEnglish}
          value={kpis.todayFees.value}
          subUrdu={kpis.todayFees.count}
          subEnglish={kpis.todayFees.count}
          icon={CreditCard}
          accentColor="emerald"
          onClick={() => onNavigateMms('mms_counter_fees')}
        />

        {/* 2. Today's Donations */}
        <MmsStatCard
          labelUrdu={kpis.todayDonations.labelUrdu}
          labelEnglish={kpis.todayDonations.labelEnglish}
          value={kpis.todayDonations.value}
          subUrdu={kpis.todayDonations.count}
          subEnglish={kpis.todayDonations.count}
          icon={HandCoins}
          accentColor="sky"
          onClick={() => onNavigateMms('mms_counter_donations')}
        />

        {/* 3. Today's Zakat */}
        <MmsStatCard
          labelUrdu={kpis.todayZakat.labelUrdu}
          labelEnglish={kpis.todayZakat.labelEnglish}
          value={kpis.todayZakat.value}
          subUrdu={kpis.todayZakat.count}
          subEnglish={kpis.todayZakat.count}
          icon={Coins}
          accentColor="amber"
          onClick={() => onNavigateMms('mms_counter_zakat')}
        />

        {/* 4. Today's Receipts */}
        <MmsStatCard
          labelUrdu={kpis.todayReceipts.labelUrdu}
          labelEnglish={kpis.todayReceipts.labelEnglish}
          value={kpis.todayReceipts.value}
          subUrdu={kpis.todayReceipts.count}
          subEnglish={kpis.todayReceipts.count}
          icon={Receipt}
          accentColor="stone"
          onClick={() => onNavigateMms('mms_counter_receipts')}
        />

        {/* 5. Pending Fee Records */}
        <MmsStatCard
          labelUrdu={kpis.pendingFeeRecords.labelUrdu}
          labelEnglish={kpis.pendingFeeRecords.labelEnglish}
          value={kpis.pendingFeeRecords.value}
          subUrdu={kpis.pendingFeeRecords.count}
          subEnglish={kpis.pendingFeeRecords.count}
          trend="فوری فالو اپ"
          trendType="warning"
          icon={FileCheck2}
          accentColor="rose"
        />
      </div>

      {/* Receipts Table with Search & Print */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50/60">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-stone-900 font-h2">
              {t('آج کی جاری کردہ رسیدات', "Today's Issued Receipts & Vouchers")}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {filteredReceipts.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('رسید نمبر یا نام سے تلاش...', 'Search by receipt # or name...')}
                className="ps-8 pe-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 w-56 sm:w-64"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute start-2.5 top-2.5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-stone-50 text-stone-600 border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 text-start">{t('رسید نمبر', 'Receipt #')}</th>
                <th className="py-3 px-4 text-start">{t('ادا کنندہ کا نام', 'Payer / Student')}</th>
                <th className="py-3 px-4 text-start">{t('مد / کیٹیگری', 'Category')}</th>
                <th className="py-3 px-4 text-start">{t('رقم', 'Amount')}</th>
                <th className="py-3 px-4 text-start">{t('ادائیگی طریقہ', 'Mode')}</th>
                <th className="py-3 px-4 text-start">{t('وقت', 'Time')}</th>
                <th className="py-3 px-4 text-end">{t('پرنٹ رسید', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredReceipts.map((row, i) => (
                <tr key={i} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-900">
                    {row.receiptNo}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-800">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                      {row.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-stone-900">
                    {row.amount}
                  </td>
                  <td className="py-3 px-4 text-stone-500">{row.mode}</td>
                  <td className="py-3 px-4 text-stone-400 font-mono text-[11px]">{row.time}</td>
                  <td className="py-3 px-4 text-end">
                    <button
                      onClick={() => {
                        setSelectedReceipt(row);
                        setPrintModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-medium inline-flex items-center gap-1 text-[11px]"
                      title="View & Print Voucher"
                    >
                      <Printer className="w-3 h-3 text-stone-500" />
                      <span>{t('رسید دیکھیں', 'View')}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Receipt Modal */}
      <MmsModal
        isOpen={newReceiptModalOpen}
        onClose={() => setNewReceiptModalOpen(false)}
        title={t('نئی رسید / فیس واؤچر جاری کریں', 'Issue New Payment Receipt')}
        subtitle={t('ڈیمو اندراج (فوری جاری شدہ رسید کی سمولیشن)', 'Mock Receipt Generator')}
      >
        <form onSubmit={handleCreateReceipt} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {t('ادا کنندہ / طالب علم کا نام:', 'Payer or Student Name:')}
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="محمد عثمان (والد: طارق جاوید)"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {t('رقم (PKR):', 'Amount (PKR):')}
              </label>
              <input
                type="number"
                required
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                placeholder="4500"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {t('مد / فنڈ:', 'Category:')}
              </label>
              <select
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white"
              >
                <option value="ماہانہ تعلیمی فیس">ماہانہ تعلیمی فیس (Tuition Fee)</option>
                <option value="ہاسٹل و طعام فیس">ہاسٹل و طعام فیس (Hostel/Mess)</option>
                <option value="زکوٰۃ فنڈ برائے طلباء">زکوٰۃ فنڈ (Zakat Fund)</option>
                <option value="صدقات و خیرات">صدقات و خیرات (Sadaqah)</option>
                <option value="عمومی عطیہ جامعہ">عمومی عطیہ (General Donation)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {t('ادائیگی کا طریقہ:', 'Payment Method:')}
            </label>
            <select
              value={formMode}
              onChange={(e) => setFormMode(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white"
            >
              <option value="کیش (نقد)">کیش (نقد - Cash)</option>
              <option value="بینک ٹرانسفر (آن لائن)">بینک ٹرانسفر (Online Transfer)</option>
              <option value="چیک / ڈرافٹ">چیک / ڈرافٹ (Cheque)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setNewReceiptModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50"
            >
              {t('منسوخ', 'Cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900"
            >
              {t('رسید جاری کریں (Generate)', 'Generate Receipt')}
            </button>
          </div>
        </form>
      </MmsModal>

      {/* Print / View Receipt Modal */}
      {selectedReceipt && (
        <MmsModal
          isOpen={printModalOpen}
          onClose={() => setPrintModalOpen(false)}
          title={t('رسید کی نقل / واؤچر', 'Official Receipt Voucher')}
          subtitle={selectedReceipt.receiptNo}
        >
          <div className="space-y-4 text-xs font-sans">
            <div className="p-5 border-2 border-dashed border-emerald-800/40 rounded-xl bg-emerald-50/30 space-y-3">
              <div className="text-center border-b border-emerald-800/20 pb-2">
                <h4 className="font-bold text-emerald-950 text-sm font-h2">
                  جامعۃ العلوم الاسلامیہ میرپور آزاد کشمیر
                </h4>
                <p className="text-[10px] text-stone-500">
                  شعبہ مالیات و حسابات | فیس و عطیات رسید
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-stone-700">
                <div>
                  <span className="text-stone-400">رسید نمبر: </span>
                  <span className="font-bold font-mono text-emerald-900">{selectedReceipt.receiptNo}</span>
                </div>
                <div>
                  <span className="text-stone-400">تاریخ و وقت: </span>
                  <span className="font-medium">{selectedReceipt.time}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400">محترم / طالب علم: </span>
                  <span className="font-bold text-stone-900">{selectedReceipt.name}</span>
                </div>
                <div>
                  <span className="text-stone-400">مد: </span>
                  <span className="font-medium">{selectedReceipt.type}</span>
                </div>
                <div>
                  <span className="text-stone-400">طریقہ: </span>
                  <span className="font-medium">{selectedReceipt.mode}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold text-stone-950">
                  <span>وصول شدہ رقم:</span>
                  <span className="text-base text-emerald-900 font-mono">{selectedReceipt.amount}</span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-stone-400 text-center">
                جزاكم الله خيراً — کمپیوٹرائزڈ رسید، دستخط کی حاجت نہیں۔
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setPrintModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900"
              >
                {t('بند کریں', 'Close')}
              </button>
            </div>
          </div>
        </MmsModal>
      )}
    </div>
  );
};
