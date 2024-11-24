import React from "react";
import { useNavigate } from "react-router-dom";
import '../HomePage.css';

const HomePage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    
    setCart([...cart, product]);
  };

  const handleShopNow = () => {
    
    navigate('/shop');
  };

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <h1>Welcome to SwiftCart!</h1>
        <p>Your one-stop shop for amazing deals!</p>
        <button className="cta-btn" onClick={handleShopNow}>Shop Now</button>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <img src="https://i.ebayimg.com/images/g/0swAAOSw6DNnQMkA/s-l1600.webp" alt="Product 1" />
            <div className="product-info">
              <div className="product-name">TTPD Snowglobe</div>
              <div className="product-price">$19.99</div>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart({ id: '1', name: 'TTPD Snowglobe', price: 19.99, image: 'https://i.ebayimg.com/images/g/0swAAOSw6DNnQMkA/s-l1600.webp' })}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product-card">
            <img src="https://i.ebayimg.com/images/g/Y-8AAOSw0-dnGwtC/s-l1600.webp" alt="Product 2" />
            <div className="product-info">
              <div className="product-name">SpeakNow Snowglobe</div>
              <div className="product-price">$29.99</div>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart({ id: '2', name: 'SpeakNow Snowglobe', price: 29.99, image: 'https://i.ebayimg.com/images/g/Y-8AAOSw0-dnGwtC/s-l1600.webp' })}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© Have fun shopping!</p>
      </footer>
    </div>
  );
};

export default HomePage;
