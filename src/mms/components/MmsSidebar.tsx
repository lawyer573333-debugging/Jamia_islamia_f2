import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck2,
  Award,
  CreditCard,
  HeartHandshake,
  Receipt,
  Wallet,
  Building2,
  Utensils,
  Package,
  ShoppingCart,
  BarChart3,
  Bell,
  Settings,
  FileSpreadsheet,
  BookmarkCheck,
  UserCheck,
  Clock,
  User,
  HandCoins,
  Coins,
  Heart,
  FileCheck2,
  X,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useMmsAuth } from '../context/MmsAuthContext';
import { ROLE_NAVIGATION } from '../data/mockData';
import { MmsNavItem } from '../types';

interface MmsSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MmsSidebar: React.FC<MmsSidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const { isRtl, t } = useLanguage();
  const { user, role, logout } = useMmsAuth();

  const currentRole = role || 'mudeer';
  const navItems: MmsNavItem[] = ROLE_NAVIGATION[currentRole] || ROLE_NAVIGATION.mudeer;

  // Icon mapping
  const renderIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard className={className} />;
      case 'Users': return <Users className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'CalendarCheck2': return <CalendarCheck2 className={className} />;
      case 'Award': return <Award className={className} />;
      case 'CreditCard': return <CreditCard className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Receipt': return <Receipt className={className} />;
      case 'Wallet': return <Wallet className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Package': return <Package className={className} />;
      case 'ShoppingCart': return <ShoppingCart className={className} />;
      case 'BarChart3': return <BarChart3 className={className} />;
      case 'Bell': return <Bell className={className} />;
      case 'Settings': return <Settings className={className} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
      case 'BookmarkCheck': return <BookmarkCheck className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'User': return <User className={className} />;
      case 'HandCoins': return <HandCoins className={className} />;
      case 'Coins': return <Coins className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'FileCheck2': return <FileCheck2 className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 ${
          isRtl ? 'right-0' : 'left-0'
        } z-45 h-screen w-72 bg-emerald-950 text-stone-100 flex flex-col border-e border-emerald-900/60 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen
            ? 'translate-x-0 shadow-2xl'
            : isRtl
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-emerald-900 flex items-center justify-between gap-3 bg-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-950 border-2 border-amber-400 flex items-center justify-center p-0.5 shrink-0 shadow-xs overflow-hidden">
              <img
                src="/gallery/photo-01.png"
                alt="Jamia Emblem"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-snug font-h2">
                {t('جامعۃ العلوم الاسلامیہ', 'Jamia Tul Uloom')}
              </h2>
              <p className="text-[11px] text-amber-300 font-medium">
                {t('مدارس مینجمنٹ سسٹم', 'Madaris Management System')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-emerald-300/80 uppercase tracking-wider">
            {t('نظام کے ماڈیولز', 'System Modules')}
          </div>

          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
                    : 'text-emerald-100/90 hover:bg-emerald-900/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <span
                    className={
                      isActive
                        ? 'text-stone-950'
                        : 'text-amber-400 group-hover:text-amber-300 transition-colors'
                    }
                  >
                    {renderIcon(item.iconName)}
                  </span>
                  <span className="truncate">
                    {t(item.labelUrdu, item.labelEnglish)}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className={`ms-2 px-2 py-0.5 text-[10px] rounded-full font-bold ${
                      isActive
                        ? 'bg-stone-950 text-amber-300'
                        : item.badgeType === 'warning'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-800 text-emerald-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom User info and Logout */}
        <div className="p-3 border-t border-emerald-900/80 bg-emerald-950/70">
          <div className="p-2.5 rounded-xl bg-emerald-900/50 border border-emerald-800/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0">
                {user?.nameEnglish.charAt(0) || 'U'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">
                  {t(user?.nameUrdu || '', user?.nameEnglish || '')}
                </p>
                <p className="text-[10px] text-emerald-300 truncate">
                  {t(user?.designationUrdu || '', user?.designationEnglish || '')}
                </p>
              </div>
            </div>

            <button
              onClick={async () => {
                await logout();
                onNavigate('mms_login');
              }}
              className="p-1.5 rounded-lg text-emerald-300 hover:text-rose-300 hover:bg-emerald-800 transition-colors shrink-0"
              title={t('لاگ آؤٹ', 'Logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
