import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiLogOut, FiZap } from 'react-icons/fi';
import { useCart } from './CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { itemCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                        <FiZap size={22} />
                        TechNest
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            Products
                        </Link>
                        {user && (
                            <Link to="/orders" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                My Orders
                            </Link>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <FiShoppingCart size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
                            )}
                        </Link>

                        {/* Auth */}
                        {user ? (
                            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 font-medium hidden md:block">
                  {user.username}
                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <FiLogOut size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}