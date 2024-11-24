import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../Shop.css';

function Shop({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const filterProducts = (category) => {
    setFilteredCategory(category);
  };

  const filteredProducts = filteredCategory
    ? products.filter((product) => product.category === filteredCategory)
    : products;

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log("Updated Cart:", updatedCart); 
      return updatedCart;
    });
    alert(`${product.name} has been added to your cart!`);
    navigate('/cart'); 
  };

  return (
    <div className="shop-container">
      <div className="spacer"></div>

      <div className="category-filter">
        <button
          className={filteredCategory === 'Gift items' ? 'active' : ''}
          onClick={() => filterProducts('Gift items')}
        >
          Gift Items
        </button>
        <button
          className={filteredCategory === 'Stationery' ? 'active' : ''}
          onClick={() => filterProducts('Stationery')}
        >
          Stationery
        </button>
        <button
          className={filteredCategory === '' ? 'active' : ''}
          onClick={() => filterProducts('')}
        >
          All
        </button>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
