import React, { useState } from 'react';
import { MmsSidebar } from '../components/MmsSidebar';
import { MmsTopBar } from '../components/MmsTopBar';
import { useLanguage } from '../../context/LanguageContext';
import { Info, Sparkles } from 'lucide-react';

interface MmsLayoutProps {
  currentRoute: string;
  onNavigateMms: (route: string) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const MmsLayout: React.FC<MmsLayoutProps> = ({
  currentRoute,
  onNavigateMms,
  onNavigateHome,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-stone-100 flex text-stone-900 antialiased selection:bg-amber-200 selection:text-stone-900">
      {/* MMS Sidebar */}
      <MmsSidebar
        currentRoute={currentRoute}
        onNavigate={onNavigateMms}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* MMS Top Bar */}
        <MmsTopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNavigateHome={onNavigateHome}
          onNavigateMms={onNavigateMms}
        />

        {/* Phase 2 Supabase Status Banner */}
        <div className="bg-emerald-950/5 border-b border-emerald-900/10 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-bold bg-emerald-800 text-white text-[10px] uppercase tracking-wider">
              Phase 2 Active
            </span>
            <span className="font-medium text-emerald-900">
              {t(
                'مدارس مینجمنٹ سسٹم — فیز ۲: سپابیس اتھنٹیکیشن، یوزر پروفائلز، اور رو لیول سیکیورٹی (RLS) فعال ہے۔',
                'Madaris Management System — Phase 2: Supabase Auth, User Profiles, and Row Level Security (RLS) Active.'
              )}
            </span>
          </div>
          <span className="hidden md:inline text-[11px] text-emerald-800 font-semibold font-mono">
            Jamia Tul Uloom MMS
          </span>
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
