import React from 'react';
import { Landmark, Users, BookOpen, GraduationCap, Calendar, Image as ImageIcon, Laptop } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ImagePlaceholder as ImagePlaceholderType } from '../types';

interface ImagePlaceholderProps {
  placeholder?: ImagePlaceholderType;
  title?: string;
  category?: 'branding' | 'campus' | 'leadership' | 'departments' | 'faculty' | 'gallery' | 'events';
  suggestedPath?: string;
  recommendedResolution?: string;
  aspectRatio?: string;
  className?: string;
  heightClass?: string;
  actualSrc?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  placeholder,
  title,
  category = placeholder?.category || 'campus',
  suggestedPath = placeholder?.suggestedPath || 'public/images/...',
  recommendedResolution = placeholder?.recommendedResolution || '1200x800 px',
  aspectRatio = placeholder?.aspectRatio || '16:9',
  className = '',
  heightClass = 'h-64 sm:h-72',
  actualSrc,
}) => {
  const { language, t } = useLanguage();

  const getCategoryIcon = () => {
    switch (category) {
      case 'campus':
        return Landmark;
      case 'leadership':
      case 'faculty':
        return GraduationCap;
      case 'departments':
        return BookOpen;
      case 'events':
        return Calendar;
      case 'gallery':
        return ImageIcon;
      default:
        return Landmark;
    }
  };

  const Icon = getCategoryIcon();
  const displayTitle = title || (placeholder ? (language === 'ur' ? placeholder.title.ur : placeholder.title.en) : '');

  if (actualSrc) {
    return (
      <img
        src={actualSrc}
        alt={displayTitle || 'Jamia Tul Uloom Al-Islamia'}
        className={`w-full h-full object-cover rounded-lg ${className}`}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-emerald-950/20 bg-stone-900 text-stone-100 flex flex-col items-center justify-center p-6 text-center select-none shadow-sm ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(6, 78, 59, 0.45) 0%, rgba(12, 20, 16, 0.95) 100%)`,
      }}
    >
      {/* Decorative Islamic Geometric subtle overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Decorative Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-400/40" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-400/40" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-400/40" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-400/40" />

      {/* Icon Emblem */}
      <div className="relative z-10 w-12 h-12 mb-3 rounded-full bg-emerald-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
        <Icon className="w-6 h-6" />
      </div>

      {/* Title */}
      {displayTitle && (
        <h4 className="relative z-10 text-sm sm:text-base font-semibold text-stone-100 mb-1 max-w-md">
          {displayTitle}
        </h4>
      )}

      {/* Primary Notice */}
      <p className="relative z-10 text-xs sm:text-sm font-medium text-amber-200/90 mb-2">
        {t(
          'انتظامیہ کی تصدیق شدہ اصل تصویر جلد شامل کی جائے گی',
          'Official institutional photograph will be published here upon verification'
        )}
      </p>

      {/* Technical Helper Badge for Maintainer */}
      <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-2 mt-2 px-3 py-1 rounded-md bg-stone-950/70 border border-stone-800 text-[11px] font-mono text-stone-400">
        <span className="text-emerald-400 font-sans font-medium">
          {t('فائل کا راستہ:', 'Path:')}
        </span>
        <code className="text-stone-300 select-all">{suggestedPath}</code>
        <span className="text-stone-500">|</span>
        <span className="text-amber-300/80">{recommendedResolution}</span>
      </div>
    </div>
  );
};
