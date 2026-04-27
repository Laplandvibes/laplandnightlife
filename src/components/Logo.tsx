interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`font-heading text-2xl font-bold tracking-tight leading-none ${className}`}>
      <span className="text-pink">#</span>
      <span className="text-white">Lapland</span>
      <span className="text-purple-light">·</span>
      <span className="text-white">Nightlife</span>
    </span>
  );
}
