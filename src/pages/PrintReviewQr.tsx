import { ArrowLeft, Printer, QrCode, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrintReviewQr = () => {
  const configuredUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, '');
  const reviewUrl = `${configuredUrl || window.location.origin}/reviews/leave`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=640x640&margin=16&ecc=H&format=svg&data=${encodeURIComponent(reviewUrl)}`;
  const logoUrl = 'https://alicia.boraerp.co.ke/files/logo.png';

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto mb-6 flex max-w-xl items-center justify-between print:hidden">
        <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-yellow-700"><ArrowLeft size={18} /> Back to reviews</Link>
        <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"><Printer size={18} /> Print counter card</button>
      </div>

      <section className="mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-2xl print:max-w-none print:rounded-none print:shadow-none">
        <div className="bg-stone-950 px-8 py-10 text-center text-white">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300"><Sparkles size={15} /> Alicia Hairline &amp; Beauty</p>
          <h1 className="mt-4 text-4xl font-bold">Loved your look?</h1>
          <p className="mt-3 text-lg text-stone-300">Tell us about your Alicia experience.</p>
        </div>
        <div className="px-8 py-9 text-center">
          <div className="relative mx-auto flex w-fit rounded-3xl border-8 border-yellow-100 bg-white p-3">
            <img src={qrUrl} width="260" height="260" alt="QR code linking to Alicia Hairline and Beauty reviews" />
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-yellow-100 bg-white p-1.5 shadow-md">
              <img src={logoUrl} alt="" className="h-full w-full rounded-full object-cover" />
            </div>
          </div>
          <div className="mt-7 flex items-center justify-center gap-2 text-yellow-700"><QrCode size={20} /><span className="text-sm font-bold uppercase tracking-[0.16em]">Scan to leave a review</span></div>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-600">Your feedback helps us keep creating beautiful hair moments and helps future clients choose with confidence.</p>
          <div className="mt-7 border-t border-dashed border-gray-200 pt-5"><p className="text-xs font-semibold uppercase tracking-[0.13em] text-gray-400">Or visit</p><p className="mt-1 break-all text-sm font-semibold text-gray-700">{reviewUrl}</p></div>
        </div>
      </section>
      <p className="mx-auto mt-5 max-w-xl text-center text-xs text-gray-500 print:hidden">Before printing, confirm the URL below the QR code is the live production website—not a preview deployment.</p>
    </main>
  );
};

export default PrintReviewQr;
