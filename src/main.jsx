import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Products from './components/Products.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ShowCart from './components/ShowCart.jsx';
import LogIn from './components/auth/LogIn.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Account from './components/Account.jsx';
import Register from './components/auth/Register.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ShowProduct />} />
          <Route path="/panier" element={<ProtectedRoute component={ShowCart} />} />
          <Route path="/connexion" element={<LogIn />} />
          <Route path="/déconnexion" element={<Account />} />
          <Route path="/inscription" element={<Register />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
function ProtectedRoute({ component: Component }) {
  const { authToken } = useAuth();

  useEffect(() => {
    console.log("Le Auth Token a changé, jeton actuel :", authToken);
  }, [authToken]);

  return authToken ? <Component /> : <Navigate to="/connexion" replace />;
};
