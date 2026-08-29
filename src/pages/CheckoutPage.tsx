import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { startCartPayment } from '../services/payments';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cartItems.length === 0) return <Navigate to="/cart" replace />;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.address.trim()) next.address = 'Delivery address is required';
    if (!form.city.trim()) next.city = 'City is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      const { redirect_url } = await startCartPayment({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
        },
        items: cartItems.map((item) => ({ item_code: String(item.id), qty: item.quantity })),
        notes: form.notes,
      });
      window.location.assign(redirect_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const field = (
    name: keyof typeof form,
    label: string,
    Icon: typeof User,
    type = 'text',
  ) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        <Icon size={15} className="mr-2 inline" />
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-yellow-500 ${
          errors[name] ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
    </div>
  );

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#fcfaf6] py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <form onSubmit={onSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Your details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field('name', 'Full name', User)}
              {field('email', 'Email', Mail, 'email')}
              {field('phone', 'Phone number', Phone, 'tel')}
              {field('city', 'City', MapPin)}
            </div>
            <div className="mt-4">{field('address', 'Delivery address', MapPin)}</div>
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Order notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={onChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              ) : (
                <>
                  <CreditCard size={18} /> Pay with card — Ksh {getTotalPrice().toLocaleString()}
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">
              You'll be taken to our secure payment page to enter your card details.
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-700">
                    {item.name} <span className="text-gray-400">× {item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-900">
                    Ksh {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-bold text-yellow-600">Ksh {getTotalPrice().toLocaleString()}</span>
            </div>
            <Link to="/cart" className="mt-4 inline-block text-sm font-semibold text-yellow-700 hover:underline">
              ← Edit cart
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
