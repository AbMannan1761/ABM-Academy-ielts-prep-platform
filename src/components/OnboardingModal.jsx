import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Clock, 
  Target, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: 'First time',
    targetBand: '7.5',
    examTimeline: 'Within 2 months',
    weakestSection: 'Writing',
    dailyHours: '1 hour'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleOptionSelect = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Step 5 completed, generate roadmap
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onComplete({
        name: 'IELTS Candidate',
        ...formData,
        onboardingCompleted: true
      });
      onClose();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(18, 35, 28, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '620px',
        width: '100%',
        padding: '2.5rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid var(--border-color)',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%'
          }}
          aria-label="Close"
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span>Step {currentStep} of 5</span>
            <span style={{ color: 'var(--primary-dark)' }}>{currentStep * 20}% completed</span>
          </div>
          <div style={{ height: '6px', background: '#E1E7E4', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${currentStep * 20}%`,
              height: '100%',
              backgroundColor: 'var(--primary)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Coach Introduction Bubble */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          backgroundColor: 'var(--primary-light)',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid rgba(104, 219, 162, 0.4)',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Bot style={{ width: '24px', height: '24px', color: '#68DBA2' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Uncle Sam · AI Coach
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--bg-dark)', marginTop: '0.2rem' }}>
              {currentStep === 1 && "Hey! I'm Uncle Sam, your personal IELTS instructor. Have you taken the IELTS exam before?"}
              {currentStep === 2 && "Great! What overall band score are you aiming to achieve?"}
              {currentStep === 3 && "When are you planning to sit for your actual official IELTS exam?"}
              {currentStep === 4 && "Which section do you find most challenging or need the most guidance with?"}
              {currentStep === 5 && "How much time can you dedicate daily to practicing with me?"}
            </div>
          </div>
        </div>

        {/* Step Options */}
        {isGenerating ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '4px solid #E1E7E4',
              borderTopColor: 'var(--primary)',
              margin: '0 auto 1.5rem',
              animation: 'spin 1s linear infinite'
            }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--bg-dark)', marginBottom: '0.5rem' }}>
              Building Your Custom IELTS Roadmap...
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Calibrating difficulty for Target Band {formData.targetBand} and tailoring {formData.weakestSection} diagnostics.
            </p>
          </div>
        ) : (
          <div>
            {currentStep === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['First time test taker', 'Retaking for higher band'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect('experience', opt)}
                    className="card"
                    style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: formData.experience === opt ? '2px solid var(--primary-dark)' : '1px solid var(--border-color)',
                      backgroundColor: formData.experience === opt ? 'var(--primary-light)' : '#FFF'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                {['Band 6.5', 'Band 7.0', 'Band 7.5', 'Band 8.0', 'Band 8.5', 'Band 9.0'].map((band) => (
                  <button
                    key={band}
                    onClick={() => handleOptionSelect('targetBand', band.replace('Band ', ''))}
                    className="card"
                    style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: 'var(--bg-dark)',
                      cursor: 'pointer'
                    }}
                  >
                    {band}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {['Within 1 Month', 'In 2-3 Months', 'In 4-6 Months', 'Not Scheduled Yet'].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleOptionSelect('examTimeline', time)}
                    className="card"
                    style={{
                      padding: '1.1rem',
                      textAlign: 'center',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                {['Writing (Task 1 & 2)', 'Speaking (Fluency & Vocab)', 'Reading (T/F/NG & Time)', 'Listening (Speed & Accents)'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => handleOptionSelect('weakestSection', sec.split(' ')[0])}
                    className="card"
                    style={{
                      padding: '1.1rem',
                      textAlign: 'center',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.95rem'
                    }}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                {['30 Minutes', '1 Hour', '2+ Hours'].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => handleOptionSelect('dailyHours', dur)}
                    className="btn btn-dark"
                    style={{ padding: '1.25rem', fontSize: '1rem' }}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
