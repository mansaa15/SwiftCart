import React, { useState } from 'react';
import { db } from '../firebase/firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom'; 
import '../CartPage.css'; 

function CartPage({ cart, setCart }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const navigate = useNavigate();

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      const price = parseFloat(product.price);
      if (!isNaN(price)) {
        total += price;
      }
    });
    return total.toFixed(2);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };


  const handlePayment = async (method) => {
    setPaymentMethod(method);
    const transactionId = `txn-${Date.now()}`;
    const timestamp = new Date().toISOString();

    try {
      const transactionRef = collection(db, 'transactions');
      await addDoc(transactionRef, {
        transactionId,
        paymentMethod: method,
        totalAmount: calculateTotal(),
        timestamp,
      });

      setTransactionStatus(`Transaction ${transactionId} completed successfully via ${method}!`);
      setTimeout(() => navigate('/'), 3000); 
    } catch (error) {
      console.error('Error adding transaction:', error);
      setTransactionStatus('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <button className="remove-btn" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <h2>Total: ${calculateTotal()}</h2>
      </div>

      {transactionStatus && <p className="transaction-status">{transactionStatus}</p>}

      {cart.length > 0 && (
        <div className="checkout-options">
          <button onClick={() => handlePayment('Cash')} className="checkout-button">
            Pay with Cash
          </button>
          <button onClick={() => handlePayment('Online')} className="checkout-button">
            Pay Online
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
