import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

export default function CartPage() {
  const { cartItems, updateQty, removeFromCart, total } = useCart();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Cart</p>
          <h1 className="text-3xl font-bold text-slate-900">Your shopping cart</h1>
        </div>
        <Link to="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">Your cart is empty</h2>
          <p className="mt-2 text-slate-600">Add a few products from the catalog to see them here.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                <img src={item.imageUrl} alt={item.name} className="h-28 w-full rounded-xl object-cover sm:w-32" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">₹{item.price.toLocaleString('en-IN')} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} className="h-10 w-10 rounded-full border border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600">-</button>
                  <span className="min-w-8 text-center font-semibold text-slate-900">{item.quantity}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} className="h-10 w-10 rounded-full border border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-600">+</button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="mt-2 text-sm font-medium text-red-500 hover:text-red-600">Remove</button>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <Link to="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

