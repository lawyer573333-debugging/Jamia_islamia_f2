import React, { useState } from 'react';
import { Play, Mic, Video, Volume2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mediaData } from '../../data/media';
import { VerificationBadge } from '../VerificationBadge';
import { MediaItem } from '../../types';

interface MediaViewProps {
  onNavigate: (viewId: string) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeMediaItem, setActiveMediaItem] = useState<MediaItem | null>(null);

  const filterOptions = [
    { id: 'all', ur: 'تمام میڈیا', en: 'All Media' },
    { id: 'bayan', ur: 'بیانات و خطابات', en: 'Speeches & Bayanat' },
    { id: 'lecture', ur: 'علمی دروس', en: 'Academic Lectures' },
    { id: 'quran_recitation', ur: 'تلاوتِ قرآن', en: 'Recitations' },
    { id: 'video', ur: 'ویڈیوز', en: 'Videos' },
  ];

  const filteredMedia = selectedType === 'all'
    ? mediaData
    : mediaData.filter((m) => m.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('آڈیو و ویڈیو میڈیا', 'Audio & Video Media')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('آڈیو بیانات، تلاوت و خطباتِ جمعہ', 'Scholarly Lectures, Sermons & Recitations')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'جامعۃ العلوم الاسلامیہ کے اکابرین کے علمی دروس، جمعہ کے بیانات اور طلبہ کے مسابقاتِ تلاوت کا سمعی و بصری شعبہ۔',
            'Repository of Islamic lectures, Friday sermons, scholarly discourses, and student Quranic recitations.'
          )}
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedType(f.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedType === f.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {t(f.ur, f.en)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Media Integrity Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'ہدایت برائے صداقتِ میڈیا: جامعۃ العلوم الاسلامیہ کے یوٹیوب یا سوشل میڈیا چینلز کا باضابطہ ربط انتظامیہ کی جانب سے منظور ہونے کے بعد شامل کیا جائے گا۔ غیر مصدقہ لنکس کی بجائے باوقار پلیس ہولڈرز رکھے گئے ہیں۔ (OFFICIAL MEDIA STREAM TO BE CONNECTED)',
            'Media Authenticity Mandate: Official YouTube and broadcast links will be attached upon official verification from the administration. Placeholder cards preserve structural readiness without fabricating external links. (OFFICIAL MEDIA STREAM TO BE CONNECTED)'
          )}
        </p>
      </div>

      {/* 3. Media Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Media Thumbnail Container with Play button overlay */}
              <div
                onClick={() => setActiveMediaItem(item)}
                className="relative h-48 bg-stone-900 flex items-center justify-center cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent" />
                <div className="w-14 h-14 rounded-full bg-emerald-700/90 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 z-10">
                  <Play className="w-6 h-6 ml-0.5 fill-current" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 z-10">
                  <span className="bg-stone-950/70 px-2 py-0.5 rounded font-mono text-[11px]">
                    {item.duration}
                  </span>
                  <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-[11px] truncate max-w-[180px]">
                    {t(item.speaker.ur, item.speaker.en)}
                  </span>
                </div>
              </div>

              {/* Media Info */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.type === 'video'
                      ? t('ویڈیو درس', 'Video Lecture')
                      : item.type === 'bayan'
                      ? t('بیان', 'Speech')
                      : item.type === 'quran_recitation'
                      ? t('تلاوتِ قرآن', 'Quran Recitation')
                      : t('علمی درس', 'Academic Lecture')}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 line-clamp-2">
                  {t(item.title.ur, item.title.en)}
                </h3>

                <p className="text-xs text-stone-500">
                  {t('مقرر / قاری:', 'Speaker / Reciter:')} <strong className="text-stone-700">{t(item.speaker.ur, item.speaker.en)}</strong>
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveMediaItem(item)}
                className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
              >
                <span>{t('میڈیا تفصیل دیکھیے', 'Inspect Media Item')}</span>
              </button>
              <VerificationBadge status={item.status} showIconOnly />
            </div>
          </div>
        ))}
      </div>

      {/* 4. Player Inspection Modal */}
      {activeMediaItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  {t('آڈیو / ویڈیو میڈیا پلیئر', 'Media Player System')}
                </span>
              </div>
              <button
                onClick={() => setActiveMediaItem(null)}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-emerald-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Media Simulated Screen */}
              <div className="h-56 rounded-xl bg-stone-900 text-white flex flex-col items-center justify-center p-6 text-center space-y-3 border border-stone-800">
                <div className="w-16 h-16 rounded-full bg-emerald-800/80 flex items-center justify-center text-amber-300">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-100 text-sm sm:text-base">
                    {t(activeMediaItem.title.ur, activeMediaItem.title.en)}
                  </h4>
                  <p className="text-xs text-stone-400">
                    {t('مقرر / قاری:', 'Speaker / Qari:')} {t(activeMediaItem.speaker.ur, activeMediaItem.speaker.en)}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-amber-400/90 bg-stone-950 px-3 py-1 rounded-full border border-stone-800">
                  OFFICIAL STREAM TO BE CONNECTED
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-base">
                  {t(activeMediaItem.title.ur, activeMediaItem.title.en)}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold">
                  {t(activeMediaItem.speaker.ur, activeMediaItem.speaker.en)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1 font-mono text-stone-600">
                <p><strong>Media Category:</strong> {activeMediaItem.type.toUpperCase()}</p>
                <p><strong>Ref Code:</strong> {activeMediaItem.id}</p>
                <p><strong>Configuration:</strong> Link verified YouTube URL or audio feed in <code>src/data/media.ts</code></p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveMediaItem(null)}
                className="px-4 py-2 rounded-lg bg-stone-800 text-white text-xs font-semibold hover:bg-stone-700 transition-colors"
              >
                {t('بند کریں', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
