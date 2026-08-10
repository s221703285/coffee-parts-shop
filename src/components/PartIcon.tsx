import type { Category } from '../types';

const STROKE = 'var(--icon-stroke)';
const ACCENT = 'var(--accent)';

export function PartIcon({ category }: { category: Category }) {
  const common = {
    fill: 'none',
    stroke: STROKE,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (category) {
    case 'brew':
      return (
        <svg viewBox="0 0 96 96" className="part-icon" aria-hidden>
          <circle cx="48" cy="34" r="20" {...common} />
          <path d="M28 34h-8M76 34h-8" {...common} />
          <path d="M40 54v10h16V54" {...common} />
          <path d="M48 64v14" {...common} stroke={ACCENT} />
          <path d="M36 40h24" {...common} strokeDasharray="3 4" />
        </svg>
      );
    case 'steam':
      return (
        <svg viewBox="0 0 96 96" className="part-icon" aria-hidden>
          <path d="M30 18l24 36" {...common} />
          <path d="M54 54l6 14" {...common} />
          <circle cx="30" cy="18" r="6" {...common} />
          <path d="M60 68l-6 10M66 70l-2 10M54 66l-8 8" {...common} stroke={ACCENT} />
        </svg>
      );
    case 'grinder':
      return (
        <svg viewBox="0 0 96 96" className="part-icon" aria-hidden>
          <circle cx="48" cy="48" r="26" {...common} />
          <circle cx="48" cy="48" r="8" {...common} stroke={ACCENT} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path
              key={deg}
              d="M48 24v10"
              {...common}
              transform={`rotate(${deg} 48 48)`}
            />
          ))}
        </svg>
      );
    case 'electric':
      return (
        <svg viewBox="0 0 96 96" className="part-icon" aria-hidden>
          <rect x="22" y="28" width="52" height="40" rx="3" {...common} />
          <path d="M52 36l-10 14h12l-10 14" {...common} stroke={ACCENT} />
          <path d="M30 20v8M48 20v8M66 20v8M30 68v8M48 68v8M66 68v8" {...common} />
        </svg>
      );
    case 'pump':
      return (
        <svg viewBox="0 0 96 96" className="part-icon" aria-hidden>
          <circle cx="48" cy="48" r="22" {...common} />
          <path d="M48 26v-10M48 70v10M26 48h-10M70 48h10" {...common} />
          <path d="M48 48l12-8" {...common} stroke={ACCENT} />
          <circle cx="48" cy="48" r="4" {...common} stroke={ACCENT} />
        </svg>
      );
  }
}
