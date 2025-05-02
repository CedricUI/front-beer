import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Products from './components/Products.jsx';
import ShowProduct from './components/ShowProduct.jsx';
import ShowCart from './components/ShowCart.jsx';
import LogIn from './components/auth/LogIn.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Account from './components/Account.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ShowProduct />} />
          <Route path="/panier" element={<ProtectedRoute component={ShowCart} />} />
          {/* <Route path="/panier" element={<ShowCart />} /> */}
          <Route path="/connexion" element={<LogIn />} />
          <Route path="/déconnexion" element={<Account />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
function ProtectedRoute({ component: Component }) {
  const { authToken } = useAuth();

  useEffect(() => {
    console.log("Auth token has changed, current token:", authToken);
  }, [authToken]);

  return authToken ? <Component /> : <Navigate to="/connexion" replace />;
};
