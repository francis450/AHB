import { ArrowLeft, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewQrPrintCard from '../components/ReviewQrPrintCard';

const PrintReviewQr = () => (
  <main className="min-h-screen bg-stone-100 px-4 py-8 print:bg-white print:p-0">
    <div className="mx-auto mb-6 flex max-w-xl items-center justify-between print:hidden">
      <Link to="/reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-yellow-700"><ArrowLeft size={18} /> Back to reviews</Link>
      <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"><Printer size={18} /> Print counter card</button>
    </div>

    <ReviewQrPrintCard />
    <p className="mx-auto mt-5 max-w-xl text-center text-xs text-gray-500 print:hidden">Before printing, confirm the URL below the QR code is the live production website—not a preview deployment.</p>
  </main>
);

export default PrintReviewQr;
