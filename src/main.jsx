import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Products from './components/Products.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ShowCart from './components/ShowCart.jsx';
import LogIn from './components/auth/LogIn.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ShowProduct />} />
        <Route path="/panier" element={<ShowCart />} />
        <Route path="/connexion" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
