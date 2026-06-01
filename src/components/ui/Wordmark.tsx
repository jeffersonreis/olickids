interface WordmarkProps {
  tone?: 'brown' | 'cream';
  height?: number;
  width?: number;
  opacity?: number;
  style?: React.CSSProperties;
}

export function Wordmark({ tone = 'brown', height, width, opacity, style = {} }: WordmarkProps) {
  const ratio = 1.491;
  const w = width != null ? width : height != null ? height * ratio : undefined;
  const h = height != null ? height : width != null ? width / ratio : undefined;
  return (
    <img
      src={`/images/wordmark_${tone}.png`}
      alt="Olic Kids"
      style={{ display: 'block', width: w ? `${w}px` : undefined, height: h ? `${h}px` : undefined, opacity, ...style }}
    />
  );
}
