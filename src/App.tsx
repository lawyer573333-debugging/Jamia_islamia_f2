import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { DepartmentsView } from './components/views/DepartmentsView';
import { DarsNizamiView } from './components/views/DarsNizamiView';
import { QuranEducationView } from './components/views/QuranEducationView';
import { ContemporaryEducationView } from './components/views/ContemporaryEducationView';
import { AdmissionsView } from './components/views/AdmissionsView';
import { FacultyView } from './components/views/FacultyView';
import { AnnouncementsView } from './components/views/AnnouncementsView';
import { EventsView } from './components/views/EventsView';
import { GalleryView } from './components/views/GalleryView';
import { MediaView } from './components/views/MediaView';
import { DocumentsView } from './components/views/DocumentsView';
import { ContactView } from './components/views/ContactView';
import { SetupGuideView } from './components/views/SetupGuideView';

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

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-amber-200 selection:text-stone-900">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        <main className="flex-1">
          {renderView()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </LanguageProvider>
  );
}
