import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import MockTestRunner from './components/MockTestRunner';
import OnboardingModal from './components/OnboardingModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'dashboard', 'mock-test'
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ielts_candidate_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return {
      name: 'IELTS Candidate',
      experience: 'First time',
      targetBand: '7.5',
      examTimeline: 'In 2 months',
      weakestSection: 'Writing',
      dailyHours: '1 hour',
      onboardingCompleted: true
    };
  });

  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('ielts_test_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const handleSaveResult = (newResult) => {
    const updated = [newResult, ...testHistory];
    setTestHistory(updated);
    localStorage.setItem('ielts_test_history', JSON.stringify(updated));
  };

  const handleCompleteOnboarding = (userData) => {
    setUser(userData);
    localStorage.setItem('ielts_candidate_user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Show Navbar on Home and Dashboard, but hide in full exam mode for focus */}
      {currentView !== 'mock-test' && (
        <Navbar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          user={user}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
      )}

      {/* Main Content Router */}
      <div style={{ flex: 1 }}>
        {currentView === 'home' && (
          <LandingPage 
            onStartMockTest={() => setCurrentView('mock-test')}
            onOpenDashboard={() => setCurrentView('dashboard')}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            user={user}
            onStartMockTest={() => setCurrentView('mock-test')}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}

        {currentView === 'mock-test' && (
          <MockTestRunner 
            onExit={() => setCurrentView('dashboard')}
            onSaveResult={handleSaveResult}
          />
        )}
      </div>

      {/* Show Footer on Home and Dashboard */}
      {currentView !== 'mock-test' && (
        <Footer setCurrentView={setCurrentView} />
      )}

      {/* Onboarding Wizard Modal */}
      <OnboardingModal 
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCompleteOnboarding}
      />

    </div>
  );
}
