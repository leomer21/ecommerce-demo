import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { testProducts } from '../data/testProducts';
import './ProductCardDemo.css';

const ProductCardDemo = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(testProducts.map(product => product.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? testProducts 
    : testProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>Product Card UI Demo</h1>
        <p>A responsive product card component with modern design and functionality</p>
      </div>
      
      <div className="demo-filters">
        <h3>Filter by Category:</h3>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="demo-features">
        <h3>Features Implemented:</h3>
        <ul>
          <li>✅ Responsive design that works on all screen sizes</li>
          <li>✅ Product image with hover effects</li>
          <li>✅ Product name and description</li>
          <li>✅ Product price display</li>
          <li>✅ Variant dropdown with stock information</li>
          <li>✅ Add to Cart button with proper state handling</li>
          <li>✅ Out of Stock overlay and disabled states</li>
          <li>✅ Modern UI with smooth animations</li>
          <li>✅ Category filtering</li>
          <li>✅ Toast notifications for user feedback</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCardDemo; 