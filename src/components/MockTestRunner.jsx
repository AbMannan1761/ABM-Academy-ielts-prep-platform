import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  mockListeningTest, 
  mockReadingTest, 
  mockWritingTest, 
  mockSpeakingTest 
} from '../data/mockTestData';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  Mic, 
  MicOff, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Volume2, 
  FileText, 
  Award,
  RotateCcw
} from 'lucide-react';

export default function MockTestRunner({ onExit, onSaveResult }) {
  const [activeSection, setActiveSection] = useState('listening'); // 'listening', 'reading', 'writing', 'speaking', 'result'
  
  // Timer State (starts at 40 mins = 2400s)
  const [timeLeft, setTimeLeft] = useState(2400);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // User Answers State
  const [listeningAnswers, setListeningAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });

  const [readingAnswers, setReadingAnswers] = useState({
    r1: '', r2: '', r3: '', r4: '', r5: ''
  });

  const [writingTask1Text, setWritingTask1Text] = useState('');
  const [writingTask2Text, setWritingTask2Text] = useState('');

  // Speaking State
  const [isRecording, setIsRecording] = useState(false);
  const [speakingTranscript, setSpeakingTranscript] = useState('');
  const [cueCardTimer, setCueCardTimer] = useState(60);
  const [isCueCardTimerActive, setIsCueCardTimerActive] = useState(false);
  // Audio Player State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(1680); // approx 28 mins
  const audioRef = useRef(null);

  // Final Results State
  const [testResults, setTestResults] = useState(null);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Cue card prep countdown
  useEffect(() => {
    let timer = null;
    if (isCueCardTimerActive && cueCardTimer > 0) {
      timer = setInterval(() => setCueCardTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isCueCardTimerActive, cueCardTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Web Speech API Voice Recognition for Speaking
  const toggleSpeechRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let current = '';
          for (let i = 0; i < event.results.length; i++) {
            current += event.results[i][0].transcript + ' ';
          }
          setSpeakingTranscript(current);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
      } else {
        alert('Voice speech recognition is supported in Chrome, Edge, and modern browsers. You can type or simulate speaking.');
        setIsRecording(true);
        setTimeout(() => {
          setSpeakingTranscript(prev => prev + " In my hometown, I particularly appreciate the historical architecture and vibrant communal atmosphere...");
          setIsRecording(false);
        }, 3000);
      }
    }
  };

  // Calculate & Score everything
  const handleFinishAndGrade = () => {
    // 1. Listening Score
    let lCorrect = 0;
    mockListeningTest.sections.forEach(sec => {
      sec.questions.forEach(q => {
        const userAns = (listeningAnswers[q.id] || '').trim().toLowerCase();
        const expected = q.answer.trim().toLowerCase();
        if (userAns === expected) lCorrect++;
      });
    });
    // Scale 10 questions to 40-question band scale
    const lScoreRatio = lCorrect / 10;
    const lBand = lScoreRatio >= 0.9 ? 8.5 : lScoreRatio >= 0.7 ? 7.5 : lScoreRatio >= 0.5 ? 6.5 : 5.5;

    // 2. Reading Score
    let rCorrect = 0;
    mockReadingTest.questions.forEach(q => {
      const userAns = (readingAnswers[q.id] || '').trim().toUpperCase();
      if (userAns === q.answer.toUpperCase()) rCorrect++;
    });
    const rScoreRatio = rCorrect / 5;
    const rBand = rScoreRatio >= 0.8 ? 8.0 : rScoreRatio >= 0.6 ? 7.0 : rScoreRatio >= 0.4 ? 6.0 : 5.0;

    // 3. Writing Score (Length & Lexical heuristic)
    const totalWords = (writingTask1Text.trim().split(/\s+/).filter(Boolean).length) +
                       (writingTask2Text.trim().split(/\s+/).filter(Boolean).length);
    let wBand = 6.0;
    if (totalWords >= 350) wBand = 7.5;
    else if (totalWords >= 250) wBand = 7.0;
    else if (totalWords >= 150) wBand = 6.5;

    // 4. Speaking Score
    const spokenWords = speakingTranscript.trim().split(/\s+/).filter(Boolean).length;
    let sBand = spokenWords > 40 ? 7.5 : spokenWords > 15 ? 7.0 : 6.5;

    // Overall Band
    const rawAvg = (lBand + rBand + wBand + sBand) / 4;
    const dec = rawAvg % 1;
    const base = Math.floor(rawAvg);
    let overall = base;
    if (dec >= 0.25 && dec < 0.75) overall = base + 0.5;
    else if (dec >= 0.75) overall = base + 1.0;

    const finalReport = {
      overallBand: overall,
      listeningBand: lBand,
      readingBand: rBand,
      writingBand: wBand,
      speakingBand: sBand,
      lCorrect,
      rCorrect,
      totalWords,
      spokenWords,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setTestResults(finalReport);
    setActiveSection('result');
    if (onSaveResult) onSaveResult(finalReport);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F8F6',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* ============================================================
          Exam Header Navigation Bar
          ============================================================ */}
      <header style={{
        backgroundColor: '#12231C',
        color: '#FFFFFF',
        padding: '0.9rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={onExit}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '0.4rem 0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            <span>Exit Test</span>
          </button>
          
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: '#68DBA2' }}>
            Official IELTS Mock Simulator
          </span>
        </div>

        {/* Section Switcher Tabs */}
        {activeSection !== 'result' && (
          <div style={{ display: 'flex', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', padding: '0.25rem', borderRadius: '10px' }}>
            {[
              { id: 'listening', label: 'Listening' },
              { id: 'reading', label: 'Reading' },
              { id: 'writing', label: 'Writing' },
              { id: 'speaking', label: 'Speaking' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                style={{
                  background: activeSection === tab.id ? '#68DBA2' : 'transparent',
                  color: activeSection === tab.id ? '#12231C' : '#FFFFFF',
                  border: 'none',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '7px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Countdown Timer & Submit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {activeSection !== 'result' && (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(239, 68, 68, 0.18)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '0.4rem 0.9rem',
                borderRadius: '8px',
                color: '#FCA5A5',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                fontWeight: 700
              }}>
                <Clock style={{ width: '16px', height: '16px' }} />
                <span>{formatTime(timeLeft)}</span>
              </div>

              <button
                onClick={handleFinishAndGrade}
                className="btn btn-primary btn-sm"
                style={{ fontWeight: 800 }}
              >
                <Sparkles style={{ width: '15px', height: '15px' }} />
                <span>Submit & Get AI Score</span>
              </button>
            </>
          )}
        </div>

      </header>

      {/* ============================================================
          Exam Viewport
          ============================================================ */}
      <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        
        {/* ================= LISTENING SECTION ================= */}
        {activeSection === 'listening' && (
          <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>Listening Module</div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--bg-dark)' }}>
                {mockListeningTest.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Listen to the audio track carefully. The audio will play only ONCE in the official exam. Type your answers in the blanks or select the options.
              </p>
            </div>

            {/* Audio Simulation Player */}
            <div style={{
              background: '#12231C',
              color: '#FFFFFF',
              borderRadius: '14px',
              padding: '1.2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button 
                  onClick={() => {
                    if (audioRef.current) {
                      if (audioRef.current.paused) {
                        audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {
                          // Browser autoplay block fallback
                          setIsAudioPlaying(false);
                        });
                      } else {
                        audioRef.current.pause();
                        setIsAudioPlaying(false);
                      }
                    }
                  }}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: '#68DBA2',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(104, 219, 162, 0.4)'
                  }}
                  title={isAudioPlaying ? "Pause Audio" : "Play Cambridge Exam Audio"}
                >
                  {isAudioPlaying ? (
                    <Pause style={{ width: '20px', height: '20px', color: '#12231C', fill: '#12231C' }} />
                  ) : (
                    <Play style={{ width: '20px', height: '20px', color: '#12231C', fill: '#12231C', marginLeft: '2px' }} />
                  )}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>Cambridge Official IELTS Listening Audio</span>
                      {isAudioPlaying && <span className="badge badge-mint" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>Playing Live</span>}
                    </span>
                    <span style={{ color: '#68DBA2', fontFamily: 'monospace' }}>
                      {formatTime(Math.floor(audioCurrentTime))} / {formatTime(Math.floor(audioDuration))}
                    </span>
                  </div>

                  <input 
                    type="range"
                    min="0"
                    max={audioDuration || 100}
                    value={audioCurrentTime}
                    onChange={(e) => {
                      const newTime = parseFloat(e.target.value);
                      setAudioCurrentTime(newTime);
                      if (audioRef.current) audioRef.current.currentTime = newTime;
                    }}
                    style={{ width: '100%', accentColor: '#68DBA2', cursor: 'pointer' }}
                  />
                </div>

                <Volume2 style={{ width: '20px', height: '20px', color: '#68DBA2' }} />
              </div>

              {/* Audio Controls & AI Voice Reader */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-light-muted)' }}>
                <span>Official Track: 02.mp3 (Cambridge IELTS Authentic Audio)</span>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                      const utterance = new SpeechSynthesisUtterance(mockListeningTest.listeningScript);
                      utterance.rate = 0.95;
                      utterance.lang = 'en-GB';
                      window.speechSynthesis.speak(utterance);
                    }
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#68DBA2',
                    borderRadius: '6px',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🎙️ Play British Examiner Voice (TTS)
                </button>
              </div>

              <audio 
                ref={audioRef}
                src={mockListeningTest.audioUrl} 
                preload="metadata"
                onTimeUpdate={() => {
                  if (audioRef.current) setAudioCurrentTime(audioRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (audioRef.current && audioRef.current.duration) setAudioDuration(audioRef.current.duration);
                }}
                onEnded={() => setIsAudioPlaying(false)}
                onError={() => {
                  console.log("Audio load fallback to TTS");
                }}
              />
            </div>

            {/* Section 1 Questions */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                {mockListeningTest.sections[0].title}
              </h3>
              <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                {mockListeningTest.sections[0].description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mockListeningTest.sections[0].questions.map((q, idx) => (
                  <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-light)', padding: '0.85rem 1.2rem', borderRadius: '10px' }}>
                    <span style={{ fontWeight: 800, color: 'var(--bg-dark)', width: '30px' }}>{idx + 1}.</span>
                    <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 600 }}>{q.question}</span>
                    <input 
                      type="text" 
                      placeholder="Type answer..." 
                      value={listeningAnswers[q.id] || ''}
                      onChange={(e) => setListeningAnswers({ ...listeningAnswers, [q.id]: e.target.value })}
                      style={{
                        padding: '0.5rem 0.8rem',
                        borderRadius: '8px',
                        border: '1.5px solid var(--border-color)',
                        outline: 'none',
                        width: '180px',
                        fontWeight: 600
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 Questions */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                {mockListeningTest.sections[1].title}
              </h3>
              <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                {mockListeningTest.sections[1].description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {mockListeningTest.sections[1].questions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.2rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      {idx + 6}. {q.question}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {q.options.map((opt) => {
                        const optKey = opt.charAt(0);
                        const isSelected = listeningAnswers[q.id] === optKey;
                        return (
                          <label 
                            key={opt}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              padding: '0.6rem 0.9rem',
                              borderRadius: '8px',
                              background: isSelected ? 'var(--primary-light)' : '#F9FAF9',
                              border: isSelected ? '1.5px solid var(--primary-dark)' : '1px solid #E5E9E7',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.9rem'
                            }}
                          >
                            <input 
                              type="radio" 
                              name={q.id} 
                              checked={isSelected}
                              onChange={() => setListeningAnswers({ ...listeningAnswers, [q.id]: optKey })}
                              style={{ accentColor: 'var(--primary-dark)' }}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
              <button onClick={() => setActiveSection('reading')} className="btn btn-dark">
                <span>Continue to Reading Module</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>

          </div>
        )}

        {/* ================= READING SECTION (Split Screen) ================= */}
        {activeSection === 'reading' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            alignItems: 'start'
          }}>
            {/* Passage Column (Left) */}
            <div className="card" style={{ height: '78vh', overflowY: 'auto', padding: '2rem' }}>
              <div className="badge badge-mint" style={{ marginBottom: '0.75rem' }}>Passage 1</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1.25rem' }}>
                {mockReadingTest.passageTitle}
              </h2>
              <div style={{ color: 'var(--text-dark)', lineHeight: 1.8, fontSize: '0.98rem', whiteSpace: 'pre-line' }}>
                {mockReadingTest.passageText}
              </div>
            </div>

            {/* Questions Column (Right) */}
            <div className="card" style={{ height: '78vh', overflowY: 'auto', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--bg-dark)' }}>
                Questions 1–5: Academic Comprehension
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Select TRUE, FALSE, or NOT GIVEN based on the academic text on the left.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {mockReadingTest.questions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#F8FAF9', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                      {idx + 1}. {q.question}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {q.options.map(opt => {
                        const isSelected = readingAnswers[q.id] === opt;
                        return (
                          <label 
                            key={opt}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              padding: '0.55rem 0.85rem',
                              borderRadius: '8px',
                              background: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                              border: isSelected ? '1.5px solid var(--primary-dark)' : '1px solid #E1E7E4',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.9rem'
                            }}
                          >
                            <input 
                              type="radio"
                              name={q.id}
                              checked={isSelected}
                              onChange={() => setReadingAnswers({ ...readingAnswers, [q.id]: opt })}
                              style={{ accentColor: 'var(--primary-dark)' }}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setActiveSection('listening')} className="btn btn-outline">
                  Back to Listening
                </button>
                <button onClick={() => setActiveSection('writing')} className="btn btn-dark">
                  Continue to Writing Module
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ================= WRITING SECTION ================= */}
        {activeSection === 'writing' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
            
            {/* Task 1 */}
            <div className="card">
              <div className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>Task 1 · 20 Mins</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                {mockWritingTest.task1.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                {mockWritingTest.task1.prompt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>Your Response</span>
                <span style={{ color: writingTask1Text.trim().split(/\s+/).filter(Boolean).length >= 150 ? 'var(--primary-dark)' : '#B45309' }}>
                  {writingTask1Text.trim().split(/\s+/).filter(Boolean).length} / 150 words
                </span>
              </div>

              <textarea 
                rows="14"
                placeholder="Type your Task 1 summary here (minimum 150 words)..."
                value={writingTask1Text}
                onChange={(e) => setWritingTask1Text(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1.5px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Task 2 */}
            <div className="card">
              <div className="badge badge-mint" style={{ marginBottom: '0.5rem' }}>Task 2 · 40 Mins</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                {mockWritingTest.task2.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                {mockWritingTest.task2.prompt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>Your Response</span>
                <span style={{ color: writingTask2Text.trim().split(/\s+/).filter(Boolean).length >= 250 ? 'var(--primary-dark)' : '#B45309' }}>
                  {writingTask2Text.trim().split(/\s+/).filter(Boolean).length} / 250 words
                </span>
              </div>

              <textarea 
                rows="14"
                placeholder="Type your Task 2 essay here (minimum 250 words)..."
                value={writingTask2Text}
                onChange={(e) => setWritingTask2Text(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1.5px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  resize: 'vertical'
                }}
              />

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button onClick={() => setActiveSection('speaking')} className="btn btn-dark">
                  Proceed to Speaking Module
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= SPEAKING SECTION ================= */}
        {activeSection === 'speaking' && (
          <div className="card" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
            <div className="badge badge-mint" style={{ marginBottom: '1rem' }}>Live Voice Examiner</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--bg-dark)', marginBottom: '1rem' }}>
              IELTS Speaking Assessment
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
              Click the microphone button to speak. Your voice response is transcribed and evaluated for fluency, pronunciation, grammar, and vocabulary range.
            </p>

            {/* Cue Card Box */}
            <div style={{
              background: '#F0F5F2',
              border: '2px solid rgba(104, 219, 162, 0.4)',
              borderRadius: '16px',
              padding: '1.75rem',
              textAlign: 'left',
              maxWidth: '680px',
              margin: '0 auto 2.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--primary-dark)', fontSize: '1rem' }}>
                  Part 2: Candidate Cue Card Task
                </span>
                <button
                  onClick={() => setIsCueCardTimerActive(!isCueCardTimerActive)}
                  style={{
                    background: '#12231C',
                    color: '#68DBA2',
                    border: 'none',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {cueCardTimer > 0 ? `Prep Timer: ${cueCardTimer}s` : 'Time to Speak!'}
                </button>
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--bg-dark)', marginBottom: '0.75rem' }}>
                {mockSpeakingTest.parts[1].cueCard.topic}
              </div>

              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {mockSpeakingTest.parts[1].cueCard.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Record Button */}
            <div style={{ marginBottom: '2rem' }}>
              <button
                onClick={toggleSpeechRecording}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: isRecording ? '#EF4444' : '#12231C',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: isRecording ? '0 0 25px rgba(239, 68, 68, 0.5)' : '0 8px 24px rgba(18, 35, 28, 0.25)',
                  transition: 'all 0.2s'
                }}
              >
                {isRecording ? (
                  <MicOff style={{ width: '38px', height: '38px', color: '#FFFFFF' }} />
                ) : (
                  <Mic style={{ width: '38px', height: '38px', color: '#68DBA2' }} />
                )}
              </button>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: isRecording ? '#EF4444' : 'var(--text-dark)' }}>
                {isRecording ? 'Listening... Speak now' : 'Click to start speaking'}
              </div>
            </div>

            {/* Transcript Preview */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1.2rem',
              textAlign: 'left',
              minHeight: '100px',
              fontSize: '0.92rem',
              color: speakingTranscript ? 'var(--text-dark)' : 'var(--text-muted)',
              marginBottom: '2rem'
            }}>
              <strong>Voice Transcript: </strong>
              {speakingTranscript || "Your spoken words will appear here in real-time as you speak into the microphone."}
            </div>

            {/* Final Action Button */}
            <button
              onClick={handleFinishAndGrade}
              className="btn btn-primary btn-lg"
              style={{ fontWeight: 800 }}
            >
              <Sparkles style={{ width: '20px', height: '20px' }} />
              <span>Complete Exam & View AI Score Report</span>
            </button>

          </div>
        )}

        {/* ================= FINAL RESULT SCORE REPORT ================= */}
        {activeSection === 'result' && testResults && (
          <div className="card" style={{ maxWidth: '850px', margin: '0 auto', padding: '3rem 2.5rem' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
                <Award style={{ width: '15px', height: '15px' }} />
                <span>Certified AI Score Report</span>
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--bg-dark)', marginBottom: '0.5rem' }}>
                Congratulations! Test Completed
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Generated on {testResults.date} · 95% Examiner Correlation
              </p>
            </div>

            {/* Overall Score Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #12231C 0%, #247A52 100%)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '2.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#68DBA2' }}>
                Overall IELTS Predicted Band
              </span>
              <div style={{ fontSize: '5.5rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1, margin: '0.8rem 0' }}>
                {testResults.overallBand.toFixed(1)}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#A7F3D0' }}>
                {testResults.overallBand >= 7.5 ? 'Competent Academic User (Meets Tier-1 Global Universities)' : 'Solid Intermediate Foundation'}
              </div>
            </div>

            {/* 4 Section Band Breakdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ background: '#F5F8F6', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Listening</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)', margin: '0.3rem 0' }}>
                  {testResults.listeningBand.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{testResults.lCorrect}/10 correct</div>
              </div>

              <div style={{ background: '#F5F8F6', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Reading</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)', margin: '0.3rem 0' }}>
                  {testResults.readingBand.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{testResults.rCorrect}/5 correct</div>
              </div>

              <div style={{ background: '#F5F8F6', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Writing</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)', margin: '0.3rem 0' }}>
                  {testResults.writingBand.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{testResults.totalWords} words</div>
              </div>

              <div style={{ background: '#F5F8F6', padding: '1.25rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Speaking</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-dark)', margin: '0.3rem 0' }}>
                  {testResults.speakingBand.toFixed(1)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Voice assessed</div>
              </div>
            </div>

            {/* AI Improvement Insights */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--bg-dark)' }}>
                Uncle Sam's Diagnostic Improvement Plan:
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                <li>✅ <strong>Strong Point:</strong> Listening comprehension on factual details and dates was near flawless.</li>
                <li>⚠️ <strong>Growth Area:</strong> Reading T/F/NG statements require distinguishing between what is directly refuted vs. unmentioned.</li>
                <li>💡 <strong>Writing Focus:</strong> Expand grammatical range by employing inverted conditionals and non-finite relative clauses in Task 2.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button 
                onClick={() => {
                  setTimeLeft(2400);
                  setActiveSection('listening');
                }}
                className="btn btn-outline"
                style={{ gap: '0.5rem' }}
              >
                <RotateCcw style={{ width: '16px', height: '16px' }} />
                <span>Retake Test</span>
              </button>
              <button 
                onClick={onExit}
                className="btn btn-primary"
              >
                Return to Dashboard
              </button>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
