interface ProductVideoProps {
  src: string;
  className?: string;
}

export function ProductVideo({ src, className }: ProductVideoProps) {
  return <video src={src} controls className={className} />;
}
