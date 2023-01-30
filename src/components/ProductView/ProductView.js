import React, { useState, useEffect } from 'react';
import ProductListItem from '../ProductListItem';
import ProductDetails from '../ProductDetails';
import './ProductView.css';

function ProductView({ products }) {
  const [sideOpen, setSideOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Retreive side panel state from local storage on initial render
  useEffect(() => {
    const storedValue = localStorage.getItem('sideOpen');
    if (storedValue) setSideOpen(JSON.parse(storedValue));
  }, []);
  
  // Open side panel when selection is made
  useEffect(() => {
    if (selectedProduct) setSideOpen(true);
  }, [selectedProduct]);
  
  // Clear selection when the panel is closed
  useEffect(() => {
    if (!sideOpen) setSelectedProduct('');
    // store state in localstorage
    localStorage.setItem('sideOpen', sideOpen);
  }, [sideOpen])

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
              isSelected={selectedProduct && selectedProduct.id === item.id}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails visible={sideOpen} product={products.find(el => el.id === selectedProduct.id)} />
      </div>
    </div>
  )
}

export default ProductView;
