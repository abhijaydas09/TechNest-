import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const orders = user ? storedOrders.filter((order) => order.username === user.username) : [];

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Login to view orders</h1>
          <p className="mt-2 text-slate-600">Your order history appears here after you sign in and place an order.</p>
          <Link to="/login" className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Orders</p>
          <h1 className="text-3xl font-bold text-slate-900">My orders</h1>
        </div>
        <Link to="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Shop more
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">No orders yet</h2>
          <p className="mt-2 text-slate-600">Place your first order from the checkout page and it will appear here.</p>
        </div>
      ) : (
        <section className="mt-8 space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">Order #{order.id}</p>
                  <p className="text-sm text-slate-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-lg font-bold text-slate-900">₹{Number(order.total).toLocaleString('en-IN')}</p>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.id}`} className="flex items-center justify-between border-t border-slate-100 py-3 first:border-t-0 first:pt-0">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

