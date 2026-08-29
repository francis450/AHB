import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#fcfaf6] py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your cart</h1>

        {cartItems.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-yellow-200 bg-white p-12 text-center">
            <ShoppingBag className="mx-auto text-gray-300" size={48} />
            <p className="mt-4 text-lg text-gray-600">Your cart is empty.</p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <img src={item.image} alt={item.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="rounded-full p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-yellow-700">Ksh {item.price.toLocaleString()}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-full border border-gray-200 p-1.5 transition hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-full border border-gray-200 p-1.5 transition hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900">
                        Ksh {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/products" className="inline-block text-sm font-semibold text-yellow-700 hover:underline">
                ← Continue shopping
              </Link>
            </div>

            <aside className="h-fit rounded-2xl border border-yellow-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Summary</h2>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-yellow-600">Ksh {getTotalPrice().toLocaleString()}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700"
              >
                Proceed to checkout <ArrowRight size={18} />
              </Link>
              <p className="mt-3 text-center text-xs text-gray-500">
                Prices are confirmed against our catalogue at checkout.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
