import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
    const { updateQty, removeFromCart } = useCart();

    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">

            {/* Image */}
            <img
                src={item.imageUrl || 'https://placehold.co/80x80?text=?'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-gray-50 flex-shrink-0"
            />

            {/* Details */}
            <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 font-medium">{item.brand}</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                    ₹{item.price?.toLocaleString('en-IN')}
                </p>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center text-sm font-medium"
                >
                    −
                </button>
                <span className="w-6 text-center text-sm font-semibold text-gray-800">
          {item.quantity}
        </span>
                <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center text-sm font-medium"
                >
                    +
                </button>
            </div>

            {/* Subtotal + remove */}
            <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <FiTrash2 size={15} />
                </button>
            </div>
        </div>
    );
}