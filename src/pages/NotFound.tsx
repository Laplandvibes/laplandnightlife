import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <title>404 — Not found | LaplandNightlife</title>
      <meta name="robots" content="noindex" />
      <section className="min-h-[70vh] flex items-center justify-center px-4 pt-32">
        <div className="max-w-md text-center">
          <p className="text-pink font-heading text-9xl tracking-tight mb-2">404</p>
          <h1 className="font-heading text-3xl text-white tracking-tight mb-4">Lost in the dark.</h1>
          <p className="text-white/65 mb-6">This page doesn&rsquo;t exist — but the night does.</p>
          <Link to="/" className="inline-block bg-pink hover:bg-pink-dark text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wider transition-colors">
            Back to start →
          </Link>
        </div>
      </section>
    </>
  );
}
