import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Info, ExternalLink, ClipboardList, Zap } from 'lucide-react';

const StepDetail = ({ step, stepIndex }) => {
  const panelRef = useRef(null);

  // Re-trigger animation whenever step changes
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetHeight; // reflow
    el.style.animation = '';
  }, [step?.id]);

  if (!step) return null;
  const Icon = step.icon;

  const handleAction = (url) => {
    if (!url) return;
    if (url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={panelRef}
      className="glass-panel"
      style={{
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-lg)',
        position: 'sticky',
        top: 'var(--spacing-lg)',
        animation: 'fadeSlideIn 0.4s cubic-bezier(0.2,0.8,0.2,1) both',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary-glow), var(--color-accent-glow))',
          border: '1px solid var(--color-border-glow)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 20px var(--color-primary-glow)',
          animation: 'bounceIn 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both',
        }}>
          <Icon color="var(--color-accent)" size={28} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.9rem)', margin: '0 0 6px 0', color: 'var(--color-text-main)' }}>
            {step.title}
          </h2>
          <span style={{
            display: 'inline-block',
            padding: '4px 14px',
            background: 'linear-gradient(90deg, rgba(67,97,238,0.2), rgba(76,201,240,0.15))',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            color: 'var(--color-accent)',
            border: '1px solid rgba(76,201,240,0.2)',
          }}>
            {step.dateRange}
          </span>
        </div>
      </div>

      {/* Overview */}
      <section style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h3 style={{
          fontSize: '0.85rem', marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-text-muted)', textTransform: 'uppercase',
          letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <Info size={14} color="var(--color-secondary)" /> Overview
        </h3>
        <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: '1.75', opacity: 0.9 }}>
          {step.fullDescription}
        </p>
      </section>

      {/* Requirements */}
      {step.requirements?.length > 0 && (
        <section style={{
          marginBottom: 'var(--spacing-lg)',
          background: 'var(--color-surface-hover)',
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
        }}>
          <h3 style={{
            fontSize: '0.85rem', marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <ClipboardList size={14} color="var(--color-accent)" /> What you may need
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {step.requirements.map((req, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                color: 'var(--color-text-muted)', fontSize: '0.9rem',
                animation: `fadeSlideUp ${0.3 + i * 0.08}s both`
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'var(--color-accent)',
                  flexShrink: 0, marginTop: '7px'
                }} />
                {req}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Actions */}
      {step.actions?.length > 0 && (
        <section>
          <h3 style={{
            fontSize: '0.85rem', marginBottom: 'var(--spacing-md)',
            color: 'var(--color-text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <Zap size={14} color="var(--color-secondary)" /> Recommended Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {step.actions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleAction(action.url)}
                className={`action-btn ${action.primary ? 'action-btn-primary' : 'action-btn-secondary'}`}
                style={{ animation: `fadeSlideUp ${0.4 + i * 0.08}s both` }}
              >
                <span>{action.label}</span>
                <ExternalLink size={15} style={{ flexShrink: 0, opacity: 0.8 }} />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

StepDetail.propTypes = {
  step: PropTypes.shape({
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
  }),
  stepIndex: PropTypes.number,
};

export default StepDetail;
