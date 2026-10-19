import React, { useState, useEffect } from 'react';
import { 
  studyModules, 
  vocabularyList 
} from '../data/studyModulesData';
import { 
  mockWritingTest,
  mockSpeakingTest
} from '../data/mockTestData';
import { 
  LayoutDashboard, 
  Award, 
  BookOpen, 
  PenTool, 
  Mic, 
  Headphones, 
  Bot, 
  Flame, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Send, 
  Search, 
  BarChart2, 
  Play, 
  RotateCcw,
  Volume2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Dashboard({ user, onStartMockTest, onOpenOnboarding }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, mock-tests, practice, buddy, coach, guide, vocab, results
  
  // Uncle Sam AI Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'sam',
      text: "Hello! I'm Uncle Sam, your AI IELTS instructor. Paste any Writing essay here for an instant band 9 edit, or ask me for exam tips and strategies!"
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isCoachThinking, setIsCoachThinking] = useState(false);

  // Vocabulary Filter
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedBandFilter, setSelectedBandFilter] = useState('all');

  // Study Modules Progress State
  const [modulesState, setModulesState] = useState(studyModules);

  // Listen for custom nav event
  useEffect(() => {
    const handleSwitch = (e) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('switch-dash-tab', handleSwitch);
    return () => window.removeEventListener('switch-dash-tab', handleSwitch);
  }, []);

  const toggleModuleCompletion = (id) => {
    setModulesState(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const completedModulesCount = modulesState.filter(m => m.completed).length;
  const progressPercent = Math.round((completedModulesCount / modulesState.length) * 100);

  // Uncle Sam Chat Handler
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsCoachThinking(true);

    setTimeout(() => {
      let reply = "Here is my Band 9 diagnostic analysis: To increase your Lexical Resource, replace common verbs with academic collocations. For example, instead of 'make a problem worse', use 'exacerbate the predicament'. Maintain a balanced compound-complex structure in your sentences!";
      if (chatInput.toLowerCase().includes('writing') || chatInput.toLowerCase().includes('task 2')) {
        reply = "For Writing Task 2, remember the 4-paragraph golden structure: 1) Paraphrased prompt + clear thesis statement; 2) Body Paragraph 1 (PEEL structure: Point, Explanation, Example, Link); 3) Body Paragraph 2; 4) Concluding summary that mirrors your thesis without introducing new facts.";
      } else if (chatInput.toLowerCase().includes('speaking') || chatInput.toLowerCase().includes('cue card')) {
        reply = "In Speaking Part 2, spend 45 seconds of your preparation time sketching a 4-quadrant plan: Who, Where, What happened, and Why it was significant. Keep speaking until the examiner stops you!";
      } else if (chatInput.toLowerCase().includes('reading')) {
        reply = "The secret to TRUE/FALSE/NOT GIVEN: If the text directly contradicts the prompt, it is FALSE. If the text simply omits or does not confirm the claim, it is NOT GIVEN. Do NOT assume real-world facts!";
      }

      setChatMessages(prev => [...prev, { sender: 'sam', text: reply }]);
      setIsCoachThinking(false);
    }, 1000);
  };

  // Filtered Vocab
  const filteredVocab = vocabularyList.filter(v => {
    const matchesSearch = v.word.toLowerCase().includes(vocabSearch.toLowerCase()) || 
                          v.banglaMeaning.includes(vocabSearch) ||
                          v.definition.toLowerCase().includes(vocabSearch.toLowerCase());
    const matchesBand = selectedBandFilter === 'all' || v.bandLevel.toLowerCase().includes(selectedBandFilter.toLowerCase());
    return matchesSearch && matchesBand;
  });

  return (
    <div style={{ minHeight: '88vh', display: 'flex', backgroundColor: '#F5F8F6' }}>
      
      {/* ============================================================
          Left Sidebar Menu
          ============================================================ */}
      <aside style={{
        width: '260px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--border-color)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div>
          
          {/* User mini badge */}
          <div style={{
            padding: '1rem',
            background: 'var(--primary-light)',
            borderRadius: '14px',
            border: '1px solid rgba(104, 219, 162, 0.4)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-dark)',
              color: '#68DBA2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem'
            }}>
              {user?.name ? user.name.charAt(0) : 'C'}
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                {user?.name || 'IELTS Candidate'}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                Target Band: {user?.targetBand || '7.5'}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'mock-tests', label: 'Full Mock Tests', icon: Award, highlight: true },
              { id: 'practice', label: 'Section Practice', icon: Layers },
              { id: 'buddy', label: 'Speaking Buddy', icon: Mic },
              { id: 'coach', label: 'Uncle Sam AI Coach', icon: Bot },
              { id: 'guide', label: '21-Module Course', icon: BookOpen },
              { id: 'vocab', label: 'Vocabulary Bank', icon: PenTool },
              { id: 'results', label: 'Score Analytics', icon: BarChart2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.18s ease',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    color: isActive ? 'var(--primary-dark)' : 'var(--text-dark)',
                    borderLeft: isActive ? '4px solid var(--primary-dark)' : '4px solid transparent'
                  }}
                >
                  <Icon style={{ width: '18px', height: '18px', color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)' }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* October Challenge Banner in sidebar */}
        <div style={{
          background: 'linear-gradient(135deg, #12231C 0%, #1A352A 100%)',
          color: '#FFFFFF',
          padding: '1.2rem',
          borderRadius: '14px',
          textAlign: 'center'
        }}>
          <Flame style={{ width: '22px', height: '22px', color: '#F59E0B', margin: '0 auto 0.4rem' }} />
          <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>October Challenge</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', margin: '0.3rem 0 0.8rem' }}>
            5 mocks qualify for free IELTS exam sponsorship
          </div>
          <button 
            onClick={onStartMockTest}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', fontSize: '0.8rem' }}
          >
            Take Mock #1
          </button>
        </div>

      </aside>

      {/* ============================================================
          Main Dashboard View Area
          ============================================================ */}
      <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto' }}>
        
        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div>
            
            {/* Header Greeting */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                  Welcome back, {user?.name ? user.name.split(' ')[0] : 'Candidate'}! 👋
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Targeting Band {user?.targetBand || '7.5'} · Exam timeline: {user?.examTimeline || 'In 2 months'}
                </p>
              </div>

              <button 
                onClick={onStartMockTest}
                className="btn btn-primary"
                style={{ fontWeight: 800, gap: '0.6rem' }}
              >
                <Award style={{ width: '18px', height: '18px' }} />
                <span>Launch Full Mock Test</span>
              </button>
            </div>

            {/* Quick Diagnostic Band Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div className="card" style={{ borderLeft: '4px solid #3B82F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>Listening</span>
                  <Headphones style={{ width: '18px', height: '18px', color: '#3B82F6' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--bg-dark)', margin: '0.5rem 0' }}>
                  Band 7.5
                </div>
                <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>↑ +0.5 from baseline</span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #10B981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>Reading</span>
                  <BookOpen style={{ width: '18px', height: '18px', color: '#10B981' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--bg-dark)', margin: '0.5rem 0' }}>
                  Band 7.0
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>T/F/NG focus needed</span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #F59E0B' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>Writing</span>
                  <PenTool style={{ width: '18px', height: '18px', color: '#F59E0B' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--bg-dark)', margin: '0.5rem 0' }}>
                  Band 7.0
                </div>
                <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>Task 2 structure improved</span>
              </div>

              <div className="card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 700 }}>
                  <span>Speaking</span>
                  <Mic style={{ width: '18px', height: '18px', color: '#8B5CF6' }} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--bg-dark)', margin: '0.5rem 0' }}>
                  Band 7.5
                </div>
                <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>Fluent Part 2 monologue</span>
              </div>
            </div>

            {/* Two Column Layout: Roadmap & AI Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              
              {/* Personalized Roadmap Card */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                    Your Personal Study Roadmap
                  </h3>
                  <span className="badge badge-mint">{progressPercent}% Completed</span>
                </div>

                <div style={{ height: '8px', background: '#E1E7E4', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {modulesState.slice(0, 4).map(mod => (
                    <div 
                      key={mod.id} 
                      onClick={() => toggleModuleCompletion(mod.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        background: mod.completed ? '#F4FBF7' : '#F9FAF9',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle style={{ width: '18px', height: '18px', color: mod.completed ? '#10B981' : '#CBD5E1' }} />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--bg-dark)' }}>{mod.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mod.duration} · {mod.category}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: mod.completed ? '#10B981' : 'var(--text-muted)' }}>
                        {mod.completed ? 'Done' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveTab('guide')}
                  style={{
                    width: '100%',
                    marginTop: '1.25rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-dark)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>View all 21 Study Modules</span>
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

              {/* Quick AI Coaching Assistant */}
              <div className="card card-dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot style={{ width: '24px', height: '24px', color: 'var(--bg-dark)' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF' }}>Uncle Sam's Daily Advice</h3>
                      <span style={{ fontSize: '0.75rem', color: '#68DBA2', fontWeight: 700 }}>AI IELTS Instructor</span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-light-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    "Focus today on <strong>Writing Task 2 thesis statements</strong>. A common error candidates make is writing generic sentences like 'This essay will discuss both sides.' Instead, articulate your explicit stance right away!"
                  </p>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#68DBA2', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Recommended Today:
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 600 }}>
                      Try 1 Speaking drill with Harry on Abstract Questions.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button onClick={() => setActiveTab('coach')} className="btn btn-primary" style={{ flex: 1, fontSize: '0.88rem' }}>
                    Ask Uncle Sam
                  </button>
                  <button onClick={() => setActiveTab('buddy')} className="btn btn-outline-white" style={{ flex: 1, fontSize: '0.88rem' }}>
                    Practice Speaking
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: FULL MOCK TESTS ================= */}
        {activeTab === 'mock-tests' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                Computer-Based IELTS Mock Tests
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Simulate the real exam environment. Instant 30-second AI scoring across all 4 modules.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[
                { id: 1, title: 'IELTS Academic Mock Exam #01 (Diagnostic)', duration: '2 hours 45 mins', badge: 'Free Test', status: 'Available' },
                { id: 2, title: 'IELTS Academic Mock Exam #02 (High-Band)', duration: '2 hours 45 mins', badge: 'Pro Test', status: 'Unlocked' },
                { id: 3, title: 'IELTS Academic Mock Exam #03 (Intensive)', duration: '2 hours 45 mins', badge: 'Pro Test', status: 'Unlocked' },
                { id: 4, title: 'IELTS General Training Mock Exam #01', duration: '2 hours 45 mins', badge: 'General', status: 'Unlocked' }
              ].map(test => (
                <div key={test.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="badge badge-mint">{test.badge}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{test.status}</span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--bg-dark)' }}>
                      {test.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      Listening (40m) + Reading (60m) + Writing (60m) + Speaking (15m). Line-by-line AI scoring report.
                    </p>
                  </div>
                  <button 
                    onClick={onStartMockTest}
                    className="btn btn-primary"
                    style={{ width: '100%', fontWeight: 800 }}
                  >
                    Start Full Exam Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SECTION PRACTICE ================= */}
        {activeTab === 'practice' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                Section by Section Practice
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Target your weakest section. Up to 5 attempts per drill with instant inline feedback.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Listening Drill: Note & Map Completion', count: '10 Questions', attempts: '3 / 5 attempts', icon: Headphones },
                { title: 'Reading Drill: Academic T/F/NG Master', count: '5 Passages', attempts: '2 / 5 attempts', icon: BookOpen },
                { title: 'Writing Drill: Task 2 Fast Planning', count: '1 Essay Task', attempts: '4 / 5 attempts', icon: PenTool },
                { title: 'Speaking Drill: Part 2 Cue Card Stamina', count: '3 Cue Cards', attempts: '1 / 5 attempts', icon: Mic }
              ].map((drill, idx) => {
                const Icon = drill.icon;
                return (
                  <div key={idx} className="card">
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <Icon style={{ width: '22px', height: '22px', color: 'var(--primary-dark)' }} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--bg-dark)' }}>
                      {drill.title}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
                      <span>{drill.count}</span>
                      <span style={{ color: 'var(--primary-dark)' }}>{drill.attempts}</span>
                    </div>
                    <button onClick={onStartMockTest} className="btn btn-dark" style={{ width: '100%', fontSize: '0.9rem' }}>
                      Practice Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SPEAKING BUDDY ================= */}
        {activeTab === 'buddy' && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>AI Speaking Partners</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                Meet Harry & Mira
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Practice live voice speaking anytime. Choose Harry for grammar precision or Mira for natural conversation flow.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  color: '#68DBA2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Mic style={{ width: '30px', height: '30px' }} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--bg-dark)' }}>Harry</h3>
                <span style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', fontWeight: 700 }}>Structured & Analytical</span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '1rem 0 1.5rem', lineHeight: 1.5 }}>
                  Best for improving sentence variety, avoiding grammar blunders, and mastering formal academic diction.
                </p>
                <button onClick={onStartMockTest} className="btn btn-dark" style={{ width: '100%' }}>
                  Speak with Harry
                </button>
              </div>

              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#247A52',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Mic style={{ width: '30px', height: '30px' }} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--bg-dark)' }}>Mira</h3>
                <span style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', fontWeight: 700 }}>Conversational & Dynamic</span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '1rem 0 1.5rem', lineHeight: 1.5 }}>
                  Best for eliminating hesitation pauses, boosting everyday fluency, and sounding like a confident native speaker.
                </p>
                <button onClick={onStartMockTest} className="btn btn-primary" style={{ width: '100%' }}>
                  Speak with Mira
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: UNCLE SAM AI COACH ================= */}
        {activeTab === 'coach' && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot style={{ width: '28px', height: '28px', color: '#68DBA2' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                  Uncle Sam · 24/7 AI IELTS Instructor
                </h2>
                <span style={{ color: '#16A34A', fontSize: '0.85rem', fontWeight: 700 }}>● Online & Ready to Review</span>
              </div>
            </div>

            {/* Chat Box */}
            <div className="card" style={{ padding: '1.5rem', minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              
              {/* Message history */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '350px', paddingRight: '0.5rem' }}>
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '80%',
                      padding: '0.9rem 1.25rem',
                      borderRadius: '16px',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      backgroundColor: msg.sender === 'user' ? 'var(--bg-dark)' : 'var(--primary-light)',
                      color: msg.sender === 'user' ? '#FFFFFF' : 'var(--bg-dark)',
                      borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                      borderTopLeftRadius: msg.sender === 'sam' ? '4px' : '16px'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isCoachThinking && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Uncle Sam is evaluating and composing Band 9 feedback...
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <input 
                  type="text"
                  placeholder="Paste an essay paragraph, ask for Band 8 vocabulary, or query exam rules..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.2rem',
                    borderRadius: '12px',
                    border: '1.5px solid var(--border-color)',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
                <button onClick={handleSendMessage} className="btn btn-primary" style={{ padding: '0 1.5rem' }}>
                  <Send style={{ width: '18px', height: '18px' }} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 6: 21-MODULE STUDY GUIDE ================= */}
        {activeTab === 'guide' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                  Complete 21-Module Band 9 Study Guide
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Progress: {completedModulesCount} of 21 completed ({progressPercent}%)
                </p>
              </div>

              <div style={{ width: '200px' }}>
                <div style={{ height: '8px', background: '#E1E7E4', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {modulesState.map((mod) => (
                <div 
                  key={mod.id} 
                  className="card"
                  style={{
                    border: mod.completed ? '1.5px solid #10B981' : '1px solid var(--border-color)',
                    backgroundColor: mod.completed ? '#F8FCFA' : '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="badge badge-mint">{mod.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{mod.duration}</span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '0.5rem' }}>
                      {mod.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {mod.description}
                    </p>

                    <div style={{ background: 'var(--bg-light)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1.2rem' }}>
                      💡 {mod.keyTakeaway}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleModuleCompletion(mod.id)}
                    className={mod.completed ? "btn btn-outline" : "btn btn-primary"}
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    {mod.completed ? "Mark as Incomplete" : "Mark as Completed"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: VOCABULARY BANK ================= */}
        {activeTab === 'vocab' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                  Band 7–9 Academic Vocabulary Library
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Hand-curated high-frequency vocabulary with Bangla meaning, collocations, and IELTS examiner examples.
                </p>
              </div>

              {/* Search Bar */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text"
                  placeholder="Search word or meaning..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {filteredVocab.map(v => (
                <div key={v.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--bg-dark)' }}>{v.word}</span>
                    <span className="badge badge-gold">{v.bandLevel}</span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    <em>{v.partOfSpeech}</em> · {v.pronunciation}
                  </div>

                  <div style={{ background: 'var(--primary-light)', padding: '0.6rem 0.8rem', borderRadius: '8px', color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                    বাংলা অর্থ: {v.banglaMeaning}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                    <strong>Definition:</strong> {v.definition}
                  </p>

                  <div style={{ marginBottom: '0.8rem' }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Key Collocations:</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' }}>
                      {v.collocations.map((c, i) => (
                        <span key={i} style={{ background: '#F1F5F3', padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-dark)', fontStyle: 'italic' }}>
                    "{v.exampleSentence}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 8: RESULTS & ANALYTICS ================= */}
        {activeTab === 'results' && (
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                Performance Analytics & Score History
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Track your progress towards your target band score over time.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Score Progression Over Past Sessions
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { testName: 'Diagnostic Mock Test #1', date: 'Today', overall: '7.5', l: '7.5', r: '7.0', w: '7.0', s: '7.5' },
                  { testName: 'Baseline Practice Drill #1', date: '2 days ago', overall: '7.0', l: '7.0', r: '6.5', w: '6.5', s: '7.0' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAF9', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--bg-dark)' }}>{item.testName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date} · Verified with AI Scorer</div>
                      <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.82rem', marginTop: '0.4rem', color: 'var(--text-secondary)' }}>
                        <span>L: {item.l}</span>
                        <span>R: {item.r}</span>
                        <span>W: {item.w}</span>
                        <span>S: {item.s}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge badge-mint" style={{ fontSize: '1.1rem', padding: '0.4rem 0.9rem' }}>
                        Band {item.overall}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={onStartMockTest} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Take Another Mock Test to Improve Your Band
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
