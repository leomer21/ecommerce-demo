import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!product.inStock || selectedVariant.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    
    const productWithVariant = {
      ...product,
      selectedVariant,
      cartId: `${product.id}-${selectedVariant.id}`
    };
    
    dispatch(addCart(productWithVariant));
    toast.success(`${product.name} (${selectedVariant.name}) added to cart`);
  };

  const isVariantInStock = selectedVariant && selectedVariant.stock > 0;
  const isProductAvailable = product.inStock && isVariantInStock;

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {!isProductAvailable && (
          <div className="product-card__out-of-stock">
            <span>Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        
        <div className="product-card__price">
          <span className="product-card__price-amount">${product.price}</span>
        </div>
        
        <div className="product-card__variant">
          <label htmlFor={`variant-${product.id}`} className="product-card__variant-label">
            {product.variants.length > 1 ? 'Select Option:' : 'Option:'}
          </label>
          <select
            id={`variant-${product.id}`}
            className="product-card__variant-select"
            value={selectedVariant?.id || ''}
            onChange={(e) => {
              const variant = product.variants.find(v => v.id === e.target.value);
              setSelectedVariant(variant);
            }}
          >
            {product.variants.map((variant) => (
              <option 
                key={variant.id} 
                value={variant.id}
                disabled={variant.stock === 0}
              >
                {variant.name} {variant.stock === 0 ? '(Out of Stock)' : `(${variant.stock} left)`}
              </option>
            ))}
          </select>
        </div>
        
        <button
          className={`product-card__button ${!isProductAvailable ? 'product-card__button--disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!isProductAvailable}
        >
          {isProductAvailable ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 