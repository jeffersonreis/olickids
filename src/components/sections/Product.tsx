import { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { Placeholder } from '../ui/Placeholder';

interface GalleryItem {
  label: string;
  image: string | null;
}
interface Color {
  name: string;
  hex: string;
  ring: string;
  gallery: GalleryItem[];
}
export interface ProductData {
  eyebrow: string;
  name: string;
  subtitle: string;
  price: string;
  tag: string;
  defaultGallery: GalleryItem[];
  colors: Color[];
  sizes: string[];
  benefits: string[];
  deliveryNote: string;
  deliveryRegion: string;
  buyButton: string;
  whatsappMessage: string;
  buyNote: string;
}

interface ProductProps {
  product: ProductData;
  whatsappNumber: string;
}

function ColorDot({ c, active, onClick }: { c: Color; active: boolean; onClick: () => void }) {
  const isWhite = c.hex === '#FFFFFF' || c.hex === '#ffffff';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={c.name}
      title={c.name}
      style={{
        width: 34, height: 34, borderRadius: 999,
        background: c.hex,
        cursor: 'pointer',
        border: isWhite ? '1.5px solid var(--line)' : '1.5px solid rgba(0,0,0,0.06)',
        outline: active ? '2px solid var(--brown)' : '2px solid transparent',
        outlineOffset: 3,
        transition: 'outline-color .18s, transform .15s',
        transform: active ? 'scale(1.05)' : 'none',
        padding: 0,
      }}
    />
  );
}

function imgSrc(path: string | null, prefix = '/images/gallery/'): string | null {
  if (!path) return null;
  return path.startsWith('/') ? path : `${prefix}${path}`;
}

