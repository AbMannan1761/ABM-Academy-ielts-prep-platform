import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic, 
  Trophy, 
  Bot, 
  Flame, 
  HelpCircle,
  Play,
  Calculator,
  Award
} from 'lucide-react';

export default function LandingPage({ onStartMockTest, onOpenDashboard, onOpenOnboarding }) {
  const [activeModuleTab, setActiveModuleTab] = useState('writing');
  const [activeSpeakingBuddy, setActiveSpeakingBuddy] = useState('harry');

  // Band Calculator State
  const [calcListening, setCalcListening] = useState(32); // out of 40 (approx 7.5)
  const [calcReading, setCalcReading] = useState(30);   // out of 40 (approx 7.0)
  const [calcWriting, setCalcWriting] = useState(7.0);  // out of 9
  const [calcSpeaking, setCalcSpeaking] = useState(7.5); // out of 9

  // Helper to convert raw listening/reading marks to band
  const rawToBand = (raw) => {
    if (raw >= 39) return 9.0;
    if (raw >= 37) return 8.5;
    if (raw >= 35) return 8.0;
    if (raw >= 32) return 7.5;
    if (raw >= 30) return 7.0;
    if (raw >= 26) return 6.5;
    if (raw >= 23) return 6.0;
    if (raw >= 18) return 5.5;
    if (raw >= 16) return 5.0;
    return 4.5;
  };

  const lBand = rawToBand(calcListening);
  const rBand = rawToBand(calcReading);
  const average = (lBand + rBand + parseFloat(calcWriting) + parseFloat(calcSpeaking)) / 4;
  // IELTS Rounding: decimal .25 rounds up to .5, decimal .75 rounds up to next whole band
  const roundIELTS = (score) => {
    const dec = score % 1;
    const base = Math.floor(score);
    if (dec < 0.25) return base;
    if (dec < 0.75) return base + 0.5;
    return base + 1.0;
  };
  const overallBand = roundIELTS(average);

  return (
    <div className="landing-page">
      
      {/* ============================================================
          Hero Section
          ============================================================ */}
      <section style={{
        background: 'linear-gradient(180deg, #12231C 0%, #162C23 100%)',
        color: '#FFFFFF',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glows */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(104, 219, 162, 0.16) 0%, rgba(18, 35, 28, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.1rem',
            background: 'rgba(104, 219, 162, 0.12)',
            border: '1px solid rgba(104, 219, 162, 0.3)',
            borderRadius: '999px',
            color: '#68DBA2',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '1.75rem'
          }}>
            <Sparkles style={{ width: '15px', height: '15px' }} />
            <span>The IELTS Progress Intelligence Platform</span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 5vw, 4.4rem)',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            maxWidth: '920px',
            margin: '0 auto 1.5rem',
            color: '#FFFFFF'
          }}>
            We Don't Just Score You. <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #68DBA2 0%, #A7F3D0 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              We Decode You.
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: 'var(--text-light-muted)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Full computer-based mock tests across all 4 IELTS sections. Get certified-accuracy automated band scores in under 30 seconds with live voice speaking examiners.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button 
              onClick={onStartMockTest}
              className="btn btn-primary btn-lg"
              style={{ fontWeight: 800, gap: '0.6rem' }}
            >
              <span>Start Free Mock Test</span>
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>
            <button 
              onClick={onOpenDashboard}
              className="btn btn-outline-white btn-lg"
              style={{ fontWeight: 700 }}
            >
              <span>Open Student Dashboard</span>
            </button>
          </div>

          {/* 3 Pillar Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            textAlign: 'left'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              backdropFilter: 'blur(5px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>Sign up free</span>
                <CheckCircle style={{ width: '22px', height: '22px', color: '#68DBA2' }} />
              </div>
              <p style={{ color: 'var(--text-light-muted)', fontSize: '0.92rem', margin: 0 }}>
                No credit card required. Immediate instant access to diagnostic tests.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              backdropFilter: 'blur(5px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>1 Free Mock Test</span>
                <Trophy style={{ width: '22px', height: '22px', color: '#68DBA2' }} />
              </div>
              <p style={{ color: 'var(--text-light-muted)', fontSize: '0.92rem', margin: 0 }}>
                Full 4-section simulation + 1 practice drill with instant AI grading.
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              backdropFilter: 'blur(5px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>AI Speaking Agent</span>
                <Mic style={{ width: '22px', height: '22px', color: '#68DBA2' }} />
              </div>
              <p style={{ color: 'var(--text-light-muted)', fontSize: '0.92rem', margin: 0 }}>
                Real voice-to-voice speaking test with certified examiner rubrics.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          October Challenge / Scholarship Section
          ============================================================ */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid rgba(104, 219, 162, 0.5)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-gold" style={{ marginBottom: '1rem' }}>
                <Flame style={{ width: '15px', height: '15px' }} />
                <span>Special Challenge</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
                Take 5 Mock Tests. <br />
                <span style={{ color: 'var(--primary-dark)' }}>Win Your IELTS Registration Fee.</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Complete 5 full computer-based IELTS mock tests on Your English Prep. Qualify for our Final Mock Exam, score the highest, and we pay your entire official British Council / IDP IELTS exam fee!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Complete 5 Mock Tests on the platform',
                  'Qualify automatically for the Grand Final Mock',
                  'Receive certified Band 9 analysis on all attempts',
                  'Winner receives 100% official IELTS exam fee sponsorship'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(104, 219, 162, 0.2)',
                      color: 'var(--primary-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 800
                    }}>
                      {idx + 1}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onStartMockTest}
                className="btn btn-primary"
                style={{ fontWeight: 800 }}
              >
                Start Your Qualifying Mock Test
              </button>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #12231C 0%, #1D3A2F 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              color: '#FFFFFF',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(104, 219, 162, 0.15)',
                border: '2px solid rgba(104, 219, 162, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Trophy style={{ width: '42px', height: '42px', color: '#68DBA2' }} />
              </div>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#68DBA2', lineHeight: 1 }}>
                ৳23,500+
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
                Full IELTS Exam Fee Value
              </div>
              <p style={{ color: 'var(--text-light-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Save 90% in prep costs and compete to have your official registration fee fully reimbursed.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          Interactive 4-Module Experience
          ============================================================ */}
      <section id="features" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <div className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>All 4 Modules</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--bg-dark)' }}>
              Built Exactly Like The Real Test.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              From split-screen Reading to voice-recognition Speaking, prepare in the authentic environment without exam surprises.
            </p>
          </div>

          {/* Module Selector Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            {[
              { id: 'listening', label: 'Listening', icon: Headphones },
              { id: 'reading', label: 'Reading', icon: BookOpen },
              { id: 'writing', label: 'Writing (AI Graded)', icon: PenTool },
              { id: 'speaking', label: 'Speaking (Voice Agent)', icon: Mic },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeModuleTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveModuleTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 1.6rem',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: isActive ? '2px solid var(--primary-dark)' : '1px solid var(--border-color)',
                    backgroundColor: isActive ? 'var(--primary-light)' : '#FFFFFF',
                    color: isActive ? 'var(--primary-dark)' : 'var(--text-dark)'
                  }}
                >
                  <Icon style={{ width: '18px', height: '18px', color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Module Content Showcase */}
          <div style={{
            background: 'var(--bg-light)',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {activeModuleTab === 'writing' && (
              <>
                <div>
                  <div className="badge badge-mint" style={{ marginBottom: '1rem' }}>Instant AI Evaluation</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
                    Your Essay. AI-Graded in 30 Seconds.
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Stop waiting days for tutors to review your essays. Our AI engine examines your Task 1 charts and Task 2 essays across all four certified IELTS criteria with line-by-line feedback.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', listStyle: 'none' }}>
                    {[
                      'Task Achievement / Response breakdown with band score',
                      'Coherence & Cohesion paragraph sequencing analysis',
                      'Lexical Resource vocabulary range & collocation suggestions',
                      'Grammatical Range & Accuracy sentence variety scoring',
                      'Complete Band 9 Model Answers provided for every prompt'
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                        <CheckCircle style={{ width: '17px', height: '17px', color: 'var(--primary-dark)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onStartMockTest} className="btn btn-primary">
                    Try Writing Simulator Now
                  </button>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.8rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--bg-dark)' }}>Live AI Diagnostic Result</span>
                    <span className="badge badge-mint" style={{ fontSize: '0.85rem' }}>Band 7.5 Predicted</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.8rem', background: '#F8FAF9', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Task Response</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>8.0</div>
                    </div>
                    <div style={{ padding: '0.8rem', background: '#F8FAF9', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Coherence & Cohesion</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>7.5</div>
                    </div>
                    <div style={{ padding: '0.8rem', background: '#F8FAF9', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Lexical Resource</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>7.0</div>
                    </div>
                    <div style={{ padding: '0.8rem', background: '#F8FAF9', borderRadius: '10px' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Grammar Range</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>7.5</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '8px', margin: 0 }}>
                    💡 <em>"Excellent thesis positioning in paragraph 1. To reach Band 8.0, replace generic verbs like 'make' with 'foster' or 'cultivate'."</em>
                  </p>
                </div>
              </>
            )}

            {activeModuleTab === 'speaking' && (
              <>
                <div>
                  <div className="badge badge-mint" style={{ marginBottom: '1rem' }}>Voice Examiner Agent</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
                    Speak Naturally. Get Scored Instantly.
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Practicing speaking alone is challenging. With our voice recognition AI examiners, you experience an authentic 3-part interview with cue card prep timers and immediate voice assessment.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', listStyle: 'none' }}>
                    {[
                      'Part 1: Everyday conversation & fluency test',
                      'Part 2: 1-minute cue card scratchpad timer & 2-minute speech',
                      'Part 3: Deep abstract follow-up questions',
                      'Instant evaluation of Fluency, Pronunciation & Vocabulary'
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                        <CheckCircle style={{ width: '17px', height: '17px', color: 'var(--primary-dark)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onStartMockTest} className="btn btn-primary">
                    Launch Speaking Session
                  </button>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-dark)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(104, 219, 162, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    animation: 'pulseGlow 2s infinite'
                  }}>
                    <Mic style={{ width: '32px', height: '32px', color: '#68DBA2' }} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI Voice Examiner Listening</h4>
                  <p style={{ color: 'var(--text-light-muted)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
                    "Could you describe a challenging problem you solved recently?"
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                    <span>Real-time voice stream active</span>
                  </div>
                </div>
              </>
            )}

            {activeModuleTab === 'reading' && (
              <>
                <div>
                  <div className="badge badge-mint" style={{ marginBottom: '1rem' }}>Academic & General</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
                    Split-Screen Academic Reading
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Simulate the exact official computer-delivered IELTS interface. Text passage on the left side with text-highlighter tools, and interactive questions on the right side.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', listStyle: 'none' }}>
                    {[
                      'True / False / Not Given & Yes / No / Not Given mechanics',
                      'Matching Headings with intuitive drag/select options',
                      '60-minute real examination countdown timer',
                      'Detailed explanation for every single correct and wrong answer'
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                        <CheckCircle style={{ width: '17px', height: '17px', color: 'var(--primary-dark)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onStartMockTest} className="btn btn-primary">
                    Start Reading Test
                  </button>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ background: '#F0F4F2', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 700, color: 'var(--bg-dark)' }}>
                    Official Split Screen Simulation
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '180px' }}>
                    <div style={{ borderRight: '1px dashed #CAD5CF', paddingRight: '0.75rem', color: 'var(--text-secondary)', overflowY: 'auto' }}>
                      <p><strong>Passage 1:</strong> Rapid urbanization in the 21st century has transformed modern megacities into biophilic hubs...</p>
                    </div>
                    <div style={{ color: 'var(--text-dark)', overflowY: 'auto' }}>
                      <p><strong>Q1:</strong> More than 68% will live in urban areas by 2050?</p>
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                        <span style={{ padding: '0.3rem 0.6rem', background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: '6px', fontWeight: 700 }}>TRUE</span>
                        <span style={{ padding: '0.3rem 0.6rem', background: '#F1F5F3', borderRadius: '6px' }}>FALSE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeModuleTab === 'listening' && (
              <>
                <div>
                  <div className="badge badge-mint" style={{ marginBottom: '1rem' }}>4 Sections · 40 Questions</div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
                    Hear It. Answer It. Ace It.
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Authentic accents (British, Australian, Canadian, American) across everyday social inquiries to complex university lectures with auto-advancing audio.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', listStyle: 'none' }}>
                    {[
                      'Section 1: Daily life accommodation & ticket inquiries',
                      'Section 2: Tour guides, local parks & public facilities',
                      'Section 3: Student-professor academic project consultations',
                      'Section 4: University academic lecture with continuous note completion'
                    ].map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                        <CheckCircle style={{ width: '17px', height: '17px', color: 'var(--primary-dark)', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onStartMockTest} className="btn btn-primary">
                    Start Listening Test
                  </button>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.8rem',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play style={{ width: '18px', height: '18px', color: 'var(--bg-dark)', fill: 'var(--bg-dark)', marginLeft: '2px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--bg-dark)' }}>Section 1 Audio Track</div>
                      <div style={{ height: '4px', background: '#E1E7E4', borderRadius: '2px', marginTop: '0.3rem' }}>
                        <div style={{ width: '45%', height: '100%', background: 'var(--primary)' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#F8FAF9', padding: '1rem', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Question 1: Caller Name: Sarah [ <span style={{ color: 'var(--primary-dark)', fontWeight: 800 }}>Jenkins</span> ]
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================
          Meet The AI Mentors (Uncle Sam & Speaking Partners)
          ============================================================ */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-dark)', color: '#FFFFFF' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <div className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>AI Mentors</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF' }}>
              Meet Uncle Sam & Your Speaking Partners
            </h2>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              24/7 personalized coaching, score analysis, and live voice conversations tailored to your exact weaknesses.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            
            {/* Uncle Sam Card */}
            <div style={{
              background: 'var(--bg-dark-card)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #247A52 0%, #68DBA2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bot style={{ width: '32px', height: '32px', color: '#12231C' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>Uncle Sam</h3>
                    <span style={{ fontSize: '0.85rem', color: '#68DBA2', fontWeight: 700 }}>Your 24/7 Personal IELTS Instructor</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-light-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  Trained on tens of thousands of certified IELTS essays and examiner guidelines. Paste any writing task, ask for band 8 paraphrases, or get a diagnostic breakdown of where you lost marks.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  {['Instant Essay Proofreading & Rewrites', 'Personalized Daily Study Plans', 'Band 7+ Vocabulary & Idioms Guidance'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#FFFFFF' }}>
                      <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onOpenDashboard}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Chat with Uncle Sam
              </button>
            </div>

            {/* Speaking Partners Card */}
            <div style={{
              background: 'var(--bg-dark-card)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mic style={{ width: '30px', height: '30px', color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>Harry & Mira</h3>
                    <span style={{ fontSize: '0.85rem', color: '#68DBA2', fontWeight: 700 }}>AI Voice Speaking Partners</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <button
                    onClick={() => setActiveSpeakingBuddy('harry')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '8px',
                      background: activeSpeakingBuddy === 'harry' ? '#68DBA2' : 'rgba(255,255,255,0.1)',
                      color: activeSpeakingBuddy === 'harry' ? '#12231C' : '#FFFFFF',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Harry (Structured & Clear)
                  </button>
                  <button
                    onClick={() => setActiveSpeakingBuddy('mira')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '8px',
                      background: activeSpeakingBuddy === 'mira' ? '#68DBA2' : 'rgba(255,255,255,0.1)',
                      color: activeSpeakingBuddy === 'mira' ? '#12231C' : '#FFFFFF',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Mira (Natural Fluency)
                  </button>
                </div>

                <p style={{ color: 'var(--text-light-muted)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  {activeSpeakingBuddy === 'harry'
                    ? 'Harry focuses on calm, structured questions, grammatical precision, and clear enunciation. Perfect for candidates struggling with sentence structures.'
                    : 'Mira conducts dynamic, flowing conversational interviews, challenging you on idiomatic expressions and rapid idea formulation.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  {['Voice-Activated Responses', 'Pronunciation & Pacing Checks', 'Live Cue Card Feedback'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#FFFFFF' }}>
                      <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onOpenDashboard}
                className="btn btn-outline-white"
                style={{ width: '100%' }}
              >
                Start Speaking with {activeSpeakingBuddy === 'harry' ? 'Harry' : 'Mira'}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================
          Interactive IELTS Band Score Calculator Widget
          ============================================================ */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--bg-light)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 4vw, 3rem)',
            border: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div className="badge badge-mint" style={{ marginBottom: '1rem' }}>
                <Calculator style={{ width: '14px', height: '14px' }} />
                <span>Live Calculator</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
                Calculate Your Official IELTS Band
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Move the sliders to simulate your raw test scores and see how the official British Council / IDP rounding rules calculate your overall band score.
              </p>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span>Listening Correct Answers ({calcListening} / 40)</span>
                    <span style={{ color: 'var(--primary-dark)' }}>Band {lBand.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="40" 
                    value={calcListening} 
                    onChange={(e) => setCalcListening(parseInt(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span>Reading Correct Answers ({calcReading} / 40)</span>
                    <span style={{ color: 'var(--primary-dark)' }}>Band {rBand.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="40" 
                    value={calcReading} 
                    onChange={(e) => setCalcReading(parseInt(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span>Writing Predicted Band ({calcWriting})</span>
                    <span style={{ color: 'var(--primary-dark)' }}>Band {calcWriting}</span>
                  </div>
                  <input 
                    type="range" 
                    min="4.5" 
                    max="9.0" 
                    step="0.5" 
                    value={calcWriting} 
                    onChange={(e) => setCalcWriting(parseFloat(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <span>Speaking Predicted Band ({calcSpeaking})</span>
                    <span style={{ color: 'var(--primary-dark)' }}>Band {calcSpeaking}</span>
                  </div>
                  <input 
                    type="range" 
                    min="4.5" 
                    max="9.0" 
                    step="0.5" 
                    value={calcSpeaking} 
                    onChange={(e) => setCalcSpeaking(parseFloat(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Result Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid rgba(104, 219, 162, 0.4)'
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Predicted Overall Band Score
              </span>
              <div style={{
                fontSize: '5rem',
                fontWeight: 900,
                color: 'var(--bg-dark)',
                lineHeight: 1,
                margin: '1rem 0'
              }}>
                {overallBand.toFixed(1)}
              </div>
              <div style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                background: overallBand >= 7.0 ? 'rgba(104, 219, 162, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                color: overallBand >= 7.0 ? 'var(--primary-dark)' : '#B45309',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginBottom: '1.5rem'
              }}>
                {overallBand >= 8.0 ? 'Very Good User (CEFR C1/C2)' : overallBand >= 7.0 ? 'Good User (Meets Top University Requirements)' : 'Competent User'}
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Calculated raw average: {average.toFixed(2)} — rounded per official IELTS criteria.
              </p>

              <button onClick={onStartMockTest} className="btn btn-primary" style={{ width: '100%' }}>
                Test Your Actual Band Free
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          Pricing Plans
          ============================================================ */}
      <section id="pricing" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <div className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>Transparent Pricing</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--bg-dark)' }}>
              90% Cheaper Than Offline Coaching
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              Coaching centers charge ৳15,000–30,000. Get unlimited practice and instant AI grading for a fraction of that cost.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch'
          }}>
            
            {/* Free Trial */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-dark" style={{ marginBottom: '1rem' }}>Free Tier</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Free Trial</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--bg-dark)', marginBottom: '1.25rem' }}>
                  ৳0
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>1 Full Computer-Based Mock Test</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>1 Section Practice Session</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>5 Min Speaking Agent Session</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>Instant AI Band Report</span>
                  </li>
                </ul>
              </div>
              <button onClick={onStartMockTest} className="btn btn-outline" style={{ width: '100%' }}>
                Start Free
              </button>
            </div>

            {/* Starter Pack */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-mint" style={{ marginBottom: '1rem' }}>Starter Pack</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>5 Mock Tests</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--bg-dark)', marginBottom: '1.25rem' }}>
                  ৳99 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ one-time</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>5 Full AI-Scored Mock Tests</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>All 4 IELTS Modules Included</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>Band 9 Model Answers for Writing</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: 'var(--primary-dark)' }} />
                    <span>Credits Never Expire</span>
                  </li>
                </ul>
              </div>
              <button onClick={onOpenDashboard} className="btn btn-outline" style={{ width: '100%' }}>
                Get Starter Pack
              </button>
            </div>

            {/* Pro Pack (Featured) */}
            <div className="card card-dark" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '2px solid var(--primary)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-14px',
                right: '24px',
                background: 'var(--primary)',
                color: 'var(--bg-dark)',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '0.25rem 0.8rem',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}>
                Most Popular
              </div>
              <div>
                <span className="badge badge-mint" style={{ marginBottom: '1rem' }}>Pro Candidate</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>Pro Pack</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#68DBA2', marginBottom: '1.25rem' }}>
                  ৳299 <span style={{ fontSize: '0.9rem', color: 'var(--text-light-muted)', fontWeight: 500 }}>/ one-time</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                    <span>20 Full Computer-Based Mock Tests</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                    <span>10 Section-by-Section Practice Drills</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                    <span>Uncle Sam AI Essay Proofreader</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                    <span>Harry & Mira Speaking Partner Sessions</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: '#68DBA2' }} />
                    <span>Qualifies for IELTS Fee Scholarship</span>
                  </li>
                </ul>
              </div>
              <button onClick={onOpenDashboard} className="btn btn-primary" style={{ width: '100%', fontWeight: 800 }}>
                Get Pro Pack (৳299)
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
