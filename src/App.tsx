import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { MmsAuthProvider } from './mms/context/MmsAuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Lazy-loaded Views
const HomeView = React.lazy(() => import('./components/views/HomeView').then(m => ({ default: m.HomeView })));
const AboutView = React.lazy(() => import('./components/views/AboutView').then(m => ({ default: m.AboutView })));
const DepartmentsView = React.lazy(() => import('./components/views/DepartmentsView').then(m => ({ default: m.DepartmentsView })));
const DarsNizamiView = React.lazy(() => import('./components/views/DarsNizamiView').then(m => ({ default: m.DarsNizamiView })));
const QuranEducationView = React.lazy(() => import('./components/views/QuranEducationView').then(m => ({ default: m.QuranEducationView })));
const ContemporaryEducationView = React.lazy(() => import('./components/views/ContemporaryEducationView').then(m => ({ default: m.ContemporaryEducationView })));
const AdmissionsView = React.lazy(() => import('./components/views/AdmissionsView').then(m => ({ default: m.AdmissionsView })));
const FacultyView = React.lazy(() => import('./components/views/FacultyView').then(m => ({ default: m.FacultyView })));
const AnnouncementsView = React.lazy(() => import('./components/views/AnnouncementsView').then(m => ({ default: m.AnnouncementsView })));
const EventsView = React.lazy(() => import('./components/views/EventsView').then(m => ({ default: m.EventsView })));
const GalleryView = React.lazy(() => import('./components/views/GalleryView').then(m => ({ default: m.GalleryView })));
const MediaView = React.lazy(() => import('./components/views/MediaView').then(m => ({ default: m.MediaView })));
const DocumentsView = React.lazy(() => import('./components/views/DocumentsView').then(m => ({ default: m.DocumentsView })));
const ContactView = React.lazy(() => import('./components/views/ContactView').then(m => ({ default: m.ContactView })));
const SetupGuideView = React.lazy(() => import('./components/views/SetupGuideView').then(m => ({ default: m.SetupGuideView })));
const MmsApp = React.lazy(() => import('./mms/MmsApp').then(m => ({ default: m.MmsApp })));

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  // Handle URL hash or direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentView(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    window.location.hash = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'departments':
        return <DepartmentsView onNavigate={handleNavigate} />;
      case 'dars_nizami':
        return <DarsNizamiView onNavigate={handleNavigate} />;
      case 'quran':
        return <QuranEducationView onNavigate={handleNavigate} />;
      case 'contemporary':
        return <ContemporaryEducationView onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsView onNavigate={handleNavigate} />;
      case 'faculty':
        return <FacultyView onNavigate={handleNavigate} />;
      case 'announcements':
        return <AnnouncementsView onNavigate={handleNavigate} />;
      case 'events':
        return <EventsView onNavigate={handleNavigate} />;
      case 'gallery':
        return <GalleryView onNavigate={handleNavigate} />;
      case 'media':
        return <MediaView onNavigate={handleNavigate} />;
      case 'documents':
        return <DocumentsView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView onNavigate={handleNavigate} />;
      case 'setup_guide':
        return <SetupGuideView onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  const isMmsRoute = currentView.startsWith('mms_');

  return (
    <LanguageProvider>
      <MmsAuthProvider>
        {isMmsRoute ? (
          <React.Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[60vh] text-stone-400 text-sm">لوڈ ہو رہا ہے... / Loading...</div>}>
            <MmsApp currentView={currentView} onNavigate={handleNavigate} />
          </React.Suspense>
        ) : (
          <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-amber-200 selection:text-stone-900">
            <Header currentView={currentView} onNavigate={handleNavigate} />
            <main className="flex-1">
              <React.Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[60vh] text-stone-400 text-sm">لوڈ ہو رہا ہے... / Loading...</div>}>
                {renderView()}
              </React.Suspense>
            </main>
            <Footer onNavigate={handleNavigate} />
          </div>
        )}
      </MmsAuthProvider>
    </LanguageProvider>
  );
}
