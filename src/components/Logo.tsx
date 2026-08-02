interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    // The wordmark had one fixed size. At 24px it measured 202px, which on a
    // 375px screen left no room for the language select and the menu button —
    // the button was laid out past the right edge of a `fixed` bar, so it was
    // unreachable with no horizontal scroll to hint at it. One step down below
    // 420px keeps the whole row on screen.
    <span className={`font-heading text-lg min-[420px]:text-2xl font-bold tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${className}`}>
      <span className="text-pink">#</span>
      <span className="text-white">Lapland</span>
      <span className="text-purple-light">·</span>
      <span className="text-white">Nightlife</span>
    </span>
  );
}
