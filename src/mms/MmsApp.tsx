import React, { useEffect, useState } from 'react';
import { useMmsAuth } from './context/MmsAuthContext';
import { MmsLayout } from './layouts/MmsLayout';
import { MmsLoginView } from './views/MmsLoginView';
import { MmsMudeerDashboard } from './views/MmsMudeerDashboard';
import { MmsTeacherDashboard } from './views/MmsTeacherDashboard';
import { MmsCounterDashboard } from './views/MmsCounterDashboard';
import { MmsParentDashboard } from './views/MmsParentDashboard';
import { MmsStudentsView } from './views/MmsStudentsView';
import { MmsGuardiansView } from './views/MmsGuardiansView';
import { MmsTeachersView } from './views/MmsTeachersView';
import { MmsClassesView } from './views/MmsClassesView';
import { MmsSubjectsView } from './views/MmsSubjectsView';
import { MmsClassSubjectsView } from './views/MmsClassSubjectsView';
import { MmsEnrollmentsView } from './views/MmsEnrollmentsView';
import { MmsPlaceholderView } from './views/MmsPlaceholderView';
import { MmsRole, InstitutionalPosition, MmsUser } from './types';
import { ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MmsAppProps {
  currentView: string;
  onNavigate: (route: string) => void;
}

// Helper to determine the authorized root dashboard for each user/role
export function getEffectiveDefaultRoute(
  user?: MmsUser | null,
  role?: MmsRole | null,
  position?: InstitutionalPosition | null
): string {
  const effectivePosition = position || user?.institutionalPosition;
  if (
    user?.canOversee ||
    effectivePosition === 'muhtamim' ||
    effectivePosition === 'nazim_aala' ||
    effectivePosition === 'departmental_nazim' ||
    role === 'mudeer'
  ) {
    return 'mms_dashboard';
  }

  switch (role) {
    case 'teacher':
      return 'mms_teacher';
    case 'counter':
      return 'mms_counter';
    case 'parent':
      return 'mms_parent';
    default:
      return 'mms_dashboard';
  }
}

// Backward-compatible role route helper
export function getRoleDefaultRoute(role: MmsRole): string {
  return getEffectiveDefaultRoute(null, role);
}

// Strict route validation per user and institutional authority
export function isRouteAllowedForUser(
  route: string,
  user: MmsUser | null,
  role: MmsRole | null
): boolean {
  if (route === 'mms_login') return true;

  const hasInstitutionalAuthority = Boolean(
    user?.canOversee ||
    user?.institutionalPosition === 'muhtamim' ||
    user?.institutionalPosition === 'nazim_aala' ||
    user?.institutionalPosition === 'departmental_nazim' ||
    role === 'mudeer'
  );

  if (hasInstitutionalAuthority) {
    // Institutional leaders have full access to institutional management and academic foundation modules,
    // but teacher/counter/parent personal desks remain role-specific
    return (
      !route.startsWith('mms_teacher') &&
      !route.startsWith('mms_counter') &&
      !route.startsWith('mms_parent')
    );
  }

  switch (role) {
    case 'teacher':
      return route.startsWith('mms_teacher');
    case 'counter':
      return route.startsWith('mms_counter');
    case 'parent':
      return route.startsWith('mms_parent');
    default:
      return false;
  }
}

// Backward-compatible role check helper
export function isRouteAllowedForRole(route: string, role: MmsRole): boolean {
  return isRouteAllowedForUser(route, null, role);
}

export const MmsApp: React.FC<MmsAppProps> = ({ currentView, onNavigate }) => {
  const { user, isAuthenticated, role, isLoading } = useMmsAuth();
  const { t, isRtl } = useLanguage();
  const [accessDeniedRoute, setAccessDeniedRoute] = useState<string | null>(null);

  // Redirect to role/authority-appropriate dashboard upon login
  const handleLoginSuccess = (userRole: MmsRole, position?: InstitutionalPosition) => {
    setAccessDeniedRoute(null);
    const targetRoute = getEffectiveDefaultRoute(user, userRole, position);
    onNavigate(targetRoute);
  };

  // Enforce role & institutional authority isolation whenever route, user, or role changes
  useEffect(() => {
    if (isAuthenticated && role && currentView.startsWith('mms_') && currentView !== 'mms_login') {
      if (!isRouteAllowedForUser(currentView, user, role)) {
        setAccessDeniedRoute(currentView);
        // Automatically route back to authorized dashboard
        const defaultRoute = getEffectiveDefaultRoute(user, role);
        onNavigate(defaultRoute);
      }
    }
  }, [currentView, isAuthenticated, user, role, onNavigate]);

  // Loading state while restoring Supabase session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-xl mb-4 overflow-hidden animate-pulse">
          <img
            src="/gallery/photo-01.png"
            alt="Jamia Emblem"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-semibold text-emerald-200 font-mono">
          جامعۃ العلوم الاسلامیہ — Supabase Auth...
        </p>
      </div>
    );
  }

  // If user lands on a dashboard route or subpage without being logged in, show login
  if (!isAuthenticated || !role || currentView === 'mms_login') {
    return (
      <MmsLoginView
        onLoginSuccess={handleLoginSuccess}
        onBackToWebsite={() => onNavigate('home')}
      />
    );
  }

  // Check if current route is unauthorized for this authenticated user and institutional authority
  const isAllowed = isRouteAllowedForUser(currentView, user, role);
  if (!isAllowed) {
    return (
      <MmsLayout
        currentRoute={currentView}
        onNavigateMms={onNavigate}
        onNavigateHome={() => onNavigate('home')}
      >
        <div className="bg-white rounded-2xl border border-rose-200 p-8 shadow-sm text-center max-w-lg mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-h2 mb-2">
            {t('غیر مجاز رسائی (Access Denied)', 'Access Denied (Unauthorized)')}
          </h2>
          <p className="text-xs text-stone-600 mb-6 leading-relaxed">
            {t(
              `آپ کا موجودہ منصب یا کردار اس ماڈیول تک رسائی کا مجاز نہیں ہے۔ سسٹم نے آپ کی حفاظت کے لیے رسائی مسدود کر دی ہے۔`,
              `Your current position or role is not authorized to access this module. Access has been restricted by institutional security policy.`
            )}
          </p>
          <button
            onClick={() => {
              setAccessDeniedRoute(null);
              onNavigate(getEffectiveDefaultRoute(user, role));
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors shadow-sm"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('اپنے مجاز ڈیش بورڈ پر واپس جائیں', 'Return to Your Authorized Dashboard')}</span>
          </button>
        </div>
      </MmsLayout>
    );
  }

  // Render specific MMS module or dashboard
  const renderMmsContent = () => {
    switch (currentView) {
      case 'mms_dashboard':
        return <MmsMudeerDashboard onNavigateMms={onNavigate} />;
      case 'mms_students':
        return <MmsStudentsView onNavigateMms={onNavigate} />;
      case 'mms_guardians':
        return <MmsGuardiansView onNavigateMms={onNavigate} />;
      case 'mms_teachers':
        return <MmsTeachersView onNavigateMms={onNavigate} />;
      case 'mms_classes':
        return <MmsClassesView onNavigateMms={onNavigate} />;
      case 'mms_subjects':
        return <MmsSubjectsView onNavigateMms={onNavigate} />;
      case 'mms_class_subjects':
        return <MmsClassSubjectsView onNavigateMms={onNavigate} />;
      case 'mms_enrollments':
        return <MmsEnrollmentsView onNavigateMms={onNavigate} />;
      case 'mms_teacher':
      case 'mms_teacher_classes':
      case 'mms_teacher_students':
      case 'mms_teacher_subjects':
        return <MmsTeacherDashboard onNavigateMms={onNavigate} />;
      case 'mms_counter':
      case 'mms_counter_students':
      case 'mms_counter_classes':
        return <MmsCounterDashboard onNavigateMms={onNavigate} />;
      case 'mms_parent':
      case 'mms_parent_children':
      case 'mms_parent_enrollment':
        return <MmsParentDashboard onNavigateMms={onNavigate} />;
      default:
        return (
          <MmsPlaceholderView
            moduleRoute={currentView}
            onNavigateMms={onNavigate}
          />
        );
    }
  };

  return (
    <MmsLayout
      currentRoute={currentView}
      onNavigateMms={onNavigate}
      onNavigateHome={() => onNavigate('home')}
    >
      {accessDeniedRoute && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {t(
                `غیر مجاز راستے (${accessDeniedRoute}) سے آپ کے اصل ڈیش بورڈ پر منتقل کیا گیا۔`,
                `Redirected from unauthorized route (${accessDeniedRoute}) to your role dashboard.`
              )}
            </span>
          </div>
          <button
            onClick={() => setAccessDeniedRoute(null)}
            className="text-stone-500 hover:text-stone-800 text-xs font-bold px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}
      {renderMmsContent()}
    </MmsLayout>
  );
};
