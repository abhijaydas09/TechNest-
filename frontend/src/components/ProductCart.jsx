import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from './CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">

            {/* Image */}
            <Link to={`/products/${product.id}`}>
                <div className="aspect-square bg-gray-50 overflow-hidden">
                    <img
                        src={product.imageUrl || 'https://placehold.co/400x400?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            {/* Info */}
            <div className="p-4">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
                    {product.brand}
                </p>
                <Link to={`/products/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-500">{product.rating?.toFixed(1) || '0.0'}</span>
                    {product.stock < 5 && product.stock > 0 && (
                        <span className="ml-auto text-xs text-orange-500 font-medium">
              Only {product.stock} left
            </span>
                    )}
                    {product.stock === 0 && (
                        <span className="ml-auto text-xs text-red-500 font-medium">Out of stock</span>
                    )}
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <FiShoppingCart size={13} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}