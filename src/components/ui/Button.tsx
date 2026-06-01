import { Icon } from './Icon';

type Variant = 'primary' | 'whatsapp' | 'outline' | 'soft' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  icon?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  full?: boolean;
  style?: React.CSSProperties;
  className?: string;
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  onClick,
  href,
  target,
  rel,
  full,
  style = {},
  className,
  ...rest
}: ButtonProps) {
  const pads = size === 'lg' ? '17px 30px' : size === 'sm' ? '10px 18px' : '14px 26px';
  const fs = size === 'lg' ? 17 : size === 'sm' ? 14 : 15.5;

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: pads,
    fontSize: fs,
    fontWeight: 700,
    letterSpacing: '0.005em',
    borderRadius: 'var(--btn-radius)',
    border: '1.5px solid transparent',
    transition: 'transform .18s ease, box-shadow .25s ease, background .2s ease, color .2s ease',
    width: full ? '100%' : 'auto',
    lineHeight: 1.1,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'inherit',
  };

  const variants: Record<Variant, React.CSSProperties> = {
    primary: { background: 'var(--accent)', color: 'var(--accent-ink)', boxShadow: '0 10px 24px -12px color-mix(in srgb, var(--accent) 75%, transparent)' },
    whatsapp: { background: '#25D366', color: '#fff', boxShadow: '0 10px 24px -12px rgba(37,211,102,0.6)' },
    outline: { background: 'transparent', color: 'var(--brown)', borderColor: 'var(--taupe)' },
    soft: { background: 'var(--cream)', color: 'var(--brown)', borderColor: 'var(--line)' },
    ghost: { background: 'transparent', color: 'var(--brown)' },
  };

  const cls = `olic-btn olic-btn-${variant}${className ? ' ' + className : ''}`;
  const iconSize = size === 'lg' ? 20 : 18;
  const content = (
    <>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
    </>
  );

  const props = {
    className: cls,
    onClick,
    style: { ...base, ...variants[variant], ...style },
    ...rest,
  };

  if (href) {
    return <a href={href} target={target} rel={rel} {...props}>{content}</a>;
  }
  return <button type="button" {...props}>{content}</button>;
}
