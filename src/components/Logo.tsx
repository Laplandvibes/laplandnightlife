interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`font-heading text-2xl font-bold tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${className}`}>
      <span className="text-pink">#</span>
      <span className="text-white">Lapland</span>
      <span className="text-purple-light">·</span>
      <span className="text-white">Nightlife</span>
    </span>
  );
}
