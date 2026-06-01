'use client';
import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  color?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
  style?: React.CSSProperties;
}

export function Typewriter({ words, color = 'currentColor', typeSpeed = 110, deleteSpeed = 55, holdTime = 1400, style = {} }: TypewriterProps) {
  const [wi, setWi] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return;
    const full = words[wi];
    if (!deleting && sub === full.length) {
      const t = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      const t = setTimeout(() => { setDeleting(false); setWi((wi + 1) % words.length); }, 260);
      return () => clearTimeout(t);
    }
    const delay = deleting ? deleteSpeed : typeSpeed;
    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), delay);
    return () => clearTimeout(t);
  }, [sub, deleting, wi, words, typeSpeed, deleteSpeed, holdTime, reduced]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');
  const shown = reduced ? words[0] : words[wi].slice(0, sub);

  return (
    <span style={{ position: 'relative', display: 'inline-grid', verticalAlign: 'baseline', ...style }}>
      <span aria-hidden="true" style={{ visibility: 'hidden', gridArea: '1 / 1', whiteSpace: 'pre' }}>{longest}</span>
      <span style={{ gridArea: '1 / 1', color, fontStyle: 'italic', whiteSpace: 'pre' }}>
        {shown}
        {!reduced && <span className="tw-caret" style={{ color, fontStyle: 'normal', fontWeight: 300 }}>|</span>}
      </span>
    </span>
  );
}
