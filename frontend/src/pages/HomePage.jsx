// frontend/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const API_BASE = 'http://localhost:5050/api';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get(`${API_BASE}/products/featured`),
                    axios.get(`${API_BASE}/categories`)
                ]);
                setFeaturedProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="homepage">
            {/* Hero Banner */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to TeckNest</h1>
                    <p>Your one-stop shop for the latest tech gadgets & accessories</p>
                    <button className="cta-btn" onClick={() => window.location.href = '/products'}>
                        Shop Now
                    </button>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <h2>Shop by Category</h2>
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <div key={cat.id} className="category-card" onClick={() => window.location.href = `/products?category=${cat.id}`}>
                            <img src={cat.imageUrl || '/placeholder.png'} alt={cat.name} />
                            <h3>{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <h2>Featured Products</h2>
                <div className="products-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl || '/placeholder.png'} alt={product.name} />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="price">₹{product.price.toFixed(2)}</p>
                                <p className="description">{product.description?.substring(0, 80)}...</p>
                                <button className="add-cart-btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="promo-banner">
                <h2>🔥 Limited Time Offer — Up to 50% Off on Electronics!</h2>
                <button className="cta-btn" onClick={() => window.location.href = '/deals'}>
                    View Deals
                </button>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-grid">
                    <div>
                        <h4>TeckNest</h4>
                        <p>Quality tech, delivered fast.</p>
                    </div>
                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <p>support@tecknest.com</p>
                        <p>+91-9876543210</p>
                    </div>
                </div>
                <p className="copyright">© 2025 TeckNest. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
