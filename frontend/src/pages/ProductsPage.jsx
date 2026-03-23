import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { mockCategories, mockProducts } from '../data/mockProducts';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const { addToCart } = useCart();

  const products = selectedCategory
    ? mockProducts.filter((product) => product.category === selectedCategory)
    : mockProducts;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Catalog</p>
          <h1 className="text-3xl font-bold text-slate-900">Explore products</h1>
          <p className="mt-2 text-slate-600">Browse curated tech picks while your backend APIs are still being wired up.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/products"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'}`}
          >
            All
          </Link>
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={product.imageUrl} alt={product.name} className="h-52 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{product.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {product.category}
                </span>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/products/${product.id}`}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
                >
                  View details
                </Link>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {products.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          No products found for this category yet.
        </div>
      )}
    </main>
  );
}

