import React, { useState } from 'react';
import { Bell, Calendar, Tag, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { announcementsData } from '../../data/announcements';
import { VerificationBadge } from '../VerificationBadge';

interface AnnouncementsViewProps {
  onNavigate: (viewId: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', ur: 'تمام اعلانات', en: 'All Notices' },
    { id: 'admission', ur: 'داخلہ', en: 'Admissions' },
    { id: 'exams', ur: 'امتحانات', en: 'Examinations' },
    { id: 'holidays', ur: 'تعطیلات', en: 'Holidays' },
    { id: 'events', ur: 'پروگرام و تقاریب', en: 'Programs' },
  ];

  const filteredAnnouncements = selectedCategory === 'all'
    ? announcementsData
    : announcementsData.filter((a) => a.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('اعلانات و نوٹس بورڈ', 'Announcements')}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
              {t('مرکزی نوٹس بورڈ و اعلانات', 'Institutional Announcements & Notice Board')}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
              {t(
                'جامعۃ العلوم الاسلامیہ میرپور کے داخلہ جات، امتحانی شیڈول اور تعطیلات سے متعلق باضابطہ سرکلرز۔',
                'Official circulars, examination notifications, academic schedules, and institutional memos.'
              )}
            </p>
          </div>
        </div>

        {/* Category Filters */}
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

      {/* 2. Demo Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'نوٹ برائے ناظرین: اس صفحے پر درج اعلانات ویب سائٹ کے ابتدائی ترقیاتی ورژن اور فنکشنل ڈیمو کے لیے بطورِ نمونہ شامل کیے گئے ہیں۔ اصل انتظامی نوٹیفیکیشنز جامعہ کی جانب سے جاری ہونے پر یہاں شائع کیے جائیں گے۔ (DEMO CONTENT — PENDING OFFICIAL CIRCULARS)',
            'Notice: Announcements displayed on this board are sample demo notices for layout validation. Official administrative circulars will be published once issued by the Jamia. (DEMO CONTENT — PENDING OFFICIAL CIRCULARS)'
          )}
        </p>
      </div>

      {/* 3. Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => {
          const isExpanded = expandedId === ann.id;
          return (
            <div
              key={ann.id}
              className={`bg-white rounded-xl border transition-all ${
                ann.isImportant ? 'border-amber-400/80 shadow-xs ring-1 ring-amber-400/20' : 'border-stone-200'
              }`}
            >
              <div
                onClick={() => toggleExpand(ann.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 hover:bg-stone-50/70 transition-colors rounded-xl"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                      {t(ann.categoryLabel.ur, ann.categoryLabel.en)}
                    </span>
                    {ann.isImportant && (
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {t('اہم ترین', 'High Priority')}
                      </span>
                    )}
                    {ann.isDemo && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-stone-100 text-stone-600 border border-stone-300">
                        DEMO NOTICE
                      </span>
                    )}
                    <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {ann.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    {t(ann.title.ur, ann.title.en)}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {t(ann.summary.ur, ann.summary.en)}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-stone-100 text-stone-600 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expandable Full Content */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-stone-100 bg-stone-50/50 rounded-b-xl space-y-4">
                  <div className="p-4 rounded-lg bg-white border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed">
                    {t(ann.fullText.ur, ann.fullText.en)}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-stone-500 font-mono">
                      Ref ID: {ann.id}
                    </span>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-emerald-800 hover:text-emerald-950 font-semibold"
                    >
                      {t('اس اعلان سے متعلق استفسار کریں', 'Inquire Regarding Notice')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
