import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-6 relative overflow-hidden">
      <div className="radial-glow absolute inset-0 pointer-events-none" />

      <div className="glass-card p-12 md:p-16 text-center max-w-lg w-full relative z-10">
        <h1 className="text-gradient-gold text-8xl md:text-9xl font-bold mb-4 text-glow-gold">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
          Page Not Found
        </h2>

        <p className="text-text-secondary text-sm md:text-base mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
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
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
