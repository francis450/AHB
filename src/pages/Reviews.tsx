import { useEffect, useMemo, useState } from 'react';
import { Heart, MessageCircleHeart, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { getWebsiteReviews, WebsiteReview } from '../services/reviews';

const Reviews = () => {
  const [reviews, setReviews] = useState<WebsiteReview[]>([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => { getWebsiteReviews().then(setReviews).catch(() => setLoadError('Reviews are temporarily unavailable. Please try again shortly.')); }, []);

  const average = useMemo(() => reviews.length ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1) : null, [reviews]);

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#fcfaf6] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-stone-950 px-6 py-12 text-white sm:px-10 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(202,138,4,0.4),transparent_32%)]" />
          <div className="relative max-w-2xl"><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300"><MessageCircleHeart size={17} /> Alicia Hairline &amp; Beauty</p><h1 className="mt-5 text-4xl font-bold sm:text-6xl">Beautiful experiences, shared honestly.</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-300">Read client stories, then leave your own. Every review lives here on our website.</p><Link to="/reviews/qr" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"><Printer size={16} /> Print counter QR</Link></div>
          <div className="relative mt-9 flex flex-wrap gap-4"><div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4"><p className="text-3xl font-bold text-yellow-300">{average || '—'}</p><p className="text-sm text-stone-300">average rating</p></div><div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4"><p className="text-3xl font-bold text-yellow-300">{reviews.length}</p><p className="text-sm text-stone-300">client review{reviews.length === 1 ? '' : 's'}</p></div></div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-700">The review wall</p><h2 className="mt-2 text-3xl font-bold text-gray-900">What clients are saying</h2></div><Heart className="text-yellow-600" /></div>{loadError && <p className="mt-4 text-sm text-gray-600" role="status">{loadError}</p>}{reviews.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2">{reviews.map((review, index) => <ReviewCard key={`${review.created_at}-${index}`} review={review} featured={index === 0} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-yellow-200 bg-white p-10 text-center text-gray-600">No reviews yet. Be the first to share your experience.</div>}</div>

          <aside className="h-fit rounded-[2rem] border border-yellow-100 bg-white p-6 shadow-xl shadow-yellow-900/5 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-700">Your turn</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Leave a little love</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">Tell future clients what made your visit special.</p>
            <div className="mt-6"><ReviewForm onSubmitted={(review) => setReviews((current) => [review, ...current])} /></div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
