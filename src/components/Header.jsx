import React from 'react';
import PropTypes from 'prop-types';
import { Vote, Globe } from 'lucide-react';

const Header = React.memo(({ totalSteps, currentStep }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <header
      className="glass-panel anim-fade-up"
      style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderRadius: 'var(--radius-lg)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            padding: '10px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--color-primary-glow)',
            animation: 'pulseGlow 3s ease-in-out infinite'
          }}>
            <Vote color="#fff" size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', margin: 0 }}>
              Election<span className="text-shimmer">Guide</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', margin: 0 }}>
              Interactive Process &amp; Timelines
            </p>
          </div>
        </div>

        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px',
          background: 'var(--color-surface-active)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border)',
          fontSize: '0.8rem',
          color: 'var(--color-accent)'
        }}>
          <Globe size={14} />
          India &amp; USA
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)'
        }}>
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div style={{
          height: '6px',
          background: 'var(--color-surface-active)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-slow)',
            boxShadow: '0 0 10px var(--color-accent-glow)'
          }} />
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default Header;
