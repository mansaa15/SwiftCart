import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>SwiftCart</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
