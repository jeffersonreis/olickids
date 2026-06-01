interface IconProps {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 22, stroke = 1.6, color = 'currentColor', style }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style,
  };

  switch (name) {
    case 'thermo':
      return <svg {...common}><path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0Z"/><path d="M12 9v6"/></svg>;
    case 'feather':
      return <svg {...common}><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/></svg>;
    case 'shield':
      return <svg {...common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'wash':
      return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 7h14"/><circle cx="12" cy="14" r="4"/><path d="M9.5 14a2.5 2.5 0 0 1 5 0"/><circle cx="8" cy="5" r=".4" fill={color}/></svg>;
    case 'arrow':
      return <svg {...common}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
    case 'menu':
      return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case 'x':
      return <svg {...common}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case 'mail':
      return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m22 6-10 7L2 6"/></svg>;
    case 'pin':
      return <svg {...common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'check':
      return <svg {...common}><path d="M20 6 9 17l-5-5"/></svg>;
    case 'instagram':
      return <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill={color}/></svg>;
    case 'whatsapp':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        </svg>
      );
    default:
      return null;
  }
}
