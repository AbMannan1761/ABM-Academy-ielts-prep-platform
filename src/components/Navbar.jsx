import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  User, 
  Menu, 
  X, 
  Flame, 
  CheckCircle,
  LayoutDashboard,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, user, onOpenOnboarding }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'guide', label: 'Study Guide' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'dashboard', label: 'Dashboard', highlight: true },
  ];

  const handleNavClick = (viewId) => {
    if (viewId === 'guide') {
      setCurrentView('dashboard');
      // trigger guide tab in dashboard
      window.dispatchEvent(new CustomEvent('switch-dash-tab', { detail: 'guide' }));
    } else if (viewId === 'features' || viewId === 'pricing') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(viewId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setCurrentView(viewId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: '0 2px 12px rgba(18, 35, 28, 0.05)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #12231C 0%, #247A52 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(18, 35, 28, 0.2)'
          }}>
            <GraduationCap style={{ width: '24px', height: '24px', color: '#68DBA2' }} />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--bg-dark)',
              letterSpacing: '-0.02em',
              display: 'block',
              lineHeight: 1.1
            }}>
              ABM Academy
            </span>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: 700, 
              color: 'var(--primary-dark)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em' 
            }}>
              AI IELTS Intelligence
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navLinks.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: item.highlight ? 'rgba(104, 219, 162, 0.15)' : 'transparent',
                  color: item.highlight ? 'var(--primary-dark)' : isActive ? 'var(--primary-dark)' : 'var(--text-dark)',
                  border: item.highlight ? '1px solid rgba(104, 219, 162, 0.4)' : 'none',
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {item.highlight && <LayoutDashboard style={{ width: '15px', height: '15px' }} />}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA / User Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* Free Test token pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.8rem',
            background: 'rgba(104, 219, 162, 0.14)',
            border: '1px solid rgba(104, 219, 162, 0.35)',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--primary-dark)'
          }}>
            <Sparkles style={{ width: '14px', height: '14px', color: '#1A7A4F' }} />
            <span>1 Free Mock Left</span>
          </div>

          {user ? (
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="btn btn-dark btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <User style={{ width: '15px', height: '15px', color: '#68DBA2' }} />
              <span>{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button 
              onClick={onOpenOnboarding}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Get Started</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              color: 'var(--text-dark)',
              display: 'none'
            }}
            className="mobile-toggle"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-color)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                textAlign: 'left',
                padding: '0.75rem',
                borderRadius: '8px',
                background: currentView === item.id ? 'var(--primary-light)' : 'transparent',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--text-dark)',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Inline styles for responsiveness */}
      <style>{`
        @media (min-width: 820px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 819px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
