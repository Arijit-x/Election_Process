import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Flag, ChevronDown, ChevronUp, Shield } from 'lucide-react';

const eligibilityData = {
  india: {
    label: '🇮🇳 India',
    color: 'var(--color-accent)',
    glow: 'var(--color-accent-glow)',
    eligible: [
      'Must be a citizen of India',
      'Must be 18 years of age or older on the qualifying date',
      'Must be ordinarily resident in a constituency',
      'Name must be on the Electoral Roll of that constituency',
      'Must possess a valid Voter ID card (EPIC) or one of 12 approved alternate documents',
    ],
    disqualified: [
      'Non-citizens of India',
      'Persons of unsound mind (declared by a competent court)',
      'Persons convicted of corrupt practices under election law',
      'Persons serving a prison sentence of 2+ years (cannot vote from prison except in exceptions)',
      'Persons registered in more than one constituency',
    ],
    notes: [
      'You can vote even without an EPIC card — carry Aadhaar, Passport, Driving Licence, PAN, MGNREGA Job Card, Pension Document, or any other ECI-approved photo ID.',
      'NRIs (Non-Resident Indians) who hold an Indian passport can register and vote in their home constituency.',
      'The qualifying date for age eligibility is January 1st of the year in which the Electoral Roll is prepared.',
    ],
    source: { label: 'ECI — Voters FAQ', url: 'https://www.eci.gov.in/voters-faqs' }
  },
  usa: {
    label: '🇺🇸 USA',
    color: 'var(--color-secondary)',
    glow: 'var(--color-secondary-glow)',
    eligible: [
      'Must be a United States citizen (born or naturalized)',
      'Must be 18 years of age or older by Election Day',
      'Must be a resident of the state where you register',
      'Must be registered to vote (deadlines vary by state)',
      'Some states allow 17-year-olds to vote in primaries if they will be 18 by the general election',
    ],
    disqualified: [
      'Non-US citizens (including permanent residents / green card holders)',
      'In most states: persons currently serving a felony sentence',
      'Persons ruled mentally incompetent by a court (varies by state)',
      'Persons convicted of election-related crimes may lose voting rights',
    ],
    notes: [
      'Voting rules differ by state — some states have automatic voter registration, same-day registration, or no voter ID requirements.',
      'Previously convicted felons may have their voting rights restored after completing their sentence, depending on state law.',
      'US citizens living abroad can register and vote via absentee ballot through the UOCAVA (Uniformed and Overseas Citizens Absentee Voting Act).',
    ],
    source: { label: 'USA.gov — Who Can Vote', url: 'https://www.usa.gov/who-can-vote' }
  }
};

const CountryCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-panel"
      style={{
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-lg)',
        borderColor: expanded ? `rgba(${data.color === 'var(--color-accent)' ? '76,201,240' : '247,37,133'},0.3)` : 'var(--color-border)',
        transition: 'all var(--transition-normal)',
      }}
    >
      {/* Country header */}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setExpanded(v => !v)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
            background: `linear-gradient(135deg, ${data.glow}, transparent)`,
            border: `1px solid ${data.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: `0 0 16px ${data.glow}`,
          }}>
            {data.label.split(' ')[0]}
          </div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: data.color }}>
            {data.label.split(' ').slice(1).join(' ')} Eligibility Rules
          </h3>
        </div>
        <div style={{ color: 'var(--color-text-muted)', transition: 'transform var(--transition-fast)', transform: expanded ? 'rotate(180deg)' : 'none' }}>
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Summary badges (always visible) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'var(--spacing-md)' }}>
        {['Age 18+', 'Citizen', 'Registered', 'Valid ID'].map(badge => (
          <span key={badge} style={{
            padding: '4px 12px',
            background: 'var(--color-surface-active)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            color: data.color,
            border: `1px solid ${data.color}30`,
          }}>{badge}</span>
        ))}
      </div>

      {/* Expanded content */}
      <div style={{
        overflow: 'hidden',
        maxHeight: expanded ? '1200px' : '0',
        opacity: expanded ? 1 : 0,
        transition: 'max-height 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.3s ease',
        marginTop: expanded ? 'var(--spacing-lg)' : 0,
      }}>
        {/* Eligible criteria */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h4 style={{
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <CheckCircle size={14} color="#2ec4b6" /> Who CAN vote
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.eligible.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                <CheckCircle size={16} color="#2ec4b6" style={{ flexShrink: 0, marginTop: '2px' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Disqualified */}
        <div style={{
          marginBottom: 'var(--spacing-lg)',
          background: 'rgba(247,37,133,0.05)',
          border: '1px solid rgba(247,37,133,0.15)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-md)',
        }}>
          <h4 style={{
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <XCircle size={14} color="var(--color-secondary)" /> Who CANNOT vote
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.disqualified.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                <XCircle size={15} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div style={{
          background: 'rgba(67,97,238,0.06)',
          border: '1px solid rgba(67,97,238,0.15)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-md)',
        }}>
          <h4 style={{
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <AlertTriangle size={14} color="var(--color-accent)" /> Good to Know
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.notes.map((note, i) => (
              <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                <span style={{ color: 'var(--color-accent)', flexShrink: 0, fontWeight: 700 }}>•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Source link */}
        <a
          href={data.source.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: data.color, fontSize: '0.82rem', textDecoration: 'none',
            opacity: 0.8, transition: 'opacity var(--transition-fast)',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
        >
          <Flag size={13} /> Official Source: {data.source.label} ↗
        </a>
      </div>
    </div>
  );
};

const EligibilitySection = () => {
  return (
    <section style={{ marginTop: 'var(--spacing-xl)' }}>
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-lg)',
      }}>
        <div style={{
          padding: '10px',
          background: 'linear-gradient(135deg, rgba(67,97,238,0.2), rgba(247,37,133,0.15))',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          display: 'flex',
        }}>
          <Shield size={22} color="var(--color-accent)" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>
            Voting <span className="text-gradient">Eligibility Rules</span>
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Click a country to expand the full rules
          </p>
        </div>
      </div>

      {/* Country cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--spacing-lg)',
      }}>
        <CountryCard data={eligibilityData.india} />
        <CountryCard data={eligibilityData.usa} />
      </div>
    </section>
  );
};

export default EligibilitySection;
