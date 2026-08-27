import { QrCode, Sparkles } from 'lucide-react';
import ReviewQrCode from './ReviewQrCode';
import { getReviewUrl } from '../lib/reviewUrl';

const ReviewQrPrintCard = () => {
  const reviewUrl = getReviewUrl();

  return (
    <section className="mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-2xl print:max-w-none print:rounded-none print:shadow-none">
      <div className="bg-stone-950 px-8 py-10 text-center text-white">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300"><Sparkles size={15} /> Alicia Hairline &amp; Beauty</p>
        <h1 className="mt-4 text-4xl font-bold">Loved your look?</h1>
        <p className="mt-3 text-lg text-stone-300">Tell us about your Alicia experience.</p>
      </div>
      <div className="px-8 py-9 text-center">
        <ReviewQrCode size={260} className="mx-auto" />
        <div className="mt-7 flex items-center justify-center gap-2 text-yellow-700"><QrCode size={20} /><span className="text-sm font-bold uppercase tracking-[0.16em]">Scan to leave a review</span></div>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-600">Your feedback helps us keep creating beautiful hair moments and helps future clients choose with confidence.</p>
        <div className="mt-7 border-t border-dashed border-gray-200 pt-5"><p className="text-xs font-semibold uppercase tracking-[0.13em] text-gray-400">Or visit</p><p className="mt-1 break-all text-sm font-semibold text-gray-700">{reviewUrl}</p></div>
      </div>
    </section>
  );
};

export default ReviewQrPrintCard;
