type DogTone = 'taupe' | 'taupesoft' | 'cream' | 'white';

interface DogProps {
  tone?: DogTone;
  height?: number;
  width?: number;
  opacity?: number;
  style?: React.CSSProperties;
}

export function Dog({ tone = 'taupe', height, width, opacity, style = {} }: DogProps) {
  const ratio = 1.805;
  const w = width != null ? width : height != null ? height * ratio : undefined;
  const h = height != null ? height : width != null ? width / ratio : undefined;
  return (
    <img
      src={`/images/dog_${tone}.png`}
      alt=""
      style={{ display: 'block', width: w ? `${w}px` : undefined, height: h ? `${h}px` : undefined, opacity, ...style }}
    />
  );
}
