import { MessageCircleHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

const LeaveReview = () => (
  <section className="min-h-[calc(100vh-5rem)] bg-[#fcfaf6] py-10 sm:py-14">
    <div className="mx-auto max-w-xl px-4 sm:px-6">
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-yellow-700"><MessageCircleHeart size={17} /> Alicia Hairline &amp; Beauty</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Loved your visit?</h1>
        <p className="mt-2 text-gray-600">Tell us about it—it only takes a minute.</p>
      </div>

      <div className="mt-8 rounded-[2rem] border border-yellow-100 bg-white p-6 shadow-xl shadow-yellow-900/5 sm:p-8">
        <ReviewForm />
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">Prefer to browse first? <Link to="/reviews" className="font-semibold text-yellow-700 hover:underline">See all reviews</Link></p>
    </div>
  </section>
);

export default LeaveReview;
