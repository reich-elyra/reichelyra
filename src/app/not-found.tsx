import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Reich Elyra" },
  { href: "/maat", label: "MAAT Platform" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="radial-glow absolute inset-0 pointer-events-none" />

      <div className="glass-card p-10 md:p-14 text-center max-w-xl w-full relative z-10">
        <h1 className="text-gradient-gold text-7xl md:text-9xl font-bold mb-4 text-glow-gold">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
          Page Not Found
        </h2>

        <p className="text-text-secondary text-sm md:text-base mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link href="/" className="btn-primary inline-flex items-center gap-2 mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </Link>

        <div className="border-t border-white/5 pt-6">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-4">
            Or jump to
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
