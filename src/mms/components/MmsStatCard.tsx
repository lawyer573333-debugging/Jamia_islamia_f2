import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MmsStatCardProps {
  id?: string;
  labelUrdu: string;
  labelEnglish: string;
  value: string;
  subUrdu?: string;
  subEnglish?: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: LucideIcon;
  accentColor?: 'emerald' | 'amber' | 'stone' | 'rose' | 'sky';
  onClick?: () => void;
}

export const MmsStatCard: React.FC<MmsStatCardProps> = ({
  id,
  labelUrdu,
  labelEnglish,
  value,
  subUrdu,
  subEnglish,
  trend,
  trendType = 'neutral',
  icon: Icon,
  accentColor = 'emerald',
  onClick,
}) => {
  const { t } = useLanguage();

  const colorStyles = {
    emerald: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-800',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
      iconBg: 'bg-amber-100 text-amber-800',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    stone: {
      bg: 'bg-stone-100 text-stone-800 border-stone-200',
      iconBg: 'bg-stone-200 text-stone-700',
      badge: 'bg-stone-200 text-stone-800 border-stone-300',
    },
    rose: {
      bg: 'bg-rose-50 text-rose-900 border-rose-200',
      iconBg: 'bg-rose-100 text-rose-800',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
    },
    sky: {
      bg: 'bg-sky-50 text-sky-900 border-sky-200',
      iconBg: 'bg-sky-100 text-sky-800',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
    },
  }[accentColor];

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative bg-white border border-stone-200 rounded-xl p-5 shadow-xs transition-all hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-emerald-500/50' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">
            {t(labelUrdu, labelEnglish)}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-stone-900 font-mono tracking-tight">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  trendType === 'positive'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : trendType === 'negative'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : trendType === 'warning'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-stone-100 text-stone-600 border-stone-200'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {(subUrdu || subEnglish) && (
            <p className="mt-1.5 text-xs text-stone-500 line-clamp-1">
              {t(subUrdu || '', subEnglish || '')}
            </p>
          )}
        </div>

        <div className={`p-3 rounded-lg shrink-0 ${colorStyles.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
