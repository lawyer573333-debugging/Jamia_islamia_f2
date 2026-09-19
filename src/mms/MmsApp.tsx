import React, { useEffect } from 'react';
import { useMmsAuth } from './context/MmsAuthContext';
import { MmsLayout } from './layouts/MmsLayout';
import { MmsLoginView } from './views/MmsLoginView';
import { MmsMudeerDashboard } from './views/MmsMudeerDashboard';
import { MmsTeacherDashboard } from './views/MmsTeacherDashboard';
import { MmsCounterDashboard } from './views/MmsCounterDashboard';
import { MmsParentDashboard } from './views/MmsParentDashboard';
import { MmsPlaceholderView } from './views/MmsPlaceholderView';
import { MmsRole } from './types';

interface MmsAppProps {
  currentView: string;
  onNavigate: (route: string) => void;
}

export const MmsApp: React.FC<MmsAppProps> = ({ currentView, onNavigate }) => {
  const { user, isAuthenticated, role } = useMmsAuth();

  // Redirect to role-appropriate dashboard upon login
  const handleLoginSuccess = (userRole: MmsRole) => {
    switch (userRole) {
      case 'teacher':
        onNavigate('mms_teacher');
        break;
      case 'counter':
        onNavigate('mms_counter');
        break;
      case 'parent':
        onNavigate('mms_parent');
        break;
      case 'mudeer':
      default:
        onNavigate('mms_dashboard');
        break;
    }
  };

  // If user lands on a dashboard route or subpage without being logged in, show login
  if (!isAuthenticated || currentView === 'mms_login') {
    return (
      <MmsLoginView
        onLoginSuccess={handleLoginSuccess}
        onBackToWebsite={() => onNavigate('home')}
      />
    );
  }

  // Render specific MMS module or dashboard
  const renderMmsContent = () => {
    switch (currentView) {
      case 'mms_dashboard':
        return <MmsMudeerDashboard onNavigateMms={onNavigate} />;
      case 'mms_teacher':
        return <MmsTeacherDashboard onNavigateMms={onNavigate} />;
      case 'mms_counter':
        return <MmsCounterDashboard onNavigateMms={onNavigate} />;
      case 'mms_parent':
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
      {renderMmsContent()}
    </MmsLayout>
  );
};
