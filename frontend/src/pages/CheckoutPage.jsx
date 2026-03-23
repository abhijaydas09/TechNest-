import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();

  const handlePlaceOrder = () => {
    if (!user || cartItems.length === 0) {
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const nextOrder = {
      id: Date.now(),
      username: user.username,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
      items: cartItems
    };

    localStorage.setItem('orders', JSON.stringify([nextOrder, ...existingOrders]));
    clearCart();
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
          <p className="mt-2 text-slate-600">Add products before you move to checkout.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Go to products
          </Link>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Login required</h1>
          <p className="mt-2 text-slate-600">Sign in first, then return here to complete your checkout.</p>
          <Link to="/login" className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Checkout</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Confirm your order</h1>
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="font-medium text-slate-900">Signed in as</p>
            <p className="mt-1 text-slate-600">{user.username}</p>
          </div>
          <div className="mt-6 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">Qty {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Payment summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>Included</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          </div>
          <button type="button" onClick={handlePlaceOrder} className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Place order
          </button>
        </aside>
      </div>
    </main>
  );
}

