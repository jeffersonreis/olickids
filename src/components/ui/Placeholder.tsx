import { Dog } from './Dog';

interface PlaceholderProps {
  label: string;
  ratio?: string;
  radius?: string;
  tone?: 'cream' | 'deep' | 'white';
  style?: React.CSSProperties;
  dog?: boolean;
}

export function Placeholder({ label, ratio = '4 / 5', radius = 'var(--radius)', tone = 'cream', style = {}, dog = true }: PlaceholderProps) {
  const bg = tone === 'deep' ? 'var(--cream-deep)' : tone === 'white' ? '#fff' : 'var(--cream)';
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: ratio,
      borderRadius: radius,
      overflow: 'hidden',
      background: bg,
      border: '1px solid var(--line)',
      display: 'grid',
      placeItems: 'center',
      ...style,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 14px, rgba(176,154,128,0.07) 14px 15px)',
      }} />
      {dog && (
        <Dog tone="taupe" opacity={0.16} width={120} style={{ position: 'absolute', bottom: 18, right: 18 }} />
      )}
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 18px', display: 'grid', gap: 10, justifyItems: 'center' }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="M21 16l-5-5L7 20" />
        </svg>
        <span style={{ fontFamily: "ui-monospace, 'SFMono-Regular', Menlo, monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', lineHeight: 1.5, maxWidth: 200 }}>
          {label}
        </span>
      </div>
    </div>
  );
}
