import { useState } from 'react';
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

// Keystatic image fields return the full public path (e.g. /images/gallery/...),
// but older seed entries may store just the filename. This handles both.
function imgSrc(path: string | null, prefix = '/images/gallery/'): string | null {
  if (!path) return null;
  return path.startsWith('/') ? path : `${prefix}${path}`;
}

export function Product({ product, whatsappNumber }: ProductProps) {
  const [color, setColor] = useState<Color | null>(null);
  const [shot, setShot] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  function handleColorChange(c: Color) {
    setColor(c);
    setShot(0);
  }

  function waLink() {
    let m = product.whatsappMessage;
    if (color) m += `\nCor: ${color.name}`;
    if (size) m += ` · Tamanho: ${size}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(m)}`;
  }

  const gallery = color ? color.gallery : (product.defaultGallery ?? []);
  const currentItem = gallery[shot] ?? null;

  return (
    <section id="produto" style={{ padding: 'clamp(64px, 10vw, 120px) 0', background: 'var(--soft-white)' }}>
      <div className="wrap">
        <div className="prod-grid" style={{ display: 'grid', gap: 50, alignItems: 'start' }}>

          {/* Gallery */}
          <div className="prod-gallery" style={{ position: 'sticky', top: 92 }}>
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

              {/* Badge de cor — só aparece quando uma cor está selecionada */}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 14 }}>
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setShot(i)}
                    style={{
                      padding: 0,
                      border: `2px solid ${shot === i ? 'var(--brown)' : 'transparent'}`,
                      borderRadius: 12, background: 'none', cursor: 'pointer', overflow: 'hidden',
                    }}
                  >
                    {imgSrc(g.image) ? (
                      <img
                        src={imgSrc(g.image)!}
                        alt={g.label}
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: 10 }}
                      />
                    ) : (
                      <Placeholder label={g.label} ratio="1 / 1" radius="10px" dog={false} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="reveal" style={{ transitionDelay: '80ms' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <img src="/images/dog_taupe.png" alt="" style={{ width: 26, opacity: 0.9 }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
                {product.eyebrow}
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', marginTop: 16 }}>{product.name}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text)', marginTop: 12 }}>{product.subtitle}</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 26 }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '2.6rem', color: 'var(--brown)' }}>{product.price}</span>
              {product.tag && (
                <span style={{ background: 'var(--cream)', color: 'var(--taupe)', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, border: '1px solid var(--line)' }}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Color selector */}
            {product.colors.length > 0 && (
              <div style={{ marginTop: 30 }}>
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
                    <button
                      type="button"
                      onClick={() => { setColor(null); setShot(0); }}
                      aria-label="Remover seleção de cor"
                      title="Remover seleção"
                      style={{
                        width: 28, height: 28, borderRadius: 999, border: '1.5px solid var(--line)',
                        background: 'var(--soft-white)', color: 'var(--taupe)', cursor: 'pointer',
                        display: 'grid', placeItems: 'center', padding: 0, transition: 'border-color .15s, color .15s',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div style={{ marginTop: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)' }}>Tamanho</span>
                  <span style={{ fontSize: 14, color: size ? 'var(--text)' : 'var(--taupe)' }}>
                    {size ?? 'Escolha um tamanho'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      style={{
                        minWidth: 52, padding: '12px 8px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                        cursor: 'pointer', transition: 'all .15s',
                        background: size === s ? 'var(--brown)' : 'var(--soft-white)',
                        color: size === s ? 'var(--cream)' : 'var(--brown)',
                        border: `1.5px solid ${size === s ? 'var(--brown)' : 'var(--line)'}`,
                        fontFamily: 'inherit',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {product.benefits.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '30px 0 0', display: 'grid', gap: 12 }}>
                {product.benefits.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 11, alignItems: 'center', color: 'var(--text)', fontSize: '1.02rem' }}>
                    <Icon name="check" size={18} color="var(--taupe)" /> {b}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div style={{ marginTop: 32, display: 'grid', gap: 12 }}>
              <Button variant="whatsapp" size="lg" icon="whatsapp" full href={waLink()} target="_blank" rel="noopener">
                {product.buyButton}
              </Button>
              <p style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--taupe)' }}>
                {product.buyNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
