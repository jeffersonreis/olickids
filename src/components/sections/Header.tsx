import { useState, useEffect } from 'react';
import { Wordmark } from '../ui/Wordmark';
import { Dog } from '../ui/Dog';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

export interface NavItem {
  slug: string;
  entry: { label: string; href: string };
}
export interface SiteConfig {
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  headerCtaLabel: string | null;
  headerCtaHref: string | null;
}

interface HeaderProps {
  nav: NavItem[];
  config: SiteConfig;
}

function waLink(number: string, msg?: string) {
  const txt = encodeURIComponent(msg ?? 'Olá! Tenho interesse no Conjunto Térmico da Olic Kids 🐾');
  return `https://wa.me/${number}?text=${txt}`;
}

export function Header({ nav, config }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const wa = config.headerCtaHref ?? waLink(config.whatsappNumber);
  const waLabel = config.headerCtaLabel ?? 'Pedir no WhatsApp';
  const navLeft = nav.slice(0, 2);
  const navRight = nav.slice(2);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        transition: 'background .3s, box-shadow .3s, border-color .3s',
        background: solid ? 'color-mix(in srgb, var(--soft-white) 88%, transparent)' : 'transparent',
        backdropFilter: solid ? 'saturate(140%) blur(12px)' : 'none',
        WebkitBackdropFilter: solid ? 'saturate(140%) blur(12px)' : 'none',
        borderBottom: `1px solid ${solid ? 'var(--line)' : 'transparent'}`,
      }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 72 }}>
          {/* left: hamburger (mobile) or nav (desktop) */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              className="only-mobile"
              style={{ display: 'none', background: 'none', border: 'none', color: 'var(--brown)', padding: 6, marginLeft: -6, cursor: 'pointer' }}
            >
              <Icon name="menu" size={26} />
            </button>
            <nav className="only-desktop" style={{ display: 'flex', gap: 26 }}>
              {navLeft.map((n) => <HeaderLink key={n.slug} label={n.entry.label} href={n.entry.href} />)}
            </nav>
          </div>

          {/* center: logo */}
          <a href="#inicio" aria-label="Olic Kids" style={{ display: 'grid', placeItems: 'center', padding: '4px 0' }}>
            <Wordmark tone="brown" height={34} />
          </a>

          {/* right: nav + cta (desktop) | WhatsApp icon (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 26 }}>
            <nav className="only-desktop" style={{ display: 'flex', gap: 26 }}>
              {navRight.map((n) => <HeaderLink key={n.slug} label={n.entry.label} href={n.entry.href} />)}
            </nav>
            <div className="only-desktop">
              <Button variant="whatsapp" size="sm" icon="whatsapp" href={wa} target="_blank" rel="noopener">
                {waLabel}
              </Button>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="only-mobile"
              style={{ display: 'none', background: '#25D366', color: '#fff', border: 'none', borderRadius: 999, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name="whatsapp" size={20} color="#fff" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — outside header to avoid backdrop-filter stacking context */}
      <div
        className="mobile-menu"
        style={{
          position: 'fixed', inset: 0, zIndex: 80, background: 'var(--soft-white)',
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform .42s cubic-bezier(.2,.8,.2,1), visibility .42s',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Wordmark tone="brown" height={32} />
          <button onClick={() => setOpen(false)} aria-label="Fechar menu" style={{ background: 'none', border: 'none', color: 'var(--brown)', padding: 6, cursor: 'pointer' }}>
            <Icon name="x" size={28} />
          </button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '12px 28px', gap: 4 }}>
          {nav.map((n) => (
            <a
              key={n.slug}
              href={n.entry.href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--brown)', padding: '14px 0', borderBottom: '1px solid var(--line)' }}
            >
              {n.entry.label}
            </a>
          ))}
        </nav>
        <div style={{ padding: '20px 28px', marginTop: 'auto' }}>
          <Button variant="whatsapp" icon="whatsapp" full size="lg" href={wa} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            {waLabel}
          </Button>
          <div style={{ display: 'grid', placeItems: 'center', marginTop: 26 }}>
            <Dog tone="taupe" width={70} />
          </div>
        </div>
      </div>
    </>
  );
}

function HeaderLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="hlink" style={{ fontSize: 15, fontWeight: 600, color: 'var(--brown)', padding: '6px 0', position: 'relative' }}>
      {label}
    </a>
  );
}
