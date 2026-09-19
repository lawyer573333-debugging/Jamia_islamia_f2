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

        {/* Demo Notice Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6 py-2 flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-bold bg-amber-400 text-stone-950 text-[10px] uppercase">
              Phase 1
            </span>
            <span className="font-medium">
              {t(
                'مدارس مینجمنٹ سسٹم (MMS) — ابتدائی ماڈل (Mock Demo Mode)۔ حقیقی ڈیٹا بیس یا سپابیس منسلک نہیں ہے۔',
                'Madaris Management System (MMS) — Phase 1 Mock Demo Mode. No live database or Supabase connected.'
              )}
            </span>
          </div>
          <span className="hidden md:inline text-[11px] text-amber-800 font-semibold">
            {t('جامعۃ العلوم الاسلامیہ میرپور', 'Jamia Tul Uloom Mirpur AJK')}
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
