import React from 'react';
import { ShieldCheck, AlertCircle, Clock, FileQuestion } from 'lucide-react';
import { ContentStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface VerificationBadgeProps {
  status: ContentStatus;
  note?: string;
  showIconOnly?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  note,
  showIconOnly = false,
  className = '',
}) => {
  const { language } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          labelUrdu: 'مصدقہ معلومات',
          labelEnglish: 'Verified Record',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: ShieldCheck,
        };
      case 'unverified':
        return {
          labelUrdu: 'ابتدائی اندراج (زیرِ تصدیق)',
          labelEnglish: 'Preliminary (Pending Verification)',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: AlertCircle,
        };
      case 'placeholder':
        return {
          labelUrdu: 'عارضی خانہ پُری (پلیس ہولڈر)',
          labelEnglish: 'Placeholder',
          bg: 'bg-sky-50 text-sky-800 border-sky-200',
          icon: FileQuestion,
        };
      case 'draft':
      default:
        return {
          labelUrdu: 'مسودہ',
          labelEnglish: 'Draft',
          bg: 'bg-stone-100 text-stone-700 border-stone-200',
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const label = language === 'ur' ? config.labelUrdu : config.labelEnglish;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${config.bg} ${className}`}
      title={note || label}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {!showIconOnly && <span>{note || label}</span>}
    </span>
  );
};
