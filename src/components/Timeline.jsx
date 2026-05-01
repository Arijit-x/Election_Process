import React from 'react';
import PropTypes from 'prop-types';

const Timeline = React.memo(({ steps, activeStepId, onStepSelect }) => {
  const activeIndex = steps.findIndex(s => s.id === activeStepId);

  return (
    <div className="glass-panel" style={{ padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)' }}>
      <h2 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.15rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Election Timeline
      </h2>

      <div style={{ position: 'relative', paddingLeft: '2.2rem' }}>
        {/* Vertical track */}
        <div style={{
          position: 'absolute', left: '11px', top: '20px', bottom: '20px',
          width: '2px',
          background: `linear-gradient(to bottom, var(--color-primary) ${(activeIndex / (steps.length - 1)) * 100}%, var(--color-surface-active) ${(activeIndex / (steps.length - 1)) * 100}%)`,
          transition: 'background var(--transition-slow)',
          borderRadius: 'var(--radius-full)',
          zIndex: 0
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {steps.map((step, index) => {
            const isActive = step.id === activeStepId;
            const isPast = index < activeIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => onStepSelect(step.id)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  zIndex: 1,
                  animation: `fadeSlideLeft ${0.3 + index * 0.08}s cubic-bezier(0.2,0.8,0.2,1) both`,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-2.2rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                    : isPast ? 'var(--color-success)' : 'var(--color-bg)',
                  border: `2px solid ${isActive ? 'var(--color-primary-light)' : isPast ? 'var(--color-success)' : 'var(--color-surface-active)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 0 14px var(--color-primary-glow)' : 'none',
                  animation: isActive ? 'pulseGlow 2.5s ease-in-out infinite' : 'none',
                  transition: 'all var(--transition-normal)',
                  zIndex: 2
                }}>
                  {isPast && !isActive && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {isActive && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
                  )}
                </div>

                {/* Card */}
                <div style={{
                  background: isActive ? 'var(--color-surface-hover)' : 'transparent',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${isActive ? 'var(--color-border-glow)' : 'transparent'}`,
                  transform: isActive ? 'translateX(4px)' : 'none',
                  boxShadow: isActive ? '0 4px 20px rgba(67,97,238,0.15)' : 'none',
                  transition: 'all var(--transition-normal)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <Icon
                      size={16}
                      color={isActive ? 'var(--color-accent)' : isPast ? 'var(--color-success)' : 'var(--color-text-muted)'}
                      style={{ flexShrink: 0 }}
                    />
                    <h3 style={{
                      fontSize: '0.95rem',
                      margin: 0,
                      color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'color var(--transition-fast)'
                    }}>
                      {step.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0, paddingLeft: '24px' }}>
                    {step.dateRange}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

Timeline.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dateRange: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      shortDescription: PropTypes.string,
      fullDescription: PropTypes.string,
      requirements: PropTypes.arrayOf(PropTypes.string),
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          primary: PropTypes.bool.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  activeStepId: PropTypes.string.isRequired,
  onStepSelect: PropTypes.func.isRequired,
};

export default Timeline;
