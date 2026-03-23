import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === product.id);
            if (exists) return prev.map(i =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            );
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) =>
        setCartItems(prev => prev.filter(i => i.id !== id));

    const updateQty = (id, qty) => {
        if (qty < 1) return removeFromCart(id);
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    };

    const clearCart = () => setCartItems([]);

    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);