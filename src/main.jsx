import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Products from './components/Products.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ShowCart from './components/ShowCart.jsx';
import Checkout from './components/Checkout.jsx';
import RedirectToStripe from './components/RedirectToStripe.jsx';
import SuccessPayment from './components/SuccessPayment.jsx';
import CancelPayment from './components/CancelPayment.jsx';
import UserOrders from './components/UserOrders.jsx';
import LogIn from './components/auth/LogIn.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Account from './components/Account.jsx';
import Register from './components/auth/Register.jsx';

function ProtectedRoute({ children }) {
  const { authToken, loading } = useAuth();

  if (loading) return <div>Vérification de la session en cours...</div>;

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
          <Route path="/redirection-vers-le-paiement" element={<ProtectedRoute><RedirectToStripe /></ProtectedRoute>} />
          <Route path="/mes-commandes" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
          <Route path="/paiement-reussi" element={<ProtectedRoute><SuccessPayment /></ProtectedRoute>} />
          <Route path="/paiement-echoue" element={<ProtectedRoute><CancelPayment /></ProtectedRoute>} />
          <Route path="/connexion" element={<LogIn />} />
          <Route path="/déconnexion" element={<Account />} />
          <Route path="/inscription" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);

