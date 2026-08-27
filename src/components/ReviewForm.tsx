import { FormEvent, useState } from 'react';
import { Send, Star } from 'lucide-react';
import { createWebsiteReview, WebsiteReview } from '../services/reviews';

type ReviewFormProps = {
  onSubmitted?: (review: WebsiteReview) => void;
};

const ReviewForm = ({ onSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !name.trim() || comment.trim().length < 5) { setMessage('Please add a rating, your name, and a short review.'); return; }
    setIsSubmitting(true); setMessage('');
    try {
      const review = await createWebsiteReview({ name: name.trim(), rating, comment: comment.trim() });
      onSubmitted?.(review);
      setRating(0); setName(''); setComment(''); setMessage('Thank you—your review has been posted.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to save your review. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <form onSubmit={submitReview}>
      <fieldset>
        <legend className="text-sm font-semibold text-gray-700">Your rating</legend>
        <div className="mt-2 flex gap-1" aria-label="Choose a star rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" aria-label={`${star} star${star === 1 ? '' : 's'}`} aria-pressed={rating === star}>
              <Star className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} size={30} />
            </button>
          ))}
        </div>
      </fieldset>
      <label className="mt-5 block text-sm font-semibold text-gray-700" htmlFor="reviewer-name">Your name</label>
      <input id="reviewer-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} required placeholder="e.g. Wanjiru M." className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100" />
      <label className="mt-5 block text-sm font-semibold text-gray-700" htmlFor="review-comment">Your experience</label>
      <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={500} minLength={5} required placeholder="Tell us what stood out..." className="mt-2 min-h-32 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100" />
      <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? 'Posting review...' : <><Send size={18} /> Post review</>}
      </button>
      {message && <p className="mt-4 text-sm text-gray-600" role="status">{message}</p>}
    </form>
  );
};

export default ReviewForm;
