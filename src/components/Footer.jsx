import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function Footer({ setCurrentView }) {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-dark)',
      color: '#FFFFFF',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(104, 219, 162, 0.15)',
                border: '1px solid rgba(104, 219, 162, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap style={{ width: '22px', height: '22px', color: '#68DBA2' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800 }}>
                ABM Academy
              </span>
            </div>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              ABM Academy — Bangladesh's most authentic AI-powered computer-based IELTS mock test platform. Get certified-level automated band scores in under 30 seconds.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#68DBA2', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck style={{ width: '16px', height: '16px' }} />
              <span>95% Scoring Accuracy vs Human Examiners</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#FFFFFF' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <a 
                onClick={() => { setCurrentView('dashboard'); window.scrollTo(0,0); }}
                style={{ color: 'var(--text-light-muted)', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#68DBA2'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-light-muted)'}
              >
                Computer-Based Mock Tests
              </a>
              <a 
                onClick={() => { setCurrentView('dashboard'); window.dispatchEvent(new CustomEvent('switch-dash-tab', { detail: 'practice' })); }}
                style={{ color: 'var(--text-light-muted)', cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.style.color = '#68DBA2'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-light-muted)'}
              >
                Section-by-Section Practice
              </a>
              <a 
                onClick={() => { setCurrentView('dashboard'); window.dispatchEvent(new CustomEvent('switch-dash-tab', { detail: 'buddy' })); }}
                style={{ color: 'var(--text-light-muted)', cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.style.color = '#68DBA2'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-light-muted)'}
              >
                Buddy — AI Speaking Examiner
              </a>
              <a 
                onClick={() => { setCurrentView('dashboard'); window.dispatchEvent(new CustomEvent('switch-dash-tab', { detail: 'coach' })); }}
                style={{ color: 'var(--text-light-muted)', cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.style.color = '#68DBA2'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-light-muted)'}
              >
                ABM Coach — AI Writing Tutor
              </a>
              <a 
                onClick={() => { setCurrentView('dashboard'); window.dispatchEvent(new CustomEvent('switch-dash-tab', { detail: 'guide' })); }}
                style={{ color: 'var(--text-light-muted)', cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.style.color = '#68DBA2'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-light-muted)'}
              >
                21-Module Complete Course
              </a>
            </div>
          </div>

          {/* Pricing & Guarantee */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#FFFFFF' }}>Plans & Pricing</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-light-muted)' }}>
              <div>Starter Pack: <strong style={{ color: '#68DBA2' }}>৳99</strong> (5 Full Mocks)</div>
              <div>Pro Pack: <strong style={{ color: '#68DBA2' }}>৳299</strong> (20 Mocks + 10 Practice)</div>
              <div>Free Tier: 1 Full Mock + 1 Speaking Session</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#F59E0B' }}>
                <Award style={{ width: '16px', height: '16px' }} />
                <span>Test Credits Never Expire</span>
              </div>
            </div>
          </div>

          {/* Contacts & Location */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: '#FFFFFF' }}>Contact & Headquarters</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.88rem', color: 'var(--text-light-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#68DBA2', flexShrink: 0, marginTop: '2px' }} />
                <span>Ventura Iconia, Level 3, Plot 37, Road 11, Banani, Dhaka 1213, Bangladesh</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone style={{ width: '18px', height: '18px', color: '#68DBA2', flexShrink: 0 }} />
                <span>+880 1733-747764 (Sat–Thu, 9 AM – 6 PM BST)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail style={{ width: '18px', height: '18px', color: '#68DBA2', flexShrink: 0 }} />
                <span>support@abmacademy.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1.8rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-light-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>ABM Academy</strong>. All rights reserved.
          </div>
          <div>
            Trade Licence: TRAD/DNCC/010876/2026
          </div>
        </div>
      </div>
    </footer>
  );
}
