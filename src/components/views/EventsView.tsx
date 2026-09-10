import React, { useState } from 'react';
import { Calendar, MapPin, Tag, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { eventsData } from '../../data/events';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';

interface EventsViewProps {
  onNavigate: (viewId: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const categories = [
    { id: 'all', ur: 'تمام سرگرمیاں', en: 'All Events' },
    { id: 'khatm_bukhari', ur: 'ختمِ بخاری شریف', en: 'Khatm-e-Bukhari' },
    { id: 'competition', ur: 'مسابقات و مقابلے', en: 'Competitions' },
    { id: 'seminar', ur: 'تربیتی سیمینارز', en: 'Seminars' },
    { id: 'student_activity', ur: 'بزمِ خطابت و طلبہ سرگرمی', en: 'Student Oratory' },
  ];

  const filteredEvents = selectedCategory === 'all'
    ? eventsData
    : eventsData.filter((e) => e.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('سرگرمیاں و تقریبات', 'Events & Activities')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('جامعۃ العلوم الاسلامیہ کی سرگرمیاں و تقریبات', 'Institutional Activities & Annual Events')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'ختمِ بخاری شریف، دستارِ فضیلت، مسابقاتِ حسنِ قراءت، بزمِ خطابت اور اخلاقی و تربیتی نشستوں کا ریکارڈ۔',
            'Chronicle of academic convocations, Quranic competitions, oratory forums, and spiritual training seminars.'
          )}
        </p>

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

      {/* 2. Verification Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'نوٹ: ذیل میں درج تقریبات جامعہ کے سالانہ تعلیمی کلینڈر کی مناسبت سے بطورِ خاکہ و نمونہ درج ہیں۔ کسی بھی واقعے کی اصل تاریخ، مہمانانِ گرامی اور تصاویر جامعہ کے باضابطہ ریکارڈ سے تصدیق کے بعد اپلوڈ ہوں گی۔ (DEMO ARCHIVE — PENDING HISTORICAL VERIFICATION)',
            'Notice: The events below represent standard annual milestones of Islamic institutions provided as demonstrative archives. Specific event dates, guest rosters, and photographs will be updated from verified Jamia records. (DEMO ARCHIVE — PENDING HISTORICAL VERIFICATION)'
          )}
        </p>
      </div>

      {/* 3. Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <ImagePlaceholder
                category="events"
                placeholder={evt.placeholderImage}
                heightClass="h-52"
              />
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    {t(evt.categoryLabel.ur, evt.categoryLabel.en)}
                  </span>
                  <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    {evt.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  {t(evt.title.ur, evt.title.en)}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t(evt.location.ur, evt.location.en)}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                  {t(evt.description.ur, evt.description.en)}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>{t('جامعۃ العلوم الاسلامیہ میرپور', 'Jamia Tul Uloom, Mirpur')}</span>
              <VerificationBadge status={evt.status} showIconOnly />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
