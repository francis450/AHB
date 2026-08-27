import { Star } from 'lucide-react';
import { WebsiteReview } from '../services/reviews';

type ReviewCardProps = {
  review: WebsiteReview;
  featured?: boolean;
};

const ReviewCard = ({ review, featured = false }: ReviewCardProps) => {
  const reviewDate = new Date(review.created_at);
  const date = Number.isNaN(reviewDate.getTime())
    ? ''
    : reviewDate.toLocaleDateString('en-KE', { month: 'short', year: 'numeric' });

  return (
    <article className={`relative overflow-hidden rounded-3xl border border-yellow-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${featured ? 'md:p-7' : ''}`}>
      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-yellow-50" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 font-bold text-white">
            {review.name.trim().charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{review.name}</h3>
            {date && <p className="text-xs text-gray-500">{date}</p>}
          </div>
        </div>
        <div className="flex rounded-full bg-yellow-50 px-2 py-1" aria-label={`${review.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
        </div>
      </div>
      <p className="relative mt-5 leading-relaxed text-gray-700">“{review.comment}”</p>
    </article>
  );
};

export default ReviewCard;
