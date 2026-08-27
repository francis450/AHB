import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send, Star } from 'lucide-react';
import { createWebsiteReview, WebsiteReview } from '../services/reviews';

type ReviewFormProps = {
  onSubmitted?: (review: WebsiteReview) => void;
};

const ReviewForm = ({ onSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating || !name.trim() || comment.trim().length < 5) { setError('Please add a rating, your name, and a short review.'); return; }
    setIsSubmitting(true); setError('');
    try {
      const review = await createWebsiteReview({ name: name.trim(), rating, comment: comment.trim() });
      onSubmitted?.(review);
      setRating(0); setName(''); setComment('');
      setIsDone(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to save your review. Please try again.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <AnimatePresence mode="wait">
      {isDone ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="py-6 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100"
          >
            <CheckCircle2 className="text-yellow-600" size={34} />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-4 text-xl font-bold text-gray-900"
          >
            Thank you!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-600"
          >
            Your review has been posted. We appreciate you taking the time to share your experience.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            type="button"
            onClick={() => setIsDone(false)}
            className="mt-5 text-sm font-semibold text-yellow-700 hover:underline"
          >
            Leave another review
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={submitReview}
        >
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
          {error && <p className="mt-4 text-sm text-gray-600" role="status">{error}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ReviewForm;
