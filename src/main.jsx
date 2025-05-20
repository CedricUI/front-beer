import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Products from './components/Products.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ShowCart from './components/ShowCart.jsx';
import Checkout from './components/Checkout.jsx';
import LogIn from './components/auth/LogIn.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Account from './components/Account.jsx';
import Register from './components/auth/Register.jsx';

function ProtectedRoute({ children }) {
  const { authToken } = useAuth();

   return authToken ? children : <Navigate to="/connexion" replace />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ShowProduct />} />
          <Route path="/panier" element={<ProtectedRoute><ShowCart /></ProtectedRoute>} />
          <Route path="/commande" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/connexion" element={<LogIn />} />
          <Route path="/déconnexion" element={<Account />} />
          <Route path="/inscription" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);

