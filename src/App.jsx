import { useState, useEffect } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import StepDetail from './components/StepDetail';
import Particles from './components/Particles';
import EligibilitySection from './components/EligibilitySection';
import { electionSteps } from './data/electionData';
import { LayoutList, BookOpen, ChevronLeft, ChevronDown, Shield } from 'lucide-react';
import './App.css';

function App() {
  const [activeStepId, setActiveStepId] = useState(electionSteps[0].id);
  // 'timeline' | 'detail' — only matters on mobile
  const [mobileView, setMobileView] = useState('timeline');

  const activeIndex = electionSteps.findIndex(s => s.id === activeStepId);
  const activeStep = electionSteps[activeIndex];

  // When user picks a step on mobile, auto-switch to detail view
  const handleStepSelect = (id) => {
    setActiveStepId(id);
    setMobileView('detail');
  };

  // Keyboard navigation (desktop)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = Math.min(activeIndex + 1, electionSteps.length - 1);
        setActiveStepId(electionSteps[next].id);
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = Math.max(activeIndex - 1, 0);
        setActiveStepId(electionSteps[prev].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex]);

  return (
    <>
      {/* Animated background layers */}
      <Particles />
      <div className="bg-canvas" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <div className="container app-wrapper">
        <Header
          totalSteps={electionSteps.length}
          currentStep={activeIndex}
        />

        {/* ── Scroll CTA — draws attention to the eligibility section below ── */}
        <div
          onClick={() => document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            marginTop: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-sm)',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, rgba(67,97,238,0.12), rgba(247,37,133,0.08))',
            border: '1px solid rgba(67,97,238,0.25)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all var(--transition-fast)',
            animation: 'fadeSlideUp 0.6s 0.3s both',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(67,97,238,0.2), rgba(247,37,133,0.14))';
            e.currentTarget.style.borderColor = 'rgba(67,97,238,0.5)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(67,97,238,0.12), rgba(247,37,133,0.08))';
            e.currentTarget.style.borderColor = 'rgba(67,97,238,0.25)';
            e.currentTarget.style.transform = 'none';
          }}
          role="button"
          aria-label="Scroll to Voting Eligibility Rules"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={18} color="var(--color-accent)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 500 }}>
              📋 Who can vote? See Eligibility Rules below
            </span>
          </div>
          <div style={{ animation: 'bounceDown 1.4s ease-in-out infinite', color: 'var(--color-accent)' }}>
            <ChevronDown size={20} />
          </div>
        </div>

        {/* Desktop: two columns. Mobile: one panel at a time */}
        <div className="main-content">

          {/* Left — Timeline (hidden on mobile when in detail view) */}
          <section
            className={`panel-left${mobileView === 'detail' ? ' mobile-hidden' : ''}`}
          >
            <Timeline
              steps={electionSteps}
              activeStepId={activeStepId}
              onStepSelect={handleStepSelect}
            />
          </section>

          {/* Right — Step Detail (hidden on mobile when in timeline view) */}
          <section
            className={`panel-right${mobileView === 'timeline' ? ' mobile-hidden' : ''}`}
          >
            {/* Mobile back button */}
            <button
              onClick={() => setMobileView('timeline')}
              className="mobile-only"
              style={{
                alignItems: 'center',
                gap: '6px',
                background: 'var(--color-surface-active)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                marginBottom: 'var(--spacing-md)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-main)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <ChevronLeft size={16} /> Back to Timeline
            </button>

            <StepDetail step={activeStep} stepIndex={activeIndex} />
          </section>
        </div>

        {/* ── Prev / Next navigation (always visible on desktop & mobile) ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
          marginTop: 'var(--spacing-lg)',
        }}>
          {/* Previous */}
          <button
            disabled={activeIndex === 0}
            onClick={() => {
              const prev = electionSteps[activeIndex - 1];
              setActiveStepId(prev.id);
              setMobileView('detail');
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: activeIndex === 0 ? 'var(--color-surface-active)' : 'var(--color-surface-hover)',
              border: '1px solid var(--color-border)',
              color: activeIndex === 0 ? 'var(--color-text-muted)' : 'var(--color-text-main)',
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              cursor: activeIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              opacity: activeIndex === 0 ? 0.35 : 1,
              transition: 'all var(--transition-fast)',
              minWidth: '130px',
            }}
            onMouseEnter={e => { if (activeIndex > 0) { e.currentTarget.style.borderColor = 'var(--color-border-glow)'; e.currentTarget.style.transform = 'translateX(-3px)'; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'none'; }}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {/* Step counter */}
          <span style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            flexShrink: 0,
          }}>
            {activeIndex + 1} / {electionSteps.length}
          </span>

          {/* Next */}
          <button
            disabled={activeIndex === electionSteps.length - 1}
            onClick={() => {
              const next = electionSteps[activeIndex + 1];
              setActiveStepId(next.id);
              setMobileView('detail');
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: activeIndex === electionSteps.length - 1
                ? 'var(--color-surface-active)'
                : 'linear-gradient(135deg, var(--color-primary), #304be0)',
              border: 'none',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              cursor: activeIndex === electionSteps.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              opacity: activeIndex === electionSteps.length - 1 ? 0.35 : 1,
              transition: 'all var(--transition-fast)',
              boxShadow: activeIndex < electionSteps.length - 1 ? '0 4px 16px var(--color-primary-glow)' : 'none',
              minWidth: '130px',
              justifyContent: 'center',
            }}
            onMouseEnter={e => { if (activeIndex < electionSteps.length - 1) { e.currentTarget.style.transform = 'translateX(3px)'; e.currentTarget.style.boxShadow = '0 6px 24px var(--color-primary-glow)'; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = activeIndex < electionSteps.length - 1 ? '0 4px 16px var(--color-primary-glow)' : 'none'; }}
          >
            Next
            <ChevronLeft size={18} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>

        {/* Voting Eligibility Rules */}
        <EligibilitySection />
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="mobile-tab-bar" aria-label="Mobile navigation">
        <button
          className={`tab-btn ${mobileView === 'timeline' ? 'active' : ''}`}
          onClick={() => setMobileView('timeline')}
        >
          <LayoutList size={20} />
          Timeline
        </button>
        <button
          className={`tab-btn ${mobileView === 'detail' ? 'active' : ''}`}
          onClick={() => setMobileView('detail')}
        >
          <BookOpen size={20} />
          {activeStep?.title.split(' ')[0]} Details
        </button>
      </nav>
    </>
  );
}

export default App;
