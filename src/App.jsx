import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ShopPage from "./pages/Shop";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/shop" element={<ShopPage cart={cart} setCart={setCart} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        
        <Route 
          path="/admin" 
          element={user?.email === "admin@gmail.com" ? <AdminPage /> : <HomePage />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
