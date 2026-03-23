import { Link, useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { mockProducts } from '../data/mockProducts';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = mockProducts.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
          <p className="mt-2 text-slate-600">This route is ready, but that product ID does not exist in the current demo catalog.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
        <img src={product.imageUrl} alt={product.name} className="h-full min-h-[320px] w-full rounded-2xl object-cover" />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-4 text-slate-600">{product.description}</p>
          <p className="mt-6 text-3xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add to cart
            </button>
            <Link to="/cart" className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600">
              Go to cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

