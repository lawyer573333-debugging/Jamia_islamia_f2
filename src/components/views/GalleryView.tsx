import React, { useState } from 'react';
import { Image as ImageIcon, X, Info, ExternalLink, Calendar, Folder } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { galleryData, galleryCategories } from '../../data/gallery';
import { ImagePlaceholder } from '../ImagePlaceholder';
import { VerificationBadge } from '../VerificationBadge';
import { GalleryItem } from '../../types';

interface GalleryViewProps {
  onNavigate: (viewId: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate }) => {
  const { language, isRtl, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? galleryData
    : galleryData.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* 1. Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-800">
            {t('ہوم', 'Home')}
          </button>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">{t('تصویری گیلری', 'Photo Gallery')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">
          {t('جامعۃ العلوم الاسلامیہ کی تصویری گیلری', 'Campus Visual & Media Gallery')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl">
          {t(
            'کیمپس، کلاس رومز، حلقاتِ حفظِ قرآن، طلبہ سرگرمیوں اور سالانہ تقریبات کی باضابطہ تصویری جھلکیاں۔',
            'Photographic archive of the campus architecture, student memorization circles, academic lectures, and annual events.'
          )}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {t(cat.labelUrdu, cat.labelEnglish)}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Controlled Placeholder System Guide Strip */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t(
            'ہدایت برائے ڈویلپر و ایڈمن: تمام تصاویر پلیس ہولڈر سسٹم کے تحت رکھی گئی ہیں۔ کسی بھی تصویر پر کلک کر کے اس کا مخصوص فائل کا راستہ (File Path) اور تجویز کردہ سائز معلوم کیا جا سکتا ہے۔ تصاویر شامل کرنے کا تفصیلی طریقہ CONTENT_SETUP_GUIDE.md میں درج ہے۔',
            'Notice for Maintainer: All gallery slots operate on the controlled placeholder system. Click any image to view its recommended file path and dimensions. Detailed instructions are available in CONTENT_SETUP_GUIDE.md.'
          )}
        </p>
      </div>

      {/* 3. Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <ImagePlaceholder
                category="gallery"
                title={t(item.title.ur, item.title.en)}
                suggestedPath={item.suggestedFilePath}
                recommendedResolution="1200x800 px"
                heightClass="h-52"
                actualSrc={item.hasRealImage ? item.realImageUrl : undefined}
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {t(item.categoryLabel.ur, item.categoryLabel.en)}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {item.dateAdded}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {t(item.title.ur, item.title.en)}
                </h3>

                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {t(item.caption.ur, item.caption.en)}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
              <span className="truncate max-w-[200px]">{item.suggestedFilePath}</span>
              <span className="text-emerald-700 font-sans font-medium">{t('تفصیل', 'Details')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  {t('تصویر کا خاکہ و معلومات', 'Image Inspector')}
                </span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1 rounded-lg hover:bg-emerald-800 text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <ImagePlaceholder
                category="gallery"
                title={t(activeModalItem.title.ur, activeModalItem.title.en)}
                suggestedPath={activeModalItem.suggestedFilePath}
                recommendedResolution="1200x800 px (Landscape)"
                heightClass="h-64 sm:h-72"
                actualSrc={activeModalItem.hasRealImage ? activeModalItem.realImageUrl : undefined}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {t(activeModalItem.categoryLabel.ur, activeModalItem.categoryLabel.en)}
                  </span>
                  <VerificationBadge status={activeModalItem.status} />
                </div>

                <h3 className="text-lg font-bold text-stone-900">
                  {t(activeModalItem.title.ur, activeModalItem.title.en)}
                </h3>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {t(activeModalItem.caption.ur, activeModalItem.caption.en)}
                </p>
              </div>

              {/* Maintainer replacement metadata box */}
              <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1.5 font-mono">
                <p className="text-stone-700 font-sans font-bold mb-1">
                  {t('فائل تبدیل کرنے کی تفصیل:', 'Replacement Specifications:')}
                </p>
                <p className="text-stone-600">
                  <strong className="text-stone-800">Target Path:</strong> {activeModalItem.suggestedFilePath}
                </p>
                <p className="text-stone-600">
                  <strong className="text-stone-800">Format:</strong> JPG / WebP (1200x800 px)
                </p>
                <p className="text-stone-600">
                  <strong className="text-stone-800">Status:</strong> Official image pending from administration
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
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