export function Product({ product, whatsappNumber }: ProductProps) {
  const [color, setColor] = useState<Color | null>(null);
  const [shot, setShot] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [showFloat, setShowFloat] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const ctaEl = ctaRef.current;
    if (!sectionEl || !ctaEl) return;

    let sectionVisible = false;
    let ctaBelow = true; // true = CTA ainda não foi atingido
    const update = () => setShowFloat(sectionVisible && ctaBelow);

    const sectionObs = new IntersectionObserver(
      ([e]) => { sectionVisible = e.isIntersecting; update(); },
      { threshold: 0 }
    );
    const ctaObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          ctaBelow = false; // CTA ficou visível: não mostrar mais
        } else {
          // Se saiu pelo topo (top < 0), o usuário já passou — manter oculto
          // Se saiu pelo fundo (top > 0), ainda não chegou — mostrar
          ctaBelow = e.boundingClientRect.top > 0;
        }
        update();
      },
      { threshold: 0 }
    );

    sectionObs.observe(sectionEl);
    ctaObs.observe(ctaEl);
    return () => { sectionObs.disconnect(); ctaObs.disconnect(); };
  }, []);

  function handleColorChange(c: Color) { setColor(c); setShot(0); }

  function waLink() {
    let m = product.whatsappMessage;
    if (color) m += `\nCor: ${color.name}`;
    if (size) m += ` · Tamanho: ${size}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(m)}`;
  }

  const gallery = color ? color.gallery : (product.defaultGallery ?? []);
  const currentItem = gallery[shot] ?? null;

  return (
    <section id="produto" ref={sectionRef} style={{ padding: 'clamp(64px, 10vw, 120px) 0', background: 'var(--soft-white)' }}>
      <style>{`
        /* ── mobile: flex column com ordem definida ── */
        .prod-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .prod-header  { order: 1; }
        .prod-gallery { order: 2; padding: 0 8%; }
        .prod-thumbs  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; }
        .prod-colors  { order: 3; }
        .prod-sizes   { order: 4; }
        .prod-price   { order: 5; }
        .prod-cta     { order: 6; }
        .prod-benefits{ order: 7; }

        /* ── desktop: grid 2 colunas ── */
        @media (min-width: 768px) {
          .prod-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 50px;
            row-gap: 18px;
            align-items: start;
          }
          .prod-header  { order: 0; grid-column: 2; grid-row: 1; }
          .prod-gallery { order: 0; grid-column: 1; grid-row: 1 / 8; position: sticky; top: 92px; padding: 0; }
          .prod-colors  { order: 0; grid-column: 2; grid-row: 2; }
          .prod-sizes   { order: 0; grid-column: 2; grid-row: 3; }
          .prod-price   { order: 0; grid-column: 2; grid-row: 4; }
          .prod-cta     { order: 0; grid-column: 2; grid-row: 5; }
          .prod-benefits{ order: 0; grid-column: 2; grid-row: 6; }
          .prod-thumbs  { gap: 12px; margin-top: 14px; }
        }

        /* ── floating cta: só mobile ── */
        .prod-float {
          position: fixed;
          bottom: 20px;
          left: 16px;
          right: 16px;
          z-index: 50;
          animation: floatIn .2s ease;
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 768px) {
          .prod-float { display: none; }
        }
      `}</style>

      <div className="wrap">
        <div className="prod-grid">

          {/* 1 — Cabeçalho */}
          <div className="prod-header reveal" style={{ transitionDelay: '80ms' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <img src="/images/dog_taupe.png" alt="" style={{ width: 26, opacity: 0.9 }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
                {product.eyebrow}
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', marginTop: 16 }}>{product.name}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text)', marginTop: 12 }}>{product.subtitle}</p>
          </div>

          {/* 2 — Galeria */}
          <div className="prod-gallery">
            <div style={{ position: 'relative' }}>
              {imgSrc(currentItem?.image ?? null) ? (
                <img
                  src={imgSrc(currentItem!.image)!}
                  alt={currentItem!.label}
                  style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}
                />
              ) : (
                <Placeholder
                  label={color ? `${currentItem?.label ?? ''} — ${color.name}` : (currentItem?.label ?? 'Sem cor definida')}
                  ratio="4 / 5"
                />
              )}
              {color && (
                <div style={{
                  position: 'absolute', top: 16, left: 16, background: 'var(--soft-white)', borderRadius: 999,
                  padding: '7px 14px', fontWeight: 700, fontSize: 13, color: 'var(--brown)', border: '1px solid var(--line)',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 13, height: 13, borderRadius: 999, background: color.hex, border: '1px solid rgba(0,0,0,0.1)', display: 'inline-block' }} />
                  {color.name}
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="prod-thumbs">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setShot(i)}
                    style={{
                      padding: 0,
                      border: `2px solid ${shot === i ? 'var(--brown)' : 'transparent'}`,
                      borderRadius: 10, background: 'none', cursor: 'pointer', overflow: 'hidden',
                    }}
                  >
                    {imgSrc(g.image) ? (
                      <img src={imgSrc(g.image)!} alt={g.label}
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                    ) : (
                      <Placeholder label={g.label} ratio="1 / 1" radius="8px" dog={false} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3 — Cores */}
          {product.colors.length > 0 && (
            <div className="prod-colors">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)' }}>Cor</span>
                <span style={{ fontSize: 14, color: color ? 'var(--text)' : 'var(--taupe)' }}>
                  {color ? color.name : 'Escolha uma cor'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 14, alignItems: 'center' }}>
                {product.colors.map((c, i) => (
                  <ColorDot key={i} c={c} active={color?.name === c.name} onClick={() => handleColorChange(c)} />
                ))}
                {color && (
                  <button type="button" onClick={() => { setColor(null); setShot(0); }}
                    aria-label="Remover seleção de cor"
                    style={{ width: 28, height: 28, borderRadius: 999, border: '1.5px solid var(--line)', background: 'var(--soft-white)', color: 'var(--taupe)', cursor: 'pointer', display: 'grid', placeItems: 'center', padding: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 4 — Tamanhos */}
          {product.sizes.length > 0 && (
            <div className="prod-sizes">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)' }}>Tamanho</span>
                <span style={{ fontSize: 14, color: size ? 'var(--text)' : 'var(--taupe)' }}>
                  {size ?? 'Escolha um tamanho'}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                {product.sizes.map((s) => (
                  <button key={s} type="button" onClick={() => setSize(s)}
                    style={{
                      minWidth: 52, padding: '12px 8px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                      cursor: 'pointer', transition: 'all .15s',
                      background: size === s ? 'var(--brown)' : 'var(--soft-white)',
                      color: size === s ? 'var(--cream)' : 'var(--brown)',
                      border: `1.5px solid ${size === s ? 'var(--brown)' : 'var(--line)'}`,
                      fontFamily: 'inherit',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5 — Preço */}
          <div className="prod-price" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '2.6rem', color: 'var(--brown)' }}>{product.price}</span>
            {product.tag && (
              <span style={{ background: 'var(--cream)', color: 'var(--taupe)', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, border: '1px solid var(--line)' }}>
                {product.tag}
              </span>
            )}
          </div>

          {/* 6 — Vantagens */}
          {product.benefits.length > 0 && (
            <ul className="prod-benefits" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {product.benefits.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 11, alignItems: 'center', color: 'var(--text)', fontSize: '1.02rem' }}>
                  <Icon name="check" size={18} color="var(--taupe)" /> {b}
                </li>
              ))}
            </ul>
          )}

          {/* 7 — CTA */}
          <div className="prod-cta" ref={ctaRef} style={{ display: 'grid', gap: 12 }}>
            <Button variant="whatsapp" size="lg" icon="whatsapp" full href={waLink()} target="_blank" rel="noopener">
              {product.buyButton}
            </Button>
            <p style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--taupe)', margin: 0 }}>
              {product.buyNote}
            </p>
          </div>

        </div>
      </div>

      {/* Floating CTA — mobile only */}
      {showFloat && (
        <div className="prod-float">
          <Button variant="whatsapp" size="lg" icon="whatsapp" full href={waLink()} target="_blank" rel="noopener">
            {product.buyButton}
          </Button>
        </div>
      )}
    </section>
  );
}
