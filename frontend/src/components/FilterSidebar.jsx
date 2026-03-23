import { useState } from 'react';

const CATEGORIES = ['Laptops', 'Smartphones', 'Audio', 'Accessories', 'Tablets', 'Cameras'];
const BRANDS = ['Apple', 'Samsung', 'Dell', 'Sony', 'boAt', 'OnePlus', 'Lenovo'];

export default function FilterSidebar({ onFilter }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [maxPrice, setMaxPrice] = useState(200000);

    const toggleItem = (list, setList, item) => {
        const updated = list.includes(item)
            ? list.filter(i => i !== item)
            : [...list, item];
        setList(updated);
        return updated;
    };

    const handleCategory = (cat) => {
        const updated = toggleItem(selectedCategories, setSelectedCategories, cat);
        onFilter({ categories: updated, brands: selectedBrands, maxPrice });
    };

    const handleBrand = (brand) => {
        const updated = toggleItem(selectedBrands, setSelectedBrands, brand);
        onFilter({ categories: selectedCategories, brands: updated, maxPrice });
    };

    const handlePrice = (e) => {
        setMaxPrice(Number(e.target.value));
        onFilter({ categories: selectedCategories, brands: selectedBrands, maxPrice: Number(e.target.value) });
    };

    const clearAll = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMaxPrice(200000);
        onFilter({ categories: [], brands: [], maxPrice: 200000 });
    };

    return (
        <div className="w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">

                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
                    <button onClick={clearAll} className="text-xs text-blue-600 hover:underline">
                        Clear all
                    </button>
                </div>

                {/* Category */}
                <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
                    <div className="space-y-1.5">
                        {CATEGORIES.map(cat => (
                            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategory(cat)}
                                    className="w-3.5 h-3.5 accent-blue-600"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  {cat}
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Brand */}
                <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Brand</p>
                    <div className="space-y-1.5">
                        {BRANDS.map(brand => (
                            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrand(brand)}
                                    className="w-3.5 h-3.5 accent-blue-600"
                                />
                                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  {brand}
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Max Price</p>
                    <input
                        type="range"
                        min="1000"
                        max="200000"
                        step="1000"
                        value={maxPrice}
                        onChange={handlePrice}
                        className="w-full accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>₹1,000</span>
                        <span className="font-medium text-blue-600">₹{maxPrice.toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}