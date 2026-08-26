import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { createWebsiteReview, getWebsiteReviews, WebsiteReview } from '../services/reviews';

const Reviews = () => {
  const [reviews, setReviews] = useState<WebsiteReview[]>([]);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getWebsiteReviews().then(setReviews).catch(() => setMessage('Reviews are temporarily unavailable. Please try again shortly.'));
  }, []);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !name.trim() || comment.trim().length < 5) {
      setMessage('Please add a rating, your name, and a short review.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      const review = await createWebsiteReview({ name: name.trim(), rating, comment: comment.trim() });
      setReviews((current) => [review, ...current]);
      setRating(0);
      setName('');
      setComment('');
      setMessage('Thank you. Your review has been posted.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-700">Alicia Hairline &amp; Beauty</p>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Client reviews</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">Share your experience and help other clients discover Alicia Hairline &amp; Beauty.</p>
        </div>

        <div className="rounded-3xl border border-yellow-100 bg-white p-6 shadow-xl sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Leave a review</h2>
          <form className="mt-6" onSubmit={submitReview}>
            <fieldset>
              <legend className="text-sm font-semibold text-gray-700">Your rating</legend>
              <div className="mt-2 flex gap-2" aria-label="Choose a star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" aria-label={`${star} star${star === 1 ? '' : 's'}`} aria-pressed={rating === star}>
                    <Star className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} size={32} />
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block text-sm font-semibold text-gray-700" htmlFor="reviewer-name">Your name</label>
            <input id="reviewer-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} required placeholder="e.g. Wanjiru M." className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100" />

            <label className="mt-5 block text-sm font-semibold text-gray-700" htmlFor="review-comment">Your experience</label>
            <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={500} minLength={5} required placeholder="Tell us what stood out..." className="mt-2 min-h-32 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100" />

            <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">{isSubmitting ? 'Posting review...' : 'Post review'}</button>
            {message && <p className="mt-4 text-sm text-gray-600" role="status">{message}</p>}
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900">What clients are saying</h2>
          {reviews.length === 0 ? <p className="mt-4 text-gray-600">No reviews yet. Be the first to share your experience.</p> : <div className="mt-5 space-y-4">{reviews.map((review, index) => <article key={`${review.created_at}-${index}`} className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-4"><h3 className="font-semibold text-gray-900">{review.name}</h3><div className="flex" aria-label={`${review.rating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}</div></div><p className="mt-3 leading-relaxed text-gray-700">{review.comment}</p></article>)}</div>}
        </div>

        <div className="mt-6 flex gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-gray-700"><CheckCircle2 className="mt-0.5 shrink-0 text-yellow-700" size={20} /><p>These are website reviews. Once the Google Business Profile is verified, a separate Google review option can be added here.</p></div>
      </div>
    </section>
  );
};

export default Reviews;
