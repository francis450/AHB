import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getPaymentStatus, PaymentStatusResult } from '../services/payments';

type View = 'checking' | 'paid' | 'failed' | 'pending' | 'error';

const POLL_MS = 2500;
const MAX_ATTEMPTS = 16; // ~40s

const PaymentReturn = () => {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const orderId = params.get('OrderMerchantReference') || params.get('order') || '';

  const [view, setView] = useState<View>(orderId ? 'checking' : 'error');
  const [result, setResult] = useState<PaymentStatusResult | null>(null);
  const cleared = useRef(false);

  useEffect(() => {
    if (!orderId) return;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;

    const poll = async () => {
      attempts += 1;
      try {
        const status = await getPaymentStatus(orderId);
        if (stopped) return;
        setResult(status);

        if (status.status === 'Paid') {
          if (!cleared.current) {
            cleared.current = true;
            clearCart();
          }
          setView('paid');
          return;
        }
        if (['Failed', 'Cancelled', 'Expired'].includes(status.status)) {
          setView('failed');
          return;
        }
        if (attempts >= MAX_ATTEMPTS) {
          setView('pending');
          return;
        }
        timer = setTimeout(poll, POLL_MS);
      } catch {
        if (stopped) return;
        if (attempts >= MAX_ATTEMPTS) {
          setView('error');
          return;
        }
        timer = setTimeout(poll, POLL_MS);
      }
    };

    poll();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [orderId, clearCart]);

  const money = (r: PaymentStatusResult) =>
    `${r.currency} ${r.total_amount.toLocaleString()}`;

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#fcfaf6] px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-yellow-100 bg-white p-8 text-center shadow-xl shadow-yellow-900/5">
        {view === 'checking' && (
          <>
            <Loader2 className="mx-auto animate-spin text-yellow-600" size={44} />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">Confirming your payment…</h1>
            <p className="mt-2 text-sm text-gray-600">This only takes a moment. Please don't close this page.</p>
          </>
        )}

        {view === 'paid' && result && (
          <>
            <CheckCircle2 className="mx-auto text-green-600" size={48} />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">Payment received</h1>
            <p className="mt-2 text-sm text-gray-600">
              We've received {money(result)} and your order is confirmed. We'll be in touch about delivery.
            </p>
            {result.confirmation_code && (
              <p className="mt-3 text-sm text-gray-500">
                Reference: <span className="font-mono font-semibold text-gray-700">{result.confirmation_code}</span>
              </p>
            )}
            <Link to="/products" className="mt-6 inline-block rounded-full bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700">
              Continue shopping
            </Link>
          </>
        )}

        {view === 'failed' && (
          <>
            <XCircle className="mx-auto text-red-600" size={48} />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">Payment not completed</h1>
            <p className="mt-2 text-sm text-gray-600">
              Your card was not charged. Your cart is still saved — you can try again.
            </p>
            <Link to="/products" className="mt-6 inline-block rounded-full bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700">
              Back to cart
            </Link>
          </>
        )}

        {view === 'pending' && (
          <>
            <Clock className="mx-auto text-yellow-600" size={44} />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">Still processing</h1>
            <p className="mt-2 text-sm text-gray-600">
              Your payment is taking a little longer than usual to confirm. If it went through, you'll get a confirmation shortly — no need to pay again.
            </p>
            <Link to="/" className="mt-6 inline-block rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
              Back to home
            </Link>
          </>
        )}

        {view === 'error' && (
          <>
            <XCircle className="mx-auto text-gray-400" size={44} />
            <h1 className="mt-5 text-2xl font-bold text-gray-900">We couldn't check this payment</h1>
            <p className="mt-2 text-sm text-gray-600">
              If you completed a payment, please contact us on +254 712 676182 with your card reference and we'll sort it out.
            </p>
            <Link to="/" className="mt-6 inline-block rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
              Back to home
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentReturn;
